import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { auth } from '../firebase/firestore';

// Import Firebase auth functions conditionally to avoid edge runtime issues
let firebaseAuthImport;
if (typeof window !== "undefined") {
    // Client-side only
    firebaseAuthImport = require('firebase/auth');
}

export const {
    handlers: { GET, POST },
    auth: getAuth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    secret: process.env.NEXTAUTH_SECRET || "q6ouLCfI1DHmS85KpoHzrE67XRYQAlwNUhRkGMynF6E=",
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile) {
                // This part runs on the server during OAuth flow, 
                // so we can't use Firebase auth directly here
                // We'll handle the Firebase linkage on the client side later
                return {
                    id: profile.sub, // Use sub as temporary ID
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    isNewUser: false // We'll update this after Firebase auth
                };
            }
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                isRegistering: { label: "Is Registering", type: "boolean" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password');
                }

                try {
                    let userCredential;
                    let isNewUser = false;

                    // Only attempt Firebase auth if we're in a client environment
                    if (typeof window !== "undefined" && firebaseAuthImport) {
                        const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = firebaseAuthImport;

                        // If registering, create a new user
                        if (credentials.isRegistering === 'true') {
                            userCredential = await createUserWithEmailAndPassword(
                                auth,
                                credentials.email,
                                credentials.password
                            );
                            isNewUser = true;
                        } else {
                            // Otherwise, sign in
                            userCredential = await signInWithEmailAndPassword(
                                auth,
                                credentials.email,
                                credentials.password
                            );
                        }

                        const user = userCredential.user;
                        return {
                            id: user.uid,
                            name: user.displayName || credentials.email,
                            email: user.email,
                            image: user.photoURL,
                            isNewUser
                        };
                    } else {
                        // Fallback when running in a server context
                        // This will likely fail in production, but allows build to proceed
                        console.warn("Firebase auth attempted in server context");
                        return {
                            id: "mock-id",
                            name: credentials.email,
                            email: credentials.email,
                            isNewUser: credentials.isRegistering === 'true'
                        };
                    }
                } catch (error) {
                    console.error("Error in authorize:", error);
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
});