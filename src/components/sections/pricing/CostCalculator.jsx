import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../lib/cn';
import {
    PLANS,
    getCheckoutUrl,
    formatYearlyTotal,
    YEARLY_SAVINGS_PERCENT,
    recommendPlanFromVolume,
    buildBreakdown,
    VOLUME_SLIDER,
    CONTENT_TYPES,
} from '../../../config/pricing';

// Force the en-US locale on number formatting; the recommended card and
// breakdown can be viewed by browsers in any locale, but the brand copy
// stays in English so the separators should follow English conventions.
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

// ─── Content-type pills (Step 1) ────────────────────────────────────────────

const ContentTypePills = ({ selected, onToggle }) => (
    <div className="flex flex-wrap gap-2">
        {CONTENT_TYPES.map((type) => {
            const isOn = selected.has(type.id);
            return (
                <button
                    key={type.id}
                    type="button"
                    onClick={() => onToggle(type.id)}
                    aria-pressed={isOn}
                    className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        isOn
                            ? 'bg-ink text-white border border-ink shadow-card'
                            : 'surface-card text-default border border-subtle hover:border-default hover:-translate-y-0.5'
                    )}
                >
                    {type.label}
                </button>
            );
        })}
    </div>
);

// ─── Slider (Step 2) ────────────────────────────────────────────────────────

