import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Smartphone, Repeat, Layers, Image as ImageIcon, Music, Mic, Volume2, ShoppingBag, Utensils, Cpu, X, Palmtree, User, Box, ArrowRight, Sparkles } from 'lucide-react';
import rawFrame from '../assets/spark_raw.png';
import renderFrame from '../assets/spark_render.png';
import consistency1 from '../assets/spark_consistency_1.png';
import consistency2 from '../assets/spark_consistency_2.webp';
import consistency3 from '../assets/spark_consistency_3.webp';
import character2 from '../assets/character.png';
import sparkLocation from '../assets/spark_location_appartement.webp';
import sparkCharacter from '../assets/spark_character_isabelle.png';
import sparkProduct from '../assets/spark_product_parfume.png';
import moonieAvatar from '../assets/moonie_director_small.webp';
import Button from '../components/Button';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

const PhoneFrame = ({ color, delay, content }) => (
    <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 100 }}
        className="glass-panel relative w-64 h-[500px] rounded-[3rem] overflow-hidden"
    >
        {/* Screen Content */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {content}
        </div>

        {/* UI Elements */}
        <div className="absolute bottom-8 left-6 right-6 flex justify-center">
            <div className="h-1 w-24 bg-ink/10 rounded-full" />
        </div>
    </motion.div>
);

const ViralFeedSimulator = () => {
    return (
        <div className="relative w-80 h-[640px] bg-black rounded-[3.5rem] border-[8px] border-ink/10 overflow-hidden shadow-2xl mx-auto z-10 box-border">
            {/* Feed Content */}
            <div className="absolute inset-0 overflow-hidden bg-[#111]">
                <motion.div
                    animate={{ y: [0, -1280] }} // Adjusted for taller items
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="space-y-0"
                >
                    {[consistency1, consistency2, consistency3, character2, consistency1].map((img, i) => (
                        <div key={i} className="w-full h-[640px] relative border-b border-white/5">
                            {/* Simulated Video Content */}
                            <img src={img} alt="Feed content" className="w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

                            {/* Floating Reaction */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1], y: -200 }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 + 1, ease: "easeOut" }}
                                className="absolute bottom-40 right-4 text-4xl drop-shadow-lg z-30"
                            >
                                {['❤️', '✨', '🔥'][i % 3]}
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* UI Overlay (TikTok Style) */}
            <div className="absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end">

                    {/* LEFT: Creator Info */}
                    <div className="flex-1 space-y-3 pb-2 pr-4">
                        <div className="font-bold text-white text-shadow-sm flex items-center gap-2">
                            @melies.creator
                        </div>
                        <p className="text-white/90 text-xs leading-snug line-clamp-2 text-shadow-sm font-light">
                            Line-drawn minimalist animation. The two characters are sitting on the long bench... <span className="opacity-60 font-semibold cursor-pointer hover:underline">more</span>
                        </p>

                        {/* Model Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-medium text-white/90 shadow-sm">
                            Spark 1.0
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex flex-col gap-6 items-center w-10 pb-2">
                        <div className="flex flex-col items-center gap-1 pointer-events-auto">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                                <span className="text-2xl text-red-500 drop-shadow-md">♥</span>
                            </div>
                            <span className="text-white text-[10px] font-medium drop-shadow-md">84K</span>
                        </div>

                        <div className="flex flex-col items-center pointer-events-auto cursor-pointer hover:opacity-80">
                            <div className="text-white font-bold text-xl tracking-widest leading-none drop-shadow-md pb-2">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConsistencyEngine = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Consistency Engine</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        Keep your background, characters, and objects consistent throughout the shot.
                        <br /><br />
                        Our Vertical Story Model ensures identity retention across every frame of your 20-second loop.
                    </p>
                </div>

                <div className="flex-1 w-full sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    <motion.div
                        className="flex gap-4 relative p-2 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: -100, right: 0 }}
                        dragElastic={0.1}
                    >
                        {[consistency1, consistency2, consistency3].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2, ease: "circOut" }}
                                className="w-48 h-80 bg-white rounded-xl border border-black/5 shadow-lg flex-shrink-0 relative overflow-hidden pointer-events-none"
                            >
                                <img
                                    src={img}
                                    alt={`Consistency Scene ${i + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 text-[10px] font-mono text-white/80 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm">SCENE_0{i + 1}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const AssetCard = ({ image, type, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-lg group"
    >
        <img src={image} alt={type} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

        {/* Close Button */}
        <div className="absolute top-2 right-2 w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors cursor-pointer">
            <X size={16} />
        </div>

        {/* Label */}
        <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-white/90 backdrop-blur-md rounded-full py-1.5 px-3 flex items-center gap-2 shadow-sm">
                <Icon size={14} className="text-ink" />
                <span className="text-xs font-medium text-ink">{type}</span>
            </div>
        </div>
    </motion.div>
);

