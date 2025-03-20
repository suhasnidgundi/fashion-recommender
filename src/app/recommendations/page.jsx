'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RecommendationForm from '@/components/recommendation/RecommendationForm';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import EmptyState from '@/components/recommendation/EmptyState';
import LoadingState from '@/components/recommendation/LoadingState';

// Dummy data for recommendations (replace with actual API call)
const dummyRecommendations = [
    {
        id: '1',
        title: 'Organic Cotton T-Shirt',
        brand: 'EcoWear',
        description: 'Casual fit t-shirt made from 100% organic cotton. Perfect for everyday wear.',
        imageUrl: '/api/placeholder/400/500',
        price: 35.99,
        sustainabilityScore: 9.2,
        category: 'casual',
        materials: ['organic cotton'],
    },
    {
        id: '2',
        title: 'Recycled Denim Jeans',
        brand: 'GreenStitch',
        description: 'Classic straight fit jeans made from recycled denim materials.',
        imageUrl: '/api/placeholder/400/500',
        price: 79.99,
        sustainabilityScore: 8.7,
        category: 'casual',
        materials: ['recycled denim'],
    },
    {
        id: '3',
        title: 'Hemp Canvas Sneakers',
        brand: 'EarthStep',
        description: 'Comfortable sneakers made from sustainable hemp canvas.',
        imageUrl: '/api/placeholder/400/500',
        price: 65.00,
        sustainabilityScore: 9.5,
        category: 'casual',
        materials: ['hemp', 'natural rubber'],
    },
    {
        id: '4',
        title: 'Bamboo Blend Dress Shirt',
        brand: 'BambooBusiness',
        description: 'Breathable and comfortable dress shirt made with bamboo fabric.',
        imageUrl: '/api/placeholder/400/500',
        price: 89.99,
        sustainabilityScore: 8.9,
        category: 'formal',
        materials: ['bamboo', 'organic cotton'],
    },
];

export default function RecommendationPage() {
    const [query, setQuery] = useState('');
    const [stylePreference, setStylePreference] = useState('all');
    const [materialChoice, setMaterialChoice] = useState('all');
    const [budgetRange, setBudgetRange] = useState([0, 200]);
    const [brandPreference, setBrandPreference] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const fetchRecommendations = async (formData) => {
        setIsLoading(true);
        setHasSearched(true);

        // In a real application, this would be an API call
        // For demo purposes, we'll simulate a delay and use dummy data
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Filter dummy data based on form inputs
            let filtered = [...dummyRecommendations];

            if (stylePreference !== 'all') {
                filtered = filtered.filter(item => item.category === stylePreference);
            }

            if (materialChoice !== 'all') {
                filtered = filtered.filter(item =>
                    item.materials.some(material => material.includes(materialChoice))
                );
            }

            // Filter by budget range
            filtered = filtered.filter(item =>
                item.price >= budgetRange[0] && item.price <= budgetRange[1]
            );

            // Filter by brand if specified
            if (brandPreference) {
                filtered = filtered.filter(item =>
                    item.brand.toLowerCase().includes(brandPreference.toLowerCase())
                );
            }

            setRecommendations(filtered);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setIsLoading(false);
        }

        console.log('Form data:', formData);
    };

    const handleFormSubmit = (formData) => {
        setQuery(formData.query);
        setStylePreference(formData.stylePreference);
        setMaterialChoice(formData.materialChoice);
        setBudgetRange(formData.budgetRange);
        setBrandPreference(formData.brandPreference);
        fetchRecommendations(formData);
    };

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
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}