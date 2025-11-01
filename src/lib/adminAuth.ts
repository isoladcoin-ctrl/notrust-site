// src/lib/adminAuth.ts
// @ts-nocheck

// Read "Authorization: Bearer <token>" from any request-like object
function readBearer(req: any): string {
  const h = req?.headers;
  const v = (h?.get?.("authorization") ?? h?.get?.("Authorization") ?? "") as string;
  return v?.startsWith("Bearer ") ? v.slice(7).trim() : "";
}

// Scam Hub admin (uses ADMIN_KEY)
export function isScamHubAdmin(req: any): boolean {
  const token = readBearer(req);
  const expected = (process.env.ADMIN_KEY ?? "").trim();
  return Boolean(expected) && token === expected;
}

// Roadmap/Tokenomics admin (uses ADMIN_TOKEN)
export function isSiteAdmin(req: any): boolean {
  const token = readBearer(req);
  const expected = (process.env.ADMIN_TOKEN ?? "").trim();
  return Boolean(expected) && token === expected;
}

// Debug helper
export function readAdminBearer(req: any): string {
  return readBearer(req);
}