const AssetIntegration = () => {
    // Audit Findings: Using explicit string states for better control and debugging.
    // Prevents race conditions with magic numbers.
    const [phase, setPhase] = React.useState('IDLE');

    React.useEffect(() => {
        let isMounted = true;
        const sequence = async () => {
            while (isMounted) {
                if (!isMounted) break;
                setPhase('IDLE');
                await new Promise(r => setTimeout(r, 800));

                // --- DROP 1: LOCATION ---
                if (!isMounted) break;
                setPhase('DROP_LOC');
                await new Promise(r => setTimeout(r, 600));

                if (!isMounted) break;
                setPhase('SHOW_LOC');
                await new Promise(r => setTimeout(r, 800));

                // --- DROP 2: PROP ---
                if (!isMounted) break;
                setPhase('DROP_PROP');
                await new Promise(r => setTimeout(r, 600));

                if (!isMounted) break;
                setPhase('SHOW_PROP_AND_LOC');
                await new Promise(r => setTimeout(r, 800));

                // --- DROP 3: CHARACTER ---
                if (!isMounted) break;
                setPhase('DROP_CHAR');
                await new Promise(r => setTimeout(r, 600));

                if (!isMounted) break;
                setPhase('SHOW_ALL');
                await new Promise(r => setTimeout(r, 1000));

                // --- FINAL REVEAL ---
                if (!isMounted) break;
                setPhase('REVEAL_SCENE');

                // Explicit long hold as requested
                await new Promise(r => setTimeout(r, 2500));
            }
        };
        sequence();
        return () => { isMounted = false; };
    }, []);

    // Helper to determine what cards are visible based on phase
    const isLocVisible = ['SHOW_LOC', 'DROP_PROP', 'SHOW_PROP_AND_LOC', 'DROP_CHAR', 'SHOW_ALL'].includes(phase);
    const isPropVisible = ['SHOW_PROP_AND_LOC', 'DROP_CHAR', 'SHOW_ALL'].includes(phase);
    const isCharVisible = ['SHOW_ALL'].includes(phase);

    // Explicit check for dropping states to simplify rendering logic
    const droppingImage =
        phase === 'DROP_LOC' ? sparkLocation :
            phase === 'DROP_PROP' ? sparkProduct :
                phase === 'DROP_CHAR' ? sparkCharacter : null;

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Bring Your Own Assets</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        Integrate up to three of your own elements. Logos, products, or specific props.
                        <br /><br />
                        Spark seamlessly blends them into the generated video, respecting lighting and physics.
                    </p>
                    <Link to="/login" className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#333333] transition-colors duration-200 shadow-lg inline-flex items-center justify-center">
                        Start Creating
                    </Link>
                </div>

                <div className="flex-1 w-full sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] p-12 relative overflow-hidden flex items-center justify-center h-[600px]">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Drop Zone Container */}
                    <div className="relative w-full max-w-md h-full flex flex-col items-center justify-center">

                        {/* 1. EMPTY STATE */}
                        <AnimatePresence mode="wait">
                            {phase === 'IDLE' && (
                                <motion.div
                                    key="empty-state" // CRITICAL FIX: Unique key
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-64 h-64 rounded-3xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-4 text-ink/40">
                                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-ink">Drop Assets Here</div>
                                            <div className="text-xs text-ink/40">Max 3 files (PNG, OBJ)</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 2. DROPPING ANIMATION */}
                        <AnimatePresence>
                            {droppingImage && (
                                <motion.div
                                    key={`drop-${phase}`} // CRITICAL FIX: Unique key per drop phase
                                    initial={{ y: -100, opacity: 0, scale: 0.9, rotate: -10 }}
                                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8 }}
                                    className="absolute z-20"
                                >
                                    <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-1">
                                        <img
                                            src={droppingImage}
                                            alt="Dropping Asset"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 3. REVEALED CARDS GRID */}
                        <div
                            className="flex gap-4 z-10"
                            style={{
                                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)', // Matches pop reveal
                                opacity: phase === 'REVEAL_SCENE' ? 0.5 : 1,
                                filter: phase === 'REVEAL_SCENE' ? 'blur(4px)' : 'blur(0px)',
                                transform: phase === 'REVEAL_SCENE' ? 'scale(0.92)' : 'scale(1)'
                            }}
                        >
                            <AnimatePresence>
                                {isLocVisible && (
                                    <AssetCard
                                        key="card-location"
                                        image={sparkLocation}
                                        type="Location"
                                        icon={Palmtree}
                                        delay={0}
                                    />
                                )}
                                {isPropVisible && (
                                    <AssetCard
                                        key="card-prop"
                                        image={sparkProduct}
                                        type="Prop"
                                        icon={Box}
                                        delay={0}
                                    />
                                )}
                                {isCharVisible && (
                                    <AssetCard
                                        key="card-char"
                                        image={sparkCharacter}
                                        type="Character"
                                        icon={User}
                                        delay={0}
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 4. FINAL SCENE REVEAL - VERTICAL */}
                        <AnimatePresence>
                            {phase === 'REVEAL_SCENE' && (
                                <motion.div
                                    key="final-scene-container"
                                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="relative w-[280px] aspect-[9/16] bg-black rounded-[32px] shadow-2xl overflow-hidden border-4 border-white ring-1 ring-black/10 group rotate-[-2deg]">
                                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                                            <div className="bg-black/40 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Assets Integrated
                                            </div>
                                        </div>
                                        <img src={consistency1} alt="Final Integrated Scene" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />

                                        {/* Minimal Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </div>
    );
};

const FullExperience = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">The Full Experience</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        Video is just the beginning. Our best model generates the entire sensory package.
                        <br /><br />
                        Video, Music, Voice, and Sound FX—all generated together in perfect sync.
                    </p>
                </div>

                <div className="flex-1 w-full sunken-canvas bg-[#F0ECE2]/50 shadow-inner rounded-[40px] p-12 relative overflow-hidden flex items-center justify-center min-h-[500px]">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Timeline Editor Visual */}
                    <div className="relative w-full max-w-lg flex flex-col gap-4">
                        {/* Playhead */}
                        <motion.div
                            className="absolute top-0 bottom-0 w-[1px] bg-accent/50 z-20"
                            animate={{ left: ["15%", "85%"] }}
                            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        >
                            <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-accent rounded-full shadow-sm" />
                        </motion.div>

                        {[
                            { label: "Video Track", icon: <ImageIcon size={18} />, color: "bg-blue-500", barColor: "bg-blue-400" },
                            { label: "Music Score", icon: <Music size={18} />, color: "bg-purple-500", barColor: "bg-purple-400" },
                            { label: "Voiceover", icon: <Mic size={18} />, color: "bg-rose-500", barColor: "bg-rose-400" },
                            { label: "Sound FX", icon: <Volume2 size={18} />, color: "bg-amber-500", barColor: "bg-amber-400" },
                        ].map((layer, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="h-20 bg-white rounded-2xl shadow-sm flex items-center px-6 gap-6 relative overflow-hidden group hover:shadow-md transition-shadow duration-300"
                            >
                                <div className={`w-10 h-10 rounded-xl ${layer.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                                    {layer.icon}
                                </div>
                                <div className="font-medium text-ink text-sm w-24 shrink-0">{layer.label}</div>

                                {/* Animated Visuals: Filmstrip vs Waveforms */}
                                <div className="flex-1 flex items-center gap-[3px] h-full py-5 overflow-hidden">
                                    {layer.label === "Video Track" ? (
                                        // Filmstrip Visual for Video
                                        <div className="flex gap-1 w-full h-full items-center">
                                            {[...Array(8)].map((_, j) => (
                                                <motion.div
                                                    key={j}
                                                    className={`h-full aspect-video rounded-md ${layer.barColor} opacity-40`}
                                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                                    transition={{
                                                        duration: 2 + Math.random(),
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        delay: j * 0.2,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        // Waveform Visual for Audio
                                        [...Array(35)].map((_, j) => (
                                            <motion.div
                                                key={j}
                                                className={`w-1.5 rounded-full ${layer.barColor} opacity-30`}
                                                animate={{
                                                    height: ["20%", `${40 + Math.random() * 60}%`, "20%"],
                                                    opacity: [0.3, 0.6, 0.3]
                                                }}
                                                transition={{
                                                    duration: 1.5 + Math.random(),
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    delay: j * 0.05,
                                                    ease: "easeInOut"
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
};



const UseCases = () => {
    const cases = [
        {
            title: "Product Demo",
            icon: <Box size={24} />,
            desc: "Showcase your product in action. Hero shots that sell.",
            tags: ["ECOM", "BEAUTY", "TECH"],
            gradient: "from-pink-500/20 to-rose-500/20",
            border: "group-hover:border-pink-500/50",
            shadow: "group-hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)]"
        },
        {
            title: "Story Ad",
            icon: <Smartphone size={24} />,
            desc: "Scroll-stopping paid content. Native to the feed.",
            tags: ["UGC", "SPONSORED", "HOOK"],
            gradient: "from-orange-500/20 to-amber-500/20",
            border: "group-hover:border-orange-500/50",
            shadow: "group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]"
        },
        {
            title: "Brand Moment",
            icon: <Sparkles size={24} />,
            desc: "Aesthetic loops for awareness. Vibes over conversion.",
            tags: ["LIFESTYLE", "MOOD", "EDITORIAL"],
            gradient: "from-blue-500/20 to-cyan-500/20",
            border: "group-hover:border-blue-500/50",
            shadow: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">One engine. Every format.</h2>
                <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                    Spark adapts to your content goal. Same consistency, different energy.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {cases.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className={`group relative h-80 rounded-[40px] sunken-canvas bg-[#F0ECE2] shadow-inner overflow-hidden p-8 flex flex-col justify-between border border-transparent transition-all duration-500 ${item.border} ${item.shadow}`}
                    >
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '32px 32px'
                        }} />

                        {/* Interactive Color Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-multiply`} />

                        {/* Top Right Decoration (Replacing Arrow) */}


                        {/* Header */}
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-white/40 flex items-center justify-center text-ink/80 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                                {item.icon}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-medium text-ink mb-3 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                            <p className="text-ink/60 leading-relaxed text-sm mb-6">
                                {item.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, t) => (
                                    <span key={t} className="px-3 py-1 rounded-full bg-white/50 border border-black/5 text-[10px] font-mono font-medium text-ink/50 uppercase tracking-wide group-hover:bg-white/80 group-hover:text-ink/70 transition-colors duration-500 delay-75">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const Spark = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-0 pt-36 px-4 overflow-hidden"
        >
            <SEO
                title="Spark - Vertical Story Engine"
                description="Create perfect vertical videos with consistent characters and worlds. No hallucinations. Start creating today."
                canonical="/spark"
            />

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 mb-32 px-4">
                <div className="flex-1 z-10">
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-5xl md:text-8xl font-medium mb-6 text-ink"
                    >
                        <span className="text-accent">SPARK.</span><br />Vertical Stories.
                    </motion.h1>
                    <p className="text-xl text-ink/60 max-w-xl mb-8">
                        The only AI video tool that keeps your characters consistent. No more Frankenstein videos.
                    </p>
                    <div className="flex items-center gap-4 mb-8 glass-panel p-4 rounded-2xl w-fit">
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                            <img src={moonieAvatar} alt="Moonie" className="w-full h-full object-cover scale-150 translate-y-2 translate-x-1" />
                        </div>
                        <div className="text-sm text-ink/70 italic">
                            "Perfect loops, zero effort." <br />
                            <span className="font-medium not-italic">- Moonie, Chief Cat Officer</span>
                        </div>
                    </div>
                    <Button variant="swipe" className="px-8 py-4 text-xl">
                        Start Creating
                    </Button>
                </div>

                <div className="flex-1 relative h-[600px] w-full flex items-center justify-center perspective-1000">
                    {/* Shadow / Grounding Element (Replaces Chair context) */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/20 blur-2xl rounded-[100%] z-0 scale-x-150 opacity-60" />
                    <div className="absolute z-10">
                        <ViralFeedSimulator />
                    </div>
                </div>
            </section>

            {/* CONSISTENCY ENGINE */}
            <ConsistencyEngine />

            {/* ASSET INTEGRATION */}
            <AssetIntegration />



            {/* FULL EXPERIENCE */}
            <FullExperience />

            {/* USE CASES */}
            <UseCases />

            <CTASection
                title="Ready to ignite?"
                description="Join the creators dominating the vertical feed with Spark."
                buttonText="Start Creating"
                buttonLink="/login"
                gradient="from-accent to-orange-400"
            />
        </motion.div>
    );
};

export default Spark;
