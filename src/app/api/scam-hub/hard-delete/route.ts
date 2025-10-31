import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { deleteItem, getItem } from "@/lib/kv";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const existing = await getItem(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteItem(id);
  return NextResponse.json({ ok: true });
}
