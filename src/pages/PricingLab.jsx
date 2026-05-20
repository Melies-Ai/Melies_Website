import React, { useState } from 'react';
import { PLANS } from '../config/pricing';
import { PLAN_MEDIA } from '../config/pricing-media';
import { cn } from '../lib/cn';
import MiniBillingToggle from '../components/sections/pricing/MiniBillingToggle';
import PlanCardBannerFrostTopFade from '../components/sections/pricing/variants/PlanCardBannerFrostTopFade';

// Title-size variants to test in the lab. The V5 layout (full-bleed
// banner + frost title at top + fade-to-white) won the image-position
// comparison and shipped to production. Now we iterate on title size.
// 'md' is what's live in production today — keep it visible as the
// baseline reference.
const V5_TITLE_SIZES = [
    { size: 'md',      label: 'V5 — Medium (prod)', spec: 'Title 24-26px, pill px-4 py-2 — baseline en production' },
    { size: 'sm',      label: 'V5 — Small',         spec: 'Title 18-20px, pill px-3 py-1.5' },
    { size: 'sm-slim', label: 'V5 — Small slim',    spec: 'Title 18-20px, pill px-3 py-1 (hauteur réduite)' },
    { size: 'sm-flat', label: 'V5 — Small flat',    spec: 'Title 18-20px, pill px-3 py-0.5 (hauteur minimale)' },
];

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

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 items-start">
                    {V5_TITLE_SIZES.map(({ size, label, spec }) => (
                        <div key={size}>
                            <div className="mb-4">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">{label}</div>
                                <div className="text-sm text-muted">{spec}</div>
                            </div>
                            <PlanCardBannerFrostTopFade plan={plan} period={period} titleSize={size} />
                        </div>
                    ))}
                </div>

                <section className="mt-16 max-w-3xl">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-faint mb-3">
                        Notes
                    </h2>
                    {/* TODO: add observations here as you compare the variants.
                        Things to look for:
                          - Premium feel: which variant matches Fantazia's
                            cinematic positioning best?
                          - Hierarchy: does the title still feel anchored
                            when the image leads (V2/V3)?
                          - Frost readability (V3): light vs dark image areas
                            behind the pill — does it always read?
                          - Content density: scroll through Explore (4 bullets)
                            and Studio (7 bullets) — which variant scales best? */}
                    <p className="text-sm text-default leading-relaxed">
                        Hypothesis: positionnement de l'image. Tes 4 images
                        sont aspirationnelles (lifestyle) — V2 et V3 leur
                        donnent plus de présence que V1, mais coûtent de la
                        hiérarchie textuelle. V3 ajoute un pari typographique
                        (titre en glassmorphism). Compare avec Explore et
                        Studio pour voir comment chaque traitement encaisse
                        la densité de contenu.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PricingLab;
