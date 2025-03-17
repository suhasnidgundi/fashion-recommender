import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo
} from 'firebase/auth';
import { auth } from '../firebase/firestore';

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
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile) {
                // Try to sign in with Firebase using Google provider
                const provider = new GoogleAuthProvider();
                const credential = GoogleAuthProvider.credential(profile.id_token);

                try {
                    const result = await signInWithPopup(auth, provider);
                    const additionalUserInfo = getAdditionalUserInfo(result);

                    return {
                        id: result.user.uid,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        isNewUser: additionalUserInfo?.isNewUser || false
                    };
                } catch (error) {
                    console.error("Error signing in with Google:", error);
                    throw error;
                }
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
                } catch (error) {
                    console.error("Error in authorize:", error);
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
});