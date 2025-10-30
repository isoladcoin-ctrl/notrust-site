import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

function safeHostname(u?: string | null) {
  if (!u) return null;
  try {
    const url = new URL(u.startsWith('http') ? u : `https://${u}`);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export async function GET() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from('posts')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // minimal validation
    if (!body?.type || !['experience','curation'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    if (!body?.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const sb = supabaseServer();
    const payload = {
      type: body.type,
      title: body.title,
      summary: body.summary?.slice(0, 600) ?? null,
      category: body.category || null,
      country: body.country || null,
      source_url: body.source_url || null,
      source_domain: safeHostname(body.source_url),
      media_type: body.media_type || null,
      media_url: body.media_url || null,
      evidence_urls: Array.isArray(body.evidence_urls) ? body.evidence_urls : [],
      submitter_wallet: body.submitter_wallet || null,
      submitter_email: body.submitter_email || null,
    };

    const { data, error } = await sb.from('posts').insert(payload).select('*').single();
    if (error) {
      console.log('[posts] insert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ data });
  } catch (e: any) {
    console.log('[posts] unexpected:', e?.message || e);
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
