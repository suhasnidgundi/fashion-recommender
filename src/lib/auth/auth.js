// src/lib/auth.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { signInWithEmail, registerWithEmail } from '@/utils/firebaseClient';

export const {
    handlers: { GET, POST },
    auth: getAuth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            },
            async profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    isNewUser: false
                };
            }
        }),
        CredentialsProvider({
            name: 'Email & Password',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                isRegistering: { label: 'Is Registering', type: 'boolean' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password');
                }

                try {
                    const isRegistering = credentials.isRegistering === 'true';
                    const userCredential = isRegistering
                        ? await registerWithEmail(credentials.email, credentials.password)
                        : await signInWithEmail(credentials.email, credentials.password);

                    const user = userCredential.user;
                    return {
                        id: user.uid,
                        name: user.displayName || user.email,
                        email: user.email,
                        image: user.photoURL,
                        isNewUser: isRegistering
                    };
                } catch (error) {
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uid = user.id;
                token.isNewUser = user.isNewUser;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.uid;
                session.user.isNewUser = token.isNewUser;
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development'
});
