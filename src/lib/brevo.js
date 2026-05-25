import { BREVO_FORM_URL, BREVO_LOCALE } from '../config/brevo';

// Submit an email to the Brevo hosted subscription form.
//
// Brevo's hosted endpoint does not expose permissive CORS headers for custom
// UIs, so we POST with `mode: 'no-cors'`. The response is opaque — we cannot
// read its status — but the browser still delivers the request. Validation
// (bad email, duplicate, etc.) is communicated to the user via the
// double opt-in flow (or its absence): users either get a confirmation email
// or they don't.
//
// We surface only two outcomes:
//   - resolves: the request left the browser (treat as success)
//   - throws:  the form URL is missing, or the network call itself failed
export async function subscribeToWaitlist(email) {
    if (!BREVO_FORM_URL) {
        throw new Error('Brevo form URL is not configured. See src/config/brevo.js.');
    }

    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('OPT_IN', '1');
    formData.append('locale', BREVO_LOCALE);
    // Honeypot field Brevo includes in their hosted form to deter bots —
    // legitimate submissions leave it empty.
    formData.append('email_address_check', '');

    await fetch(BREVO_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
    });
}
