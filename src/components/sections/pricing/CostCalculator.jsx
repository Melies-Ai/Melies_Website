import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/cn';
import { track } from '../../../lib/analytics';
import {
    PLANS,
    getCheckoutUrl,
    formatYearlyTotal,
    YEARLY_SAVINGS_PERCENT,
    recommendPlanFromVolume,
    buildBreakdown,
    VOLUME_SLIDER,
} from '../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../config/pricing-media';
import MiniBillingToggle from './MiniBillingToggle';

// en-US locale on every number so French browsers don't add NBSP separators.
const formatInt = (n) => (n ?? 0).toLocaleString('en-US');
const formatMoney = (value) =>
    value % 1 === 0 ? `$${formatInt(value)}` : `$${value.toFixed(2)}`;

// ─── Tiny helper: swap a piece of text with a soft slide+fade ───────────────

const AnimatedSwap = ({ swapKey, children, className }) => (
    <AnimatePresence mode="wait">
        <motion.span
            key={swapKey}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={cn('inline-block', className)}
        >
            {children}
        </motion.span>
    </AnimatePresence>
);

// ─── Slider ─────────────────────────────────────────────────────────────────

const VolumeSlider = ({ value, onChange }) => {
    const { min, max, step, ticks, formatValue } = VOLUME_SLIDER;
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className="relative pb-12">
            {/* Track + tick marks */}
            <div className="relative h-2">
                <div className="absolute inset-0 bg-ink/8 rounded-full" />
                <div
                    className="absolute top-0 left-0 h-full bg-ink rounded-full transition-[width] duration-100"
                    style={{ width: `${percent}%` }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    {ticks.map((tick) => {
                        const tickPercent = ((tick - min) / (max - min)) * 100;
                        return (
                            <span
                                key={tick}
                                className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-ink/30"
                                style={{ left: `${tickPercent}%`, transform: 'translate(-50%, -50%)' }}
                            />
                        );
                    })}
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    aria-label="Estimated minutes of video per month"
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-8 -top-3"
                />
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-[left] duration-100 pointer-events-none"
                    style={{ left: `${percent}%` }}
                >
                    <div className="w-5 h-5 bg-white rounded-full ring-[3px] ring-ink shadow-card" />
                </div>
            </div>

            {/* Floating label BELOW the handle, with a small caret pointing up */}
            <div
                className="absolute -translate-x-1/2 transition-[left] duration-100 pointer-events-none"
                style={{ left: `${percent}%`, top: '1.25rem' }}
            >
                <div className="w-2 h-2 bg-ink rotate-45 mx-auto -mb-1" />
                <div className="bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-card whitespace-nowrap">
                    {formatValue(value)}
                </div>
            </div>

            {/* Static end labels */}
            <div className="flex justify-between mt-3 text-[11px] text-faint font-mono">
                <span>0</span>
                <span>500+</span>
            </div>
        </div>
    );
};

// ─── Breakdown panel (invoice-style, all-in-one right column) ───────────────

const BreakdownRow = ({ label, value, swapKey, muted }) => (
    <div className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
        <span className={muted ? 'text-faint' : 'text-muted'}>{label}</span>
        <span className={cn('font-medium tabular-nums text-right', muted ? 'text-faint' : 'text-default')}>
            <AnimatedSwap swapKey={swapKey}>{value}</AnimatedSwap>
        </span>
    </div>
);

/**
 * CollapsibleRow — wraps a conditional BreakdownRow so it stays in the DOM
 * but collapses to max-h-0 (with overflow hidden) when not applicable.
 * The CSS max-height transition interpolates the parent's height smoothly,
 * so the rows below (and the CTA further down) glide into position instead
 * of teleporting when the row appears/disappears.
 *
 * Carries its own border-top so the divider only shows when the row is
 * visible — otherwise we'd get stacked dividers underneath the rows above.
 *
 * max-h-16 (64px) is a safe upper bound for a single ~44px row including
 * its py-2.5 padding; only the first ~70% of the transition has visible
 * movement, the rest is no-op padding, but the 300ms total still reads
 * as a smooth glide.
 */
