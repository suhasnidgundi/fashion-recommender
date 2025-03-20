import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configure Firebase using environment variables only
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase safely
let app;
let db;
let auth;
let storage;
let analytics = null;

// Initialize Firebase only if all required config values are present
const initializeFirebase = () => {
    // Check if we have the minimum required configuration
    const hasRequiredConfig = firebaseConfig.apiKey &&
        firebaseConfig.authDomain &&
        firebaseConfig.projectId;

    if (!hasRequiredConfig) {
        console.error('Firebase configuration is incomplete. Check your environment variables.');
        return false;
    }

    try {
        // Initialize or get the existing app
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

        // Initialize services
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);

        // Only initialize analytics on client side
        if (typeof window !== 'undefined') {
            try {
                const { getAnalytics } = require('firebase/analytics');
                analytics = getAnalytics(app);
            } catch (error) {
                console.log('Analytics not available or blocked');
            }
        }

        return true;
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return false;
    }
};

// Initialize Firebase
const isInitialized = initializeFirebase();

// User Profile Functions - only export if Firebase is properly initialized
export async function createUserProfile(userId, profileData) {
    if (!isInitialized) throw new Error('Firebase is not initialized');

    try {
        const { doc, setDoc } = await import('firebase/firestore');
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            ...profileData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error creating user profile:", error);
        throw error;
    }
}

export async function getUserProfile(userId) {
    if (!isInitialized) throw new Error('Firebase is not initialized');

    try {
        const { doc, getDoc } = await import('firebase/firestore');
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(userId, profileData) {
    if (!isInitialized) throw new Error('Firebase is not initialized');

    try {
        const { doc, setDoc } = await import('firebase/firestore');
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            ...profileData,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

export async function createUserPreference(userId, preferenceData) {
    if (!isInitialized) throw new Error('Firebase is not initialized');

    try {
        const { doc, setDoc } = await import('firebase/firestore');
        const preferenceRef = doc(db, 'preferences', userId);
        await setDoc(preferenceRef, {
            ...preferenceData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error creating user preference:", error);
        throw error;
    }
}

// Export Firebase services only if initialization was successful
export { isInitialized, db, auth, storage, analytics, app };