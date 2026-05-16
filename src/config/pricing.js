// Pricing config — single source of truth for the /pricing page.
//
// Stripe checkout: the cleanest path on the marketing site is to use one
// Stripe Payment Link per (plan, period). Drop the URLs in your Vite
// .env file as the variables below. If you switch to a server-rendered
// /api/checkout endpoint later, only `getCheckoutUrl` needs to change.
//
//   .env (do NOT commit)
//     VITE_STRIPE_CREATOR_MONTHLY=https://buy.stripe.com/...
//     VITE_STRIPE_CREATOR_YEARLY=https://buy.stripe.com/...
//     VITE_STRIPE_DIRECTOR_MONTHLY=https://buy.stripe.com/...
//     VITE_STRIPE_DIRECTOR_YEARLY=https://buy.stripe.com/...
//     VITE_STRIPE_STUDIO_MONTHLY=https://buy.stripe.com/...
//     VITE_STRIPE_STUDIO_YEARLY=https://buy.stripe.com/...
//     VITE_STRIPE_PRODUCTION_MONTHLY=https://buy.stripe.com/...
//     VITE_STRIPE_PRODUCTION_YEARLY=https://buy.stripe.com/...
//     VITE_STRIPE_ATELIER_MONTHLY=https://buy.stripe.com/...
//     VITE_STRIPE_ATELIER_YEARLY=https://buy.stripe.com/...
//
// Success URL config in Stripe Dashboard:
//   https://app.fantazia.ai/welcome?session_id={CHECKOUT_SESSION_ID}
// Cancel URL:
//   https://fantazia.ai/pricing

const APP_URL = 'https://app.fantazia.ai';

const STRIPE_LINKS = {
    creator: {
        monthly: import.meta.env.VITE_STRIPE_CREATOR_MONTHLY ?? '',
        yearly: import.meta.env.VITE_STRIPE_CREATOR_YEARLY ?? '',
    },
    director: {
        monthly: import.meta.env.VITE_STRIPE_DIRECTOR_MONTHLY ?? '',
        yearly: import.meta.env.VITE_STRIPE_DIRECTOR_YEARLY ?? '',
    },
    studio: {
        monthly: import.meta.env.VITE_STRIPE_STUDIO_MONTHLY ?? '',
        yearly: import.meta.env.VITE_STRIPE_STUDIO_YEARLY ?? '',
    },
    production: {
        monthly: import.meta.env.VITE_STRIPE_PRODUCTION_MONTHLY ?? '',
        yearly: import.meta.env.VITE_STRIPE_PRODUCTION_YEARLY ?? '',
    },
    atelier: {
        monthly: import.meta.env.VITE_STRIPE_ATELIER_MONTHLY ?? '',
        yearly: import.meta.env.VITE_STRIPE_ATELIER_YEARLY ?? '',
    },
};

/**
 * Resolve the CTA destination for a plan + billing period.
 *  - Explore: signup, no Stripe.
 *  - Paid plans: Stripe Payment Link if configured, otherwise fall back
 *    to the app subscribe page with query params (legacy path).
 */
export const getCheckoutUrl = (planId, period) => {
    if (planId === 'explore') return APP_URL;
    const stripe = STRIPE_LINKS[planId]?.[period];
    if (stripe) return stripe;
    // Fallback while Stripe links aren't wired yet
    return `${APP_URL}/subscribe?plan=${planId}&period=${period}`;
};

/**
 * The 6 plans, in display order.
 *
 * Price fields
 *   monthlyPrice           — the price shown when the toggle is on Monthly.
 *   yearlyPriceMonthly     — the price shown when the toggle is on Yearly
 *                            (i.e., effective per-month rate billed yearly).
 *
 * Inheritance line ("Everything in X, plus:")
 *   inheritsFrom           — the previous tier's name; shown above the
 *                            bullets on Director and up.
 *
 * Visual flags
 *   recommended            — Director only. Warm beige fill + "Recommended"
 *                            badge + filled-ink CTA.
 *   premium                — Atelier only. Small "Premium" badge top-right,
 *                            warm accent ring.
 *
 * Background image slot (optional, reserved for future visuals)
 *   bgImage                — image URL to render behind the card content.
 *   bgOpacity              — number 0..1 (default ~0.15).
 *   bgBlend                — "multiply" | "soft-light" | etc.
 */
