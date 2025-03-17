'use client';

import { useState, useEffect } from 'react';

export default function PreferenceSelector({ value = [], onChange }) {
    const [selected, setSelected] = useState(value);

    const styleOptions = [
        { id: 'casual', label: 'Casual', icon: '👕' },
        { id: 'formal', label: 'Formal', icon: '👔' },
        { id: 'sportswear', label: 'Sportswear', icon: '🏃' },
        { id: 'vintage', label: 'Vintage', icon: '🕰️' },
        { id: 'minimalist', label: 'Minimalist', icon: '⚪' },
        { id: 'streetwear', label: 'Streetwear', icon: '🛹' },
        { id: 'bohemian', label: 'Bohemian', icon: '🌻' },
        { id: 'business', label: 'Business', icon: '💼' },
        { id: 'eco-friendly', label: 'Eco-Friendly', icon: '🌱' }
    ];

    useEffect(() => {
        onChange(selected);
    }, [selected, onChange]);

    const toggleOption = (optionId) => {
        setSelected(prev => {
            if (prev.includes(optionId)) {
                return prev.filter(id => id !== optionId);
            } else {
                return [...prev, optionId];
            }
        });
    };

    return (
        <div className="style-preferences mb-4">
            <h4 className="mb-3">Style Preferences</h4>
            <p className="text-muted mb-4">Select your preferred fashion styles (choose as many as you like).</p>

            <div className="row g-3">
                {styleOptions.map((option) => (
                    <div className="col-md-4 col-6" key={option.id}>
                        <div
                            className={`card h-100 ${selected.includes(option.id) ? 'border-primary bg-light' : ''}`}
                            onClick={() => toggleOption(option.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body text-center">
                                <div className="mb-2 fs-2">{option.icon}</div>
                                <h5 className="card-title mb-0">{option.label}</h5>
                                {selected.includes(option.id) && (
                                    <div className="mt-2 badge bg-primary">Selected</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selected.length === 0 && (
                <div className="alert alert-warning mt-3">
                    Please select at least one style preference.
                </div>
            )}
        </div>
    );
}