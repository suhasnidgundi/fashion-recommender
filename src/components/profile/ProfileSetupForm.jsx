// src/components/profile/ProfileSetupForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createUserPreference } from '@/lib/firebase/firestore';
import PreferenceSelector from './PreferenceSelector';
import BodyMeasurements from './BodyMeasurements';
import BudgetRange from './BudgetRange';
import BrandSelector from './BrandSelector';
import MaterialSelector from './MaterialSelector';

export default function ProfileSetupForm() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        stylePreferences: [],
        bodyMeasurements: {
            height: '',
            weight: '',
            bodyType: '',
        },
        budgetRange: {
            min: 500,
            max: 5000,
        },
        preferredBrands: [],
        materialChoices: [],
    });

    const totalSteps = 5;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (section, data) => {
        setFormData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user?.id) {
            setError('User not authenticated');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            // Save data to Firestore
            await createUserPreference(session.user.id, formData);

            // Update user session to mark profile as complete
            await update({ isNewUser: false });

            // Redirect to home page
            router.push('/');
            router.refresh();
        } catch (error) {
            setError(error.message || 'An error occurred during profile setup');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">Complete Your Profile</h3>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                    aria-valuenow={(currentStep / totalSteps) * 100}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                            <div className="text-center mt-2">
                                <small>Step {currentStep} of {totalSteps}</small>
                            </div>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {currentStep === 1 && (
                                    <PreferenceSelector
                                        value={formData.stylePreferences}
                                        onChange={(data) => handleChange('stylePreferences', data)}
                                    />
                                )}

                                {currentStep === 2 && (
                                    <BodyMeasurements
                                        value={formData.bodyMeasurements}
                                        onChange={(data) => handleChange('bodyMeasurements', data)}
                                    />
                                )}

                                {currentStep === 3 && (
                                    <BudgetRange
                                        value={formData.budgetRange}
                                        onChange={(data) => handleChange('budgetRange', data)}
                                    />
                                )}

                                {currentStep === 4 && (
                                    <BrandSelector
                                        value={formData.preferredBrands}
                                        onChange={(data) => handleChange('preferredBrands', data)}
                                    />
                                )}

                                {currentStep === 5 && (
                                    <MaterialSelector
                                        value={formData.materialChoices}
                                        onChange={(data) => handleChange('materialChoices', data)}
                                    />
                                )}

                                <div className="d-flex justify-content-between mt-4">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </button>
                                    )}

                                    {currentStep < totalSteps ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary ms-auto"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-success ms-auto"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Saving...' : 'Complete Setup'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}