// src/app/scam-hub/admin/page.tsx
// Server Component (no 'use client')
// Minimal, stable rendering with no hydration mismatches.

export const dynamic = 'force-dynamic';

type AdminSearch = { key?: string };

type Post = {
  id: string;
  created_at?: string | null;
  title?: string | null;
  summary?: string | null;
  status?: string | null;          // e.g. 'pending' | 'approved' | 'rewarded'
  wallet?: string | null;
  rewarded_at?: string | null;
};

async function fetchAdminList(baseUrl: string, key: string) {
  const url = `${baseUrl}/api/scam-hub/admin/list?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, { cache: 'no-store' });
  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // ignore JSON parse issues; we'll surface a generic error
  }

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || res.statusText || 'Request failed';
    throw new Error(msg);
  }

  return Array.isArray(data?.items) ? (data.items as Post[]) : [];
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: AdminSearch;
}) {
  const key = (searchParams?.key ?? '').toString();
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
    'http://localhost:3000';

  let posts: Post[] = [];
  let loadError: string | null = null;

  if (key) {
    try {
      posts = await fetchAdminList(base, key);
    } catch (e: any) {
      loadError = e?.message || 'Request failed';
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Scam Hub Admin (NEW)</h1>

      <p className="text-sm text-gray-400 mb-4">
        Manage submissions. Your key is required for all actions.
        {key ? (
          <span className="ml-2 inline-block rounded bg-emerald-900/30 text-emerald-300 px-2 py-0.5 align-middle">
            key OK
          </span>
        ) : (
          <span className="ml-2 inline-block rounded bg-red-900/30 text-red-300 px-2 py-0.5 align-middle">
            no key
          </span>
        )}
      </p>

      {!key ? (
        <div className="rounded border border-red-500/40 bg-red-900/20 text-red-200 px-3 py-2 mb-6">
          Add <code>?key=YOUR_ADMIN_KEY</code> to the URL to view items.
        </div>
      ) : loadError ? (
        <div className="rounded border border-red-500/40 bg-red-900/20 text-red-200 px-3 py-2 mb-6">
          {loadError}
        </div>
      ) : null}

      <section className="rounded-xl border border-white/10">
        <div className="px-4 py-3 border-b border-white/10">
          <h2 className="font-medium">Submissions</h2>
          <p className="text-xs text-gray-400">
            {posts.length === 0 ? 'No items.' : `${posts.length} item(s)`}
          </p>
        </div>

        <div className="divide-y divide-white/10">
          {posts.map((p) => (
            <div key={p.id} className="p-4">
              <div className="text-xs text-gray-400 mb-1">
                {p.created_at || '—'}
              </div>
              <div className="font-semibold">{p.title || 'Untitled'}</div>
              {p.summary ? (
                <div className="text-sm text-gray-300 mt-1">{p.summary}</div>
              ) : null}

              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                  <span className="opacity-60">status:</span>
                  <span className="font-medium">{p.status || '—'}</span>
                </span>

                <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                  <span className="opacity-60">wallet:</span>
                  <span className="font-mono">
                    {p.wallet && p.wallet.length > 10
                      ? `${p.wallet.slice(0, 6)}…${p.wallet.slice(-4)}`
                      : p.wallet || '—'}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                  <span className="opacity-60">rewarded_at:</span>
                  <span className="font-mono">{p.rewarded_at || '—'}</span>
                </span>
              </div>
            </div>
          ))}

          {posts.length === 0 && key && !loadError ? (
            <div className="p-4 text-sm text-gray-400">No submissions yet.</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
