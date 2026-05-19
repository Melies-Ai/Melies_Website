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
                    aria-label="Estimated clips per month"
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

// ─── Mini billing toggle (synced with main page toggle) ─────────────────────

const MiniBillingToggle = ({ period, onChange }) => (
    <div className="inline-flex items-center gap-1 surface-card border border-subtle rounded-full p-0.5 shadow-card text-xs">
        <button
            type="button"
            onClick={() => onChange('monthly')}
            className={cn(
                'relative isolate px-3 py-1 rounded-full font-medium transition-colors',
                period === 'monthly' ? 'bg-ink text-white' : 'text-muted hover:text-strong',
            )}
        >
            Monthly
        </button>
        <button
            type="button"
            onClick={() => onChange('yearly')}
            className={cn(
                'relative isolate px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1.5',
                period === 'yearly' ? 'bg-ink text-white' : 'text-muted hover:text-strong',
            )}
        >
            Yearly
            <span
                className={cn(
                    'text-[9px] font-bold px-1 rounded-full',
                    period === 'yearly' ? 'bg-emerald-300/90 text-emerald-900' : 'bg-emerald-100 text-emerald-700',
                )}
            >
                -{YEARLY_SAVINGS_PERCENT}%
            </span>
        </button>
    </div>
);

// ─── Breakdown panel (invoice-style, all-in-one right column) ───────────────

const BreakdownRow = ({ label, value, swapKey, muted }) => (
    <div className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
        <span className={muted ? 'text-faint' : 'text-muted'}>{label}</span>
        <span className={cn('font-medium tabular-nums text-right', muted ? 'text-faint' : 'text-default')}>
            <AnimatedSwap swapKey={swapKey}>{value}</AnimatedSwap>
        </span>
    </div>
);

const BreakdownPanel = ({ plan, period, breakdown }) => {
    const href = getCheckoutUrl(plan.id, period);
    const isFree = plan.free;
    const price = period === 'yearly' ? plan.yearlyPriceMonthly : plan.monthlyPrice;
    const yearlyTotal = formatYearlyTotal(plan.yearlyPriceMonthly ?? 0);

    const volumeLabel = breakdown.clipsPerMonth >= 500
        ? '500+ clips / month'
        : `${formatInt(breakdown.clipsPerMonth)} clips / month`;

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

    return (
        <div className="rounded-3xl surface-card border border-subtle shadow-card p-6 lg:p-8" aria-live="polite">
            {/* Line items — invoice-style, all rows share the same alignment */}
            <div className="divide-y divide-subtle">
                <BreakdownRow
                    label="Recommended plan"
                    value={plan.tier}
                    swapKey={`plan-${plan.id}`}
                />
                <BreakdownRow
                    label="Your estimated volume"
                    value={volumeLabel}
                    swapKey={`vol-${breakdown.clipsPerMonth}`}
                />
                <BreakdownRow
                    label="Estimated credits needed (~50 per clip)"
                    value={`${formatInt(breakdown.creditsNeeded)} credits`}
                    swapKey={`needed-${breakdown.creditsNeeded}`}
                />
                <BreakdownRow
                    label={`Included in ${plan.tier}`}
                    value={`${formatInt(breakdown.planCredits)} credits`}
                    swapKey={`included-${plan.id}`}
                />
                {!breakdown.overflows && breakdown.buffer > 0 && (
                    <BreakdownRow
                        label="Buffer for experimentation"
                        value={`${formatInt(breakdown.buffer)} credits`}
                        swapKey={`buffer-${breakdown.buffer}`}
                        muted
                    />
                )}
                {breakdown.showTopUpHint && (
                    <BreakdownRow
                        label="Top-up packs available"
                        value="from $9"
                        swapKey="topup"
                        muted
                    />
                )}
            </div>

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
    );
};

// ─── Main component ─────────────────────────────────────────────────────────

const CostCalculator = ({ period, onPeriodChange, onRecommendedChange }) => {
    const [clips, setClips] = useState(VOLUME_SLIDER.default);

    const recommendedPlanId = useMemo(() => recommendPlanFromVolume(clips), [clips]);
    const plan = useMemo(
        () => PLANS.find((p) => p.id === recommendedPlanId) ?? PLANS[2],
        [recommendedPlanId],
    );
    const breakdown = useMemo(
        () => buildBreakdown({ clipsPerMonth: clips, plan }),
        [clips, plan],
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
        setClips(value);
        // Slider events are noisy; batched via animation frame so we don't
        // hammer dataLayer on every micro-pixel move.
        track('calculator_slider_change', {
            clip_value: value,
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
                    {/* LEFT: header + slider + period toggle.
                        The header sits inside the left column so its top edge
                        aligns with the top edge of the right breakdown card. */}
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
                                <h3 className="text-lg font-medium text-strong">Billing period</h3>
                            </div>
                            <div className="pl-10">
                                <MiniBillingToggle period={period} onChange={handleBillingToggle} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">2</span>
                                <h3 className="text-lg font-medium text-strong">Estimated clips per month</h3>
                            </div>
                            <div className="pl-10">
                                <VolumeSlider value={clips} onChange={handleSliderChange} />
                            </div>
                        </div>

                        <p className="text-[11px] text-faint leading-relaxed pl-10">
                            Estimates based on average cinematic clip generation (around 50 credits per clip). Your actual usage may vary depending on models, resolution, and clip length.
                        </p>
                    </div>

                    {/* RIGHT: single breakdown panel */}
                    <BreakdownPanel plan={plan} period={period} breakdown={breakdown} />
                </div>
            </div>
        </section>
    );
};

export default CostCalculator;
