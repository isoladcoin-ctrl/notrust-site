// src/app/scam-hub/admin/AdminClient.tsx
"use client";

import { useEffect, useState } from "react";

type ScamItem = any; // TODO: replace with your real type

export default function AdminClient() {
  const [items, setItems] = useState<ScamItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState("");

  async function load(currentKey: string) {
    setError(null);
    try {
      const res = await fetch("/api/scam-hub/list", {
        headers: { Authorization: `Bearer ${currentKey}` },
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

  // Safely read ?key=... only in the browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = new URLSearchParams(window.location.search);
    const keyFromUrl = search.get("key") || "";
    setKey(keyFromUrl);

    if (keyFromUrl) {
      load(keyFromUrl);
    }
  }, []);

  return (
    <div className="space-y-3">
      {key ? (
        <span className="px-2 py-1 rounded bg-green-900/30">key OK</span>
      ) : (
        <span className="px-2 py-1 rounded bg-red-900/30">no key</span>
      )}

      {error && (
        <div className="rounded bg-red-900/30 p-3 text-sm">
          {error}
        </div>
      )}

      <div className="rounded border border-zinc-800 p-3">
        <b>Submissions</b>
        <pre className="text-xs mt-2 overflow-x-auto">
          {JSON.stringify(items, null, 2)}
        </pre>
      </div>

      <button
        onClick={() => key && load(key)}
        className="px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-sm"
      >
        Reload
      </button>
    </div>
  );
}
