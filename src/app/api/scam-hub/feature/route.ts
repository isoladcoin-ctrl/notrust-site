import { NextResponse } from "next/server";
import { isScamHubAdmin } from "@/lib/adminAuth";
import { list } from "@/lib/scamStore";

export async function GET(req: any) {
  if (!isScamHubAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: list() });
}
