// src/app/scam-hub/admin/page.tsx
import { supabaseServer } from '@/lib/supabase';
import AdminActions from './AdminActions';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { key?: string };
}) {
  const key = searchParams?.key ?? '';

  if (key !== process.env.ADMIN_KEY) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Admin</h1>
        <p>Unauthorized.</p>
      </main>
    );
  }

  const { data, error } = await supabaseServer
    .from('posts')
    .select('id, title, summary, created_at, status, rewarded_at, wallet')
    .order('created_at', { ascending: false })
    .limit(50);

  const posts = data ?? [];

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin – Pending Posts</h1>

      {posts.map((p) => (
        <div key={p.id} className="rounded-xl border border-zinc-700 p-4">
          <div className="text-xs text-zinc-400">
            {new Date(p.created_at).toISOString()}
          </div>
          <div className="font-semibold">{p.title}</div>
          <p className="text-sm text-zinc-300">{p.summary}</p>

          <div className="mt-2 flex items-center gap-2">
            {p.status === 'approved' && (
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                Approved
              </span>
            )}
            {p.rewarded_at && (
              <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                Rewarded
              </span>
            )}
          </div>

          <div className="mt-3">
            <AdminActions
              postId={p.id}
              adminKey={key}
              wallet={p.wallet}
            />
          </div>
        </div>
      ))}
    </main>
  );
}
