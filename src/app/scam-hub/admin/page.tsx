// src/app/scam-hub/admin/page.tsx
import { headers } from 'next/headers';
import AdminActions from './AdminActions';

export const dynamic = 'force-dynamic';

type Post = {
  id: string;
  title: string | null;
  summary: string | null;
  status: string | null;
  wallet: string | null;
  rewarded_at: string | null;
  created_at: string;
};

// Build a base URL that works locally and on Vercel/custom domain
function getBaseUrl(h: Headers) {
  // Prefer explicit env if set
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) return envUrl.replace(/\/$/, '');

  const forwardedProto = h.get('x-forwarded-proto') || 'http';
  const forwardedHost = h.get('x-forwarded-host');
  const host = forwardedHost || h.get('host') || 'localhost:3000';
  return `${forwardedProto}://${host}`;
}

export default async function AdminPage(props: {
  // Next.js 15 “sync dynamic APIs” change: searchParams is async
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await props.searchParams) || {};
  const key = typeof sp.key === 'string' ? sp.key : '';

  const h = await headers();
  const base = getBaseUrl(h);

  let items: Post[] = [];
  let errorMsg: string | null = null;

  try {
    const url = `${base}/api/scam-hub/admin/list?key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || `List request failed (${res.status})`);
    }
    const data = (await res.json()) as { ok: boolean; items?: Post[]; error?: string };
    if (!data.ok) throw new Error(data.error || 'List request failed');
    items = data.items || [];
  } catch (e: any) {
    errorMsg = e?.message || 'fetch failed';
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Scam Hub Admin (NEW)</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage submissions. Your key is required for all actions.{' '}
          <span className="ml-2 inline-block rounded bg-emerald-700/30 text-emerald-300 px-2 py-0.5 text-xs">
            key OK
          </span>
        </p>

        {/* Controls */}
        <div className="mt-4 flex items-center gap-3">
          <a
            href={`/scam-hub/admin?key=${encodeURIComponent(key)}`}
            className="px-3 py-2 rounded border border-white/20 hover:bg-white/5"
          >
            Reload
          </a>
          <a
            href={`/api/scam-hub/admin/seed?key=${encodeURIComponent(key)}`}
            className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Seed 5 demo items
          </a>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mt-4 rounded border border-red-500/40 bg-red-900/30 text-red-200 px-3 py-2">
            {errorMsg}
          </div>
        )}

        {/* List */}
        <section className="mt-6">
          <div className="text-sm text-gray-400 mb-2">
            Submissions <span className="text-gray-300">{items.length} item(s)</span>
          </div>

          {items.length === 0 ? (
            <div className="rounded border border-white/10 p-6 text-gray-400">
              No items. Seed or submit from the public form.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((p) => (
                <article
                  key={p.id}
                  className="rounded border border-white/15 p-4"
                >
                  <div className="text-xs text-gray-400">{p.created_at}</div>
                  <h3 className="mt-1 font-semibold">{p.title ?? 'Untitled'}</h3>
                  {p.summary && (
                    <p className="mt-1 text-gray-200 whitespace-pre-wrap">{p.summary}</p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-white/10">
                      status: {p.status ?? 'pending'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-white/10">
                      wallet: {p.wallet ?? '–'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-white/10">
                      rewarded_at: {p.rewarded_at ?? '–'}
                    </span>
                  </div>

                  {/* Actions (Approve button) */}
                  <AdminActions postId={p.id} adminKey={key} status={p.status} />
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
