'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, Info } from 'lucide-react';

export default function RecommendationCard({ recommendation }) {
    const [isLiked, setIsLiked] = useState(false);

    const getSustainabilityColor = (score) => {
        if (score >= 8.5) return 'success';
        if (score >= 7) return 'warning';
        return 'danger';
    };

    const toggleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <motion.div
            className="card h-100 shadow-sm overflow-hidden"
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
        >
            <div className="position-relative">
                <div className="ratio ratio-4x5">
                    <Image
                        src={recommendation.imageUrl}
                        alt={recommendation.title}
                        fill
                        className="object-fit-cover"
                    />
                </div>
                <button
                    className={`position-absolute top-0 end-0 btn btn-sm m-2 ${isLiked ? 'btn-danger' : 'btn-light'}`}
                    onClick={toggleLike}
                    aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart size={16} fill={isLiked ? "#ffffff" : "none"} />
                </button>
                <div className="position-absolute bottom-0 start-0 m-2">
                    <span className={`badge bg-${getSustainabilityColor(recommendation.sustainabilityScore)}`}>
                        Eco Score: {recommendation.sustainabilityScore}
                    </span>
                </div>
            </div>

            <div className="card-body">
                <h3 className="h5 card-title mb-1">{recommendation.title}</h3>
                <p className="text-muted small mb-2">{recommendation.brand}</p>
                <p className="card-text text-truncate mb-2">{recommendation.description}</p>
                <p className="fw-bold mb-0">${recommendation.price.toFixed(2)}</p>
            </div>

            <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                <span className="badge bg-light text-dark">
                    {recommendation.category.charAt(0).toUpperCase() + recommendation.category.slice(1)}
                </span>
                <div className="d-flex gap-2">
                    <Link href={`/recommendations/${recommendation.id}`} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                        <Info size={14} />
                        <span>Details</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}