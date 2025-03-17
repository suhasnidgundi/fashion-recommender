'use client';

import { useState } from 'react';
import { Slider } from 'react-slider'; // Note: You would need to install this package
import { Search } from 'lucide-react';

export default function RecommendationForm({ onSubmit }) {
    const [query, setQuery] = useState('');
    const [stylePreference, setStylePreference] = useState('all');
    const [materialChoice, setMaterialChoice] = useState('all');
    const [budgetRange, setBudgetRange] = useState([0, 200]);
    const [brandPreference, setBrandPreference] = useState('');

    const styleOptions = [
        { value: 'all', label: 'All Styles' },
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'athleisure', label: 'Athleisure' },
        { value: 'business', label: 'Business' },
        { value: 'evening', label: 'Evening Wear' }
    ];

    const materialOptions = [
        { value: 'all', label: 'All Materials' },
        { value: 'organic', label: 'Organic' },
        { value: 'recycled', label: 'Recycled' },
        { value: 'bamboo', label: 'Bamboo' },
        { value: 'hemp', label: 'Hemp' },
        { value: 'linen', label: 'Linen' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            query,
            stylePreference,
            materialChoice,
            budgetRange,
            brandPreference
        });
    };

    // Alternative slider implementation if react-slider is not available
    const renderBudgetRangeInputs = () => (
        <div className="row g-2 mb-3">
            <div className="col">
                <label htmlFor="minPrice" className="form-label small text-muted">Min ($)</label>
                <input
                    type="number"
                    className="form-control"
                    id="minPrice"
                    value={budgetRange[0]}
                    min={0}
                    max={budgetRange[1]}
                    onChange={(e) => setBudgetRange([parseInt(e.target.value), budgetRange[1]])}
                />
            </div>
            <div className="col">
                <label htmlFor="maxPrice" className="form-label small text-muted">Max ($)</label>
                <input
                    type="number"
                    className="form-control"
                    id="maxPrice"
                    value={budgetRange[1]}
                    min={budgetRange[0]}
                    max={1000}
                    onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                />
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="query" className="form-label">Ask for anything</label>
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
                <label className="form-label">Budget Range (${budgetRange[0]} - ${budgetRange[1]})</label>
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

            <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                <Search size={18} />
                <span>Find Recommendations</span>
            </button>
        </form>
    );
}