'use client';

import { useState } from 'react';
import PreferenceSelector from './PreferenceSelector';
import BrandSelector from './BrandSelector';
import MaterialSelector from './MaterialSelector';
import BodyMeasurements from './BodyMeasurements';
import BudgetRange from './BudgetRange';

export default function ProfileForm({ initialData, onSave }) {
    const [formData, setFormData] = useState(initialData || {});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [activeSection, setActiveSection] = useState('personal');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePreferencesChange = (preferences) => {
        setFormData((prev) => ({ ...prev, preferences }));
    };

    const handleBrandsChange = (brands) => {
        setFormData((prev) => ({ ...prev, preferredBrands: brands }));
    };

    const handleMaterialsChange = (materials) => {
        setFormData((prev) => ({ ...prev, preferredMaterials: materials }));
    };

    const handleMeasurementsChange = (measurements) => {
        setFormData((prev) => ({ ...prev, bodyMeasurements: measurements }));
    };

    const handleBudgetChange = (budget) => {
        setFormData((prev) => ({ ...prev, budget }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback({ type: '', message: '' });

        try {
            const result = await onSave(formData);
            setFeedback({
                type: result.success ? 'success' : 'danger',
                message: result.message
            });
        } catch (error) {
            setFeedback({
                type: 'danger',
                message: 'An unexpected error occurred. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const sections = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'style', label: 'Style Preferences', icon: '👕' },
        { id: 'body', label: 'Body Measurements', icon: '📏' },
        { id: 'brands', label: 'Brand Preferences', icon: '🏷️' },
        { id: 'materials', label: 'Material Preferences', icon: '🧵' },
        { id: 'budget', label: 'Budget Range', icon: '💰' }
    ];

    return (
        <div className="card shadow-lg border-0 rounded-lg">
            {feedback.message && (
                <div className={`alert alert-${feedback.type} alert-dismissible fade show m-3`} role="alert">
                    {feedback.message}
                    <button type="button" className="btn-close" onClick={() => setFeedback({ type: '', message: '' })} aria-label="Close"></button>
                </div>
            )}

            <div className="card-body p-0">
                <div className="row g-0">
                    {/* Sidebar Navigation */}
                    <div className="col-md-3 border-end">
                        <div className="list-group list-group-flush rounded-0">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    type="button"
                                    className={`list-group-item list-group-item-action d-flex align-items-center ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => setActiveSection(section.id)}
                                >
                                    <span className="me-2">{section.icon}</span>
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit}>
                            <div className="p-4">
                                {activeSection === 'personal' && (
                                    <div className="personal-info">
                                        <h3 className="mb-4">Personal Information</h3>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="displayName" className="form-label">Display Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="displayName"
                                                    name="displayName"
                                                    value={formData.displayName || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="gender" className="form-label">Gender</label>
                                                <select
                                                    className="form-select"
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender || ''}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="nonbinary">Non-binary</option>
                                                    <option value="other">Other</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email || ''}
                                                    onChange={handleInputChange}
                                                    readOnly
                                                    disabled
                                                />
                                                <div className="form-text">Email cannot be changed</div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="phoneNumber" className="form-label">Phone Number (Optional)</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'style' && (
                                    <PreferenceSelector
                                        value={formData.preferences || []}
                                        onChange={handlePreferencesChange}
                                    />
                                )}

                                {activeSection === 'body' && (
                                    <BodyMeasurements
                                        value={formData.bodyMeasurements || {}}
                                        onChange={handleMeasurementsChange}
                                    />
                                )}

                                {activeSection === 'brands' && (
                                    <BrandSelector
                                        value={formData.preferredBrands || []}
                                        onChange={handleBrandsChange}
                                    />
                                )}

                                {activeSection === 'materials' && (
                                    <MaterialSelector
                                        value={formData.preferredMaterials || []}
                                        onChange={handleMaterialsChange}
                                    />
                                )}

                                {activeSection === 'budget' && (
                                    <BudgetRange
                                        value={formData.budget || { min: 500, max: 5000 }}
                                        onChange={handleBudgetChange}
                                    />
                                )}

                                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                                    <div>
                                        {activeSection !== 'personal' && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                                                    if (currentIndex > 0) {
                                                        setActiveSection(sections[currentIndex - 1].id);
                                                    }
                                                }}
                                            >
                                                Previous
                                            </button>
                                        )}
                                    </div>
                                    <div className="d-flex gap-2">
                                        {activeSection !== sections[sections.length - 1].id && (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                                                    if (currentIndex < sections.length - 1) {
                                                        setActiveSection(sections[currentIndex + 1].id);
                                                    }
                                                }}
                                            >
                                                Next
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Profile'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}