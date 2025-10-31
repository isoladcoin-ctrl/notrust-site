import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { setItem } from "@/lib/kv";

function uid() { return Math.random().toString(36).slice(2, 10); }

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = Date.now();
  for (let i = 0; i < 5; i++) {
    await setItem({
      id: uid(),
      title: `Suspicious token #${i + 1}`,
      address: `0x${uid()}${uid()}${uid()}`,
      description: "Auto-seeded demo submission.",
      status: "pending",
      createdAt: now - i * 1000 * 60,
    });
  }
  return NextResponse.json({ ok: true });
}
