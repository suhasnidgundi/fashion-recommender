'use client';

import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Define the validation schema using Zod
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message cannot exceed 500 characters')
});

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const formRef = useRef();

    // Initialize EmailJS once on component mount
    useEffect(() => {
        // Replace with your EmailJS user ID
        emailjs.init({
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY,
            limitRate:{
                id: 'contact_form',
                throttle: 10000,
            }
        });
    }, []);

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: toFormikValidationSchema(contactSchema),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setFeedback({ type: '', message: '' });

            try {
                // Send email using EmailJS
                // Replace these parameters with your actual EmailJS service ID and template ID
                const result = await emailjs.sendForm(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
                    formRef.current,
                    // User ID is already initialized in useEffect
                );

                if (result.status === 200) {
                    setFeedback({
                        type: 'success',
                        message: 'Thank you for your message! We will get back to you soon.'
                    });
                    formik.resetForm();
                } else {
                    setFeedback({
                        type: 'danger',
                        message: 'Failed to send message. Please try again.'
                    });
                }
            } catch (error) {
                console.error('EmailJS error:', error);
                setFeedback({
                    type: 'danger',
                    message: 'An unexpected error occurred. Please try again.'
                });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <form ref={formRef} onSubmit={formik.handleSubmit}>
            {feedback.message && (
                <div className={`alert alert-${feedback.type} mb-4`} role="alert">
                    {feedback.message}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                    type="text"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                    type="text"
                    className={`form-control ${formik.touched.subject && formik.errors.subject ? 'is-invalid' : ''}`}
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.subject && formik.errors.subject && (
                    <div className="invalid-feedback">{formik.errors.subject}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                    className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    rows="5"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                    <div className="invalid-feedback">{formik.errors.message}</div>
                )}
                <small className="text-muted">
                    {formik.values.message.length}/500 characters
                </small>
            </div>

            <div className="d-grid">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || !formik.isValid || formik.isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </div>
        </form>
    );
}