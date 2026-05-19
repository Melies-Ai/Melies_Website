import React, { useState } from 'react';
import { PLANS } from '../config/pricing';
import { PLAN_MEDIA } from '../config/pricing-media';
import { cn } from '../lib/cn';
import MiniBillingToggle from '../components/sections/pricing/MiniBillingToggle';
import PlanCardBaseline from '../components/sections/pricing/variants/PlanCardBaseline';
import PlanCardBanner from '../components/sections/pricing/variants/PlanCardBanner';
import PlanCardBannerFrost from '../components/sections/pricing/variants/PlanCardBannerFrost';

// Plans that have an entry in PLAN_MEDIA. Derived from the single
// source of truth so adding/removing an image in pricing-media.js
// automatically updates the lab's plan selector. Production and Atelier
// are excluded by virtue of not being in PLAN_MEDIA (they're text-only).
const IMAGED_PLAN_IDS = Object.keys(PLAN_MEDIA);

/**
 * Plan selector — pill-strip mirroring MiniBillingToggle's visual pattern.
 * Lab-local (not extracted) because nothing else needs it.
 */
const PlanSelector = ({ planId, onChange }) => (
    <div className="inline-flex items-center gap-1 surface-card border border-subtle rounded-full p-0.5 shadow-card text-xs">
        {IMAGED_PLAN_IDS.map((id) => {
            const plan = PLANS.find((p) => p.id === id);
            const isActive = planId === id;
            return (
                <button
                    key={id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                        if (planId !== id) onChange(id);
                    }}
                    className={cn(
                        'relative isolate px-3 py-1 rounded-full font-medium transition-colors',
                        isActive ? 'bg-ink text-white' : 'text-muted hover:text-strong',
                    )}
                >
                    {plan.tier}
                </button>
            );
        })}
    </div>
);

/**
 * Pricing Card — Design Lab
 *
 * Internal dev-time A/B/C of the PlanCard image position.
 * Spec: docs/superpowers/specs/2026-05-19-pricing-card-design-lab-design.md
 *
 * Not linked from anywhere — accessible only by URL. Client-only:
 * intentionally NOT in scripts/prerender.mjs ROUTES so it's not
 * indexed by search engines.
 */
const PricingLab = () => {
    const [planId, setPlanId] = useState('director');
    const [period, setPeriod] = useState('yearly');

    const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-strong mb-3 leading-[1.1]">
                            Pricing Card — Design Lab
                        </h1>
                        <p className="text-muted text-lg font-light">
                            Comparing 3 image-position variants. Hypothesis: positionnement de l'image.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <PlanSelector planId={planId} onChange={setPlanId} />
                        <MiniBillingToggle period={period} onChange={setPeriod} />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V1 — Baseline</div>
                            <div className="text-sm text-muted">Image entre titre et prix</div>
                        </div>
                        <PlanCardBaseline plan={plan} period={period} />
                    </div>

                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V2 — Banner</div>
                            <div className="text-sm text-muted">Image full-bleed en haut, titre dessous</div>
                        </div>
                        <PlanCardBanner plan={plan} period={period} />
                    </div>

                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V3 — Banner + Frost</div>
                            <div className="text-sm text-muted">Image full-bleed, titre flottant frost</div>
                        </div>
                        <PlanCardBannerFrost plan={plan} period={period} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingLab;
