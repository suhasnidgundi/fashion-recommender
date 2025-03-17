import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
    title: 'Register - Fashion Recommender',
    description: 'Create your Fashion Recommender account',
};

export default function RegisterPage() {
    return (
        <div className="container my-5">
            <RegisterForm />
        </div>
    );
}