const VolumeSlider = ({ value, onChange }) => {
    const { min, max, step, ticks, formatValue } = VOLUME_SLIDER;
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className="relative pt-12 pb-6">
            {/* Floating label following the handle */}
            <div
                className="absolute -translate-x-1/2 top-0 transition-[left] duration-100"
                style={{ left: `${percent}%` }}
            >
                <div className="bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-card whitespace-nowrap">
                    {formatValue(value)}
                </div>
                <div className="w-2 h-2 bg-ink rotate-45 mx-auto -mt-1" />
            </div>

            {/* Track + tick marks */}
            <div className="relative h-2">
                <div className="absolute inset-0 bg-ink/8 rounded-full" />
                <div
                    className="absolute top-0 left-0 h-full bg-ink rounded-full transition-[width] duration-100"
                    style={{ width: `${percent}%` }}
                />
                {/* Tick marks */}
                <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                    {ticks.map((tick) => {
                        const tickPercent = ((tick - min) / (max - min)) * 100;
                        return (
                            <span
                                key={tick}
                                className="absolute w-px h-3 bg-ink/30"
                                style={{ left: `${tickPercent}%`, transform: 'translateX(-50%)' }}
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
                {/* Handle (visual) */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-[left] duration-100 pointer-events-none"
                    style={{ left: `${percent}%` }}
                >
                    <div className="w-5 h-5 bg-white rounded-full ring-[3px] ring-ink shadow-card" />
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

// ─── Recommended card (stays mounted; only the changing texts animate) ──────

const RecommendedCard = ({ plan, period }) => {
    const isFree = plan.free;
    const price = period === 'yearly' ? plan.yearlyPriceMonthly : plan.monthlyPrice;
    const yearlyTotal = formatYearlyTotal(plan.yearlyPriceMonthly ?? 0);
    const cta = isFree ? 'Start for free' : `Get ${plan.tier}`;
    const href = getCheckoutUrl(plan.id, period);

    const bullets = isFree
        ? [
            `${formatInt(plan.monthlyCredits)} credits to start`,
            'Personal use, watermarked',
            'No credit card required',
        ]
        : [
            `${formatInt(plan.monthlyCredits)} credits per month`,
            `Around ${formatInt(Math.round(plan.monthlyCredits / 50))} clips per month`,
            'Cancel or pause anytime',
        ];

    const billingDetail = isFree
        ? 'Free forever'
        : period === 'yearly'
            ? `$${formatInt(yearlyTotal)} billed yearly, save ${YEARLY_SAVINGS_PERCENT}%`
            : `or ${formatMoney(plan.yearlyPriceMonthly)} / mo billed yearly`;

    return (
        <div className="relative rounded-3xl bg-ink text-white p-8 shadow-heavy overflow-hidden" aria-live="polite">
            {/* Decorative warm gradient — slot ready for a future background image */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                    background:
                        'radial-gradient(ellipse at top right, rgba(157,148,128,0.35), transparent 55%),' +
                        'radial-gradient(ellipse at bottom left, rgba(244,131,71,0.18), transparent 60%)',
                }}
            />

            <div className="relative z-10">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/55 mb-4">
                    Recommended for you
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                        <AnimatedSwap swapKey={plan.id}>{plan.tier}</AnimatedSwap>
                    </h3>
                    <div className="text-right">
                        <div className="text-3xl md:text-4xl font-medium tracking-tight">
                            <AnimatedSwap swapKey={`${plan.id}-${period}-price`}>
                                {formatMoney(price)}
                            </AnimatedSwap>
                        </div>
                        <div className="text-xs text-white/55 mt-1 min-h-[1.2em]">
                            <AnimatedSwap swapKey={`${plan.id}-${period}-bd`}>
                                {billingDetail}
                            </AnimatedSwap>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-white/70 mb-6 min-h-[1.4em]">
                    <AnimatedSwap swapKey={`${plan.id}-tagline`}>
                        {plan.calculatorTagline}
                    </AnimatedSwap>
                </p>

                <AnimatePresence mode="wait">
                    <motion.ul
                        key={`${plan.id}-bullets`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-2.5 mb-7"
                    >
                        {bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </motion.ul>
                </AnimatePresence>

                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-white text-ink text-center rounded-full text-base font-medium hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 shadow-card hover:shadow-lifted"
                >
                    <AnimatedSwap swapKey={`${plan.id}-cta`}>{cta}</AnimatedSwap>
                </a>
            </div>
        </div>
    );
};

// ─── Breakdown box (also stays mounted; row values animate individually) ────

const BreakdownRow = ({ label, value, swapKey, accent }) => (
    <div className="flex items-baseline justify-between py-2 text-sm">
        <span className="text-muted">{label}</span>
        <span className={cn('font-medium tabular-nums text-right', accent ? 'text-strong' : 'text-default')}>
            <AnimatedSwap swapKey={swapKey}>{value}</AnimatedSwap>
        </span>
    </div>
);

const Breakdown = ({ plan, period, breakdown }) => {
    const monthly = plan.monthlyPrice ?? 0;
    const yearlyTotal = formatYearlyTotal(plan.yearlyPriceMonthly ?? 0);
    const volumeLabel = breakdown.clipsPerMonth >= 500
        ? '500+ clips / month'
        : `${formatInt(breakdown.clipsPerMonth)} clips / month`;

    return (
        <div className="rounded-2xl bg-paper/40 border border-subtle p-6" aria-live="polite">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-faint mb-4">
                Your estimated usage
            </div>

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
                label={`Included in ${plan.tier} plan`}
                value={`${formatInt(breakdown.planCredits)} credits`}
                swapKey={`included-${plan.id}`}
            />
            {!breakdown.overflows && breakdown.buffer > 0 && (
                <BreakdownRow
                    label="Buffer for experimentation"
                    value={`${formatInt(breakdown.buffer)} credits`}
                    swapKey={`buffer-${breakdown.buffer}`}
                />
            )}
            {breakdown.showTopUpHint && (
                <BreakdownRow
                    label="Top-up packs available for higher volumes"
                    value="from $9"
                    swapKey="topup"
                />
            )}

            <div className="border-t border-subtle mt-3 pt-3">
                <BreakdownRow
                    label="Monthly cost"
                    value={plan.free ? 'Free' : formatMoney(monthly)}
                    swapKey={`monthly-${plan.id}`}
                    accent
                />
                {!plan.free && (
                    <BreakdownRow
                        label={`Yearly cost (save ${YEARLY_SAVINGS_PERCENT}%)`}
                        value={`$${formatInt(yearlyTotal)}`}
                        swapKey={`yearly-${plan.id}`}
                        accent
                    />
                )}
            </div>

            {breakdown.overflows && plan.id !== 'atelier' && (
                <p className="text-xs italic text-muted mt-4 leading-relaxed">
                    Volume slightly exceeds {plan.tier}. Consider the next tier for unlimited monthly use.
                </p>
            )}
        </div>
    );
};

// ─── Main component ─────────────────────────────────────────────────────────

const CostCalculator = ({ period, onPeriodChange, onRecommendedChange }) => {
    const [selectedTypes, setSelectedTypes] = useState(() => new Set(['video']));
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

    const toggleType = (id) => {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            if (next.has(id) && next.size > 1) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <section className="relative mt-24 mb-16 -mx-6 px-6 py-16 lg:py-20 surface-section">
            <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto">
                <header className="mb-10 lg:mb-12 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-strong mb-3">
                        Estimate your monthly production.
                    </h2>
                    <p className="text-muted text-lg font-light">
                        Move the slider to see which plan fits your creative volume.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* LEFT: inputs */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">1</span>
                                <h3 className="text-lg font-medium text-strong">What do you create?</h3>
                            </div>
                            <ContentTypePills selected={selectedTypes} onToggle={toggleType} />
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">2</span>
                                <h3 className="text-lg font-medium text-strong">Estimated clips per month</h3>
                            </div>
                            <VolumeSlider value={clips} onChange={setClips} />
                        </div>
                    </div>

                    {/* RIGHT: card + breakdown */}
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <MiniBillingToggle period={period} onChange={onPeriodChange} />
                        </div>

                        <RecommendedCard plan={plan} period={period} />
                        <Breakdown plan={plan} period={period} breakdown={breakdown} />
                    </div>
                </div>

                <p className="text-[11px] text-faint mt-10 max-w-2xl leading-relaxed">
                    Estimates based on average cinematic clip generation (around 50 credits per clip). Your actual usage may vary depending on models, resolution, and clip length.
                </p>
            </div>
        </section>
    );
};

export default CostCalculator;
