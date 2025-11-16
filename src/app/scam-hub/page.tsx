// src/app/scam-hub/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { supabaseServer } from "@/supabase";
import AboutMe from "../../components/AboutMe"; // 👈 NEW IMPORT

type Post = {
  id: string;
  title: string | null;
  summary: string | null;
  created_at: string;
  status: string | null;
  wallet: string | null;
  rewarded_at: string | null;
};

export default async function ScamHubPage() {
  const sb = supabaseServer();

  const { data, error } = await sb
    .from("posts")
    .select("id, title, summary, created_at, status, wallet, rewarded_at")
    .order("created_at", { ascending: false });

  // Make *sure* posts is always an array for TS
  const posts: Post[] = Array.isArray(data) ? (data as Post[]) : [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Scam Hub</h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm">
          Failed to load posts.
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-gray-400">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p: Post) => (
            <div key={p.id} className="border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {p.title ?? "(untitled)"}
                </h2>
                <span className="text-xs text-gray-400">
                  {new Date(p.created_at).toISOString()}
                </span>
              </div>

              <p className="text-gray-300 mt-2 whitespace-pre-line line-clamp-6">
                {(p.summary ?? "").trim() || "—"}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-white/5">
                  status: {p.status ?? "—"}
                </span>
                <span className="px-2 py-1 rounded bg-white/5">
                  wallet: {p.wallet ?? "—"}
                </span>
                <span className="px-2 py-1 rounded bg-white/5">
                  rewarded_at: {p.rewarded_at ?? "—"}
                </span>
              </div>

              <div className="mt-3">
                <Link
                  href={`/scam-hub/${p.id}`}
                  className="text-emerald-400 underline"
                >
                  Read full story
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 👇 NEW: About Me + Join Telegram section */}
      <section id="about-notrust" className="mt-10">
  <AboutMe telegramUrl="https://t.me/notrustcode" />
</section>

    </main>
  );
}
