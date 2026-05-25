import { useState } from 'react';
import { subscribeToWaitlist } from './brevo';

// Hook backing every waitlist form on the site (WaitlistCTA on product pages,
// the compact pill on Home, etc.). It owns the email/status state and the
// submit handler; presentational components just wire it to inputs and a
// button.
//
// Consent is implicit (the act of submitting the form), backed by Brevo's
// double opt-in confirmation email which provides the legal audit trail.
// The visible "By joining you agree..." disclaimer near the button is the
// informed-consent notice required by RGPD.
//
// Returns:
//   email, setEmail   — controlled email input value
//   status            — 'idle' | 'loading' | 'success' | 'error'
//   errorMessage      — populated when status === 'error'
//   handleSubmit      — pass to <form onSubmit>
export function useWaitlist() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // HTML5 `required` on the email input gates submission, so when we
        // land here the email is non-empty and well-formed.

        setStatus('loading');
        setErrorMessage('');
        try {
            await subscribeToWaitlist(email);
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
            setErrorMessage(
                err instanceof Error && err.message
                    ? err.message
                    : 'Something went wrong. Please try again.'
            );
        }
    };

    return { email, setEmail, status, errorMessage, handleSubmit };
}