export const PLANS = [
    {
        id: 'explore',
        tier: 'Explore',
        tierBackend: 'TIER_0',
        intro: 'Try the engine and generate your first cinematic concept.',
        calculatorTagline: 'Try the engine for free',
        monthlyCredits: 80,
        free: true,
        monthlyPrice: 0,
        yearlyPriceMonthly: 0,
        bullets: [
            'Enough credits to produce your first short scene',
            'Standard models',
            'Personal use only',
            'Watermarked exports',
        ],
        cta: 'Start for free',
    },
    {
        id: 'creator',
        tier: 'Creator',
        tierBackend: 'TIER_2',
        intro: 'For solo creators building cinematic concepts and story worlds.',
        calculatorTagline: 'For solo creators, around one short film a month',
        monthlyCredits: 1000,
        monthlyPrice: 19.99,
        yearlyPriceMonthly: 15.99,
        bullets: [
            '1,000 credits per month, around 20 short clips or one short film',
            '3 generations in parallel',
            'Priority queue',
            'Premium image and video models',
            'Commercial usage included, no watermark',
            'Community support',
        ],
        cta: 'Start creating',
    },
    {
        id: 'director',
        tier: 'Director',
        tierBackend: 'TIER_3',
        intro: 'For creators producing consistently, week after week.',
        calculatorTagline: 'For consistent weekly production',
        monthlyCredits: 3000,
        recommended: true,
        recommendedLabel: 'Recommended',
        monthlyPrice: 49.99,
        yearlyPriceMonthly: 39.99,
        inheritsFrom: 'Creator',
        bullets: [
            '3,000 credits per month, around 60 clips or three short films',
            '5 generations in parallel',
            'All premium and cinematic models',
            'HD exports',
            'Early access to Fable, Citizen and Oasis as they ship in 2026',
            'Email support',
        ],
        cta: 'Become a Director',
    },
    {
        id: 'studio',
        tier: 'Studio',
        tierBackend: 'TIER_4',
        intro: 'For agencies, brands, and creators running sustained production.',
        calculatorTagline: 'For sustained production, 4K masters and fastest queue',
        monthlyCredits: 6000,
        monthlyPrice: 99.99,
        yearlyPriceMonthly: 79.99,
        inheritsFrom: 'Director',
        bullets: [
            '6,000 credits per month, around 120 clips or six short films',
            '10 generations in parallel',
            'Fastest processing queue',
            'Early access to new models',
            '4K exports',
            'Priority access to Fable, Citizen and Oasis',
            'Priority email support',
        ],
        cta: 'Get Studio',
    },
    {
        id: 'production',
        tier: 'Production',
        tierBackend: 'TIER_5',
        intro: 'For production houses, agencies, and IP holders running multiple projects.',
        calculatorTagline: 'For teams running multiple projects in parallel',
        monthlyCredits: 18000,
        monthlyPrice: 248.99,
        yearlyPriceMonthly: 199,
        inheritsFrom: 'Studio',
        bullets: [
            '18,000 credits per month, around 360 clips or 18 short films',
            '20 generations in parallel',
            'Dedicated processing lane',
            'Early access to upcoming Cinematic v2 models',
            '4K and ProRes-quality exports',
            '3 team seats included',
            'Project sharing and collaboration',
            'Priority chat and email support',
        ],
        cta: 'Get Production',
    },
    {
        id: 'atelier',
        tier: 'Atelier',
        tierBackend: 'TIER_6',
        intro: 'For studios producing series, franchises, and IP at scale.',
        calculatorTagline: 'For studios producing series and IP at scale',
        monthlyCredits: 50000,
        premium: true,
        premiumLabel: 'Premium',
        monthlyPrice: 623.99,
        yearlyPriceMonthly: 499,
        inheritsFrom: 'Production',
        bullets: [
            '50,000 credits per month, around 1,000 clips or 50 short films',
            '30 generations in parallel',
            'Highest priority dedicated lane',
            'Early access to all beta models and tools',
            '4K, ProRes, and master-quality exports',
            '10 team seats included',
            'Brand-locked LoRAs and custom style training',
            'Dedicated success manager via email',
        ],
        cta: 'Get Atelier',
    },
];

