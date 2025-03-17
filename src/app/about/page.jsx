import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'About Us - Fashion Recommender',
    description: 'Learn about our mission to make sustainable fashion accessible through AI-powered recommendations',
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10 text-center">
                        <h1 className="display-4 mb-4">About Fashion Recommender</h1>
                        <p className="lead mb-4">
                            Making sustainable fashion accessible with AI-powered recommendations tailored to your unique style
                        </p>
                        <div className="d-flex justify-content-center">
                            <hr className="w-25" />
                        </div>
                    </div>
                </div>

                <div className="row align-items-center mb-5">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="position-relative rounded overflow-hidden" style={{ height: '400px' }}>
                            <Image
                                src="/fashion_collage.svg"
                                alt="Fashion Collage"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2 className="mb-4">Our Story</h2>
                        <p className="mb-3">
                            Fashion Recommender was born from a simple observation: finding clothes that match your style, fit well, and align with your values shouldn't be so hard.
                        </p>
                        <p className="mb-3">
                            Founded in 2024, we set out to build an AI-powered platform that understands your unique style preferences, body measurements, and values to recommend fashion items that you'll truly love and wear for years to come.
                        </p>
                        <p>
                            By focusing on eco-friendly options and supporting ethical brands, we're helping shoppers make conscious choices without sacrificing style or spending hours researching.
                        </p>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Our Mission</h2>
                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <div className="text-center mb-3">
                                            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-check text-primary" viewBox="0 0 16 16">
                                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                                </svg>
                                            </div>
                                            <h3 className="h5">Personalization</h3>
                                            <p>Deliver truly personalized recommendations that consider your unique style, fit, and preferences</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="text-center mb-3">
                                            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-tree text-primary" viewBox="0 0 16 16">
                                                    <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507" />
                                                </svg>
                                            </div>
                                            <h3 className="h5">Sustainability</h3>
                                            <p>Promote eco-friendly and ethically produced fashion to make sustainable choices easier</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="text-center mb-3">
                                            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-stars text-primary" viewBox="0 0 16 16">
                                                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                                                </svg>
                                            </div>
                                            <h3 className="h5">Innovation</h3>
                                            <p>Continuously improve our AI algorithms to better understand fashion and individual style</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
                        <div className="position-relative rounded overflow-hidden" style={{ height: '400px' }}>
                            <Image
                                src="/about_fashion_recommender.webp"
                                alt="Our Technology"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 order-lg-1">
                        <h2 className="mb-4">Our Technology</h2>
                        <p className="mb-3">
                            Fashion Recommender combines the latest advances in AI and vector search with fashion domain expertise to deliver personalized recommendations.
                        </p>
                        <p className="mb-3">
                            Our system analyzes thousands of clothing items, understanding attributes like style, material, fit, and sustainability credentials. We then match these with your preferences and body measurements for truly personalized recommendations.
                        </p>
                        <p>
                            Unlike most recommendation engines that simply push what's trending or popular, we focus on finding items that are right for <em>you</em> - items you'll love and wear for years.
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10">
                        <div className="card shadow-sm bg-light">
                            <div className="card-body text-center py-5">
                                <h2 className="mb-4">Join Our Community</h2>
                                <p className="lead mb-4">
                                    Ready to discover fashion that matches your style and values?
                                </p>
                                <Link href="/register" className="btn btn-primary btn-lg rounded-pill px-5">
                                    Create Free Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-4">Frequently Asked Questions</h2>
                        <div className="accordion" id="faqAccordion">
                            <div className="accordion-item">
                                <h3 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        How does Fashion Recommender work?
                                    </button>
                                </h3>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        We use AI to analyze your style preferences, body measurements, and values. Our system then searches through thousands of clothing items to find the perfect matches for you. As you interact with recommendations, our system learns and improves over time.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h3 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Is Fashion Recommender free to use?
                                    </button>
                                </h3>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Yes! Fashion Recommender is completely free for users. We may earn commissions from retailers when you purchase through our links, but this never affects our recommendations or prices you pay.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h3 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        How do you determine if a brand is sustainable?
                                    </button>
                                </h3>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        We evaluate brands based on multiple factors including materials used, production practices, labor conditions, and environmental impact. We look for certifications like Fair Trade, GOTS, and B Corp, among others. We continually update our information as brands evolve their practices.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h3 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Can I shop directly through Fashion Recommender?
                                    </button>
                                </h3>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Currently, we link you directly to retailer websites to complete your purchase. We're working on integrating direct checkout functionality in the future to make the shopping experience even smoother.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}