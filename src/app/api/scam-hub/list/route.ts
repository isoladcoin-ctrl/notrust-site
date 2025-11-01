// src/app/api/scam-hub/admin/list/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key') || '';
  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, title, summary, status, wallet, rewarded_at, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('list error:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, items: data });
}
