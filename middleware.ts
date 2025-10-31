import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url);
  // Only guard the admin page
  if (pathname.startsWith('/scam-hub/admin')) {
    const key = searchParams.get('key') || '';
    const ADMIN_KEY = process.env.ADMIN_KEY || '';
    if (!ADMIN_KEY) {
      // Don’t 404 silently — show a clear error so we can spot misconfig
      return new NextResponse('ADMIN_KEY not set on server', { status: 500 });
    }
    if (key !== ADMIN_KEY) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }
  return NextResponse.next();
}

// Only run on the admin route
export const config = {
  matcher: ['/scam-hub/admin'],
};
