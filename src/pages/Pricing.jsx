import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/cn';
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
        <div className="inline-flex items-center gap-1 surface-card border border-subtle rounded-full p-1 shadow-card">
            <button
                type="button"
                onClick={() => onChange('monthly')}
                className="relative isolate px-5 py-2 rounded-full text-sm font-medium"
            >
                {!isYearly && (
                    <motion.span
                        layoutId="billing-toggle-bg"
                        className="absolute inset-0 bg-ink rounded-full -z-10 shadow-card"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                )}
                <span className={cn('relative z-10 transition-colors', !isYearly ? 'text-white' : 'text-muted hover:text-strong')}>
                    Monthly
                </span>
            </button>
            <button
                type="button"
                onClick={() => onChange('yearly')}
                className="relative isolate px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2"
            >
                {isYearly && (
                    <motion.span
                        layoutId="billing-toggle-bg"
                        className="absolute inset-0 bg-ink rounded-full -z-10 shadow-card"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                )}
                <span className={cn('relative z-10 transition-colors', isYearly ? 'text-white' : 'text-muted hover:text-strong')}>
                    Yearly
                </span>
                <span
                    className={cn(
                        'relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors',
                        isYearly ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-100/60 text-emerald-700/70'
                    )}
                >
                    -{YEARLY_SAVINGS_PERCENT}%
                </span>
            </button>
        </div>
    );
};

// ─── Price block ────────────────────────────────────────────────────────────

const PriceBlock = ({ plan, period }) => {
    if (plan.free) {
        return (
            <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-medium tracking-tight text-strong">$0</span>
                <span className="text-sm text-muted">forever</span>
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
                        ${price.toFixed(2)}
                    </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted">/ month</span>
            </div>
            <div className="mt-2 min-h-[2.5em] text-xs leading-relaxed text-muted">
                {period === 'yearly' ? (
                    <>
                        billed annually at ${yearlyTotal} / year
                        <br />
                        <span className="text-emerald-700 font-medium">
                            Save {YEARLY_SAVINGS_PERCENT}%
                        </span>
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
                    // Solid ink button stands out on the beige featured card
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

const PlanCard = ({ plan, period, delay }) => {
    const href = getCheckoutUrl(plan.id, period);
    const featured = !!plan.recommended;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'relative flex flex-col h-full rounded-3xl p-7 lg:p-8 transition-all duration-300',
                featured
                    // Warm beige fill with accent ring + heavier shadow to lift
                    // the recommended plan above the white outline cards next to it.
                    ? 'bg-[#E8DDC8] text-strong border border-accent/30 shadow-heavy lg:scale-[1.02]'
                    : 'surface-card border border-subtle shadow-card hover:shadow-lifted hover:-translate-y-1'
            )}
        >
            {featured && plan.recommendedLabel && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-ink text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-card whitespace-nowrap">
                    {plan.recommendedLabel}
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 text-muted">
                    {plan.tier}
                </h3>
                <PriceBlock plan={plan} period={period} />
            </div>

            <p className="text-sm leading-relaxed mb-6 text-default">
                {plan.intro}
            </p>

            <ul className="space-y-3 mb-8 flex-1">
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

            <PlanCta href={href} label={plan.cta} hint={plan.ctaHint} featured={featured} />

            {/* Always reserve space for the founding-creator note so all four
                CTAs land on the same vertical baseline. The free plan keeps
                the slot but hides the text. */}
            <p
                aria-hidden={plan.free ? 'true' : undefined}
                className={cn(
                    'mt-4 text-[10px] font-mono uppercase tracking-widest text-center text-faint',
                    plan.free && 'invisible',
                )}
            >
                {FOUNDING_CREATOR_NOTE}
            </p>
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

// ─── Page ───────────────────────────────────────────────────────────────────

const Pricing = () => {
    const [period, setPeriod] = useState('yearly');

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 surface-page">
            <SEO
                title="Pricing for creators, directors and studios"
                description="Generative filmmaking pricing. Start free, scale to Director, or run sustained production with Studio. Credits, premium models, commercial license, no watermark. Secure checkout via Stripe."
                canonical="/pricing"
            />

            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <header className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-strong mb-6 max-w-4xl mx-auto leading-[1.1]"
                    >
                        Pricing for creators building worlds, characters and cinematic stories with AI.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-light mb-4"
                    >
                        Start free. Scale your credits, your speed, and your commercial rights as your projects grow.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-sm text-faint mb-10"
                    >
                        Cancel anytime. No hidden fees. Secure checkout via Stripe.
                    </motion.p>

                    <BillingToggle period={period} onChange={setPeriod} />
                </header>

                {/* Plans grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-6">
                    {PLANS.map((plan, i) => (
                        <PlanCard key={plan.id} plan={plan} period={period} delay={0.05 * i} />
                    ))}
                </div>

                <ReassuranceBand />
            </div>
        </div>
    );
};

export default Pricing;
