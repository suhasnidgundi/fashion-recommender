import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    getIdToken
} from 'firebase/auth';
import { auth } from './firebase';

// Maximum token age before forcing a refresh (45 minutes in milliseconds)
const MAX_TOKEN_AGE = 45 * 60 * 1000;

// Track the last token refresh time
let lastTokenRefresh = 0;
let cachedToken = null;

// Get the current user's Firebase token with automatic refresh handling
export async function getFirebaseToken(forceRefresh = false) {
    const user = auth.currentUser;
    if (!user) {
        return null;
    }

    const now = Date.now();

    // Check if we need to refresh the token
    const shouldRefresh = forceRefresh ||
        !cachedToken ||
        (now - lastTokenRefresh > MAX_TOKEN_AGE);

    try {
        if (shouldRefresh) {
            // Force token refresh from Firebase
            const token = await getIdToken(user, true);
            cachedToken = token;
            lastTokenRefresh = now;
            return token;
        } else {
            // Use cached token if it's still valid
            return cachedToken;
        }
    } catch (error) {
        console.error('Error getting Firebase token:', error);
        // Clear cache on error
        cachedToken = null;
        lastTokenRefresh = 0;
        return null;
    }
}

// Google Auth helper
export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // Get user details
        const user = result.user;
        const token = await getIdToken(user);

        // Update token cache
        cachedToken = token;
        lastTokenRefresh = Date.now();

        return {
            user,
            token,
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
        const token = await getIdToken(result.user);

        // Update token cache
        cachedToken = token;
        lastTokenRefresh = Date.now();

        return {
            user: result.user,
            token,
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
        const token = await getIdToken(result.user);

        // Update token cache
        cachedToken = token;
        lastTokenRefresh = Date.now();

        return {
            user: result.user,
            token,
            isNewUser: true
        };
    } catch (error) {
        console.error("Error registering with email:", error);
        throw error;
    }
}

export async function signOut() {
    try {
        await firebaseSignOut(auth);
        // Clear token cache on sign out
        cachedToken = null;
        lastTokenRefresh = 0;
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}

// Create secure API client that automatically attaches the token
export async function secureApiClient() {
    const token = await getFirebaseToken();

    return {
        fetch: async (url, options = {}) => {
            // Get the latest token before each request
            const currentToken = await getFirebaseToken();

            const headers = {
                ...options.headers,
                'Authorization': `Bearer ${currentToken}`
            };

            return fetch(url, {
                ...options,
                headers
            });
        }
    };
}