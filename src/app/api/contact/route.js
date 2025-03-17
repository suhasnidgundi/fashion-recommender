import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, subject, message } = data;

        // Validate the required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // For demonstration purposes, we're just returning a success response
        // In a real application, you would send the email using a service like SendGrid, Mailgun, etc.
        console.log('Contact form submission:', { name, email, subject, message });

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { message: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}