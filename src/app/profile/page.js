'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import ProfileForm from '@/components/profile/ProfileForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { db } from '@/lib/firebase/firestore';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            if (status === 'authenticated' && session?.user?.id) {
                try {
                    setLoading(true);
                    const docRef = doc(db, 'users', session.user.id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                    } else {
                        setError('Profile not found. Please complete your profile setup.');
                    }
                } catch (err) {
                    console.error('Error fetching profile:', err);
                    setError('Failed to load profile data. Please try again later.');
                } finally {
                    setLoading(false);
                }
            }
        }

        if (status === 'authenticated') {
            fetchProfile();
        } else if (status === 'unauthenticated') {
            redirect('/login?callbackUrl=/profile');
        }
    }, [status, session]);

    const handleSaveProfile = async (updatedProfile) => {
        try {
            const docRef = doc(db, 'users', session.user.id);
            await updateDoc(docRef, updatedProfile);
            setProfile(updatedProfile);
            return { success: true, message: 'Profile updated successfully!' };
        } catch (err) {
            console.error('Error updating profile:', err);
            return { success: false, message: 'Failed to update profile. Please try again.' };
        }
    };

    if (status === 'loading' || loading) {
        return (
            <>
                <Header />
                <div className="container my-5 py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <div className="spinner-border text-primary mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-muted">Loading your profile data...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="container my-5 py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="alert alert-danger shadow-sm" role="alert">
                                <h4 className="alert-heading">Profile Not Found</h4>
                                <p>{error}</p>
                            </div>
                            <div className="d-grid gap-2 col-md-6 mx-auto mt-4">
                                <Link href="/profile-setup" className="btn btn-primary btn-lg">
                                    Complete Profile Setup
                                </Link>
                                <Link href="/" className="btn btn-outline-secondary">
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row mb-4">
                    <div className="col-lg mx-auto">
                        <h1 className="fw-bold">Your Profile</h1>
                        <p className="text-muted lead">
                            Keep your profile updated to receive personalized, eco-friendly fashion recommendations
                            tailored to your style and preferences.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg mx-auto">
                        {profile && (
                            <ProfileForm initialData={profile} onSave={handleSaveProfile} />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}