// src/app/api/scam-hub/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { id, key } = await req.json();

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
    }
    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabaseService
      .from('posts')
      .update({ status: 'approved' })
      .eq('id', id)
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[approve] error:', e);
    return NextResponse.json(
      { ok: false, error: e?.message || 'Server error' },
      { status: 500 }
    );
  }
}
