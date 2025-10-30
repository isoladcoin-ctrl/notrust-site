// src/app/roadmap/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import HeroBanner from "../../components/HeroBanner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { PHASES } from "../../lib/roadmapdata";

type CompletedMap = Record<string, boolean>;

export default function RoadmapPage() {
  const [completed, setCompleted] = useState<CompletedMap>({});
  const [loading, setLoading] = useState(true);

  // 👇 NEW: compute admin only after the component mounts on the client
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get("admin") === "1");
  }, []);

  // Admin token persisted in this browser session
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    const saved = sessionStorage.getItem("nt_admin_token") || "";
    setAdminToken(saved);
  }, []);
  const saveToken = (t: string) => {
    setAdminToken(t);
    sessionStorage.setItem("nt_admin_token", t);
  };

  // Load current status
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/roadmap", { cache: "no-store" });
        const data = await res.json();
        setCompleted(data?.completed || {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function toggle(id: string, next: boolean) {
    if (!isAdmin) return;
    if (!adminToken) {
      alert("Enter ADMIN_TOKEN to update milestones.");
      return;
    }
    const res = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": adminToken },
      body: JSON.stringify({ id, completed: next }),
    });
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      alert(`Update failed: ${msg?.error || res.statusText}`);
      return;
    }
    const data = await res.json();
    setCompleted(data?.completed || {});
  }

  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <HeroBanner
        title="NOTRUST Roadmap"
        subtitle="Clear milestones. Ruthless execution."
        ctaText="Follow on X"
        onCtaClick={() => window.open("https://twitter.com/NotrustCoin", "_blank")}
        imageUrl="/media/hero-roadmap.jpg"
        allowUpload={false}
      />

      {/* Admin controls – rendered only after mount to avoid hydration mismatch */}
      {isAdmin && (
        <Card className="rounded-2xl">
          <CardHeader><CardTitle>Admin Controls</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="text-zinc-400">ADMIN_TOKEN</label>
              <input
                type="password"
                className="w-full sm:w-80 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2"
                placeholder="Enter admin token…"
                value={adminToken}
                onChange={(e) => saveToken(e.target.value)}
              />
            </div>
            <p className="text-xs text-zinc-500">
              You’re in admin mode because the URL contains <code>?admin=1</code>.
            </p>
          </CardContent>
        </Card>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PHASES.map((phase) => (
          <Card key={phase.title} className="rounded-2xl">
            <CardHeader><CardTitle>{phase.title}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {loading && <div className="text-sm text-zinc-400">Loading status…</div>}
              {phase.steps.map((s) => {
                const done = !!completed[s.id];
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => (isAdmin ? toggle(s.id, !done) : undefined)}
                    className={`w-full text-left rounded-xl border p-3 ${
                      isAdmin ? "hover:bg-zinc-900/60 cursor-pointer" : ""
                    } border-zinc-800 bg-zinc-900/40`}
                    aria-pressed={done}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{s.icon ?? "•"}</span>
                        <span className="font-medium">{s.title}</span>
                      </div>
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-zinc-600 shrink-0" />
                      )}
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">Objective: {s.objective}</div>
                    <div className="mt-1 text-sm text-zinc-300">{s.action}</div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
