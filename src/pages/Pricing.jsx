import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/cn';
import { track } from '../lib/analytics';
import CostCalculator from '../components/sections/pricing/CostCalculator';
import ComparisonTable from '../components/sections/pricing/ComparisonTable';
import PricingFaq from '../components/sections/pricing/PricingFaq';
import PricingFooterCta from '../components/sections/pricing/PricingFooterCta';
import TrustSignals from '../components/sections/pricing/TrustSignals';
import { faqJsonLd } from '../config/pricing-comparison';
import {
    PLANS,
    getCheckoutUrl,
    YEARLY_SAVINGS_PERCENT,
    FOUNDING_CREATOR_NOTE,
    REASSURANCE_BAND_TEXT,
} from '../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../config/pricing-media';
import PriceBlock from '../components/sections/pricing/PriceBlock';

// ─── Billing toggle ─────────────────────────────────────────────────────────

const BillingToggle = ({ period, onChange }) => {
    const isYearly = period === 'yearly';
    return (
        // One animated background pill that slides between two fixed
        // positions. Both buttons share the exact same width (w-36) and no
        // gap between them, so the pill is guaranteed identical in size
        // regardless of which button is active — the prior layoutId-based
        // approach was inheriting each button's slightly different intrinsic
        // width despite w-36.
        <div className="relative inline-flex items-center surface-card border border-subtle rounded-full p-1 shadow-card">
            <motion.div
                aria-hidden="true"
                className="absolute top-1 bottom-1 left-1 w-36 bg-ink rounded-full shadow-card"
                animate={{ x: isYearly ? '100%' : 0 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
            />
            <button
                type="button"
                onClick={() => onChange('monthly')}
                className="relative z-10 w-36 py-2 rounded-full text-sm font-medium flex items-center justify-center"
            >
                <span className={cn('transition-colors', !isYearly ? 'text-white' : 'text-muted hover:text-strong')}>
                    Monthly
                </span>
            </button>
            <button
                type="button"
                onClick={() => onChange('yearly')}
                className="relative z-10 w-36 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2"
            >
                <span className={cn('transition-colors', isYearly ? 'text-white' : 'text-muted hover:text-strong')}>
                    Yearly
                </span>
                <span
                    className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors',
                        isYearly ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-100/60 text-emerald-700/70'
                    )}
                >
                    -{YEARLY_SAVINGS_PERCENT}%
                </span>
            </button>
        </div>
    );
};

// ─── Plan card ──────────────────────────────────────────────────────────────
//
// Card-as-button pattern:
//   The whole article is a single click target via a stretched-link <a>
//   absolutely positioned over the card. The visible "CTA button" inside
//   the card is purely decorative (a <span>) and only reflects hover state
//   via `group-hover:*` — there's no nested <a> inside another <a>, which
//   would break accessibility.
//
// All cards share the same baseline look now (no special Director fill /
// scale, no "Recommended" badge). Atelier keeps its subtle premium ring.
// The calculator-driven `highlighted` prop still pulses a ring when the
// slider lands on a tier.