const CollapsibleRow = ({ visible, children }) => (
    <div
        className={cn(
            'overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
            visible ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!visible}
    >
        <div className="border-t border-ink/10">{children}</div>
    </div>
);

const BreakdownPanel = ({ plan, period, breakdown }) => {
    const href = getCheckoutUrl(plan.id, period);
    const isFree = plan.free;
    const price = period === 'yearly' ? plan.yearlyPriceMonthly : plan.monthlyPrice;
    const yearlyTotal = formatYearlyTotal(plan.yearlyPriceMonthly ?? 0);

    const volumeLabel = breakdown.minutesPerMonth >= 250
        ? '250+ min / month'
        : `${breakdown.minutesPerMonth} min / month`;

    const totalDisplay = isFree ? 'Free' : formatMoney(price);
    const totalSuffix = isFree
        ? 'forever'
        : period === 'yearly'
            ? `$${formatInt(yearlyTotal)} billed yearly, save ${YEARLY_SAVINGS_PERCENT}%`
            : `or ${formatMoney(plan.yearlyPriceMonthly)} / mo billed yearly`;

    const totalLabel = isFree
        ? 'Total cost (estimated)'
        : period === 'yearly'
            ? 'Yearly cost (estimated)'
            : 'Monthly cost (estimated)';

    const media = PLAN_MEDIA[plan.id];

    return (
        // Scene card pattern — image backdrop + frost content panel.
        // See DESIGN_SYSTEM.md §06 for the recipe.
        <div className="scene-card" aria-live="polite">
            {/* Image backdrop. Fades cross-plan when the slider changes
                the recommendation. Falls back to a soft paper color
                when no media is mapped (Production / Atelier). */}
            {media ? (
                <AnimatePresence mode="wait">
                    <motion.img
                        key={`media-${plan.id}`}
                        src={media.src}
                        srcSet={media.srcSet}
                        sizes={PLAN_MEDIA_SIZES}
                        alt={media.alt}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            ) : (
                <div className="absolute inset-0 bg-paper" />
            )}

            {/* Frost content panel — holds the breakdown rows + total + CTA.
                min-h-[525px] absorbs the row-count variation across plans
                (3 rows for Director-exact-fit, up to 5 rows for Atelier with
                buffer + top-up) so the card height stays stable as the user
                drags the slider across tier boundaries — no more visual jump. */}
            <div className="scene-frost min-h-[525px]">
                {/* Plan name header */}
                <div className="mb-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">
                        Recommended plan
                    </div>
                    <h3 className="text-[24px] lg:text-[28px] font-medium tracking-tight text-strong leading-none">
                        <AnimatedSwap swapKey={`tier-${plan.id}`}>{plan.tier}</AnimatedSwap>
                    </h3>
                </div>

                {/* Line items — invoice-style. The 3 always-present rows share
                    dividers via divide-y. The 2 conditional rows (buffer,
                    top-up) are always rendered in the DOM but collapse to
                    max-h-0 via a CSS transition when not applicable — the
                    parent's height (and therefore the CTA position below)
                    interpolates smoothly instead of jumping when rows
                    appear/disappear. */}
                <div className="divide-y divide-ink/10">
                    <BreakdownRow
                        label="Your estimated volume"
                        value={volumeLabel}
                        swapKey={`vol-${breakdown.minutesPerMonth}`}
                    />
                    <BreakdownRow
                        label="Estimated credits needed (~100 per minute)"
                        value={`${formatInt(breakdown.creditsNeeded)} credits`}
                        swapKey={`needed-${breakdown.creditsNeeded}`}
                    />
                    <BreakdownRow
                        label={`Included in ${plan.tier}`}
                        value={`${formatInt(breakdown.planCredits)} credits`}
                        swapKey={`included-${plan.id}`}
                    />
                </div>

                <CollapsibleRow visible={!breakdown.overflows && breakdown.buffer > 0}>
                    <BreakdownRow
                        label="Buffer for experimentation"
                        value={`${formatInt(breakdown.buffer)} credits`}
                        swapKey={`buffer-${breakdown.buffer}`}
                        muted
                    />
                </CollapsibleRow>

                <CollapsibleRow visible={breakdown.showTopUpHint}>
                    <BreakdownRow
                        label="Top-up packs available"
                        value="from $9"
                        swapKey="topup"
                        muted
                    />
                </CollapsibleRow>

                {/* Total + CTA */}
                <div className="border-t-2 border-ink/15 mt-4 pt-5">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="text-base font-medium text-strong">{totalLabel}</span>
                    <span className="text-3xl md:text-4xl font-medium tracking-tight text-strong tabular-nums">
                        <AnimatedSwap swapKey={`${plan.id}-${period}-price`}>
                            {totalDisplay}
                        </AnimatedSwap>
                    </span>
                </div>
                <div className="text-xs text-muted text-right mb-6 min-h-[1.2em]">
                    <AnimatedSwap swapKey={`${plan.id}-${period}-suffix`}>
                        {totalSuffix}
                    </AnimatedSwap>
                </div>

                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        track('plan_cta_click', {
                            plan_name: plan.id,
                            billing_period: period,
                            source: 'calculator',
                        });
                        if (!isFree) {
                            track('stripe_checkout_started', {
                                plan_name: plan.id,
                                billing_period: period,
                                source: 'calculator',
                            });
                        }
                    }}
                    className="block w-full py-3 px-4 bg-ink text-white text-center rounded-full text-base font-medium hover:bg-ink/90 hover:-translate-y-0.5 transition-all duration-300 shadow-card hover:shadow-lifted"
                >
                    <AnimatedSwap swapKey={`${plan.id}-cta`}>
                        {isFree ? 'Start for free' : `Get ${plan.tier}`}
                    </AnimatedSwap>
                </a>

                {/* Tagline parked below the CTA as soft footnote, not a competing headline */}
                <p className="text-[11px] text-faint text-center mt-4 leading-relaxed">
                    <AnimatedSwap swapKey={`${plan.id}-tagline`}>
                        {plan.calculatorTagline}
                    </AnimatedSwap>
                </p>
                </div>
            </div>
        </div>
    );
};

