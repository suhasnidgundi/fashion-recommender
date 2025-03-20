// src/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Configure paths that don't require authentication
const publicPaths = [
    '/',
    '/login',
    '/register',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/api/auth',
];

// Checks if a path should be accessible without authentication
const isPublic = (path) => {
    return publicPaths.some(publicPath =>
        path === publicPath ||
        path.startsWith(`${publicPath}/`) ||
        path.startsWith(`/_next/`) ||
        path.startsWith(`/favicon`) ||
        path.includes('.') // Static files
    );
};

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Allow access to public paths without authentication
    if (isPublic(pathname)) {
        return NextResponse.next();
    }

    // Get the session token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    // If there's no token, redirect to login
    if (!token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    // Check if the user has completed profile setup
    if (token.isNewUser && !pathname.startsWith('/profile-setup')) {
        return NextResponse.redirect(new URL('/profile-setup', request.url));
    }

    // Continue to the protected route
    return NextResponse.next();
}

// Configure which paths this middleware applies to
export const config = {
    matcher: [
        // Apply to all paths except static files
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};