import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { USAGE_FIGURE, TRUST_LOGOS, TESTIMONIALS } from '../../../config/pricing-trust';
import { track } from '../../../lib/analytics';

// ── Stripe payment badge ────────────────────────────────────────────────────
// Exported so it can sit near the pricing grid (under the reassurance band)
// instead of floating in this trust-signals section when there's no other
// trust content. Stripe reassurance reads better right at the conversion
// point than as a standalone block lower on the page.
export const StripeBadge = () => (
    <div className="flex items-center justify-center gap-2 text-xs text-faint">
        <Lock size={14} className="shrink-0" />
        <span>Secure payments by</span>
        <span className="font-medium text-muted tracking-tight">Stripe</span>
    </div>
);

// ── Usage figure ────────────────────────────────────────────────────────────

const UsageFigure = () => {
    if (!USAGE_FIGURE) return null;
    return (
        <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl md:text-3xl font-medium tracking-tight text-strong max-w-3xl mx-auto"
        >
            {USAGE_FIGURE}
        </motion.p>
    );
};

// ── Logos row ───────────────────────────────────────────────────────────────

const LogosRow = () => {
    const ref = useRef(null);

    // Fire trust_logo_visible once when the row enters the viewport.
    useEffect(() => {
        const node = ref.current;
        if (!node || TRUST_LOGOS.length === 0) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    track('trust_logo_visible', { count: TRUST_LOGOS.length });
                    obs.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    if (TRUST_LOGOS.length === 0) return null;
    return (
        <div ref={ref} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {TRUST_LOGOS.map((logo, i) => {
                const img = (
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-7 md:h-8 w-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all"
                    />
                );
                return logo.href ? (
                    <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer">
                        {img}
                    </a>
                ) : (
                    <span key={i}>{img}</span>
                );
            })}
        </div>
    );
};

// ── Testimonials grid ───────────────────────────────────────────────────────

const TestimonialsGrid = () => {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || TESTIMONIALS.length === 0) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    track('trust_quote_visible', { count: TESTIMONIALS.length });
                    obs.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    if (TESTIMONIALS.length === 0) return null;
    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
                <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-2xl surface-card border border-subtle p-6 shadow-card"
                >
                    <blockquote className="text-default leading-relaxed text-base mb-4">
                        &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm">
                        <div className="font-medium text-strong">{t.author}</div>
                        <div className="text-muted">{t.role}</div>
                    </figcaption>
                </motion.figure>
            ))}
        </div>
    );
};

// ── Main ────────────────────────────────────────────────────────────────────

const TrustSignals = () => {
    const hasAnyContent =
        USAGE_FIGURE != null || TRUST_LOGOS.length > 0 || TESTIMONIALS.length > 0;

    // Nothing to show? Don't render the section at all (no empty spacing
    // floating between the Calculator and the ComparisonTable). The Stripe
    // badge moved to the reassurance band — see Pricing.jsx.
    if (!hasAnyContent) return null;

    return (
        <section className="mt-24 mb-16 space-y-12">
            <UsageFigure />
            <LogosRow />
            <TestimonialsGrid />
        </section>
    );
};

export default TrustSignals;
