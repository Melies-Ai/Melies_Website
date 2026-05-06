import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Music, Mic, Volume2 } from 'lucide-react';

const TIMELINE_LAYERS = [
    { label: 'Video Track', icon: <ImageIcon size={18} />, color: 'bg-blue-500', barColor: 'bg-blue-400' },
    { label: 'Music Score', icon: <Music size={18} />, color: 'bg-purple-500', barColor: 'bg-purple-400' },
    { label: 'Voiceover', icon: <Mic size={18} />, color: 'bg-rose-500', barColor: 'bg-rose-400' },
    { label: 'Sound FX', icon: <Volume2 size={18} />, color: 'bg-amber-500', barColor: 'bg-amber-400' },
];

const FullExperience = () => (
    <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-left">
                <h2 className="text-4xl md:text-5xl font-medium text-strong mb-6">The Full Experience</h2>
                <p className="text-xl text-muted leading-relaxed mb-8">
                    Video is just the beginning. Our best model generates the entire sensory package.
                    <br /><br />
                    Video, Music, Voice, and Sound FX—all generated together in perfect sync.
                </p>
            </div>

            <div className="w-full md:flex-1 sunken-canvas bg-paper/50 shadow-inset-canvas rounded-canvas p-4 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[500px]">
                <div className="absolute inset-0 grid-texture-subtle opacity-10 pointer-events-none" />

                {/* Timeline Editor */}
                <div className="relative w-full max-w-lg flex flex-col gap-4">
                    {/* Playhead */}
                    <motion.div
                        className="absolute top-0 bottom-0 w-[1px] bg-accent/50 z-20"
                        animate={{ left: ['15%', '85%'] }}
                        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
                    >
                        <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-accent rounded-full shadow-card" />
                    </motion.div>

                    {TIMELINE_LAYERS.map((layer, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-20 surface-card rounded-card shadow-card flex items-center px-3 md:px-6 gap-3 md:gap-6 relative overflow-hidden group hover:shadow-card-hover transition-shadow duration-300"
                        >
                            <div className={`w-10 h-10 rounded-xl ${layer.color} text-white flex items-center justify-center shrink-0 shadow-card`}>
                                {layer.icon}
                            </div>
                            <div className="font-medium text-strong text-xs md:text-sm w-16 md:w-24 shrink-0">{layer.label}</div>

                            {/* Animated visuals */}
                            <div className="flex-1 flex items-center gap-[3px] h-full py-5 overflow-hidden">
                                {layer.label === 'Video Track' ? (
                                    <div className="flex gap-1 w-full h-full items-center">
                                        {[...Array(8)].map((_, j) => (
                                            <motion.div
                                                key={j}
                                                className={`h-full aspect-video rounded-md ${layer.barColor} opacity-40`}
                                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                                transition={{
                                                    duration: 2 + Math.random(),
                                                    repeat: Infinity,
                                                    repeatType: 'reverse',
                                                    delay: j * 0.2,
                                                    ease: 'easeInOut',
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    [...Array(35)].map((_, j) => (
                                        <motion.div
                                            key={j}
                                            className={`w-1.5 rounded-full ${layer.barColor} opacity-30`}
                                            animate={{
                                                height: ['20%', `${40 + Math.random() * 60}%`, '20%'],
                                                opacity: [0.3, 0.6, 0.3],
                                            }}
                                            transition={{
                                                duration: 1.5 + Math.random(),
                                                repeat: Infinity,
                                                repeatType: 'reverse',
                                                delay: j * 0.05,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default FullExperience;
