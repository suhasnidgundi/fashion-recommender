import Link from 'next/link';
import { LogIn, Lock } from 'lucide-react';

export default function LoginPrompt({ redirectPath = '/' }) {
    return (
        <div className="card shadow-sm border-0 p-4 text-center">
            <div className="py-4">
                <div className="rounded-circle bg-light d-inline-flex p-3 mb-3">
                    <Lock size={32} className="text-primary" />
                </div>
                <h2 className="h4 mb-3">Sign in to continue</h2>
                <p className="text-muted mb-4">
                    You need to be logged in to get personalized fashion recommendations.
                </p>
                <Link
                    href={`/login?redirect=${encodeURIComponent(redirectPath)}`}
                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                >
                    <LogIn size={18} />
                    <span>Sign in</span>
                </Link>
            </div>
        </div>
    );
}