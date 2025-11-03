// src/app/scam-hub/page.tsx
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

type Post = {
  id: string;
  title: string | null;
  summary: string | null;
  status: string | null;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ScamHubPage() {
  // Only show approved posts publicly
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id,title,summary,status,created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Scam Hub</h1>
        <p className="text-red-400">Failed to load posts: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Scam Hub</h1>
      <p className="text-sm text-gray-400 mb-6">
        Curated scam alerts worldwide + real user experiences.
      </p>

      <div className="space-y-4">
        {(posts ?? []).map((p) => (
          <article key={p.id} className="rounded-xl border border-white/15 p-4">
            <div className="text-xs text-gray-400 mb-2">{p.created_at}</div>
            <h2 className="font-semibold mb-2">{p.title ?? 'Untitled'}</h2>

            {/* Paragraphs fixed */}
            <div className="whitespace-pre-wrap break-words leading-relaxed opacity-90">
              {p.summary || '—'}
            </div>

            <div className="mt-3">
              {/* IMPORTANT: link by id, never “N/A” */}
              <Link
                href={`/scam-hub/${p.id}`}
                className="text-indigo-300 hover:underline text-sm"
              >
                Read full story →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
