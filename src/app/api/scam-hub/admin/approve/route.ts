// src/app/api/scam-hub/admin/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ADMIN_KEY = (process.env.ADMIN_KEY ?? '').trim();
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false }
});

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key') || '';
    if (!ADMIN_KEY || key !== ADMIN_KEY) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('posts')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('approve error:', err);
    return NextResponse.json({ ok: false, error: err.message ?? 'Server error' }, { status: 500 });
  }
}
