import React from 'react';
import { motion } from 'framer-motion';
import PromptComposer from './PromptComposer';

// Same cinematic footer backdrop as Variants A & B. Below-the-fold on the lab
// page (third variant), so lazy-loaded — only the live Variant A gets
// fetchPriority="high".
import heroBg from '../../../assets/images/home/footer-desk.webp?w=1800&format=webp';
import heroBgSrcSet from '../../../assets/images/home/footer-desk.webp?w=800;1200;1800&format=webp&as=srcset';

// HeroFooterPromptC — Variant C. A remix of Variant A (the platform-style
// composer hero) with three deliberate differences requested for comparison:
//   1. Copy + composer sit a little HIGHER in the viewport (more bottom padding,
//      less top) — done with padding only, never a transform, so the composer's
//      frosted backdrop-blur stays live (an ancestor transform would flatten it).
//   2. The composer is a touch NARROWER than A (max-w-xl vs A's max-w-2xl).
//   3. The composer wears Variant B's frosted-cream surface (bg-white/85 +
//      backdrop-blur-2xl + white/50 border) and a right-pointing send arrow.
//
// CTA (send) button colour is still undecided — it keeps A's dark gray-900
// placeholder for now. The composer's blur is safe because the wrapper's only
// motion is a y/opacity entrance that settles to y:0 / opacity:1 at rest,
// leaving no flattening transform on the frosted ancestor.
const HeroFooterPromptC = () => (
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

        {/* Sits higher than A: pt-12 / pb-40 lifts the block toward the top. */}
        <div className="w-full max-w-3xl mx-auto px-6 pt-12 pb-40 flex flex-col items-center text-center">
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
                className="w-full max-w-xl"
            >
                <PromptComposer
                    arrow="right"
                    surfaceClassName="border border-white/50 bg-white/85 backdrop-blur-2xl shadow-heavy"
                />
            </motion.div>
        </div>
    </section>
);

export default HeroFooterPromptC;
