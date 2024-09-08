import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard/orders', request.url), 308); //
  }

  try {
    const sessionToken = request.cookies.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const apiUrl = `${request.nextUrl.origin}/api/session?sessionToken=${sessionToken}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error('Ошибка получения сессии:', await res.text());
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const data = await res.json();

    if (!data.session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const userRole = data.session.crm_users?.role;

    if (request.nextUrl.pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/orders', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Ошибка в middleware:', error);
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/(private)/:path*'],
};
