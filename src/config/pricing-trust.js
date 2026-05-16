// Trust-signals data for the /pricing trust band.
//
// Empty arrays / null values cause the band sub-block to be hidden.
// Fill these in as content lands — no code change required in the
// renderer, the component reads from here.

// ── Usage figure ──────────────────────────────────────────────────
// Set to a confirmed number+unit string (e.g. "2.4M+ minutes of
// cinematic footage generated on Fantazia") to show the block.
// Leave null to hide it entirely.
export const USAGE_FIGURE = null;

// ── Customer / partner logos ──────────────────────────────────────
// Each entry: { src, alt, href? }. Imported asset URLs preferred so
// Vite handles fingerprinting + responsive serving.
export const TRUST_LOGOS = [
    // { src: '/logos/example.svg', alt: 'Example studio', href: 'https://example.com' },
];

// ── Testimonials ──────────────────────────────────────────────────
// { quote (max 180 chars), author, role, segment: 'creator'|'agency'|'studio' }
export const TESTIMONIALS = [
    // {
    //     quote: 'Fantazia cut our pre-viz turnaround from two weeks to two days.',
    //     author: 'Jane Doe',
    //     role: 'Director, Studio X',
    //     segment: 'studio',
    // },
];
