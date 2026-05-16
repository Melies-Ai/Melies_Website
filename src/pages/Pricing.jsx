import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/cn';
import CostCalculator from '../components/sections/pricing/CostCalculator';
import ComparisonTable from '../components/sections/pricing/ComparisonTable';
import PricingFaq from '../components/sections/pricing/PricingFaq';
import PricingFooterCta from '../components/sections/pricing/PricingFooterCta';
import { faqJsonLd } from '../config/pricing-comparison';
import {
    PLANS,
    getCheckoutUrl,
    formatYearlyTotal,
    YEARLY_SAVINGS_PERCENT,
    FOUNDING_CREATOR_NOTE,
    REASSURANCE_BAND_TEXT,
} from '../config/pricing';

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

// ─── Price block (price + period + billing line, 2 lines max per brief) ─────

const formatMoney = (value) => {
    // Whole numbers display without decimals ($199), .99 prices keep them ($15.99).
    return value % 1 === 0 ? `$${value.toLocaleString()}` : `$${value.toFixed(2)}`;
};

const PriceBlock = ({ plan, period }) => {
    if (plan.free) {
        return (
            <div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-medium tracking-tight text-strong">$0</span>
                    <span className="text-sm text-muted">/ month</span>
                </div>
                <div className="mt-1 text-sm text-muted">Free forever</div>
            </div>
        );
    }

    const price = period === 'yearly' ? plan.yearlyPriceMonthly : plan.monthlyPrice;
    const yearlyTotal = formatYearlyTotal(plan.yearlyPriceMonthly);

    return (
        <div>
            <div className="flex items-baseline gap-1.5">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`${plan.id}-${period}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-5xl font-medium tracking-tight text-strong"
                    >
                        {formatMoney(price)}
                    </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted">/ month</span>
            </div>
            <div className="mt-1 text-sm text-muted min-h-[1.4em]">
                {period === 'yearly' ? (
                    <>
                        ${yearlyTotal.toLocaleString()} billed yearly,{' '}
                        <span className="text-emerald-700 font-medium">save {YEARLY_SAVINGS_PERCENT}%</span>
                    </>
                ) : (
                    <span className="text-faint">
                        Switch to yearly to save {YEARLY_SAVINGS_PERCENT}%
                    </span>
                )}
            </div>
        </div>
    );
};

// ─── CTA (plain anchor to Stripe / signup, styled per card variant) ─────────

const PlanCta = ({ href, label, hint, featured }) => (
    <div className="space-y-2">
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'block w-full py-3 px-4 rounded-full text-[15px] font-medium text-center whitespace-nowrap transition-all duration-300',
                featured
                    ? 'bg-ink text-white hover:bg-ink/90 hover:-translate-y-0.5 shadow-card hover:shadow-lifted'
                    : 'border border-ink text-strong hover:bg-ink hover:text-white hover:-translate-y-0.5'
            )}
        >
            {label}
        </a>
        {hint && (
            <p className="text-[11px] text-center text-muted">{hint}</p>
        )}
    </div>
);

// ─── Plan card ──────────────────────────────────────────────────────────────

const PlanCard = ({ plan, period, delay, className, highlighted }) => {
    const href = getCheckoutUrl(plan.id, period);
    const featured = !!plan.recommended;
    const premium = !!plan.premium;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8 transition-all duration-300',
                featured
                    // Director — warm sand-beige + accent ring + heavier shadow
                    ? 'bg-[#E8DDC8] text-strong border border-accent/30 shadow-heavy lg:scale-[1.02]'
                    : premium
                        // Atelier — white card with a subtle accent ring (Premium signal)
                        ? 'surface-card border border-accent/40 ring-1 ring-accent/15 shadow-card hover:shadow-lifted hover:-translate-y-1'
                        // Default outline cards
                        : 'surface-card border border-subtle shadow-card hover:shadow-lifted hover:-translate-y-1',
                // Calculator-driven highlight: subtle accent ring + lift to draw
                // the eye to the matching grid card when the user moves the slider.
                highlighted && 'ring-2 ring-accent/60 ring-offset-2 ring-offset-paper -translate-y-1 shadow-lifted',
                className,
            )}
        >
            {/* Background image slot — empty by default, configurable per plan */}
            {plan.bgImage && (
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl pointer-events-none">
                    <img
                        src={plan.bgImage}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                        style={{
                            opacity: plan.bgOpacity ?? 0.15,
                            mixBlendMode: plan.bgBlend ?? 'multiply',
                        }}
                    />
                </div>
            )}

            {/* Centered badges */}
            {featured && plan.recommendedLabel && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-ink text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-card whitespace-nowrap">
                    {plan.recommendedLabel}
                </div>
            )}
            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            {/* Header — plan name first, then price. Same font-medium /
                tracking-tight as the page h1, so titles read as one family. */}
            <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                {plan.tier}
            </h3>

            <div className="mb-6">
                <PriceBlock plan={plan} period={period} />
            </div>

            {/* CTA before the description / features list per brief */}
            <PlanCta href={href} label={plan.cta} hint={plan.ctaHint} featured={featured} />

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
                        <BillingToggle period={period} onChange={setPeriod} />
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
                    onPeriodChange={setPeriod}
                    onRecommendedChange={setRecommendedPlanId}
                />

                <ComparisonTable />

                <PricingFaq />

                <PricingFooterCta />
            </div>
        </div>
    );
};

export default Pricing;
