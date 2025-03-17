import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth/auth';

export async function middleware(request) {
    const auth = await getAuth();
    const { pathname } = request.nextUrl;

    // Public routes
    const publicRoutes = ['/login', '/register', '/api/auth', "/contact", "term", "privacy", "about", "/"];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Auth checking
    if (!auth && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect users who haven't completed profile setup
    if (auth?.user?.isNewUser && pathname !== '/profile-setup' && !isPublicRoute) {
        return NextResponse.redirect(new URL('/profile-setup', request.url));
    }

    // Redirect authenticated users away from login/register pages
    if (auth && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
    ],
};