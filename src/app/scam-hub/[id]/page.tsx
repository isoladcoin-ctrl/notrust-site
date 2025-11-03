// src/app/scam-hub/[id]/page.tsx
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Post = {
  id: string;
  title: string | null;
  summary: string | null;
  status: string | null;
  created_at: string;
  wallet?: string | null;
  rewarded_at?: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('id,title,summary,status,created_at,wallet,rewarded_at')
    .eq('id', params.id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/scam-hub" className="text-sm text-indigo-300 hover:underline">
          ← Back to Scam Hub
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{post.title ?? 'Untitled'}</h1>
      <div className="text-xs text-gray-400 mb-6">
        {post.created_at} · status: {post.status ?? '-'}
      </div>

      {/* Paragraphs fixed */}
      <div className="whitespace-pre-wrap break-words leading-relaxed opacity-90">
        {post.summary || '—'}
      </div>

      <div className="mt-6 text-xs text-gray-400">
        {post.wallet ? <>wallet: {post.wallet}</> : null}
        {post.rewarded_at ? (
          <span className="ml-3">rewarded_at: {post.rewarded_at}</span>
        ) : null}
      </div>
    </main>
  );
}
