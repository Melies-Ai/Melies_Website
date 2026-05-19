import React from 'react';
import { PLANS } from '../config/pricing';
import PlanCardBaseline from '../components/sections/pricing/variants/PlanCardBaseline';
import PlanCardBanner from '../components/sections/pricing/variants/PlanCardBanner';

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
    const plan = PLANS.find((p) => p.id === 'director');
    const period = 'yearly';

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-strong mb-3 leading-[1.1]">
                        Pricing Card — Design Lab
                    </h1>
                    <p className="text-muted text-lg font-light">
                        Comparing 3 image-position variants. Hypothesis: positionnement de l'image.
                    </p>
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
                </div>
            </div>
        </div>
    );
};

export default PricingLab;
