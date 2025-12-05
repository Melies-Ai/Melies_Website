import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Smartphone, Repeat, Layers, Image as ImageIcon, Music, Mic, Volume2, ShoppingBag, Utensils, Cpu, X, Palmtree, User, Box, ArrowRight } from 'lucide-react';
import rawFrame from '../assets/spark_raw.png';
import renderFrame from '../assets/spark_render.png';
import consistency1 from '../assets/spark_consistency_1.webp';
import consistency2 from '../assets/spark_consistency_2.webp';
import consistency3 from '../assets/spark_consistency_3.webp';
import character2 from '../assets/character.png';
import moonieAvatar from '../assets/moonie_director_small.webp';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

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
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />

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

                    <div className="flex gap-4 relative p-2">
                        {[consistency1, consistency2, consistency3].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2, ease: "circOut" }}
                                className="w-48 h-80 bg-white rounded-xl border border-black/5 shadow-lg flex-shrink-0 relative overflow-hidden"
                            >
                                <img
                                    src={img}
                                    alt={`Consistency Scene ${i + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 text-[10px] font-mono text-white/80 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm">SCENE_0{i + 1}</div>
                            </motion.div>
                        ))}
                    </div>
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
    const [animationState, setAnimationState] = React.useState(0); // 0: Empty, 1: Drop 1, 2: Show 1, 3: Drop 2, 4: Show 2

    React.useEffect(() => {
        let isMounted = true;
        const sequence = async () => {
            while (isMounted) {
                // CYCLE 1: Location -> Prop -> Character
                if (!isMounted) break;
                setAnimationState(0);
                await new Promise(r => setTimeout(r, 1000));

                if (!isMounted) break;
                setAnimationState(1); // Drop Location
                await new Promise(r => setTimeout(r, 600));
                if (!isMounted) break;
                setAnimationState(2); // Show Location

                await new Promise(r => setTimeout(r, 1000));

                if (!isMounted) break;
                setAnimationState(3); // Drop Prop
                await new Promise(r => setTimeout(r, 600));
                if (!isMounted) break;
                setAnimationState(4); // Show Prop

                await new Promise(r => setTimeout(r, 1000));

                if (!isMounted) break;
                setAnimationState(5); // Drop Character
                await new Promise(r => setTimeout(r, 600));
                if (!isMounted) break;
                setAnimationState(6); // Show Character

                await new Promise(r => setTimeout(r, 3000));

                // CYCLE 2: Character -> Character
                if (!isMounted) break;
                setAnimationState(7); // Reset
                await new Promise(r => setTimeout(r, 1000));

                if (!isMounted) break;
                setAnimationState(8); // Drop Character 1
                await new Promise(r => setTimeout(r, 600));
                if (!isMounted) break;
                setAnimationState(9); // Show Character 1

                await new Promise(r => setTimeout(r, 1000));

                if (!isMounted) break;
                setAnimationState(10); // Drop Character 2
                await new Promise(r => setTimeout(r, 600));
                if (!isMounted) break;
                setAnimationState(11); // Show Character 2

                await new Promise(r => setTimeout(r, 3000));
            }
        };
        sequence();
        return () => { isMounted = false; };
    }, []);

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
                </div>

                <div className="flex-1 w-full sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] p-12 relative overflow-hidden flex items-center justify-center h-[500px]">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Drop Zone Container */}
                    <div className="relative w-full max-w-md h-full flex flex-col items-center justify-center">

                        {/* Empty State / Drop Zone */}
                        <AnimatePresence mode="wait">
                            {(animationState === 0 || animationState === 7) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-64 h-64 rounded-3xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-4">
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

                        {/* Dropping Files Animation */}
                        <AnimatePresence>
                            {(animationState === 1 || animationState === 3 || animationState === 5 || animationState === 8 || animationState === 10) && (
                                <motion.div
                                    initial={{ y: -100, opacity: 0, scale: 0.9, rotate: -10 }}
                                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8 }}
                                    className="absolute z-20"
                                >
                                    <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-1">
                                        <img
                                            src={
                                                animationState === 1 ? consistency2 :
                                                    animationState === 3 ? consistency3 :
                                                        animationState === 5 ? consistency1 :
                                                            animationState === 8 ? consistency1 :
                                                                character2
                                            }
                                            alt="Dropping Asset"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Revealed Cards */}
                        <div className="flex gap-4 z-10">
                            <AnimatePresence>
                                {/* Cycle 1 Cards */}
                                {animationState >= 2 && animationState < 7 && (
                                    <AssetCard
                                        key="c1-1"
                                        image={consistency2}
                                        type="Location"
                                        icon={Palmtree}
                                        delay={0}
                                    />
                                )}
                                {animationState >= 4 && animationState < 7 && (
                                    <AssetCard
                                        key="c1-2"
                                        image={consistency3}
                                        type="Prop"
                                        icon={Box}
                                        delay={0}
                                    />
                                )}
                                {animationState >= 6 && animationState < 7 && (
                                    <AssetCard
                                        key="c1-3"
                                        image={consistency1}
                                        type="Character"
                                        icon={User}
                                        delay={0}
                                    />
                                )}

                                {/* Cycle 2 Cards */}
                                {animationState >= 9 && (
                                    <AssetCard
                                        key="c2-1"
                                        image={consistency1}
                                        type="Character"
                                        icon={User}
                                        delay={0}
                                    />
                                )}
                                {animationState >= 11 && (
                                    <AssetCard
                                        key="c2-2"
                                        image={character2}
                                        type="Character"
                                        icon={User}
                                        delay={0}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
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



const StyleLens = () => {
    const containerRef = React.useRef(null);
    const [isHovering, setIsHovering] = React.useState(false);

    // Use MotionValues for high-performance updates without re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the lens radius
    const radius = useSpring(0, { stiffness: 400, damping: 30 });

    React.useEffect(() => {
        radius.set(isHovering ? 150 : 0);
    }, [isHovering]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Create dynamic styles based on motion values
    const clipPath = useMotionTemplate`circle(${radius}px at ${mouseX}px ${mouseY}px)`;
    const borderGradient = useMotionTemplate`radial-gradient(circle 152px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.3) 0%, transparent 1%, transparent 100%)`;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-none group"
        >
            {/* Base Layer: Raw Sketch */}
            <img
                src={rawFrame}
                alt="Raw Sketch"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Reveal Layer: Rendered Output */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{ clipPath }}
            >
                <img
                    src={renderFrame}
                    alt="Spark Render"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Lens Border Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: borderGradient }}
                />
            </motion.div>

            {/* Cursor/Lens UI */}
            <motion.div
                className="absolute pointer-events-none z-20 flex items-center justify-center"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isHovering ? 1 : 0
                }}
            >
                <div className="w-[300px] h-[300px] rounded-full border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center">
                    <div className="text-white/80 text-xs font-mono tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                        SPARK_RENDER_ENGINE
                    </div>
                </div>
            </motion.div>

            {/* Hint */}
            {!isHovering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium animate-pulse">
                        Hover to Reveal Magic
                    </div>
                </div>
            )}
        </div>
    );
};

const UseCases = () => {
    const cases = [
        {
            title: "Fashion",
            icon: <ShoppingBag size={24} />,
            desc: "Virtual try-ons and runway walks generated from a single photo.",
            tags: ["Lookbook", "E-Comm", "Viral"]
        },
        {
            title: "Food & Bev",
            icon: <Utensils size={24} />,
            desc: "Steam, sizzle, and pour. Appetizing motion for static menus.",
            tags: ["Menu", "Social", "Ads"]
        },
        {
            title: "Tech",
            icon: <Cpu size={24} />,
            desc: "Product reveals and exploded views without 3D rendering.",
            tags: ["Unboxing", "Feature", "Demo"]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Built for every vertical.</h2>
                <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                    Spark adapts its generation engine to your industry's specific visual language.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {cases.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className="group relative h-80 rounded-[40px] sunken-canvas bg-[#F0ECE2] shadow-inner overflow-hidden p-8 flex flex-col justify-between"
                    >
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '32px 32px'
                        }} />

                        {/* Header */}
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-white/40 flex items-center justify-center text-ink/80 group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-medium text-ink mb-3">{item.title}</h3>
                            <p className="text-ink/60 leading-relaxed text-sm mb-6">
                                {item.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, t) => (
                                    <span key={t} className="px-3 py-1 rounded-full bg-white/50 border border-black/5 text-[10px] font-mono font-medium text-ink/50 uppercase tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
            className="pb-0 pt-24 px-4 overflow-hidden"
        >
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 mb-32 px-4">
                <div className="flex-1 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-dark text-xs font-medium tracking-wider mb-6 border border-accent/20"
                    >
                        VERTICAL STORY MODEL
                    </motion.div>
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-5xl md:text-8xl font-medium mb-6 text-ink"
                    >
                        <span className="text-accent">SPARK.</span><br />Vertical Stories.
                    </motion.h1>
                    <p className="text-xl text-ink/60 max-w-xl mb-8">
                        Create ~20-second vertical videos while keeping your background, characters, and objects consistent throughout the shot.
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
                    <Button variant="primary" className="bg-accent text-ink hover:bg-accent/90 shadow-lg shadow-accent/20">
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

            {/* STYLE LENS SECTION */}
            <section className="max-w-6xl mx-auto py-24 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-medium mb-6 text-ink">Reality, Reimagined.</h2>
                    <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                        Hover over the sketch to see the Spark engine's real-time rendering capabilities.
                    </p>
                </div>
                <StyleLens />
            </section>

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
