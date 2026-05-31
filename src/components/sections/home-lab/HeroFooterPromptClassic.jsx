import React from 'react';
import { motion } from 'framer-motion';
import PromptComposerClassic from './PromptComposerClassic';

// Same cinematic footer backdrop as the live Variant A.
import heroBg from '../../../assets/images/home/footer-desk.webp?w=1800&format=webp';
import heroBgSrcSet from '../../../assets/images/home/footer-desk.webp?w=800;1200;1800&format=webp&as=srcset';

// HeroFooterPromptClassic — a frozen copy of the ORIGINAL Variant A hero, kept
// in the lab for side-by-side comparison against the reworked version. Identical
// layout to the first iteration: copy block vertically centred with the old
// pt-32 / pb-20 rhythm, and the frosted-cream PromptComposerClassic.
//
// Below-the-fold on the lab page (it's the second variant), so its backdrop is
// lazy-loaded — only the live Variant A above gets fetchPriority="high".
const HeroFooterPromptClassic = () => (
    <section className="relative isolate min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed cinematic backdrop */}
        <div className="absolute inset-0 -z-10">
            <img
                src={heroBg}
                srcSet={heroBgSrcSet}
                sizes="100vw"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
            />
            {/* Legibility overlays — flat tint + a top-and-bottom darkening so
                white copy and the bright composer panel both hold contrast. */}
            <div className="absolute inset-0 bg-ink/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />
        </div>

        <div className="w-full max-w-3xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-5xl md:text-7xl tracking-tighter text-white font-normal mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            >
                The Infinite <br />
                Cinema Engine.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                className="text-lg md:text-xl text-white/85 max-w-xl mb-10 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
            >
                Orchestrate multi-agent systems to generate films. <br className="hidden md:block" />
                From script to screen, in real-time.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="w-full max-w-2xl"
            >
                <PromptComposerClassic />
            </motion.div>
        </div>
    </section>
);

export default HeroFooterPromptClassic;
