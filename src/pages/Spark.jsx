import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

import moonieAvatar from '../assets/images/products/spark/moonie-avatar.webp';

import Button from '../components/Button';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import ViralFeedSimulator from '../components/sections/ViralFeedSimulator';
import ConsistencyEngine from '../components/sections/spark/ConsistencyEngine';
import AssetIntegration from '../components/sections/spark/AssetIntegration';
// Below-the-fold sections: lazy-load so the Spark hero paints faster.
// The user has to scroll past Consistency + AssetIntegration to see them.
const FullExperience = lazy(() => import('../components/sections/spark/FullExperience'));
const UseCases = lazy(() => import('../components/sections/spark/UseCases'));
import { getProduct } from '../config/products';
import { getProductIcons } from '../config/products-icons';
import { productSchema } from '../config/products-schema';

const SPARK = getProduct('spark');
const SPARK_SPOTLIGHT = getProductIcons('spark')?.spotlight;

const Spark = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pb-0 pt-24 md:pt-36 px-4 overflow-hidden"
    >
        <SEO
            title={SPARK.seo.title}
            description={SPARK.seo.description}
            canonical={SPARK.route}
            type="product"
            image={SPARK_SPOTLIGHT}
            preloadImage={SPARK_SPOTLIGHT}
            structuredData={productSchema('spark')}
        />

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 mb-20 md:mb-32 px-4">
            <div className="flex-1 z-10">
                <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-4xl md:text-8xl font-medium mb-4 md:mb-6 text-strong"
                >
                    <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(to top, #3A362D 0%, #A0957D 100%)' }}
                    >
                        SPARK.
                    </span>
                    <br />
                    Vertical Stories.
                </motion.h1>
                <p className="text-base md:text-xl text-muted max-w-xl mb-5 md:mb-8">
                    The only AI video tool that keeps your characters consistent. No more Frankenstein videos.
                </p>
                <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8 glass-panel p-3 md:p-4 rounded-2xl w-fit">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden shrink-0">
                        <img src={moonieAvatar} alt="Moonie" className="w-full h-full object-cover scale-150 translate-y-2 translate-x-1" />
                    </div>
                    <div className="text-xs md:text-sm text-default italic">
                        "Perfect loops, zero effort." <br />
                        <span className="font-medium not-italic">- Moonie, Chief Cat Officer</span>
                    </div>
                </div>
                <Button variant="swipe" className="px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl">
                    Start Creating
                </Button>
            </div>

            {/* Phone stage — ambient glow + grid + ground shadow + mobile tilt */}
            <div className="w-full md:flex-1 relative min-h-[460px] md:min-h-[600px] flex items-center justify-center perspective-1000">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[110%] md:w-[80%] h-[80%] rounded-full opacity-70 blur-3xl glow-accent" />
                </div>
                <div
                    className="absolute inset-0 grid-texture-medium opacity-[0.06] pointer-events-none"
                    style={{
                        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                    }}
                />
                <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 w-32 h-8 md:w-48 md:h-12 bg-black/25 blur-2xl rounded-[100%] z-0 scale-x-150 opacity-60" />
                <div className="relative z-10 rotate-[-2deg] md:rotate-0 transition-transform duration-500 hover:rotate-0">
                    <ViralFeedSimulator />
                </div>
            </div>
        </section>

        <ConsistencyEngine />
        <AssetIntegration />
        <Suspense fallback={<div className="h-[500px]" />}>
            <FullExperience />
            <UseCases />
        </Suspense>

        <CTASection
            title="Ready to ignite?"
            description="Join the creators dominating the vertical feed with Spark."
            buttonText="Start Creating"
            buttonLink="/login"
            buttonVariant="primary"
            gradient="from-accent to-orange-400"
            showArrow={false}
        />
    </motion.div>
);

export default Spark;
