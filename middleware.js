import { auth } from './lib/auth.js';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn  = !!req.auth?.user;
  const role        = req.auth?.user?.role;
  const pathname    = nextUrl.pathname;

  const publicPaths = [
    '/',
    '/auth/signin',
    '/auth/signup',
    '/auth/error',
    '/pricing',
    '/api/auth',
    '/api/webhooks',
    '/_next',
    '/favicon',
  ];

  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  if (!isLoggedIn) {
    const signInUrl = new URL('/auth/signin', nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }

  if (pathname.startsWith('/api/admin') && role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};