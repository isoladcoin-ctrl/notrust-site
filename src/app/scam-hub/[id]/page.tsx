// src/app/scam-hub/[id]/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabaseServer } from '@/supabase';
import Link from 'next/link';

type Props = { params: { id: string } };

export default async function ScamDetailPage({ params }: Props) {
  const sb = supabaseServer();                        // create client here (not top-level)
  const { data, error } = await sb
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    // Render a friendly 404
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">Post not found</h1>
        <p className="text-gray-400 mb-6">The post you’re looking for doesn’t exist.</p>
        <Link href="/scam-hub" className="text-emerald-400 underline">← Back to Scam Hub</Link>
      </main>
    );
  }

  // simple paragraph formatting if your content has line breaks
  const paragraphs = String(data.summary ?? '')
    .split(/\n{2,}|(?:\r?\n)/)
    .filter(Boolean);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/scam-hub" className="text-emerald-400 underline">← Back to Scam Hub</Link>
      <h1 className="text-3xl font-bold mt-4 mb-3">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{new Date(data.created_at).toISOString()}</p>
      <article className="prose prose-invert">
        {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>{data.summary}</p>}
      </article>
    </main>
  );
}
