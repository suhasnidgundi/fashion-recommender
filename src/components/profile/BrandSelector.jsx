'use client';

import { useState, useEffect } from 'react';

export default function BrandSelector({ value = [], onChange }) {
    const [selected, setSelected] = useState(value);
    const [searchTerm, setSearchTerm] = useState('');

    // Popular Indian brands from Myntra dataset
    const popularBrands = [
        { id: 'roadster', name: 'Roadster' },
        { id: 'hrx', name: 'HRX by Hrithik Roshan' },
        { id: 'wrogn', name: 'WROGN' },
        { id: 'mast_and_harbour', name: 'Mast & Harbour' },
        { id: 'here_and_now', name: 'HERE&NOW' },
        { id: 'dressberry', name: 'DressBerry' },
        { id: 'levis', name: 'Levis' },
        { id: 'puma', name: 'PUMA' },
        { id: 'nike', name: 'Nike' },
        { id: 'adidas', name: 'Adidas' },
        { id: 'biba', name: 'BIBA' },
        { id: 'w', name: 'W' },
        { id: 'allen_solly', name: 'Allen Solly' },
        { id: 'zara', name: 'ZARA' },
        { id: 'h_and_m', name: 'H&M' },
        { id: 'forever_21', name: 'Forever 21' },
        { id: 'fabindia', name: 'FabIndia' },
        { id: 'only', name: 'ONLY' },
        { id: 'vero_moda', name: 'Vero Moda' },
        { id: 'jack_and_jones', name: 'Jack & Jones' }
    ];

    useEffect(() => {
        onChange(selected);
    }, [selected, onChange]);

    const toggleBrand = (brandId) => {
        setSelected(prev => {
            if (prev.includes(brandId)) {
                return prev.filter(id => id !== brandId);
            } else {
                return [...prev, brandId];
            }
        });
    };

    const filteredBrands = popularBrands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="brand-selector mb-4">
            <h4 className="mb-3">Preferred Brands</h4>
            <p className="text-muted mb-4">Select your favorite fashion brands (choose as many as you like).</p>

            <div className="row mb-4">
                <div className="col-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search brands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row g-2">
                {filteredBrands.map((brand) => (
                    <div className="col-md-3 col-6" key={brand.id}>
                        <div
                            className={`card ${selected.includes(brand.id) ? 'border-primary bg-light' : ''}`}
                            onClick={() => toggleBrand(brand.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body py-2 text-center">
                                <p className="mb-0">{brand.name}</p>
                                {selected.includes(brand.id) && (
                                    <span className="badge bg-primary">Selected</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBrands.length === 0 && (
                <div className="alert alert-info">
                    No brands found matching "{searchTerm}". Try a different search term.
                </div>
            )}

            <div className="d-flex align-items-center mt-4">
                <span>Selected: {selected.length} brands</span>
            </div>
        </div>
    );
}