// ─── Main component ─────────────────────────────────────────────────────────

const CostCalculator = ({ period, onPeriodChange, onRecommendedChange }) => {
    const [minutes, setMinutes] = useState(VOLUME_SLIDER.default);

    const recommendedPlanId = useMemo(() => recommendPlanFromVolume(minutes), [minutes]);
    const plan = useMemo(
        () => PLANS.find((p) => p.id === recommendedPlanId) ?? PLANS[2],
        [recommendedPlanId],
    );
    const breakdown = useMemo(
        () => buildBreakdown({ minutesPerMonth: minutes, plan }),
        [minutes, plan],
    );

    // Notify parent so the main grid can highlight the matching card.
    const lastReported = useRef(null);
    useEffect(() => {
        if (lastReported.current !== recommendedPlanId) {
            lastReported.current = recommendedPlanId;
            onRecommendedChange?.(recommendedPlanId);
        }
    }, [recommendedPlanId, onRecommendedChange]);

    // Fire calculator_visible once on first scroll into view.
    const sectionRef = useRef(null);
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    track('calculator_visible');
                    obs.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    const handleSliderChange = (value) => {
        setMinutes(value);
        // Slider events are noisy; batched via animation frame so we don't
        // hammer dataLayer on every micro-pixel move.
        track('calculator_slider_change', {
            minutes_value: value,
            current_recommendation: recommendPlanFromVolume(value),
        });
    };

    const handleBillingToggle = (next) => {
        if (next === period) return;
        track('calculator_billing_toggle', { from: period, to: next });
        onPeriodChange?.(next);
    };

    return (
        <section ref={sectionRef} className="relative mt-24 mb-16 -mx-6 px-6 py-16 lg:py-20 surface-section">
            <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* LEFT: header + slider only (the billing toggle moved
                        to the right column, above the breakdown card). */}
                    <div className="space-y-10">
                        <header>
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-strong mb-3">
                                Estimate your monthly cost.
                            </h2>
                            <p className="text-muted text-lg font-light">
                                Move the slider to see how pricing scales with your production volume.
                            </p>
                        </header>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">1</span>
                                <h3 className="text-lg font-medium text-strong">Estimated video minutes per month</h3>
                            </div>
                            <div className="pl-10">
                                <VolumeSlider value={minutes} onChange={handleSliderChange} />
                            </div>
                        </div>

                        <p className="text-[11px] text-faint leading-relaxed pl-10">
                            Estimates based on average cinematic generation (around 100 credits per minute of video). Your actual usage may vary depending on models, resolution, and complexity.
                        </p>
                    </div>

                    {/* RIGHT: billing toggle + breakdown panel.
                        Toggle sits above the card, right-aligned so it visually
                        anchors to the panel's top edge. */}
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <MiniBillingToggle period={period} onChange={handleBillingToggle} />
                        </div>
                        <BreakdownPanel plan={plan} period={period} breakdown={breakdown} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostCalculator;
