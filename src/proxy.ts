import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function proxy(request: NextRequest) {
  const protectedRoutes = ['/catalog', '/profile', '/bookmarks', '/signin', '/signup'];

  const credentialsPages = ['/signin', '/signup'];

  let redirectSignin = credentialsPages.some(route =>  
    request.nextUrl.pathname.startsWith(route)
  );
  
  const isProtectedRoute = protectedRoutes.some(route =>  
    {  
      return request.nextUrl.pathname.startsWith(route);
    }
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  } 
  

  const token = request.cookies.get('session')?.value;
  
  
  if (!token) {
    if (!redirectSignin)
      return NextResponse.redirect(new URL('/signin', request.url));
      
  } else {

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  
      if (token) {
        if (redirectSignin) {
          return NextResponse.redirect(new URL('/catalog', request.url));
        }
      
      }
      return NextResponse.next();
    } catch (err : any) {
      
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }
  
}

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/catalog/manga/new',
    '/profile/:path*',
    '/bookmarks/:path*'
  ],
};