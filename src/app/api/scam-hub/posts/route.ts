// src/app/api/scam-hub/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

/**
 * Create a new scam post.
 * - Maps submitter_wallet -> wallet (DB column)
 * - Maps submitter_email  -> email  (optional)
 * - Ensures evidence_urls is an array
 * - Sets status = 'pending'
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      type = 'experience',
      title = '',
      summary = '',
      category = '',
      country = '',
      source_url = '',
      media_type = '',
      media_url = '',
      evidence_urls,            // can be string (space separated) or array
      submitter_wallet,         // <- from the form
      submitter_email,          // <- from the form
    } = body ?? {};

    // Minimal validation
    if (!title.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    // Normalize evidence_urls to an array
    const evidence: string[] = Array.isArray(evidence_urls)
      ? evidence_urls
      : typeof evidence_urls === 'string' && evidence_urls.trim()
        ? evidence_urls.trim().split(/\s+/)
        : [];

    // Build the row we insert into the `posts` table
    const payload = {
      type,
      title: title.trim(),
      summary: summary?.trim() || '',
      category: category?.trim() || '',
      country: country?.trim() || '',
      source_url: source_url?.trim() || '',
      media_type: media_type?.trim() || '',
      media_url: media_url?.trim() || '',
      evidence_urls: evidence,
      // IMPORTANT: map submitter_* to DB columns
      wallet: submitter_wallet?.trim() || null,
      email: submitter_email?.trim() || null,
      status: 'pending',
    } as const;

    // Use service-role client so RLS never blocks us
    const { data, error } = await supabaseService
      .from('posts')
      .insert([payload])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, id: data.id });
  } catch (e: any) {
    console.error('[posts] insert error:', e);
    return NextResponse.json(
      { ok: false, error: e?.message || 'Server error' },
      { status: 400 }
    );
  }
}
