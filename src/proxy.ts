import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function proxy(request: NextRequest) {
  const protectedRoutes = ['/catalog', '/profile', '/bookmarks'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  const token = request.cookies.get('session')?.value;
  

  
  if (!token) {

    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.next();
  } catch (err : any) {
    
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