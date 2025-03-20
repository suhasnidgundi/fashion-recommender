'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { getFirebaseToken } from '@/lib/firebase/auth-service';

export default function AuthSessionProvider({ children }) {
    const { data: session, update } = useSession();
    const [isInitialized, setIsInitialized] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Set up token refresh on an interval
    useEffect(() => {
        const refreshToken = async () => {
            if (!session || isRefreshing) return;

            try {
                setIsRefreshing(true);
                // Get fresh Firebase token
                const token = await getFirebaseToken();

                if (token && (!session.accessToken || session.accessToken !== token)) {
                    await update({
                        ...session,
                        accessToken: token
                    });
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            } finally {
                setIsRefreshing(false);
            }
        };

        // Initial token check
        refreshToken();

        // Set up regular token refresh (every 30 minutes)
        const refreshInterval = setInterval(refreshToken, 30 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [session, update, isRefreshing]);

    // Listen for Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && session) {
                // Get fresh Firebase token on auth state change
                const token = await getFirebaseToken();

                // Update NextAuth session with Firebase token
                if (token && (!session.accessToken || session.accessToken !== token)) {
                    await update({
                        ...session,
                        accessToken: token
                    });
                }
            }

            setIsInitialized(true);
        });

        return () => unsubscribe();
    }, [session, update]);

    if (!isInitialized) {
        return <div className="d-flex justify-content-center p-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return children;
}