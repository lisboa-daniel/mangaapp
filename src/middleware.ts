import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/catalog', '/profile', '/bookmarks'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  const token = request.cookies.get('session')?.value;
  
  console.log('🍪 Token:', token ? 'EXISTS' : 'MISSING');
  
  if (!token) {
    console.log('❌ Redirecting - no token');
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('✅ Token valid:', decoded);
    return NextResponse.next();
  } catch (err : any) {
    console.log('❌ Token invalid:', err.message);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: [
    '/catalog/:path*',
    '/profile/:path*',
    '/bookmarks/:path*'
  ],
};