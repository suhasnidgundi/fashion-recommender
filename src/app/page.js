'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Leaf, BarChart, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/home/FeatureCard';

export default function Home() {
  const { data: session } = useSession();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: <ShoppingBag size={28} className="text-primary" />,
      title: "Personalized Recommendations",
      description: "Get fashion suggestions tailored specifically to your style preferences, body type, and budget constraints."
    },
    {
      icon: <Leaf size={28} className="text-primary" />,
      title: "Eco-Friendly Focus",
      description: "Discover sustainable brands and garments that reduce environmental impact without compromising on style."
    },
    {
      icon: <BarChart size={28} className="text-primary" />,
      title: "AI-Powered Insights",
      description: "Our advanced algorithms analyze thousands of fashion items to find the perfect matches for your unique preferences."
    },
    {
      icon: <TrendingUp size={28} className="text-primary" />,
      title: "Trend Analysis",
      description: "Stay ahead of the curve with predictions about upcoming fashion trends tailored to your style profile."
    }
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="py-5 py-md-7 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="display-4 fw-bold mb-3">Discover Sustainable Fashion Tailored for You</h1>
              <p className="lead mb-4 text-muted">
                Find clothes that match your style, fit your body perfectly, and align with your values. Our AI helps you look great while supporting sustainable fashion.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {session ? (
                  <Link href="/recommendations" className="btn btn-primary rounded-pill px-4 py-2">
                    Get Recommendations
                  </Link>
                ) : (
                  <Link href="/login" className="btn btn-primary rounded-pill px-4 py-2">
                    Get Started
                  </Link>
                )}
                <Link href="/about" className="btn btn-outline-secondary rounded-pill px-4 py-2">
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="position-relative" style={{ height: '400px' }}>
                <Image
                  src="/fashion_collage.svg"
                  alt="Fashion Collage"
                  fill
                  className="rounded-4 shadow-lg object-fit-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 py-md-7">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="h1 mb-3">Why Choose Our Platform</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              We combine artificial intelligence with sustainable fashion principles to create a unique shopping experience.
            </p>
          </motion.div>

          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="col-md-6 col-lg-3"
                variants={itemVariants}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 py-md-7 bg-light">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="h1 mb-3">How It Works</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Get personalized fashion recommendations in just a few simple steps.
            </p>
          </motion.div>

          <div className="row g-4 justify-content-center">
            <motion.div
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-center">
                <div className="bg-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <span className="display-4 fw-bold text-primary">1</span>
                </div>
                <h3 className="h5 mb-3">Create Your Profile</h3>
                <p className="text-muted">Tell us about your style preferences, body measurements, and budget.</p>
              </div>
            </motion.div>
            <motion.div
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="bg-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <span className="display-4 fw-bold text-primary">2</span>
                </div>
                <h3 className="h5 mb-3">Get Recommendations</h3>
                <p className="text-muted">Our AI analyzes thousands of options to find your perfect matches.</p>
              </div>
            </motion.div>
            <motion.div
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="bg-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <span className="display-4 fw-bold text-primary">3</span>
                </div>
                <h3 className="h5 mb-3">Shop Confidently</h3>
                <p className="text-muted">Purchase items that you know will look great and align with your values.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 py-md-7">
        <div className="container">
          <motion.div
            className="bg-primary rounded-4 p-4 p-md-5 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="h1 mb-3">Ready to Transform Your Wardrobe?</h2>
            <p className="lead mb-4 opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
              Join thousands of fashion-conscious individuals who have discovered their perfect style with our AI-powered recommendations.
            </p>
            <Link href={session ? "/recommendations" : "/login"} className="btn btn-light text-primary rounded-pill px-4 py-2 fw-bold">
              {session ? "View Your Recommendations" : "Get Started Free"}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}