'use client';

import { useState, useEffect } from 'react';

export default function MaterialSelector({ value = [], onChange }) {
    const [selected, setSelected] = useState(value);

    const materials = [
        {
            id: 'organic_cotton',
            name: 'Organic Cotton',
            icon: '🌱',
            description: 'Grown without synthetic pesticides or fertilizers'
        },
        {
            id: 'recycled_polyester',
            name: 'Recycled Polyester',
            icon: '♻️',
            description: 'Made from post-consumer plastic bottles'
        },
        {
            id: 'hemp',
            name: 'Hemp',
            icon: '🌿',
            description: 'Sustainable fabric that requires minimal water'
        },
        {
            id: 'bamboo',
            name: 'Bamboo',
            icon: '🎋',
            description: 'Fast-growing and biodegradable'
        },
        {
            id: 'linen',
            name: 'Linen',
            icon: '🧵',
            description: 'Made from flax plant, strong and naturally moth resistant'
        },
        {
            id: 'tencel',
            name: 'Tencel/Lyocell',
            icon: '🌳',
            description: 'Made from wood pulp in a closed-loop process'
        },
        {
            id: 'wool',
            name: 'Wool',
            icon: '🐑',
            description: 'Natural, renewable, and biodegradable'
        },
        {
            id: 'cotton',
            name: 'Cotton',
            icon: '👕',
            description: 'Breathable and comfortable natural fiber'
        },
        {
            id: 'silk',
            name: 'Silk',
            icon: '🧣',
            description: 'Luxury natural fiber thats biodegradable'
    }
    ];

    useEffect(() => {
        onChange(selected);
    }, [selected, onChange]);

    const toggleMaterial = (materialId) => {
        setSelected(prev => {
            if (prev.includes(materialId)) {
                return prev.filter(id => id !== materialId);
            } else {
                return [...prev, materialId];
            }
        });
    };

    return (
        <div className="material-selector mb-4">
            <h4 className="mb-3">Material Preferences</h4>
            <p className="text-muted mb-4">Select your preferred clothing materials (choose as many as you like).</p>

            <div className="row g-3">
                {materials.map((material) => (
                    <div className="col-md-4 col-sm-6" key={material.id}>
                        <div
                            className={`card h-100 ${selected.includes(material.id) ? 'border-primary bg-light' : ''}`}
                            onClick={() => toggleMaterial(material.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <span className="me-2 fs-4">{material.icon}</span>
                                    <h5 className="card-title mb-0">{material.name}</h5>
                                </div>
                                <p className="card-text small text-muted">{material.description}</p>
                                {selected.includes(material.id) && (
                                    <div className="badge bg-primary">Selected</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <div className="alert alert-info">
                    <small>
                        Eco-friendly materials help reduce environmental impact. We'll prioritize recommending fashion items made from your selected materials.
                    </small>
                </div>
            </div>
        </div>
    );
}