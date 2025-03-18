import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Terms & Conditions - Fashion Recommender',
    description: 'Terms and conditions for using our fashion recommendation service',
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h1 className="mb-4">Terms and Conditions</h1>
                        <p className="lead mb-5">Last updated: March 2025</p>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">1. Agreement to Terms</h2>
                                <p>
                                    By accessing or using the Fashion Recommender service, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of the terms, you may not access the service.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">2. Use of Service</h2>
                                <p>
                                    Fashion Recommender provides a fashion recommendation platform that uses artificial intelligence to suggest clothing and accessories based on user preferences. The service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties, expressed or implied.
                                </p>
                                <p>
                                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">3. Recommendations and Affiliate Links</h2>
                                <p>
                                    The fashion recommendations provided by our service are based on the information you provide and our algorithm&apos;s analysis. We may use affiliate links for recommended products, which means we may receive a commission if you click on a link and make a purchase.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">4. User Content</h2>
                                <p>
                                    You retain ownership of any content you submit to our service, but by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any existing or future media.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">5. Limitation of Liability</h2>
                                <p>
                                    Fashion Recommender shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the service or any content provided on or through the service.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="h4 mb-3">6. Changes to Terms</h2>
                                <p>
                                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="h4 mb-3">7. Contact Us</h2>
                                <p>
                                    If you have any questions about these Terms, please contact us at:
                                </p>
                                <address>
                                    <strong>Fashion Recommender</strong><br />
                                    123 Fashion Street<br />
                                    Style City, SC 12345<br />
                                    <abbr title="Email">E:</abbr> terms@fashionrecommender.com
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