import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('currentUser')?.value;
  console.log('Token from cookies:', token);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

  if (isAuthPage) {
    if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL('/', request.url)); // User is authenticated, redirect from auth page
      } catch (e) {
        // Token is invalid, allow access to auth page
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url)); // User is not authenticated, redirect to login
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next(); // Token is valid, allow access
  } catch (e) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('currentUser'); // Delete invalid token
    return response;
  }
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
  ],
};