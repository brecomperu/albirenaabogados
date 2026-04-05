import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limit map (will reset on server restart)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 100; // requests per window
const WINDOW = 15 * 60 * 1000; // 15 minutes

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || 'localhost:3000';

  // TEMP DISABLE SUBDOMAIN ROUTING TO ALLOW DIRECT ACCESS
  /*
  const host = request.headers.get('host') || '';
  const isSubdomain = host.startsWith('admin.') || url.hostname.startsWith('admin.');

  if (!isSubdomain && url.pathname.startsWith('/admin')) {
    // Blocked subdomain path on root
  }
  */

  // Rate Limiting logic (only for API)
  if (url.pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const userData = rateLimit.get(ip) || { count: 0, lastReset: now };
    if (now - userData.lastReset > WINDOW) {
      userData.count = 0;
      userData.lastReset = now;
    }
    userData.count++;
    rateLimit.set(ip, userData);

    if (userData.count > LIMIT) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/:path*',
  ],
};
