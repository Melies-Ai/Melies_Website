import React, { useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from 'framer-motion';
import { Image as ImageIcon, X, Palmtree, User, Box } from 'lucide-react';

// Resized on import (vite-imagetools), mirroring the repo convention
// (ViralFeedSimulator ?w=480, UseCases ?w=720). The three asset thumbs render
// at 160px (asset card) / 128px (drop preview) → w=400 covers 2x retina. The
// final reveal renders at 280px wide → w=640. The originals are 768–1024px
// wide (perfume/isabelle ~120KB & 71KB each), wasted on these small tiles.
import sparkLocation from '../../../assets/images/products/spark/spark-location-apartment.webp?w=400&format=webp';
import sparkCharacter from '../../../assets/images/products/spark/spark-character-isabelle.webp?w=400&format=webp';
import sparkProduct from '../../../assets/images/products/spark/spark-product-perfume.webp?w=400&format=webp';
import consistency1 from '../../../assets/images/products/spark/spark-consistency-scene-01.webp?w=640&format=webp';

import Button from '../../Button';
import { useInView } from '../../../lib/useInView';

// AssetCard — small floating card showing one user-supplied asset.
const AssetCard = ({ image, type, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-24 h-24 md:w-40 md:h-40 rounded-card overflow-hidden shadow-lifted group"
    >
        <img src={image} alt={type} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

        {/* Fake-UI chrome (close button + label pill) only fits the desktop
            card size; on mobile the three small thumbs read better bare. */}
        <div className="hidden md:flex absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/50 transition-colors cursor-pointer">
            <X size={16} />
        </div>

        <div className="hidden md:block absolute bottom-2 left-2 right-2">
            <div className="bg-white/90 backdrop-blur-md rounded-full py-1.5 px-3 flex items-center gap-2 shadow-card">
                <Icon size={14} className="text-strong" />
                <span className="text-xs font-medium text-strong">{type}</span>
            </div>
        </div>
    </motion.div>
);

// Phase machine — explicit string states beat magic numbers under HMR.
const PHASES = {
    IDLE: 'IDLE',
    DROP_LOC: 'DROP_LOC',
    SHOW_LOC: 'SHOW_LOC',
    DROP_PROP: 'DROP_PROP',
    SHOW_PROP_AND_LOC: 'SHOW_PROP_AND_LOC',
    DROP_CHAR: 'DROP_CHAR',
    SHOW_ALL: 'SHOW_ALL',
    REVEAL_SCENE: 'REVEAL_SCENE',
};

// Run the phase loop only when `active` is true. We track the latest
// pending timeout so cleanup actually cancels the in-flight wait —
// otherwise pending setTimeouts pile up across active/inactive cycles.
const usePhaseSequence = (active = true) => {
    const [phase, setPhase] = React.useState(PHASES.IDLE);

    React.useEffect(() => {
        if (!active) {
            setPhase(PHASES.IDLE);
            return;
        }
        let cancelled = false;
        let pendingTimeout;
        const wait = (ms) => new Promise((resolve) => {
            pendingTimeout = setTimeout(resolve, ms);
        });
        const sequence = async () => {
            while (!cancelled) {
                if (cancelled) break; setPhase(PHASES.IDLE); await wait(800);
                if (cancelled) break; setPhase(PHASES.DROP_LOC); await wait(600);
                if (cancelled) break; setPhase(PHASES.SHOW_LOC); await wait(800);
                if (cancelled) break; setPhase(PHASES.DROP_PROP); await wait(600);
                if (cancelled) break; setPhase(PHASES.SHOW_PROP_AND_LOC); await wait(800);
                if (cancelled) break; setPhase(PHASES.DROP_CHAR); await wait(600);
                if (cancelled) break; setPhase(PHASES.SHOW_ALL); await wait(1000);
                if (cancelled) break; setPhase(PHASES.REVEAL_SCENE); await wait(2500);
            }
        };
        sequence();
        return () => {
            cancelled = true;
            clearTimeout(pendingTimeout);
        };
    }, [active]);

    return phase;
};

const AssetIntegration = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef);
    const reducedMotion = useReducedMotion();
    // Pause the phase machine when off-screen or when the user prefers
    // reduced motion. Off-screen: no point burning timers + re-renders the
    // user can't see. Reduced motion: respect the system preference.
    const phase = usePhaseSequence(inView && !reducedMotion);

    // Reduced-motion users never see the loop run, so they'd be stuck on the
    // empty "Drop Assets Here" box forever. Instead, freeze a representative
    // composed end-state (all 3 assets in + the integrated scene revealed).
    // Gate on `mounted` so SSR (which can't read the media query) renders the
    // same idle box the client's first paint does — no hydration mismatch.
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    const staticEnd = mounted && reducedMotion;

    const isLocVisible = staticEnd || ['SHOW_LOC', 'DROP_PROP', 'SHOW_PROP_AND_LOC', 'DROP_CHAR', 'SHOW_ALL'].includes(phase);
    const isPropVisible = staticEnd || ['SHOW_PROP_AND_LOC', 'DROP_CHAR', 'SHOW_ALL'].includes(phase);
    const isCharVisible = staticEnd || ['SHOW_ALL'].includes(phase);

    const droppingImage =
        phase === PHASES.DROP_LOC ? sparkLocation :
            phase === PHASES.DROP_PROP ? sparkProduct :
                phase === PHASES.DROP_CHAR ? sparkCharacter : null;

    const isReveal = staticEnd || phase === PHASES.REVEAL_SCENE;

    return (
        <MotionConfig reducedMotion="user">
        <div ref={sectionRef} className="w-full py-16 md:py-24 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full px-6 md:px-8 flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-strong mb-6">Bring Your Own Assets</h2>
                    <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
                        Integrate up to three of your own elements. Logos, products, or specific props.
                        <br /><br />
                        Spark seamlessly blends them into the generated video, respecting lighting and physics.
                    </p>
                    <Button to="/login" variant="dark" className="px-8 py-3 text-base">
                        Start Creating
                    </Button>
                </div>

                <div className="w-full md:flex-1 sunken-canvas surface-page shadow-inset-canvas rounded-canvas p-6 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[460px] md:min-h-[600px]">
                    <div className="absolute inset-0 grid-texture-subtle opacity-20 pointer-events-none" />

                    <div className="relative w-full max-w-md h-full flex flex-col items-center justify-center">
                        {/* 1. EMPTY STATE */}
                        <AnimatePresence mode="wait">
                            {phase === PHASES.IDLE && !staticEnd && (
                                <motion.div
                                    key="empty-state"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-64 h-64 rounded-3xl border-2 border-dashed border-default flex flex-col items-center justify-center gap-4 text-faint">
                                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-strong">Drop Assets Here</div>
                                            <div className="text-xs text-faint">Max 3 files (PNG, OBJ)</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 2. DROPPING ANIMATION */}
                        <AnimatePresence>
                            {droppingImage && (
                                <motion.div
                                    key={`drop-${phase}`}
                                    initial={{ y: -100, opacity: 0, scale: 0.9, rotate: -10 }}
                                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 15, mass: 0.8 }}
                                    className="absolute z-20"
                                >
                                    <div className="w-24 h-24 md:w-32 md:h-32 surface-card rounded-card shadow-heavy border-glass-default overflow-hidden p-1">
                                        <img src={droppingImage} alt="Dropping Asset" loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 3. REVEALED CARDS GRID */}
                        <div
                            className="flex gap-4 z-10"
                            style={{
                                // Animate ONLY opacity + transform — both GPU-composited.
                                // The previous `transition: all` swept `filter: blur()`,
                                // which repaints the whole grid every frame (the mobile
                                // jank). Receding + fading reads as the same depth cue
                                // without the per-frame blur shader.
                                transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                                opacity: isReveal ? 0.35 : 1,
                                transform: isReveal ? 'scale(0.9)' : 'scale(1)',
                            }}
                        >
                            <AnimatePresence>
                                {isLocVisible && <AssetCard key="card-location" image={sparkLocation} type="Location" icon={Palmtree} delay={0} />}
                                {isPropVisible && <AssetCard key="card-prop" image={sparkProduct} type="Prop" icon={Box} delay={0} />}
                                {isCharVisible && <AssetCard key="card-char" image={sparkCharacter} type="Character" icon={User} delay={0} />}
                            </AnimatePresence>
                        </div>

                        {/* 4. FINAL SCENE REVEAL — VERTICAL */}
                        <AnimatePresence>
                            {isReveal && (
                                <motion.div
                                    key="final-scene-container"
                                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="relative w-[230px] md:w-[280px] aspect-[9/16] bg-black rounded-[32px] shadow-heavy overflow-hidden border-4 border-white ring-1 ring-black/10 group rotate-[-2deg]">
                                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                                            <div className="bg-black/40 backdrop-blur-md text-white text-badge font-mono uppercase tracking-widest px-3 py-1 rounded-full border-glass-subtle flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Assets Integrated
                                            </div>
                                        </div>
                                        <img src={consistency1} alt="Final Integrated Scene" loading="lazy" decoding="async" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
        </MotionConfig>
    );
};

export default AssetIntegration;
