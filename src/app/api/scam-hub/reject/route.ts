import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getItem, setItem } from "@/lib/kv";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const item = await getItem(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  item.status = "rejected";
  await setItem(item);
  return NextResponse.json({ ok: true, item });
}
