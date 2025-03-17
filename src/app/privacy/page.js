import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Privacy Policy - Fashion Recommender',
    description: 'Our privacy policy explaining how we handle your personal information',
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h1 className="mb-4">Privacy Policy</h1>
                        <p className="lead mb-5">Last updated: March 2025</p>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">1. Introduction</h2>
                                <p>
                                    At Fashion Recommender, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fashion recommendation service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">2. Information We Collect</h2>
                                <p>We collect information that you provide directly to us, including:</p>
                                <ul>
                                    <li>Personal information (such as name and email address)</li>
                                    <li>Style preferences and fashion interests</li>
                                    <li>Body measurements and sizing information</li>
                                    <li>Budget preferences</li>
                                    <li>Brand preferences</li>
                                    <li>Usage data and interaction with our recommendations</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">3. How We Use Your Information</h2>
                                <p>We use the information we collect to:</p>
                                <ul>
                                    <li>Provide personalized fashion recommendations</li>
                                    <li>Improve our recommendation algorithms</li>
                                    <li>Process and fulfill your requests</li>
                                    <li>Send you updates about our services</li>
                                    <li>Respond to your comments, questions, and requests</li>
                                    <li>Monitor and analyze usage trends</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">4. Sharing Your Information</h2>
                                <p>
                                    We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this Privacy Policy. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">5. Data Security</h2>
                                <p>
                                    We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">6. Your Choices</h2>
                                <p>
                                    You may update, correct, or delete your account information at any time by accessing your profile settings. You may also opt out of receiving promotional communications from us by following the instructions in those communications.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="h4 mb-3">7. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at:
                                </p>
                                <address>
                                    <strong>Fashion Recommender</strong><br />
                                    123 Fashion Street<br />
                                    Style City, SC 12345<br />
                                    <abbr title="Email">E:</abbr> privacy@fashionrecommender.com
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}