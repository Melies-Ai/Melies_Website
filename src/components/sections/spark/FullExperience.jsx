import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Image as ImageIcon, Music, Mic, Volume2 } from 'lucide-react';
import { useInView } from '../../../lib/useInView';

// Each layer keeps its chromatic identity (matched to the bar colors
// below) but the icon container is now a frosted-glass tile in the same
// formal language as the Home product cards: w-12 rounded-2xl, backdrop
// blur, soft border. The colour shows through as a subtle wash + ring,
// the icon stroke takes the saturated tone.
const TIMELINE_LAYERS = [
    { label: 'Video Track', Icon: ImageIcon, tintBg: 'bg-blue-500/15',   tintBorder: 'border-blue-500/30',   tintIcon: 'text-blue-600',   barColor: 'bg-blue-400' },
    { label: 'Music Score', Icon: Music,     tintBg: 'bg-purple-500/15', tintBorder: 'border-purple-500/30', tintIcon: 'text-purple-600', barColor: 'bg-purple-400' },
    { label: 'Voiceover',   Icon: Mic,       tintBg: 'bg-rose-500/15',   tintBorder: 'border-rose-500/30',   tintIcon: 'text-rose-600',   barColor: 'bg-rose-400' },
    { label: 'Sound FX',    Icon: Volume2,   tintBg: 'bg-amber-500/15',  tintBorder: 'border-amber-500/30',  tintIcon: 'text-amber-700',  barColor: 'bg-amber-400' },
];

// Per-track waveform shapes. Each layer has its own silhouette so users can
// recognize "what kind of audio is this" at a glance, even with the colours
// stripped away. All deterministic — same bars at every render.
//
//   Music Score : a smooth sine-like roll, melody-shaped, mid-amplitude.
//   Voiceover   : speech clusters of 4-5 active bars then 2 quiet ones,
//                 simulating phrases with breathing room.
//   Sound FX    : a quiet baseline punctuated by sharp tall spikes
//                 (transients), with a small tail bar after each spike.
//
// Each pattern returns [restingHeight, peakHeight] in percent. The bar
// oscillates between them; inactive/silence bars stay near zero.
const FX_SPIKE_INDICES = new Set([3, 9, 16, 22, 28, 33]);
const FX_TAIL_INDICES = new Set([4, 10, 17, 23, 29, 34]);

const WAVEFORM_PATTERNS = {
    'Music Score': {
        bar: (j, total) => {
            // Three sine waves overlaid — feels melodic without looking random.
            const wave = Math.sin((j / total) * Math.PI * 3) * 22
                + Math.sin((j / total) * Math.PI * 7) * 8;
            const base = 30 + wave;
            return [Math.max(15, base - 8), Math.min(75, base + 12)];
        },
        duration: 2.6,
        ease: 'easeInOut',
    },
    'Voiceover': {
        bar: (j) => {
            const cycle = j % 8;
            // Two quiet bars at the end of each 8-bar phrase = breathing pause.
            if (cycle === 6 || cycle === 7) return [4, 6];
            // Inside a phrase, height varies with a quasi-random but stable seed.
            const seed = (j * 13) % 30;
            return [25 + seed * 0.6, 55 + seed];
        },
        duration: 1.3,
        ease: 'easeOut',
    },
    'Sound FX': {
        bar: (j) => {
            if (FX_SPIKE_INDICES.has(j)) return [10, 92];      // sharp transient
            if (FX_TAIL_INDICES.has(j)) return [8, 38];        // decay tail
            return [5, 9];                                     // baseline silence
        },
        duration: 0.7,
        ease: 'easeOut',
    },
};

const FullExperience = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef);
    const reducedMotion = useReducedMotion();
    const animate = inView && !reducedMotion;

    return (
    <div ref={sectionRef} className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
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
                    {/* Playhead — confined to the bars region (after the icons +
                        track-name columns), so the line really starts at the
                        first bar and stops at the last. Top handle is a soft
                        accent disc with a white ring and a chromatic glow. */}
                    <motion.div
                        className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-accent/70 z-20 shadow-[0_0_8px_rgba(157,148,128,0.4)]"
                        animate={animate ? { left: ['42%', '95%'] } : { left: '42%' }}
                        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
                    >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent ring-[3px] ring-white shadow-[0_3px_10px_rgba(0,0,0,0.18),0_0_16px_rgba(157,148,128,0.55)] pointer-events-none" />
                    </motion.div>

                    {TIMELINE_LAYERS.map((layer, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-20 surface-card rounded-card shadow-card flex items-center px-3 md:px-6 gap-3 md:gap-6 relative overflow-hidden group hover:shadow-card-hover transition-shadow duration-300"
                        >
                            <div className={`w-12 h-12 rounded-2xl backdrop-blur-md border ${layer.tintBg} ${layer.tintBorder} flex items-center justify-center shrink-0 shadow-card`}>
                                <layer.Icon size={20} className={layer.tintIcon} />
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
                                                animate={animate ? { opacity: [0.4, 0.7, 0.4] } : { opacity: 0.4 }}
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
                                    (() => {
                                        const pattern = WAVEFORM_PATTERNS[layer.label];
                                        return [...Array(35)].map((_, j) => {
                                            const [rest, peak] = pattern.bar(j, 35);
                                            return (
                                                <motion.div
                                                    key={j}
                                                    className={`w-1.5 rounded-full ${layer.barColor} opacity-30`}
                                                    animate={animate ? {
                                                        height: [`${rest}%`, `${peak}%`, `${rest}%`],
                                                        opacity: [0.3, 0.65, 0.3],
                                                    } : { height: `${rest}%`, opacity: 0.3 }}
                                                    transition={{
                                                        duration: pattern.duration,
                                                        repeat: Infinity,
                                                        repeatType: 'reverse',
                                                        delay: j * 0.04,
                                                        ease: pattern.ease,
                                                    }}
                                                />
                                            );
                                        });
                                    })()
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default FullExperience;
