// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Only protect admin pages & admin APIs
  const needsKey =
    pathname.startsWith('/scam-hub/admin') ||
    pathname.startsWith('/api/scam-hub/admin');

  if (!needsKey) return NextResponse.next();

  const key = url.searchParams.get('key') || req.headers.get('x-admin-key');
  if (key && key === process.env.ADMIN_KEY) return NextResponse.next();

  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
}

export const config = {
  matcher: ['/scam-hub/admin/:path*', '/api/scam-hub/admin/:path*'],
};
