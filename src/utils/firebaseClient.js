// src/utils/firebaseClient.js
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase/firestore';

// Google Auth helper
export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // Get user details
        const user = result.user;
        const credentials = GoogleAuthProvider.credentialFromResult(result);

        return {
            user,
            token: credentials?.accessToken,
            isNewUser: result._tokenResponse?.isNewUser || false
        };
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
}

// Email/Password Auth helpers
export async function signInWithEmail(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return {
            user: result.user,
            isNewUser: false
        };
    } catch (error) {
        console.error("Error signing in with email:", error);
        throw error;
    }
}

export async function registerWithEmail(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return {
            user: result.user,
            isNewUser: true
        };
    } catch (error) {
        console.error("Error registering with email:", error);
        throw error;
    }
}