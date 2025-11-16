// src/components/Scanner.tsx  (or scanner.tsx)
"use client";

import React, { useState } from "react";

type ScanResult = {
  input: string;
  riskScore: number; // 0–100
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  flags: string[];
  tips: string[];
};

export default function Scanner() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/mock-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = (await res.json()) as ScanResult;
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Scan failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Mock Scam Scanner
        </h1>
        <p className="text-sm md:text-base text-zinc-300">
          Paste a contract address, token page URL, or Telegram handle. This is
          a <span className="font-semibold">mock scanner</span> for demo
          purposes – it does not replace real research.
        </p>
      </header>

      <form
        onSubmit={handleScan}
        className="space-y-3 border border-zinc-800 rounded-2xl p-4 md:p-5 bg-black/60"
      >
        <label className="block text-sm font-medium text-zinc-200 mb-1">
          Address / URL / Handle
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0x1234... or https://dexscreener.com/... or @randomtoken"
          className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm md:text-base outline-none focus:border-sky-500"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="mt-3 inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 text-sm font-semibold text-black transition-colors"
        >
          {loading ? "Scanning..." : "Run Mock Scan"}
        </button>

        {error && (
          <p className="text-sm text-red-400 mt-2">Scan failed: {error}</p>
        )}
      </form>

      {result && (
        <section className="border border-zinc-800 rounded-2xl p-4 md:p-5 bg-black/70 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Scan Result</h2>
              <p className="text-xs text-zinc-400 break-all mt-1">
                {result.input}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-zinc-400">Mock risk score</div>
              <div className="text-2xl font-bold">
                {result.riskScore}/100
              </div>
              <div
                className={
                  "text-xs font-semibold mt-1 " +
                  (result.riskLevel === "HIGH"
                    ? "text-red-400"
                    : result.riskLevel === "MEDIUM"
                    ? "text-yellow-300"
                    : "text-emerald-400")
                }
              >
                {result.riskLevel} RISK
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">
              Flags
            </h3>
            <ul className="text-sm text-zinc-300 list-disc pl-5 space-y-1">
              {result.flags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">
              Survival Tips
            </h3>
            <ul className="text-sm text-zinc-300 list-disc pl-5 space-y-1">
              {result.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-zinc-500">
            This is a mock scanner for UI & testing. Always do your own
            research before aping into anything.
          </p>
        </section>
      )}
    </div>
  );
}
