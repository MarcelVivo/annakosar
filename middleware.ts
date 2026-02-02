import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase-middleware';

export async function middleware(req: NextRequest) {
  const supabase = createSupabaseMiddlewareClient(req);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ['/book', '/dashboard'];

  if (protectedRoutes.some((p) => pathname.startsWith(p)) && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/book', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/book/:path*', '/dashboard/:path*', '/login'],
};
