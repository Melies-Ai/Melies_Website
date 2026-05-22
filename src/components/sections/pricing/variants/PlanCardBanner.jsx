import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

/**
 * V2 — Banner full-bleed. Image moved to the top of the card,
 * edge-to-edge. Title sits in the padded zone below the banner.
 * Mood-led: the image leads the scan, the text follows. Card gets
 * `overflow-hidden` so the banner clips on the rounded-3xl outer corners.
 *
 * Intentional divergences from production PlanCard (same as V1):
 *   - No `highlighted` / `delay` / `className` props.
 *   - `animate` uses a fixed `y: 0`.
 *   - All `track()` calls carry `source: 'lab_v2_banner'`.
 *
 * Layout deltas vs V1 Baseline:
 *   - Card gains `overflow-hidden` (so the image's top corners clip
 *     on the card's rounded-3xl curve).
 *   - Image wrapper uses negative margins `-mx-7 lg:-mx-8 -mt-7 lg:-mt-8`
 *     to escape the card's padding, plus `rounded-t-3xl` to follow
 *     the card's outer corner curve.
 *   - Image moves BEFORE the `<h3>`. Breathing room comes from the
 *     image wrapper's `mb-6 lg:mb-7` (not from a `mt-*` on the title)
 *     so the spacing stays semantically coupled to the image block.
 */
const PlanCardBanner = ({ plan, period }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source: 'lab_v2_banner' });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source: 'lab_v2_banner' });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source: 'lab_v2_banner' });
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
                'group relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8 overflow-hidden',
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
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
                <span className="sr-only">{plan.cta}</span>
            </a>

            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 z-20 pointer-events-none px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            {media && (
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
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />
                </div>
            )}

            <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                {plan.tier}
            </h3>

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

            <p className="text-sm leading-relaxed text-default mt-6 mb-5">
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

export default PlanCardBanner;
