// src/app/scam-hub/admin/page.tsx
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

type Post = {
  id: string;
  title: string | null;
  summary: string | null;
  status: 'pending' | 'approved' | 'rewarded' | string;
  wallet: string | null;
  rewarded_at: string | null;
  created_at: string;
};

function adminSb() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const key = (searchParams?.key as string) ?? '';
  if (!key || key !== process.env.ADMIN_KEY) {
    // Extra safety even if middleware is removed
    notFound();
  }

  const sb = adminSb();

  const { data: posts, error } = await sb
    .from('posts')
    .select('id,title,summary,status,wallet,rewarded_at,created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Admin – Pending Posts</h1>
        <p className="text-red-600">Failed to load posts: {error.message}</p>
      </main>
    );
  }

  const approveAction = async (formData: FormData) => {
    'use server';
    const formKey = (formData.get('key') as string) ?? '';
    const postId = (formData.get('postId') as string) ?? '';

    if (!formKey || formKey !== process.env.ADMIN_KEY) return;
    if (!postId) return;

    const sb = adminSb();
    await sb.from('posts').update({ status: 'approved' }).eq('id', postId);
    revalidatePath('/scam-hub/admin'); // refresh this page
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Admin – Pending Posts</h1>
      <p className="text-sm text-gray-500 mb-6">
        Rewards are <span className="font-semibold">temporarily disabled</span>. You can still approve posts.
      </p>

      {!posts || posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p: Post) => {
            const created = new Date(p.created_at).toISOString();
            const isApproved = p.status === 'approved';
            const isRewarded = !!p.rewarded_at || p.status === 'rewarded';

            return (
              <div
                key={p.id}
                className="rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-4"
              >
                <div className="text-xs text-gray-500 mb-1">{created}</div>
                <div className="font-semibold mb-1">{p.title ?? '(no title)'}</div>
                {p.summary && <div className="text-sm text-gray-600 mb-3">{p.summary}</div>}

                <div className="flex items-center gap-2 mb-3">
                  {isApproved && (
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                      Approved
                    </span>
                  )}
                  {isRewarded && (
                    <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                      Rewarded
                    </span>
                  )}
                  {p.wallet && (
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                      {p.wallet.slice(0, 6)}…{p.wallet.slice(-4)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Approve (server action) */}
                  <form action={approveAction}>
                    <input type="hidden" name="key" value={key} />
                    <input type="hidden" name="postId" value={p.id} />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                      disabled={isApproved || isRewarded}
                    >
                      Approve
                    </button>
                  </form>

                  {/* Reward disabled */}
                  <button
                    type="button"
                    disabled
                    title="Rewards are temporarily disabled"
                    className="px-3 py-2 rounded-lg bg-purple-400 text-white opacity-60 cursor-not-allowed"
                  >
                    Send Reward (disabled)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
