import ContactForm from '@/components/contact/ContactForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Contact Us - Fashion Recommender',
    description: 'Get in touch with our team for any questions or feedback about our fashion recommendations',
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h1 className="mb-4">Contact Us</h1>
                        <p className="lead mb-4">
                            Have questions about our fashion recommendations? Want to provide feedback?
                            We'd love to hear from you!
                        </p>

                        <div className="mb-4">
                            <h3>Our Mission</h3>
                            <p>
                                At Fashion Recommender, we're committed to helping you find eco-friendly,
                                stylish clothing that matches your unique preferences and body type.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3>Connect With Us</h3>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="bi bi-envelope me-2"></i>
                                    <span>support@fashionrecommender.com</span>
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-telephone me-2"></i>
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li>
                                    <i className="bi bi-geo-alt me-2"></i>
                                    <span>123 Fashion Street, Style City, SC 12345</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Send Us a Message</h2>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}