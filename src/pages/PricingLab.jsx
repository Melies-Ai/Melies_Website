import React from 'react';

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
const PricingLab = () => (
    <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-strong mb-3 leading-[1.1]">
                Pricing Card — Design Lab
            </h1>
            <p className="text-muted text-lg font-light">
                Placeholder. Variants will be added in subsequent tasks.
            </p>
        </div>
    </div>
);

export default PricingLab;
