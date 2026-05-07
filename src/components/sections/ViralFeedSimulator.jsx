import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { useInView } from '../../lib/useInView';

import consistency1 from '../../assets/images/products/spark/spark-consistency-scene-01.webp';
import consistency2 from '../../assets/images/products/spark/spark-consistency-scene-02.webp';
import consistency3 from '../../assets/images/products/spark/spark-consistency-scene-03.webp';
import character2 from '../../assets/images/products/spark/spark-feed-character.webp';

// Phone simulator that loops a vertical TikTok-like feed of Spark images.
// Shared between Home (compact, tilted) and Spark hero (responsive, upright).
//
// Variants:
//   - 'compact'  : 288×580 with -3° tilt that rights itself on hover. Used on Home spotlight.
//   - 'hero'     : responsive 224→320 wide, 420→640 tall. Used on Spark hero.
//
// Each frame inside the feed is a full-bleed image; the scrolling motion
// translates the inner stack at a constant speed. Distance and item height
// must stay in sync — see FRAME_HEIGHT below.

const FEED_IMAGES = [consistency1, consistency2, consistency3, character2, consistency1];
const REACTIONS = ['❤️', '✨', '🔥'];

const VARIANTS = {
    compact: {
        outer: 'w-72 h-[580px] rounded-[3rem] border-[8px] mx-auto transform rotate-3 hover:rotate-0 transition-all duration-500',
        frame: 'h-[580px]',
        scrollDistance: -1160,
        scrollDuration: 20,
        padding: 'p-5',
        creatorTextSize: 'text-sm',
        descriptionTextSize: 'text-[10px]',
        badgeTextSize: 'text-[9px]',
        actionSize: 'w-8 h-8',
        countTextSize: 'text-[9px]',
        showSecondaryAction: false,
    },
    hero: {
        outer: 'w-56 h-[420px] md:w-80 md:h-[640px] rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[8px] mx-auto',
        frame: 'h-[640px]',
        scrollDistance: -1280,
        scrollDuration: 25,
        padding: 'p-6',
        creatorTextSize: '',
        descriptionTextSize: 'text-xs',
        badgeTextSize: 'text-[10px]',
        actionSize: 'w-10 h-10',
        countTextSize: 'text-[10px]',
        showSecondaryAction: true,
    },
};

const ViralFeedSimulator = ({ variant = 'hero', className = '' }) => {
    const v = VARIANTS[variant] ?? VARIANTS.hero;
    const containerRef = useRef(null);
    const inView = useInView(containerRef);

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative bg-black border-ink/10 overflow-hidden shadow-2xl z-10 box-border',
                v.outer,
                className
            )}
        >
            {/* Feed Content */}
            <div className="absolute inset-0 overflow-hidden bg-[#111]">
                <motion.div
                    animate={inView ? { y: [0, v.scrollDistance] } : { y: 0 }}
                    transition={{ duration: v.scrollDuration, repeat: Infinity, ease: 'linear' }}
                    className="space-y-0"
                >
                    {FEED_IMAGES.map((img, i) => (
                        <div key={i} className={cn('w-full relative border-b border-white/5', v.frame)}>
                            <img src={img} alt="Feed content" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                                animate={inView ? { opacity: [0, 1, 0], scale: [0.5, 1.2, 1], y: -200 } : { opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 + 1, ease: 'easeOut' }}
                                className="absolute bottom-40 right-4 text-4xl drop-shadow-lg z-30"
                            >
                                {REACTIONS[i % REACTIONS.length]}
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* TikTok-style UI Overlay */}
            <div className={cn('absolute inset-0 z-20 pointer-events-none flex flex-col justify-end', v.padding)}>
                <div className="flex justify-between items-end">
                    {/* LEFT: Creator info */}
                    <div className="flex-1 space-y-2 pb-1 pr-2">
                        <div className={cn('font-bold text-white text-shadow-sm flex items-center gap-1.5', v.creatorTextSize)}>
                            @fantazia.creator
                        </div>
                        <p className={cn('text-white/90 leading-snug line-clamp-2 text-shadow-sm font-light', v.descriptionTextSize)}>
                            Line-drawn minimalist animation. The two characters
                            {variant === 'hero' ? (
                                <> are sitting on the long bench... <span className="opacity-60 font-semibold cursor-pointer hover:underline">more</span></>
                            ) : (
                                <>...</>
                            )}
                        </p>
                        <div className={cn('inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-medium text-white/90 shadow-sm', v.badgeTextSize)}>
                            Spark 1.0
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex flex-col gap-4 items-center pb-1">
                        <div className="flex flex-col items-center gap-1 pointer-events-auto">
                            <div className={cn('rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white', v.actionSize)}>
                                <span className="text-lg text-red-500 drop-shadow-md">♥</span>
                            </div>
                            <span className={cn('text-white font-medium drop-shadow-md', v.countTextSize)}>84K</span>
                        </div>
                        {v.showSecondaryAction && (
                            <div className="flex flex-col items-center pointer-events-auto cursor-pointer hover:opacity-80">
                                <div className="text-white font-bold text-xl tracking-widest leading-none drop-shadow-md pb-2">...</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViralFeedSimulator;
