import React from 'react';
import { motion } from 'framer-motion';

// ─── Genre showcase imagery ──────────────────────────────────────────────────
// TODO(swap): these are vertical PLACEHOLDERS (real in-repo 9:16 assets) so the
// layout is honest until the final per-genre outputs land. To swap: drop the 3
// finished 9:16 .webp files into src/assets/images/products/spark/ and repoint
// the 3 imports below — nothing else changes. The aspect-[9/16] frame +
// object-cover handle sizing/cropping for any vertical image.
import outProduct from '../../../assets/images/products/spark/spark-consistency-scene-02.webp?w=720&format=webp';
import outAd from '../../../assets/images/products/spark/spark-consistency-scene-01.webp?w=720&format=webp';
import outBrand from '../../../assets/images/products/spark/spark-location-apartment.webp?w=720&format=webp';

// One engine, three kinds of vertical story. Every outcome line reinforces the
// page's core promise — consistency — so the closer pays off everything above.
const CASES = [
    {
        genre: 'Product Demo',
        image: outProduct,
        alt: 'Spark vertical output — a product demo story',
        outcome: 'Same product, every angle, every frame — hero-lit and consistent.',
        tags: ['ECOM', 'BEAUTY'],
    },
    {
        genre: 'Story Ad',
        image: outAd,
        alt: 'Spark vertical output — a story-driven ad',
        outcome: 'One face, locked across the whole 20-second hook.',
        tags: ['UGC', 'HOOK'],
    },
    {
        genre: 'Brand Moment',
        image: outBrand,
        alt: 'Spark vertical output — an atmospheric brand moment',
        outcome: 'Aesthetic worlds that hold together, shot to shot.',
        tags: ['LIFESTYLE', 'MOOD'],
    },
];

const UseCases = () => (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        {/* Heading block */}
        <div className="text-center mb-16 md:mb-20">
            <p className="text-label font-mono uppercase tracking-[0.25em] text-muted mb-4">
                One consistent engine
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-strong mb-6">
                One engine. Every format.
            </h2>
            <p className="text-lead text-muted max-w-2xl mx-auto">
                Whatever you&apos;re making, the same engine keeps every frame consistent — and feed-ready.
            </p>
        </div>

        {/* Cards: 3-up grid on md+, horizontal swipe-carousel on mobile.
            CSS-only (scroll-snap), no JS. The -mx-6/px-6 bleed lets cards peek
            off the viewport edge on mobile to signal "swipe". */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {CASES.map(({ genre, image, alt, outcome, tags }, i) => (
                <motion.article
                    key={genre}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 380, damping: 26 } }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative isolate shrink-0 w-[78%] sm:w-[58%] md:w-auto snap-center overflow-hidden rounded-card-lg border border-subtle shadow-card bg-paper aspect-[9/16] transition-shadow duration-500 hover:shadow-lifted"
                >
                    {/* Output image — fills the 9:16 frame, gentle zoom on hover.
                        width/height are a loose aspect HINT only (reserve space /
                        signal intent). The aspect-[9/16] frame + object-cover below
                        govern actual rendered geometry, so swapped-in finals of any
                        near-vertical size render identically — don't "fix" these to
                        match a final's intrinsic pixels; it changes nothing visible. */}
                    <img
                        src={image}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        width="720"
                        height="1280"
                        className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Bottom scrim — keeps white text legible over any image */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                    />

                    {/* Genre pill — glass, same recipe as the Pricing PlanCard tier pill */}
                    <span className="absolute top-4 left-4 z-10 inline-block px-3 py-1 rounded-lg bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg text-strong text-sm font-medium">
                        {genre}
                    </span>

                    {/* Format tag — feed chrome */}
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center bg-black/40 backdrop-blur-md text-white/90 text-badge font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                        9:16 · 20s
                    </span>

                    {/* Bottom content — outcome line + genre tags */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                        <p className="text-white text-sm md:text-base font-medium leading-snug mb-3">
                            {outcome}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-badge font-mono uppercase tracking-wide text-white/70 bg-white/10 border border-white/20 rounded-full px-2 py-0.5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    </div>
);

export default UseCases;
