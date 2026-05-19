import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl, FOUNDING_CREATOR_NOTE } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

/**
 * V1 — Baseline. Image sits between title and price, inside the padded
 * zone (`aspect-[16/9]`, `rounded-2xl`). Acts as the control for the
 * design lab — mirrors the production PlanCard's behavior with three
 * intentional divergences:
 *
 *   1. No `highlighted` / `delay` / `className` props (the lab doesn't
 *      use calculator-driven highlights or stagger delays).
 *   2. `animate` uses a fixed `y: 0` (production uses `y: highlighted ? -6 : 0`).
 *   3. All `track()` calls carry a `source: 'lab_v1_baseline'` field so
 *      lab interactions are distinguishable from prod in analytics.
 */
const PlanCardBaseline = ({ plan, period }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source: 'lab_v1_baseline' });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source: 'lab_v1_baseline' });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source: 'lab_v1_baseline' });
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 380, damping: 26 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            className={cn(
                'group relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8',
                'surface-card border border-subtle shadow-card cursor-pointer',
                'transition-[box-shadow,border-color] duration-300',
                'hover:shadow-lifted hover:border-ink/30',
                premium && 'ring-1 ring-accent/15',
            )}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                aria-label={`${plan.tier} — ${plan.cta}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
                <span className="sr-only">{plan.cta}</span>
            </a>

            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 z-20 pointer-events-none px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                {plan.tier}
            </h3>

            {media && (
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[16/9] bg-paper">
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
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />
                </div>
            )}

            <div className="mb-6">
                <PriceBlock plan={plan} period={period} />
            </div>

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

            <p
                aria-hidden={plan.free ? 'true' : undefined}
                className={cn(
                    'mt-3 mb-6 text-[10px] font-mono uppercase tracking-widest text-center text-faint',
                    plan.free && 'invisible',
                )}
            >
                {FOUNDING_CREATOR_NOTE}
            </p>

            <p className="text-sm leading-relaxed text-default mb-5">
                {plan.intro}
            </p>

            {plan.inheritsFrom && (
                <p className="text-sm font-medium text-strong mb-3">
                    Everything in {plan.inheritsFrom}, plus:
                </p>
            )}

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

export default PlanCardBaseline;
