// src/components/auth/LoginForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import AuthSocial from './AuthSocial';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const result = await signIn('credentials', {
                email,
                password,
                isRegistering: 'false',
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
                return;
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            setError(error.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">Login</h3>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="email">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <button
                                        className="btn btn-primary w-100"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer text-center py-3">
                            <div className="small mb-3">
                                <Link href="/register" className="text-decoration-none">
                                    Need an account? Sign up!
                                </Link>
                            </div>

                            <AuthSocial />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}