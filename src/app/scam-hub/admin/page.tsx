// src/app/scam-hub/admin/page.tsx
export const dynamic = 'force-dynamic';

function computeBaseURL(): string {
  // 1) read env and trim
  let raw = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();

  // 2) if someone pasted comments or extra words, keep only the first token
  if (raw.includes(' ')) raw = raw.split(/\s+/)[0];

  // 3) remove trailing slash
  if (raw.endsWith('/')) raw = raw.slice(0, -1);

  // 4) fallback to Vercel URL or localhost
  if (!raw) {
    raw = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  }

  // 5) validate; if invalid, hard fallback to localhost
  try {
    // throws if invalid
    new URL(raw);
    return raw;
  } catch {
    return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  }
}

export default async function AdminPage(props: any) {
  // Next 15: searchParams is async
  const sp = (await props.searchParams) || {};
  const key = typeof sp.key === 'string' ? sp.key : '';

  const base = computeBaseURL();

  let items: any[] = [];
  let errorMsg: string | null = null;

  try {
    const url = `${base}/api/scam-hub/admin/list?key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { cache: 'no-store', next: { revalidate: 0 } });
    if (!res.ok) {
      errorMsg = `fetch failed (${res.status})`;
    } else {
      const json = await res.json();
      if (json?.ok) items = json.items ?? [];
      else errorMsg = json?.error ?? 'server error';
    }
  } catch {
    errorMsg = `Failed to fetch from ${base}`;
  }

  const Badge = ({ children, tone = 'muted' }: { children: any; tone?: 'muted'|'ok'|'warn' }) => {
    const cls =
      tone === 'ok'
        ? 'bg-emerald-100 text-emerald-700'
        : tone === 'warn'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-gray-200 text-gray-700';
    return <span className={`text-xs px-2 py-1 rounded ${cls}`}>{children}</span>;
  };

  const fmt = (v: any) => (v ?? '—');

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Scam Hub Admin (NEW)</h1>
      <p className="text-sm text-gray-500 mb-4">
        Manage submissions. Your key is required for all actions.
        <span className="ml-2">
          <Badge tone={key ? 'ok' : 'warn'}>{key ? 'key OK' : 'no key'}</Badge>
        </span>
      </p>

      {errorMsg && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 text-red-700 px-3 py-2">
          {errorMsg}
        </div>
      )}

      <section className="rounded border border-gray-200 p-4">
        <div className="font-semibold mb-3">
          Submissions <span className="text-gray-500 text-sm">{items.length} item(s)</span>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No items.</p>
        ) : (
          <div className="space-y-4">
            {items.map((p: any) => (
              <div key={p.id} className="rounded border border-gray-200 p-4">
                <div className="text-xs text-gray-400 mb-1">{p.created_at}</div>
                <div className="font-semibold">{fmt(p.title)}</div>
                <div className="text-sm text-gray-600">{fmt(p.summary)}</div>
                <div className="flex gap-2 mt-2">
                  <Badge>status: {fmt(p.status)}</Badge>
                  <Badge>wallet: {fmt(p.wallet)}</Badge>
                  <Badge>rewarded_at: {fmt(p.rewarded_at)}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
