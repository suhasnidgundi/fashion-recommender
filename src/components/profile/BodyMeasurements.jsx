'use client';

import { useState, useEffect } from 'react';

export default function BodyMeasurements({ value, onChange }) {
    const [measurements, setMeasurements] = useState(value || {
        height: '',
        weight: '',
        bodyType: '',
    });

    const bodyTypes = [
        { id: 'rectangle', label: 'Rectangle (Straight)' },
        { id: 'hourglass', label: 'Hourglass' },
        { id: 'pear', label: 'Pear (Triangle)' },
        { id: 'apple', label: 'Apple (Inverted Triangle)' },
        { id: 'athletic', label: 'Athletic' },
    ];

    useEffect(() => {
        onChange(measurements);
    }, [measurements, onChange]);

    const handleInputChange = (field, value) => {
        setMeasurements(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="body-measurements mb-4">
            <h4 className="mb-3">Body Measurements</h4>
            <p className="text-muted mb-4">Help us recommend clothing that fits you perfectly.</p>

            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="height" className="form-label">Height (cm)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="height"
                        placeholder="e.g., 175"
                        value={measurements.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        min="120"
                        max="220"
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="weight" className="form-label">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="weight"
                        placeholder="e.g., 70"
                        value={measurements.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        min="30"
                        max="200"
                    />
                </div>

                <div className="col-12 mt-4">
                    <label className="form-label">Body Type</label>
                    <div className="row g-2 mt-2">
                        {bodyTypes.map((type) => (
                            <div className="col-md-4 col-6" key={type.id}>
                                <div
                                    className={`card ${measurements.bodyType === type.id ? 'border-primary bg-light' : ''}`}
                                    onClick={() => handleInputChange('bodyType', type.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="card-body text-center py-2">
                                        <p className="mb-0">{type.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}