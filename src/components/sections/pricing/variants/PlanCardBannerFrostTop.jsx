import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

/**
 * V4 — Banner + frost title (TOP). Same as V3 but the title pill is
 * positioned at the top-left of the image instead of the bottom-left.
 * Pushes the title to lead the scan from above, with the image's main
 * subject visible below it. Useful when the image's most evocative
 * region is in the lower two-thirds (which is true for tes 4 visuels
 * — sky/skyline at top, action in the middle/bottom).
 *
 * Intentional divergences from production PlanCard (same as V1-V3):
 *   - No `highlighted` / `delay` / `className` props.
 *   - `animate` uses a fixed `y: 0`.
 *   - All `track()` calls carry `source: 'lab_v4_banner_frost_top'`.
 *
 * Layout deltas vs V3:
 *   - Frost pill positioned `top-4 left-4` instead of `bottom-4 left-4`.
 *   - Everything else identical to V3 (aspect-[4/3], same frost styling,
 *     same focus ring fix, same fallback h3 for plans with no media).
 */
const PlanCardBannerFrostTop = ({ plan, period }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source: 'lab_v4_banner_frost_top' });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source: 'lab_v4_banner_frost_top' });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source: 'lab_v4_banner_frost_top' });
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

            {media ? (
                <div className="relative -mx-7 lg:-mx-8 -mt-7 lg:-mt-8 mb-6 lg:mb-7 overflow-hidden rounded-t-3xl aspect-[4/3] bg-paper">
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
                            height="480"
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
                        height="480"
                        className={cn(
                            'w-full h-full object-cover transition-opacity duration-300',
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />

                    <h3 className="absolute top-4 left-4 inline-block px-4 py-2 rounded-2xl bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg text-strong text-[24px] lg:text-[26px] font-medium tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
                        {plan.tier}
                    </h3>
                </div>
            ) : (
                // No media for this plan — fall back to a normal title to
                // preserve hierarchy. Production and Atelier (which don't
                // have images) take this path.
                <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                    {plan.tier}
                </h3>
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

export default PlanCardBannerFrostTop;
