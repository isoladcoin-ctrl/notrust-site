// src/app/scam-hub/page.tsx
import { supabaseServer } from '@/supabase';
import Link from 'next/link';

// Keep this small Post type to avoid "any"
type Post = {
  id: string;
  title: string;
  summary: string | null;
  status: 'pending' | 'approved' | 'rewarded';
  created_at: string;
};

export default async function ScamHubPage() {
  const sb = supabaseServer();

  // Don't capture `error` if you don't use it
  const { data: posts } = await sb
    .from('posts')
    .select('id, title, summary, status, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (!posts || posts.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Scam Hub</h1>
        <p className="text-gray-500">
          No posts yet. Submit one on the{' '}
          <Link className="underline" href="/scam-hub/submit">
            “Share a Scam”
          </Link>{' '}
          page.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Scam Hub</h1>
      <p className="text-gray-500 mb-6">
        Curated scam alerts worldwide + real user experiences.
      </p>

      <div className="space-y-4">
        {posts.map((p: Post) => (
          <article key={p.id} className="rounded-xl border p-4">
            <div className="text-xs text-gray-400 mb-2">
              {new Date(p.created_at).toISOString()}
            </div>
            <h2 className="font-semibold">{p.title}</h2>
            {p.summary && <p className="text-sm text-gray-600">{p.summary}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
