// Brevo subscription-form endpoint.
//
// How to fill this in:
//   1. Brevo dashboard → Contacts → Forms → Create new form
//   2. Type: "Subscription form". Add ONE field: EMAIL. Attach to a list (e.g. "Waitlist").
//   3. Enable "Double opt-in" (the confirmation email covers GDPR consent legally).
//   4. Save, then open the "Share" panel and copy the form's submit URL
//      (looks like https://xxxxxxxx.sibforms.com/serve/MUIFAxxxxxxxxxxxxxxxxxxxx).
//   5. Paste it below.
//
// This URL is not a secret: anyone visiting a page with the waitlist form can
// see it in their Network panel. It's safe to commit.
export const BREVO_FORM_URL = 'https://f9910f38.sibforms.com/serve/MUIFALamsQXbe2kCv7KgURoO2VDNgNI4bl-I_7p6Unt9-abF6ta345NMaVowl6ZarxfoS7ohYHL4VEdn_IHKlUXo_T0NrwRgNWVPndbxy4cP6PFNgAkydB46nYO2i0JmoU6Fr3hP0wmyNm3liQHe7xTDGMJYLsfi0WdGbU9Cs0MwbhCzUhpknfJJHZvjEQ6GYHYWsWoSSSF8klsPaQ==';

// Brevo locale used by their hosted endpoint. Keep 'en' unless you've
// configured a French form in the dashboard, in which case use 'fr'.
export const BREVO_LOCALE = 'en';
