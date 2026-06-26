import React from 'react';
import { motion } from 'framer-motion';

import WaitlistCTA from '../components/WaitlistCTA';
import SystemText from '../components/SystemText';
import SEO from '../components/SEO';
import { getProduct } from '../config/products';
import { getProductMedia } from '../config/products-media';
import { productSchema } from '../config/products-schema';

const Citizen = () => {
    const product = getProduct('citizen');
    const media = getProductMedia('citizen');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-0 pt-28 px-4 overflow-hidden"
        >
            <SEO
                title={product.seo.title}
                description={product.seo.description}
                canonical={product.route}
                type="product"
                image={media.banner.src}
                preloadImage={media.banner.src}
                structuredData={productSchema('citizen')}
            />

            {/* TECH ETHEREAL HEADER */}
            <div className="max-w-[1400px] mx-auto mb-16 md:mb-32 relative h-[70vh] md:h-[85vh] rounded-[32px] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src={media.banner.src}
                    srcSet={media.banner.srcSet}
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    alt={`${product.name} Header`}
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Availability Tag */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-lg font-mono text-white/60 tracking-widest uppercase z-30">
                    {product.releaseLabel}
                </div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        {/* brightness-0 invert forces the lockup pure white: the
                            build's SVGO step strips fill attributes, so the SVG
                            would otherwise fall back to black in production. */}
                        <img src={media.lockup} alt={product.name} className="h-24 md:h-32 w-auto brightness-0 invert drop-shadow-lg" />
                    </motion.div>

                    {/* Terminal boot-sequence flavour, pinned bottom-left at every
                        size (tighter inset on mobile). */}
                    <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                        <SystemText lines={product.terminal} delay={0.5} />
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl sm:text-6xl md:text-9xl font-medium text-white mb-6 tracking-tighter"
                    >
                        {product.heroTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-white/90 max-w-xl font-light leading-relaxed"
                    >
                        {product.heroSubtitle}
                    </motion.p>
                </div>
            </div>

            <WaitlistCTA title={product.waitlistCTA.title} description={product.waitlistCTA.description} />
        </motion.div>
    );
};

export default Citizen;
