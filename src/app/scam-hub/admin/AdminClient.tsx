// src/app/scam-hub/admin/AdminClient.tsx
"use client";
import { useEffect, useMemo, useState } from "react";

export default function AdminClient() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // read ?key=... from the URL
  const key = useMemo(() => new URLSearchParams(window.location.search).get("key") || "", []);

  async function load() {
    setError(null);
    try {
      const res = await fetch("/api/scam-hub/list", {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      if (!res.ok) {
        setError(`HTTP ${res.status}: ${await res.text()}`);
        return;
      }
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: any) {
      setError(e?.message || "fetch failed");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-3">
      {key ? <span className="px-2 py-1 rounded bg-green-900/30">key OK</span>
           : <span className="px-2 py-1 rounded bg-red-900/30">no key</span>}
      {error && <div className="rounded bg-red-900/30 p-3">{error}</div>}
      <div className="rounded border border-zinc-800 p-3">
        <b>Submissions</b>
        <pre className="text-xs mt-2">{JSON.stringify(items, null, 2)}</pre>
      </div>
      <button onClick={load} className="px-3 py-2 rounded bg-zinc-800">Reload</button>
    </div>
  );
}
