'use client';

import { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';

export default function RecommendationForm({ onSubmit }) {
    const [query, setQuery] = useState('');
    const [stylePreference, setStylePreference] = useState('all');
    const [materialChoice, setMaterialChoice] = useState('all');
    const [budgetRange, setBudgetRange] = useState([0, 2000]);
    const [brandPreference, setBrandPreference] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const styleOptions = [
        { value: 'all', label: 'All Styles' },
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'athleisure', label: 'Athleisure' },
        { value: 'business', label: 'Business' },
        { value: 'evening', label: 'Evening Wear' },
        { value: 'ethnic', label: 'Ethnic Wear' },
        { value: 'summer', label: 'Summer Wear' },
        { value: 'winter', label: 'Winter Wear' }
    ];

    const materialOptions = [
        { value: 'all', label: 'All Materials' },
        { value: 'organic', label: 'Organic' },
        { value: 'recycled', label: 'Recycled' },
        { value: 'bamboo', label: 'Bamboo' },
        { value: 'hemp', label: 'Hemp' },
        { value: 'linen', label: 'Linen' },
        { value: 'cotton', label: 'Cotton' },
        { value: 'wool', label: 'Wool' },
        { value: 'silk', label: 'Silk' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await onSubmit({
                query,
                stylePreference,
                materialChoice,
                budgetRange,
                brandPreference
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setQuery('');
        setStylePreference('all');
        setMaterialChoice('all');
        setBudgetRange([0, 2000]);
        setBrandPreference('');
    };

    const renderBudgetRangeInputs = () => (
        <div className="row g-2 mb-3">
            <div className="col">
                <label htmlFor="minPrice" className="form-label small text-muted">Min (₹‎)</label>
                <input
                    type="number"
                    className="form-control"
                    id="minPrice"
                    value={budgetRange[0]}
                    min={0}
                    max={budgetRange[1]}
                    onChange={(e) => setBudgetRange([parseInt(e.target.value) || 0, budgetRange[1]])}
                />
            </div>
            <div className="col">
                <label htmlFor="maxPrice" className="form-label small text-muted">Max (₹‎)</label>
                <input
                    type="number"
                    className="form-control"
                    id="maxPrice"
                    value={budgetRange[1]}
                    min={budgetRange[0]}
                    max={10000}
                    onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value) || 0])}
                />
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="query" className="form-label">Describe what you're looking for</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="query"
                        placeholder="E.g., summer outfit for a beach party"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="form-text">
                    Try being specific about occasion, color, or style
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="stylePreference" className="form-label">Style Preference</label>
                <select
                    className="form-select"
                    id="stylePreference"
                    value={stylePreference}
                    onChange={(e) => setStylePreference(e.target.value)}
                >
                    {styleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="materialChoice" className="form-label">Material Choice</label>
                <select
                    className="form-select"
                    id="materialChoice"
                    value={materialChoice}
                    onChange={(e) => setMaterialChoice(e.target.value)}
                >
                    {materialOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Budget Range (₹‎{budgetRange[0]} - ₹‎{budgetRange[1]})</label>
                {renderBudgetRangeInputs()}
            </div>

            <div className="mb-4">
                <label htmlFor="brandPreference" className="form-label">Brand Preference (Optional)</label>
                <input
                    type="text"
                    className="form-control"
                    id="brandPreference"
                    placeholder="Enter preferred brands"
                    value={brandPreference}
                    onChange={(e) => setBrandPreference(e.target.value)}
                />
            </div>

            <div className="d-flex gap-2">
                <button
                    type="submit"
                    className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span>Searching...</span>
                        </>
                    ) : (
                        <>
                            <Search size={18} />
                            <span>Find Recommendations</span>
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                    aria-label="Reset form"
                >
                    <RefreshCw size={18} />
                </button>
            </div>
        </form>
    );
}