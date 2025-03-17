export const authConfig = {
    pages: {
        signIn: '/login',
        signUp: '/register',
        error: '/login',
        newUser: '/profile-setup',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAuth = nextUrl.pathname.startsWith('/login') ||
                nextUrl.pathname.startsWith('/register');
            const isOnProfileSetup = nextUrl.pathname.startsWith('/profile-setup');

            // If user is logged in but hasn't completed profile setup
            if (isLoggedIn && auth?.user?.isNewUser && !isOnProfileSetup) {
                return Response.redirect(new URL('/profile-setup', nextUrl));
            }

            // If user is on auth pages but already logged in
            if (isLoggedIn && isOnAuth) {
                return Response.redirect(new URL('/', nextUrl));
            }

            // If user is not logged in and trying to access protected routes
            if (!isLoggedIn && !isOnAuth && !nextUrl.pathname.startsWith('/api/auth')) {
                return Response.redirect(new URL('/login', nextUrl));
            }

            return true;
        },
        async jwt({ token, user, account, profile, trigger }) {
            // Initial sign in
            if (account && user) {
                token.accessToken = account.access_token;
                token.uid = user.id;
                token.isNewUser = user.isNewUser;
            }

            // Check if user completed profile setup
            if (trigger === 'update' && token.isNewUser === false) {
                token.isNewUser = false;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.uid;
                session.user.isNewUser = token.isNewUser;
                session.accessToken = token.accessToken;
            }
            return session;
        }
    },
    providers: [],
    debug: process.env.NODE_ENV === 'development',
};