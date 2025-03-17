'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    };

    const isActive = (path) => {
        return pathname === path ? 'active' : '';
    };

    return (
        <header className="sticky-top shadow-sm bg-white">
            <nav className="navbar navbar-expand-lg navbar-light py-3">
                <div className="container">
                    <Link href="/" className="navbar-brand d-flex align-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-lightning-charge-fill me-2 text-primary"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                        </svg>
                        <span className="fw-bold">Fashion Recommender</span>
                    </Link>

                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    href="/"
                                    className={`nav-link px-3 ${isActive('/')}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>

                            {session ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            href="/recommendations"
                                            className={`nav-link px-3 ${isActive('/recommendations')}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Recommendations
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href="/profile"
                                            className={`nav-link px-3 ${isActive('/profile')}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <button
                                            className="btn btn-warning rounded-pill px-4"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link
                                        href="/login"
                                        className="btn btn-primary rounded-pill px-4"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In / Register
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}