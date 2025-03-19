import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Use direct values for production, fallback to env vars for development
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBbXwh1383hL8ZrUWM8IhBYhm_zjqUQUq8",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sustainable-fashion-01.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sustainable-fashion-01",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sustainable-fashion-01.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "258745418827",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:258745418827:web:9b215b637854bae637f9ce",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-VEGRH40G6P"
};

// Initialize Firebase
let app;
let analytics;
let auth;
let db;
let storage;

// Safe initialization for server and client
if (typeof window !== "undefined") {
    // Client-side only
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Only initialize analytics on client side
    try {
        const { getAnalytics } = require('firebase/analytics');
        analytics = getAnalytics(app);
    } catch (error) {
        console.log('Analytics not available');
    }
} else {
    // Server-side
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    analytics = null; // No analytics on server side
}

// User Profile Functions
export async function createUserProfile(userId, profileData) {
    try {
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
    try {
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
    try {
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

export async function deleteUserProfile(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { deleted: true }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error deleting user profile:", error);
        throw error;
    }
}

export async function createUserPreference(userId, preferenceData) {
    try {
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

export { db, auth, storage, analytics, app };