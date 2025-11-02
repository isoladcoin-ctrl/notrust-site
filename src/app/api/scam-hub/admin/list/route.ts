// src/app/api/scam-hub/list/route.ts
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Submission = {
  id: string;
  title: string;
  address?: string;
  url?: string;
  createdAt: number;
  status?: "pending" | "approved" | "rejected" | "featured";
};

function bearerFrom(req: Request) {
  const h = req.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}

export async function GET(req: Request) {
  const token = bearerFrom(req);
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || token !== adminKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await kv.lrange<string>("scamhub:submissions", 0, -1);
    const items = (raw ?? [])
      .map(s => { try { return JSON.parse(s) as Submission; } catch { return null; } })
      .filter(Boolean)
      .sort((a, b) => (b!.createdAt ?? 0) - (a!.createdAt ?? 0));

    return NextResponse.json({ ok: true, items }, { status: 200 });
  } catch (err) {
    console.error("KV list error:", err);
    return NextResponse.json({ ok: true, items: [] }, { status: 200 });
  }
}

export const runtime = "nodejs";
