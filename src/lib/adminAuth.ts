// src/lib/adminAuth.ts
import { NextRequest } from "next/server";

export function readAdminKey(req: NextRequest): string {
  const raw =
    req.headers.get("authorization") ??
    req.headers.get("x-admin-key") ??
    "";
  const v = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
  return v.trim();
}

export function isAdmin(req: NextRequest): boolean {
  const provided = readAdminKey(req);
  const expected = (process.env.ADMIN_KEY ?? "").trim();
  return expected.length > 0 && provided === expected;
}
