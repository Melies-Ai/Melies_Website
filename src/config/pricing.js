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
 * The 4 plans, in display order. `monthlyPrice` and `yearlyPriceMonthly`
 * are the visible "$X / month" figures; the yearly total + savings line
 * is derived. Keep `tierBackend` for handoff to the app (TIER_3 etc).
 *
 * `bullets` mirror the brief copy 1:1 (Credits / Speed / Quality /
 * Rights / Support order).
 */
export const PLANS = [
    {
        id: 'explore',
        tier: 'Explore',
        tierBackend: 'TIER_0',
        intro: 'Try the engine and generate your first cinematic concept.',
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
        ctaHint: 'No card required',
    },
    {
        id: 'creator',
        tier: 'Creator',
        tierBackend: 'TIER_2',
        intro: 'For solo creators building cinematic concepts and story worlds.',
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
        recommended: true,
        recommendedLabel: 'Recommended for serious projects',
        monthlyPrice: 49.99,
        yearlyPriceMonthly: 39.99,
        bullets: [
            '3,000 credits per month, around 60 clips or three short films',
            '5 generations in parallel',
            'Priority queue, faster processing',
            'All premium and cinematic models',
            'HD exports, commercial usage included, no watermark',
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
        monthlyPrice: 99.99,
        yearlyPriceMonthly: 79.99,
        bullets: [
            '6,000 credits per month, around 120 clips or six short films',
            '10 generations in parallel',
            'Fastest processing queue',
            'All premium and cinematic models, with early access to new models',
            '4K exports, commercial usage included, no watermark',
            'Priority access to Fable, Citizen and Oasis as they ship in 2026',
            'Priority email support',
        ],
        cta: 'Get Studio',
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

export const REASSURANCE_BAND_TEXT = {
    intro: 'Cancel, downgrade or pause anytime from your account. 7-day refund window on your first paid month. Your projects stay yours.',
    topUp: 'Need more credits? Top up anytime from your dashboard.',
    accountUrl: APP_URL,
};
