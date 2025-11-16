// src/app/scam-hub/[id]/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseServer } from '@/supabase';

type Post = {
  id: string;
  title: string | null;
  summary: string | null;
  created_at: string;
  status: string | null;
  wallet: string | null;
  rewarded_at: string | null;
};

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const sb = supabaseServer();

  const { data, error } = await sb
    .from('posts')
    .select('id, title, summary, created_at, status, wallet, rewarded_at')
    .eq('id', params.id)
    .maybeSingle();

  if (error || !data) return notFound();

  const p = data as Post;

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/scam-hub" className="text-emerald-400 underline">
        ← Back to Scam Hub
      </Link>

      <h1 className="text-3xl font-bold mt-4">{p.title ?? '(untitled)'}</h1>

      <div className="mt-2 text-sm text-gray-400">
        {new Date(p.created_at).toISOString()}
      </div>

      <div className="mt-6 text-gray-200 whitespace-pre-line">
        {(p.summary ?? '').trim() || '—'}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-white/5">status: {p.status ?? '—'}</span>
        <span className="px-2 py-1 rounded bg-white/5">wallet: {p.wallet ?? '—'}</span>
        <span className="px-2 py-1 rounded bg-white/5">rewarded_at: {p.rewarded_at ?? '—'}</span>
      </div>
    </main>
  );
}
