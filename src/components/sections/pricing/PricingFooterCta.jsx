import React from 'react';
import { motion } from 'framer-motion';

const PricingFooterCta = () => (
    <section className="mt-24 mb-8">
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-ink text-white p-10 lg:p-16 text-center overflow-hidden relative"
        >
            {/* Decorative warm wash, in the same family as the calculator card */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                    background:
                        'radial-gradient(ellipse at top, rgba(157,148,128,0.35), transparent 55%),' +
                        'radial-gradient(ellipse at bottom right, rgba(244,131,71,0.18), transparent 60%)',
                }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 leading-[1.1]">
                    Start building your cinematic worlds today.
                </h2>
                <p className="text-base md:text-lg text-white/70 font-light mb-8">
                    Free to explore. No credit card required. Cancel anytime.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href="https://app.fantazia.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full sm:w-auto px-8 py-3 bg-white text-ink rounded-full text-base font-medium hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 shadow-card hover:shadow-lifted"
                    >
                        Start for free
                    </a>
                    <a
                        href="#pricing-grid"
                        className="block w-full sm:w-auto px-8 py-3 border border-white/30 text-white rounded-full text-base font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                    >
                        See plans
                    </a>
                </div>
            </div>
        </motion.div>
    </section>
);

export default PricingFooterCta;
