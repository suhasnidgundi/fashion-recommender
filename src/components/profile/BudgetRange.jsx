'use client';

import { useState, useEffect } from 'react';

export default function BudgetRange({ value, onChange }) {
    const [range, setRange] = useState(value || {
        min: 500,
        max: 5000
    });

    useEffect(() => {
        onChange(range);
    }, [range, onChange]);

    const handleMinChange = (value) => {
        // Ensure min doesn't exceed max
        const newMin = Math.min(parseInt(value), range.max);
        setRange(prev => ({
            ...prev,
            min: newMin
        }));
    };

    const handleMaxChange = (value) => {
        // Ensure max doesn't go below min
        const newMax = Math.max(parseInt(value), range.min);
        setRange(prev => ({
            ...prev,
            max: newMax
        }));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="budget-range mb-4">
            <h4 className="mb-3">Budget Range</h4>
            <p className="text-muted mb-4">Set your preferred price range for clothing items.</p>

            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h5 className="mb-3">
                        {formatCurrency(range.min)} - {formatCurrency(range.max)}
                    </h5>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="minBudget" className="form-label">Minimum Budget</label>
                    <input
                        type="range"
                        className="form-range"
                        id="minBudget"
                        min="100"
                        max="10000"
                        step="100"
                        value={range.min}
                        onChange={(e) => handleMinChange(e.target.value)}
                    />
                    <div className="d-flex justify-content-between">
                        <span>₹100</span>
                        <span>₹10,000</span>
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="maxBudget" className="form-label">Maximum Budget</label>
                    <input
                        type="range"
                        className="form-range"
                        id="maxBudget"
                        min="100"
                        max="10000"
                        step="100"
                        value={range.max}
                        onChange={(e) => handleMaxChange(e.target.value)}
                    />
                    <div className="d-flex justify-content-between">
                        <span>₹100</span>
                        <span>₹10,000</span>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="alert alert-info">
                        <small>
                            We'll recommend fashion items primarily within this price range, but may occasionally
                            suggest special items outside this range if they match your preferences exceptionally well.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}