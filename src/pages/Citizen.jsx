import { motion, AnimatePresence } from 'framer-motion';



import banner from '../assets/citizen_banner.png';
import iconVertical from '../assets/citizen_icon_vertical_white.png';

import CTASection from '../components/CTASection';

import SystemText from '../components/SystemText';





const Citizen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-0 pt-24 px-4 overflow-hidden"
        >
            {/* TECH ETHEREAL HEADER */}
            <div className="max-w-[1400px] mx-auto mb-32 relative h-[85vh] rounded-[32px] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src={banner}
                    alt="Citizen Header"
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
                        <img src={iconVertical} alt="Citizen" className="h-32 w-auto drop-shadow-lg" />
                    </motion.div>

                    <div className="absolute bottom-8 left-8">
                        <SystemText
                            lines={[
                                "> citizen.wake",
                                "> personality layers emerging",
                                "> emotional core forming...",
                                "> ready to dream, to choose, to become"
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
                        Create Life.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-white/90 max-w-xl font-light leading-relaxed"
                    >
                        Create living, breathing characters.
                    </motion.p>
                </div>
            </div>





            <CTASection
                title="Breathe life into AI."
                description="Design complex personas that evolve with every interaction."
                buttonText="Create Citizen"
                buttonLink="/login"
                gradient="from-rose to-pink-500"
            />
        </motion.div >
    );
};

export default Citizen;
