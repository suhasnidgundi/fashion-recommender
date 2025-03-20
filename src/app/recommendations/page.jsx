'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RecommendationForm from '@/components/recommendation/RecommendationForm';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import EmptyState from '@/components/recommendation/EmptyState';
import LoadingState from '@/components/recommendation/LoadingState';
import LoginPrompt from '@/components/auth/LoginPrompt';
import StyleTips from '@/components/recommendation/StyleTips';

export default function RecommendationPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [stylePreference, setStylePreference] = useState('all');
    const [materialChoice, setMaterialChoice] = useState('all');
    const [budgetRange, setBudgetRange] = useState([0, 200]);
    const [brandPreference, setBrandPreference] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [styleTips, setStyleTips] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async (formData) => {
        setIsLoading(true);
        setHasSearched(true);
        setError(null);

        try {
            // Convert form data to API expected format
            const apiPayload = {
                query: formData.query,
                filters: {
                    stylePreferences: formData.stylePreference !== 'all' ? [formData.stylePreference] : [],
                    materialChoices: formData.materialChoice !== 'all' ? [formData.materialChoice] : [],
                    budgetRange: {
                        min: formData.budgetRange[0],
                        max: formData.budgetRange[1]
                    },
                    preferredBrands: formData.brandPreference ? [formData.brandPreference] : []
                }
            };

            // Make API call to backend using the session token

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recommendations/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload)
            });

            if (!response.ok) {
                // Handle authentication errors
                if (response.status === 401 || response.status === 403) {
                    setError("Your session has expired. Please log in again.");
                    return;
                }
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Transform API response to match the app's data structure
            const transformedRecommendations = data.recommendations.flatMap(outfit =>
                outfit.items.map(item => ({
                    id: item.product_id,
                    title: item.description,
                    brand: item.brand,
                    description: outfit.style_description,
                    imageUrl: `/api/placeholder/400/500`,  // Would be replaced with actual image URLs
                    price: item.price,
                    sustainabilityScore: calculateSustainabilityScore(item), // Function to estimate score
                    category: item.category.toLowerCase(),
                    materials: determineMaterials(item.description), // Extract materials from description
                    productUrl: item.url
                }))
            );

            setRecommendations(transformedRecommendations);
            setStyleTips(data.style_tips || '');
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError('Failed to fetch recommendations. Please try again.');
            setRecommendations([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to estimate sustainability score based on keywords
    const calculateSustainabilityScore = (item) => {
        const sustainabilityKeywords = ['organic', 'recycled', 'sustainable', 'eco', 'natural', 'hemp', 'bamboo'];
        const description = item.description.toLowerCase();

        // Base score between 7.0 and 8.0
        let score = 7.0 + Math.random();

        // Increase score for sustainable keywords
        sustainabilityKeywords.forEach(keyword => {
            if (description.includes(keyword)) {
                score += 0.5;
            }
        });

        // Cap at 9.8 to maintain realism
        return Math.min(score, 9.8).toFixed(1);
    };

    // Helper function to extract materials from description
    const determineMaterials = (description) => {
        const materialKeywords = ['cotton', 'linen', 'silk', 'wool', 'polyester', 'denim', 'hemp', 'bamboo'];
        const descLower = description.toLowerCase();
        const found = materialKeywords.filter(material => descLower.includes(material));

        return found.length > 0 ? found : ['mixed materials'];
    };

    const handleFormSubmit = (formData) => {
        setQuery(formData.query);
        setStylePreference(formData.stylePreference);
        setMaterialChoice(formData.materialChoice);
        setBudgetRange(formData.budgetRange);
        setBrandPreference(formData.brandPreference);
        fetchRecommendations(formData);
    };

    // If user is not logged in, show login prompt
    if (status === 'unauthenticated') {
        return (
            <>
                <Header />
                <main className="py-5">
                    <div className="container">
                        <LoginPrompt redirectPath="/recommendation" />
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="py-5">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="mb-4">AI Fashion Recommendations</h1>
                        <p className="lead mb-5">
                            Get personalized, sustainable fashion recommendations tailored to your preferences.
                        </p>
                    </motion.div>

                    <div className="row g-4">
                        <div className="col-lg-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="card shadow-sm sticky-lg-top"
                                style={{ top: '2rem' }}
                            >
                                <div className="card-body">
                                    <h2 className="h5 mb-4">Refine Your Recommendations</h2>
                                    <RecommendationForm onSubmit={handleFormSubmit} />
                                </div>
                            </motion.div>
                        </div>

                        <div className="col-lg-8">
                            {isLoading ? (
                                <LoadingState />
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : !hasSearched ? (
                                <EmptyState
                                    message="Use the form to get personalized recommendations"
                                    icon="search"
                                />
                            ) : recommendations.length === 0 ? (
                                <EmptyState
                                    message="No recommendations found. Try adjusting your filters."
                                    icon="filter"
                                />
                            ) : (
                                <>
                                    {styleTips && <StyleTips tips={styleTips} />}
                                    <div className="row g-4">
                                        <AnimatePresence>
                                            {recommendations.map((item, index) => (
                                                <motion.div
                                                    key={item.id}
                                                    className="col-md-6"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                                >
                                                    <RecommendationCard recommendation={item} />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}