/**
 * Yearly billing line: "$X / month, billed annually at $Y / year".
 * Y is the rounded total (monthly × 12).
 */
export const formatYearlyTotal = (yearlyPriceMonthly) =>
    Math.round(yearlyPriceMonthly * 12);

export const YEARLY_SAVINGS_PERCENT = 20;

export const FOUNDING_CREATOR_NOTE = "Founding Creator pricing. Lock in today's rates for life.";

// ─── Cost calculator helpers ────────────────────────────────────────────────

/**
 * Average credit cost per cinematic clip. Tweak with product before launch;
 * the disclaimer at the bottom of the calculator already says this is an
 * estimate.
 */
export const CREDITS_PER_CLIP = 50;

/**
 * Volume thresholds (clips per month) → recommended plan id. Tuned to ~80%
 * of each plan's credit allocation so there's headroom for experimentation.
 */
const RECOMMENDATION_THRESHOLDS = [
    { upTo: 5, planId: 'explore' },
    { upTo: 25, planId: 'creator' },
    { upTo: 80, planId: 'director' },
    { upTo: 150, planId: 'studio' },
    { upTo: 400, planId: 'production' },
    { upTo: Infinity, planId: 'atelier' },
];

export const recommendPlanFromVolume = (clipsPerMonth) => {
    const found = RECOMMENDATION_THRESHOLDS.find((t) => clipsPerMonth <= t.upTo);
    return found?.planId ?? 'atelier';
};

/**
 * Build the breakdown rows shown under the recommended card.
 * Always returns a stable shape so the renderer is simple.
 */
export const buildBreakdown = ({ clipsPerMonth, plan }) => {
    const creditsNeeded = clipsPerMonth * CREDITS_PER_CLIP;
    const buffer = Math.max(0, (plan.monthlyCredits ?? 0) - creditsNeeded);
    const overflows = creditsNeeded > (plan.monthlyCredits ?? 0);

    return {
        clipsPerMonth,
        creditsNeeded,
        planCredits: plan.monthlyCredits ?? 0,
        buffer,
        overflows,
        // Atelier (the top plan) triggers the top-up mention because the user
        // is at the ceiling and any growth means top-ups.
        showTopUpHint: plan.id === 'atelier' || overflows,
    };
};

/**
 * Slider ticks shown along the bar (visual + click targets).
 */
export const VOLUME_SLIDER = {
    min: 0,
    max: 500,
    step: 5,
    default: 30,
    ticks: [0, 25, 75, 150, 300, 500],
    formatValue: (v) => (v >= 500 ? '500+ clips' : `${v} clips`),
};

/**
 * Content-type pills (multi-select). Currently informational only; selections
 * don't drive the recommendation logic (per brief).
 */
export const CONTENT_TYPES = [
    { id: 'images', label: 'Images' },
    { id: 'video', label: 'Video clips' },
    { id: 'cinematic', label: 'Cinematic sequences' },
    { id: 'characters', label: 'Characters' },
    { id: 'worlds', label: 'World building' },
    { id: 'audio', label: 'Music and sound' },
];

export const REASSURANCE_BAND_TEXT = {
    intro: 'Cancel, downgrade or pause anytime from your account. 7-day refund window on your first paid month. Your projects stay yours.',
    topUp: 'Need more credits? Top up anytime from your dashboard.',
    accountUrl: APP_URL,
};
