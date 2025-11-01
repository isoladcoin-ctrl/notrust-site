// src/app/api/scam-hub/admin/seed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key') || '';
  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  // 5 simple demo rows
  const now = new Date().toISOString();
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    type: 'experience',
    title: `Demo ${i + 1}`,
    summary: `Seeded at ${now}`,
    category: 'demo',
    country: 'XX',
    source_url: null,
    media_type: null,
    media_url: null,
    evidence_urls: [],
    wallet: null,       // keep null since you’re pausing rewards
    email: null,
    status: 'pending',
  }));

  const { error } = await supabaseAdmin.from('posts').insert(rows);
  if (error) {
    console.error('seed error:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inserted: rows.length });
}

// Optional: block GET on this route to avoid confusion
export function GET() {
  return NextResponse.json({ ok: false, error: 'Use POST' }, { status: 405 });
}
