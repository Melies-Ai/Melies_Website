import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

// Title-size variants for the frost pill. Each entry bundles text size,
// pill padding and corner radius so the pill stays proportioned at each
// size point. Defaults to 'md' which matches what's currently shipped in
// production (`src/pages/Pricing.jsx`'s PlanCard).
//
// The three `sm-*` variants share the same text size (18-20px) but
// progressively reduce the pill's vertical padding to test how flat
// the pill can become before it loses presence. Corner radius drops
// in step so the pill stays visually balanced at each height.
const TITLE_SIZES = {
    sm: {
        text: 'text-[18px] lg:text-[20px]',
        padding: 'px-3 py-1.5',
        rounded: 'rounded-xl',
    },
    'sm-slim': {
        text: 'text-[18px] lg:text-[20px]',
        padding: 'px-3 py-1',
        rounded: 'rounded-lg',
    },
    'sm-flat': {
        text: 'text-[18px] lg:text-[20px]',
        padding: 'px-3 py-0.5',
        rounded: 'rounded-full',
    },
    md: {
        text: 'text-[24px] lg:text-[26px]',
        padding: 'px-4 py-2',
        rounded: 'rounded-2xl',
    },
};

/**
 * V5 — Banner + frost title (TOP) + fade gradient. Same as V4 with two
 * key differences that change how the image dialogues with the card:
 *
 *   1. Image is shown WHOLE — `aspect-[16/9]` matches the source aspect
 *      ratio (1672×941 ≈ 16:9), so `object-cover` doesn't crop. The full
 *      composition is visible at full card width.
 *   2. A transparent → white gradient overlays the bottom third of the
 *      image, fading into the card's `surface-card` (`#FFFFFF`). The
 *      image dissolves into the text zone instead of meeting it with a
 *      hard edge — a poster-like vignette transition.
 *
 * Intentional divergences from production PlanCard (same as V2-V4):
 *   - No `highlighted` / `delay` / `className` props.
 *   - `animate` uses a fixed `y: 0`.
 *   - All `track()` calls carry `source: 'lab_v5_banner_frost_top_fade'`.
 *
 * Layout deltas vs V4:
 *   - `aspect-[16/9]` instead of `aspect-[4/3]` (full image, no crop).
 *   - Gradient overlay at the bottom of the image wrapper:
 *     `absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white`.
 *   - Image `<img>` `height` attribute back to `"360"` (matches 16:9 at width 640).
 */
const PlanCardBannerFrostTopFade = ({ plan, period, titleSize = 'md' }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];
    const titleStyle = TITLE_SIZES[titleSize] ?? TITLE_SIZES.md;
    const source = `lab_v5_banner_frost_top_fade_${titleSize}`;

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source });
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

                    {/* Fade gradient: image dissolves into the card's white
                        surface at the bottom. Sits BELOW the frost pill in
                        DOM order so the pill stays fully opaque on top. */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white pointer-events-none"
                    />

                    <h3 className={cn(
                        'absolute top-4 left-4 inline-block',
                        'bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg',
                        'text-strong font-medium tracking-tight',
                        'transition-transform duration-300 group-hover:-translate-y-0.5',
                        titleStyle.text,
                        titleStyle.padding,
                        titleStyle.rounded,
                    )}>
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

export default PlanCardBannerFrostTopFade;
