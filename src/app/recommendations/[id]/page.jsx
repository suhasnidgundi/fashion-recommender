'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Share2, Leaf } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy data for recommendations (replace with actual API call)
const dummyRecommendations = [
    {
        id: '1',
        title: 'Organic Cotton T-Shirt',
        brand: 'EcoWear',
        description: 'Casual fit t-shirt made from 100% organic cotton. Perfect for everyday wear. This shirt is designed to be both comfortable and sustainable, with a focus on ethical manufacturing processes.',
        longDescription: 'This premium organic cotton t-shirt is made from 100% GOTS-certified organic cotton, grown without harmful pesticides or synthetic fertilizers. The manufacturing process uses 70% less water than conventional cotton production and reduces carbon emissions by up to 40%. The shirt features a casual fit, reinforced seams for durability, and is pre-shrunk to maintain its shape after washing. Available in multiple colors, this versatile piece is a sustainable addition to any wardrobe.',
        imageUrl: 'https://imageplaceholder.net/400x500/eeeeee',
        price: 35.99,
        sustainabilityScore: 9.2,
        category: 'casual',
        materials: ['organic cotton'],
        colors: ['White', 'Black', 'Navy', 'Heather Gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        sustainabilityHighlights: [
            'Made from 100% GOTS-certified organic cotton',
            'Water usage reduced by 70% compared to conventional cotton',
            'Carbon-neutral manufacturing process',
            'Plastic-free packaging',
            'Fair trade certified'
        ]
    },
    {
        id: '2',
        title: 'Recycled Denim Jeans',
        brand: 'GreenStitch',
        description: 'Classic straight fit jeans made from recycled denim materials.',
        longDescription: 'These classic straight fit jeans are crafted from 80% recycled denim, reclaiming post-consumer waste that would otherwise end up in landfills. The production process uses innovative techniques that save up to 1,500 gallons of water per pair compared to traditional denim manufacturing. The jeans feature a comfortable stretch fabric blend, reinforced stitching at stress points, and classic five-pocket styling. With their timeless design and sustainable credentials, these jeans are both an eco-friendly and stylish choice.',
        imageUrl: 'https://imageplaceholder.net/400x500/eeeeee',
        price: 79.99,
        sustainabilityScore: 8.7,
        category: 'casual',
        materials: ['recycled denim', 'organic cotton', 'elastane'],
        colors: ['Medium Wash', 'Dark Wash', 'Light Wash', 'Black'],
        sizes: ['28/30', '30/30', '32/30', '34/30', '36/30', '38/30'],
        sustainabilityHighlights: [
            '80% recycled post-consumer denim',
            'Water usage reduced by 80% compared to conventional denim',
            'Low-impact dyes and finishing processes',
            'Biodegradable packaging',
            'Repair program available'
        ]
    },
    {
        id: '3',
        title: 'Hemp Canvas Sneakers',
        brand: 'EarthStep',
        description: 'Comfortable sneakers made from sustainable hemp canvas.',
        longDescription: 'These versatile sneakers feature uppers made from 100% sustainable hemp canvas, which requires significantly less water to grow than cotton and helps regenerate soil health. The soles are constructed from natural rubber sourced from FSC-certified forests, and the shoes are assembled using water-based glues instead of harmful chemical adhesives. With their minimalist design, cushioned insoles made from recycled cork, and durable construction, these sneakers offer both comfort and eco-conscious style for everyday wear.',
        imageUrl: 'https://imageplaceholder.net/400x500/eeeeee',
        price: 65.00,
        sustainabilityScore: 9.5,
        category: 'casual',
        materials: ['hemp', 'natural rubber', 'recycled cork'],
        colors: ['Natural', 'Black', 'Navy', 'Olive'],
        sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
        sustainabilityHighlights: [
            'Hemp requires 50% less water than cotton to grow',
            'Natural rubber soles from FSC-certified forests',
            'Water-based, non-toxic adhesives',
            'Zero-waste manufacturing process',
            'Take-back program for end-of-life recycling'
        ]
    },
    {
        id: '4',
        title: 'Bamboo Blend Dress Shirt',
        brand: 'BambooBusiness',
        description: 'Breathable and comfortable dress shirt made with bamboo fabric.',
        longDescription: 'This premium dress shirt combines style and sustainability with its innovative bamboo-blend fabric. Made from 70% bamboo viscose and 30% organic cotton, the shirt offers exceptional breathability, natural moisture-wicking properties, and a silky-smooth feel against the skin. Bamboo grows rapidly without pesticides or fertilizers, making it one of the most sustainable textile sources available. The shirt features a modern slim fit, mother-of-pearl buttons, and reinforced stitching for durability. Perfect for business settings or dressed-up casual occasions.',
        imageUrl: 'https://imageplaceholder.net/400x500/eeeeee',
        price: 89.99,
        sustainabilityScore: 8.9,
        category: 'formal',
        materials: ['bamboo', 'organic cotton'],
        colors: ['White', 'Light Blue', 'Charcoal', 'Sage'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        sustainabilityHighlights: [
            'Bamboo requires no pesticides and minimal water to grow',
            'Closed-loop manufacturing process for bamboo viscose',
            'Buttons made from sustainable mother-of-pearl',
            'Low-impact dyes and finishing',
            'Compostable packaging'
        ]
    },
];

export default function RecommendationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // In a real app, you would fetch data from an API
                const foundProduct = dummyRecommendations.find(item => item.id === id);

                if (foundProduct) {
                    setProduct(foundProduct);
                    // Set default selected options
                    if (foundProduct.colors && foundProduct.colors.length > 0) {
                        setSelectedColor(foundProduct.colors[0]);
                    }
                    if (foundProduct.sizes && foundProduct.sizes.length > 0) {
                        setSelectedSize(foundProduct.sizes[2]); // Default to a middle size (usually M)
                    }
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const handleGoBack = () => {
        router.back();
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const getSustainabilityColor = (score) => {
        if (score >= 8.5) return 'success';
        if (score >= 7) return 'warning';
        return 'danger';
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <main className="py-5">
                    <div className="container">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Header />
                <main className="py-5">
                    <div className="container">
                        <div className="alert alert-warning">
                            Product not found. <Link href="/recommendation">Back to recommendations</Link>
                        </div>
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
                    <button
                        className="btn btn-sm btn-light mb-4 d-flex align-items-center gap-2"
                        onClick={handleGoBack}
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Recommendations</span>
                    </button>

                    <div className="row g-4">
                        <motion.div
                            className="col-md-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card overflow-hidden border-0 shadow-sm">
                                <div className="ratio ratio-4x5">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.title}
                                        fill
                                        className="object-fit-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="col-md-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="d-flex flex-column h-80">
                                <div className="mb-2 d-flex align-items-center gap-2">
                                    <span className={`badge bg-${getSustainabilityColor(product.sustainabilityScore)}`}>
                                        Eco Score: {product.sustainabilityScore}
                                    </span>
                                    <span className="badge bg-light text-dark">
                                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                    </span>
                                </div>

                                <h1 className="h3 mb-1">{product.title}</h1>
                                <p className="text-muted mb-3">{product.brand}</p>

                                <p className="h4 mb-4">${product.price.toFixed(2)}</p>

                                <div className="mb-4">
                                    <h2 className="h6">Description</h2>
                                    <p>{product.longDescription}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="h6">Materials</h2>
                                    <ul className="list-unstyled mb-0">
                                        {product.materials.map((material, index) => (
                                            <li key={index}>{material}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>  

                            <button className="btn btn-primary btn-lg w-100" aria-label="Add to Cart">
                                Buy Now
                            </button>
                        </motion.div>
                    </div>

                </div>

            </main>
            <Footer />
        </>
    );
}   