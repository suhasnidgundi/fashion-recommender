import ProfileSetupForm from '@/components/profile/ProfileSetupForm';

export const metadata = {
    title: 'Profile Setup - Fashion Recommender',
    description: 'Complete your profile to get personalized fashion recommendations',
};

export default function ProfileSetupPage() {
    return (
        <div className="container my-5">
            <ProfileSetupForm />
        </div>
    );
}