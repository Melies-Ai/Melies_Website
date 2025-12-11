import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

import banner from '../assets/fable_banner.png';
import iconVertical from '../assets/fable_icon_vertical_white.png';

import WaitlistCTA from '../components/WaitlistCTA';
import SystemText from '../components/SystemText';

const Fable = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-0 pt-24 px-4 overflow-hidden"
        >
            {/* TECH ETHEREAL HEADER */}
            <div className="max-w-[1400px] mx-auto mb-32 relative h-[85vh] rounded-[32px] overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src={banner}
                    alt="Fable Header"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Availability Tag */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-lg font-mono text-white/60 tracking-widest uppercase z-30">
                    Coming 2026
                </div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <img src={iconVertical} alt="Fable" className="h-32 w-auto drop-shadow-lg" />
                    </motion.div>

                    <div className="absolute bottom-8 left-8">
                        <SystemText
                            lines={[
                                "> fable.direct",
                                "> cast assembling in costume",
                                "> cameras loaded, sets rising",
                                "> lights, camera [ACTION]"
                            ]}
                            delay={0.5}
                        />
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-9xl font-medium text-white mb-6 tracking-tighter"
                    >
                        Weave Stories.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-white/90 max-w-xl font-light leading-relaxed"
                    >
                        The studio for infinite narrative arcs.
                    </motion.p>
                </div>
            </div>

            <WaitlistCTA
                title="Direct your masterpiece."
                description="Unleash infinite narrative possibilities with Fable. Join the waitlist for early access."
            />
        </motion.div>
    );
};

export default Fable;
