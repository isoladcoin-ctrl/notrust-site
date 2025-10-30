// src/app/api/roadmap/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KEY = "roadmap:v1";

// In-memory fallback for local dev when KV isn't configured
const DEV = process.env.VERCEL !== "1";
const mem: { completed: Record<string, boolean> } = { completed: {} };

async function kvGet(): Promise<{ completed: Record<string, boolean> }> {
  try {
    const data = (await kv.get(KEY)) as { completed?: Record<string, boolean> } | null;
    return { completed: data?.completed ?? {} };
  } catch {
    // KV not configured locally — use memory
    return DEV ? mem : { completed: {} };
  }
}

async function kvSet(next: { completed: Record<string, boolean> }) {
  try {
    await kv.set(KEY, next);
  } catch {
    if (DEV) Object.assign(mem, next); // store in memory during dev
  }
}

export async function GET() {
  const data = await kvGet();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const adminHeader = req.headers.get("x-admin-token") ?? "";
  const adminToken = process.env.ADMIN_TOKEN ?? "";
  if (!adminToken || adminHeader !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const id = String(body?.id ?? "");
  const completed = Boolean(body?.completed);

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const current = await kvGet();
  const next = { completed: { ...(current.completed ?? {}), [id]: completed } };
  await kvSet(next);
  return NextResponse.json(next);
}
