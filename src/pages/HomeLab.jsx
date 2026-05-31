import React from 'react';
import HeroFooterPrompt from '../components/sections/home-lab/HeroFooterPrompt';
import HeroFooterPromptClassic from '../components/sections/home-lab/HeroFooterPromptClassic';
import HeroFooterPromptC from '../components/sections/home-lab/HeroFooterPromptC';

/**
 * Home — Hero Lab
 *
 * Internal dev-time sandbox for testing alternative homepage heroes.
 * Each variant renders full-bleed (full viewport) with a small label chip
 * in the corner so they can be compared by scrolling. Add new variants to
 * the VARIANTS array below — drop a component in
 * src/components/sections/home-lab/ and register it here.
 *
 * Not linked from the public site beyond the discreet "Labs" navbar
 * dropdown. Client-only: intentionally NOT in scripts/prerender.mjs ROUTES,
 * so it's not prerendered or indexed by search engines.
 */
const VARIANTS = [
    {
        id: 'footer-prompt',
        label: 'Variant A · Platform-style composer',
        Component: HeroFooterPrompt,
    },
    {
        id: 'footer-prompt-classic',
        label: 'Variant B · Frosted composer (original A)',
        Component: HeroFooterPromptClassic,
    },
    {
        id: 'footer-prompt-c',
        label: 'Variant C · Higher, narrower, frosted composer',
        Component: HeroFooterPromptC,
    },
];

const HomeLab = () => (
    <div className="surface-page">
        {VARIANTS.map(({ id, label, Component }) => (
            <section key={id} className="relative">
                {/* Dev label chip — pinned top-right of each variant, clear of
                    the centered navbar. */}
                <div className="absolute top-24 right-6 z-40 pointer-events-none">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-badge font-mono uppercase tracking-widest border border-white/20">
                        {label}
                    </span>
                </div>
                <Component />
            </section>
        ))}
    </div>
);

export default HomeLab;
