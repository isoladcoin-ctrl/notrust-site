import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// OPTIONAL: use matcher below instead, but keeping this list is fine too
const PROTECTED = [
  '/scam-hub/admin',
  '/api/scam-hub/approve',
  '/api/scam-hub/reject',
];

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Only guard our protected routes
  if (!PROTECTED.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Accept either ?key=... or x-admin-key header
  const urlKey = searchParams.get('key');
  const hdrKey = req.headers.get('x-admin-key');

  const ok =
    (urlKey && urlKey === process.env.ADMIN_KEY) ||
    (hdrKey && hdrKey === process.env.ADMIN_KEY);

  if (ok) return NextResponse.next();

  return new NextResponse('Unauthorized', { status: 401 });
}

// (Optional) Let Next.js run middleware only on these routes:
export const config = {
  matcher: [
    '/scam-hub/admin',
    '/api/scam-hub/approve',
    '/api/scam-hub/reject',
  ],
};
