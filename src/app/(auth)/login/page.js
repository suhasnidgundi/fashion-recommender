import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
    title: 'Login - Fashion Recommender',
    description: 'Login to your Fashion Recommender account',
};

export default function LoginPage() {
    return (
        <div className="container my-5">
            <LoginForm />
        </div>
    );
}