const PlanCard = ({ plan, period, delay, className, highlighted }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        // Throttle: only the first hover per card per session-snapshot.
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period });
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            // y is driven by framer-motion (not Tailwind) because the
            // inline transform from the entrance animation otherwise
            // wins over `hover:-translate-y-*` classes. Highlighted
            // cards rest at -6, hovered cards lift further to -10.
            animate={{ opacity: 1, y: highlighted ? -6 : 0 }}
            whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 380, damping: 26 },
            }}
            transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            className={cn(
                // overflow-hidden clips the full-bleed banner image on the
                // card's rounded-3xl outer corners. Note: ring-* on the
                // article itself still paints outside the clip (rings are
                // drawn as box-shadow on the host, not on descendants).
                'group relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8 overflow-hidden',
                'surface-card border border-subtle shadow-card cursor-pointer',
                // Only animate non-transform props via Tailwind so we don't
                // clash with motion's inline transform.
                'transition-[box-shadow,border-color] duration-300',
                'hover:shadow-lifted hover:border-ink/30',
                // Atelier keeps a faint accent ring as Premium signal.
                premium && 'ring-1 ring-accent/15',
                // Calculator-driven highlight: ring + lifted shadow. The
                // actual lift is in the `animate` prop above.
                highlighted && 'ring-2 ring-accent/60 ring-offset-2 ring-offset-paper shadow-lifted',
                className,
            )}
        >
            {/* Stretched link — the entire card is one click target.
                Everything else inside the card is non-interactive text /
                images, so we don't need extra z-index management.

                Uses focus-visible:outline-* (not ring-*) because the
                article's overflow-hidden would clip a box-shadow ring. */}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                aria-label={`${plan.tier} — ${plan.cta}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
                <span className="sr-only">{plan.cta}</span>
            </a>

            {/* Premium badge — Atelier only */}
            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 z-20 pointer-events-none px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            {/* Image + title block. When the plan has media (Explore /
                Creator / Director / Studio): a full-bleed 16:9 banner sits
                at the top of the card, with the plan name floating as a
                glassmorphism pill at the top-left of the image, and a
                transparent → white gradient at the bottom of the image
                dissolving it into the card surface (#FFFFFF).

                Hover swap: when `media.sketchSrc` is provided, the B&W
                storyboard is the default visual and the colored master
                fades in on card hover.

                When the plan has no media (Production / Atelier): falls
                back to a normal `<h3>` in the padded zone, preserving
                hierarchy. */}
            {media ? (
                <div className="relative -mx-7 lg:-mx-8 -mt-7 lg:-mt-8 mb-6 lg:mb-7 overflow-hidden rounded-t-3xl aspect-[16/9] bg-paper">
                    {media.sketchSrc && (
                        <img
                            src={media.sketchSrc}
                            srcSet={media.sketchSrcSet}
                            sizes={PLAN_MEDIA_SIZES}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="360"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                    )}
                    <img
                        src={media.src}
                        srcSet={media.srcSet}
                        sizes={PLAN_MEDIA_SIZES}
                        alt={media.alt}
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="360"
                        className={cn(
                            'w-full h-full object-cover transition-opacity duration-300',
                            // If a sketch exists, the colored layer hides until hover.
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />

                    {/* Fade gradient: image dissolves into the card's
                        white surface at the bottom. Sits BELOW the frost
                        pill in DOM order so the pill stays fully opaque. */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white pointer-events-none"
                    />

                    <h3 className="absolute top-4 left-4 inline-block px-3 py-1 rounded-lg bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg text-strong text-[18px] lg:text-[20px] font-medium tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
                        {plan.tier}
                    </h3>
                </div>
            ) : (
                <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                    {plan.tier}
                </h3>
            )}

            <div className="mb-6">
                <PriceBlock plan={plan} period={period} />
            </div>

            {/* CTA visual — decorative span, NOT a separate link. Reflects
                card-level hover via group-hover. Tabbing focuses the
                stretched <a> above, not this span. */}
            <div className="space-y-2">
                <span
                    aria-hidden="true"
                    className={cn(
                        'block w-full py-3 px-4 rounded-full text-[15px] font-medium text-center whitespace-nowrap',
                        'border border-ink text-strong transition-all duration-300',
                        'group-hover:bg-ink group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-card',
                    )}
                >
                    {plan.cta}
                </span>
                {plan.ctaHint && (
                    <p className="text-[11px] text-center text-muted">{plan.ctaHint}</p>
                )}
            </div>

            {/* Founding Creator note — slot reserved on Explore too to keep CTAs aligned */}
            <p
                aria-hidden={plan.free ? 'true' : undefined}
                className={cn(
                    'mt-3 mb-6 text-[10px] font-mono uppercase tracking-widest text-center text-faint',
                    plan.free && 'invisible',
                )}
            >
                {FOUNDING_CREATOR_NOTE}
            </p>

            {/* Description */}
            <p className="text-sm leading-relaxed text-default mb-5">
                {plan.intro}
            </p>

            {/* "Everything in X, plus:" inheritance line */}
            {plan.inheritsFrom && (
                <p className="text-sm font-medium text-strong mb-3">
                    Everything in {plan.inheritsFrom}, plus:
                </p>
            )}

            {/* Features */}
            <ul className="space-y-3">
                {plan.bullets.map((bullet, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-default"
                    >
                        <Check size={16} className="mt-0.5 shrink-0 text-strong" />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
        </motion.article>
    );
};

// ─── Reassurance band ───────────────────────────────────────────────────────

const ReassuranceBand = () => (
    <div className="max-w-3xl mx-auto text-center mt-14 text-sm text-muted leading-relaxed px-4">
        {REASSURANCE_BAND_TEXT.intro}{' '}
        <a
            href={REASSURANCE_BAND_TEXT.accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-strong underline underline-offset-4 decoration-faint hover:decoration-strong"
        >
            Need more credits? Top up anytime from your dashboard.
        </a>
    </div>
);

// ─── Responsive grid placement helper ───────────────────────────────────────
//
// 6 cards across viewports:
//   mobile  (1 col): stack 1×6
//   md/lg   (2 col): 3 rows of 2 — Explore+Creator, Director+Studio, then
//                    the production-grade heading takes its own full-width
//                    row before Production+Atelier on the last row.
//   xl+     (4 col): row 1 of 4 (Explore→Studio), then the heading on a
//                    full-width row, then Production+Atelier centered on
//                    cols 2-3 of the next row.
//
// On xl, the last two cards need explicit col-start values to land in the
// middle, otherwise they default to the left edge.
const GRID_PLACEMENT = {
    4: 'xl:col-start-2',  // Production (5th card, index 4)
    5: 'xl:col-start-3',  // Atelier   (6th card, index 5)
};

// Full-width section heading shown before Production on every viewport.
const ProTierDivider = () => (
    <div className="col-span-full mt-6 md:mt-8">
        <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-strong mb-2">
                For production teams and studios.
            </h2>
            <p className="text-muted text-base">
                Higher capacity, dedicated lanes, and team seats for sustained output.
            </p>
        </div>
    </div>
);

// ─── Page ───────────────────────────────────────────────────────────────────

const Pricing = () => {
    const [period, setPeriod] = useState('yearly');
    // The calculator reports the plan it's currently recommending; we
    // mirror that as a subtle highlight on the matching grid card.
    const [recommendedPlanId, setRecommendedPlanId] = useState(null);

    // Page-view event fires once per mount.
    useEffect(() => {
        track('pricing_page_view');
    }, []);

    // Wrap setPeriod so analytics see the toggle change exactly once.
    const handlePeriodChange = (next) => {
        if (next === period) return;
        track('billing_toggle_switch', { from: period, to: next });
        setPeriod(next);
    };

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
            <SEO
                title="Pricing built for cinematic creation"
                description="Generative filmmaking pricing. Start free, scale to Director, run sustained production with Studio, or build series and franchises with Atelier. Credits, premium models, commercial license, no watermark. Secure checkout via Stripe."
                canonical="/pricing"
                structuredData={faqJsonLd()}
            />

            <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto">
                {/* Hero — single-row layout: title block on the left, billing
                    toggle on the right. Falls back to stacked on small viewports. */}
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-strong mb-3 leading-[1.1]"
                        >
                            Pricing built for cinematic creation.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-lg md:text-xl text-muted font-light"
                        >
                            Start free. Scale as your worlds grow.
                        </motion.p>
                    </div>

                    <div className="shrink-0">
                        <BillingToggle period={period} onChange={handlePeriodChange} />
                    </div>
                </header>

                {/* Plans grid: 1 / 2 / 3 / 4-then-2-centered */}
                <div
                    id="pricing-grid"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch pt-6"
                >
                    {PLANS.map((plan, i) => (
                        <React.Fragment key={plan.id}>
                            {plan.id === 'production' && <ProTierDivider />}
                            <PlanCard
                                plan={plan}
                                period={period}
                                delay={0.04 * i}
                                className={GRID_PLACEMENT[i]}
                                highlighted={recommendedPlanId === plan.id}
                            />
                        </React.Fragment>
                    ))}
                </div>

                <ReassuranceBand />

                <CostCalculator
                    period={period}
                    onPeriodChange={handlePeriodChange}
                    onRecommendedChange={setRecommendedPlanId}
                />

                <TrustSignals />

                <ComparisonTable />

                <PricingFaq />

                <PricingFooterCta />
            </div>
        </div>
    );
};

export default Pricing;
