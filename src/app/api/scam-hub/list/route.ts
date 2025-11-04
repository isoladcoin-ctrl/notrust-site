// src/app/api/scam-hub/list/route.ts
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// ---- Types (adjust to your schema if you already have one)
type Submission = {
  id: string;
  title: string;
  address?: string;
  url?: string;
  createdAt: number; // epoch ms
  status?: "pending" | "approved" | "rejected" | "featured";
};

// ---- Helpers
function bearerFrom(req: Request) {
  const h = req.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}

// ---- GET /api/scam-hub/list
export async function GET(req: Request) {
  // 1) Auth
  const token = bearerFrom(req);
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || token !== adminKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // 2) Read from KV (non-fatal if KV missing)
  let items: Submission[] = [];
  try {
    // Recommended key: a LIST where every item is a JSON string
    // Push elsewhere with: await kv.lpush("scamhub:submissions", JSON.stringify(obj))
    const raw = await kv.lrange<string>("scamhub:submissions", 0, -1);
    items = (raw ?? [])
      .map((s) => {
        try { return JSON.parse(s) as Submission; } catch { return null; }
      })
      .filter(Boolean) as Submission[];

    // Sort newest first (optional)
    items.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  } catch (err) {
    // If KV isn’t configured yet, don’t 500; return empty and explain.
    // You can observe details in Vercel function logs.
    console.error("KV list error:", err);
    items = [];
  }

  return NextResponse.json({ ok: true, items }, { status: 200 });
}

// (Optional) Make sure this runs on Node runtime
export const runtime = "nodejs";
