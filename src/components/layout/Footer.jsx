import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-light py-5 mt-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center mb-2">
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
                            <span className="fw-bold fs-5">Fashion Recommender</span>
                        </div>
                        <p className="text-muted">
                            Personalized, eco-friendly fashion recommendations powered by AI.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/" className="text-decoration-none text-muted">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/about" className="text-decoration-none text-muted">
                                    About
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/contact" className="text-decoration-none text-muted">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h5 className="mb-3">Legal</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/privacy" className="text-decoration-none text-muted">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/terms" className="text-decoration-none text-muted">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h5 className="mb-3">Connect</h5>
                        <div className="d-flex gap-3">
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                                </svg>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-top mt-4 pt-4 text-center">
                    <p className="text-muted mb-0">
                        © {currentYear} Fashion Recommender. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}