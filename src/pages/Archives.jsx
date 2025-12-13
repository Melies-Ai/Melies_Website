import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Layers, Maximize, Sun, Mountain, Trees, Wind, MessageSquare, User, Sparkles, Network, GitBranch, Clock, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';

// --- ARCHIVED COMPONENTS FROM CITIZEN ---

const ChatMessage = ({ role, text }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-4 mb-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}
    >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${role === 'user' ? 'bg-ink/10 text-ink' : 'bg-rose/10 text-rose'
            }`}>
            {role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
        </div>
        <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${role === 'user' ? 'bg-ink/5 text-ink' : 'bg-rose/5 text-rose-700 border border-rose/10'
            }`}>
            {text}
        </div>
    </motion.div>
);

const ConsciousnessStream = () => {
    const [thoughts, setThoughts] = useState([]);

    React.useEffect(() => {
        const types = [
            { type: 'logic', color: 'text-blue-500 border-blue-500/20 bg-blue-500/5', prefix: 'ANALYZING' },
            { type: 'emotion', color: 'text-rose-500 border-rose-500/20 bg-rose-500/5', prefix: 'FEELING' },
            { type: 'memory', color: 'text-amber-500 border-amber-500/20 bg-amber-500/5', prefix: 'RECALLING' },
            { type: 'perception', color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5', prefix: 'OBSERVING' }
        ];

        const fragments = [
            "user_tone_shift_detected: 0.8",
            "referencing_past_interaction_id_992",
            "adjusting_empathy_coefficient",
            "context_window_optimization",
            "generating_response_candidates",
            "filtering_safety_layers",
            "simulating_emotional_response",
            "querying_knowledge_graph",
            "pattern_match_found: 'sadness'",
            "initiating_comfort_protocol"
        ];

        const interval = setInterval(() => {
            const newThought = {
                id: Date.now(),
                ...types[Math.floor(Math.random() * types.length)],
                text: fragments[Math.floor(Math.random() * fragments.length)]
            };

            setThoughts(prev => [newThought, ...prev].slice(0, 8)); // Keep last 8
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[500px] w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 font-mono text-sm">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between z-10 backdrop-blur-md">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500" />
                </div>
                <div className="text-xs text-white/40">LIVE_STREAM_V.0.9.2</div>
            </div>

            {/* Stream */}
            <div className="absolute inset-0 pt-16 px-6 pb-6 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

                <AnimatePresence mode="popLayout">
                    {thoughts.map((thought) => (
                        <motion.div
                            key={thought.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            layout
                            className={`mb-3 p-3 rounded border ${thought.color} backdrop-blur-sm`}
                        >
                            <div className="flex justify-between items-center mb-1 opacity-70 text-[10px] uppercase tracking-wider">
                                <span>{thought.prefix}</span>
                                <span>{new Date(thought.id).toLocaleTimeString().split(' ')[0]}</span>
                            </div>
                            <div className="font-medium opacity-90">
                                {`> ${thought.text}`}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MemoryCore = () => {
    const [rotation, setRotation] = useState(0);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [autoHighlightIndex, setAutoHighlightIndex] = useState(null);
    const isHoveringCanvas = React.useRef(false);

    // Generate random memory nodes on a sphere
    const memories = React.useMemo(() => {
        const nodes = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < 25; i++) {
            const y = 1 - (i / (25 - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            nodes.push({
                id: i,
                x: x * 140,
                y: y * 140,
                z: z * 140,
                type: ['core', 'sentiment', 'fact'][i % 3],
                label: ['Core Identity', 'Emotional Imprint', 'Knowledge Node'][i % 3],
                detail: [
                    "User prefers dark mode interfaces.",
                    "First time user said 'Hello'.",
                    "User asked about the meaning of life.",
                    "Detected hesitation in user's voice.",
                    "User praised the creative output.",
                    "Stored user's favorite color: #FF0055."
                ][i % 6]
            });
        }
        return nodes;
    }, []);

    // Auto-rotation loop
    React.useEffect(() => {
        let animationFrame;
        const animate = () => {
            setRotation(prev => (prev + 0.003) % (Math.PI * 2));
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Auto-highlight loop
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isHoveringCanvas.current && hoveredNode === null) {
                // Pick a random node to highlight
                const randomIndex = Math.floor(Math.random() * memories.length);
                setAutoHighlightIndex(randomIndex);

                // Clear highlight after a short duration
                setTimeout(() => {
                    setAutoHighlightIndex(null);
                }, 2000);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [hoveredNode, memories.length]);

    // 3D Projection Logic
    const project = (x, y, z) => {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const rotX = x * cos - z * sin;
        const rotZ = z * cos + x * sin;

        const fov = 300;
        const scale = fov / (fov + rotZ + 200);

        return { x: rotX * scale, y: y * scale, scale, zIndex: Math.round(scale * 100), rotX, rotZ, rawY: y };
    };

    return (
        <div
            className="relative w-full aspect-square flex items-center justify-center perspective-1000 sunken-canvas rounded-3xl overflow-hidden shadow-inner bg-[#F5F2EB]"
            onMouseEnter={() => isHoveringCanvas.current = true}
            onMouseLeave={() => {
                isHoveringCanvas.current = false;
                setHoveredNode(null);
            }}
        >
            {/* Radial Polar Grid (Darker Rings) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-1000 overflow-hidden">
                <div
                    className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
                    style={{
                        background: `
                            radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px),
                            repeating-radial-gradient(rgba(0,0,0,0.08) 0, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 40px)
                        `,
                        transform: 'rotateX(80deg) translateY(1000px)',
                        maskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                    }}
                />
            </div>

            {/* Central Axis Line */}
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-rose-500/20 to-transparent" />

            <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                {/* Connecting Lines (Neural Pathways) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {memories.map((node, i) => {
                        if (i % 3 !== 0) return null;
                        const p1 = project(node.x, node.y, node.z);
                        const nextNode = memories[(i + 1) % memories.length];
                        const p2 = project(nextNode.x, nextNode.y, nextNode.z);

                        return (
                            <motion.line
                                key={`line-${i}`}
                                x1={`calc(50% + ${p1.x}px)`}
                                y1={`calc(50% + ${p1.y}px)`}
                                x2={`calc(50% + ${p2.x}px)`}
                                y2={`calc(50% + ${p2.y}px)`}
                                stroke="rgba(244, 63, 94, 0.2)"
                                strokeWidth="1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: p1.scale * p2.scale }}
                            />
                        );
                    })}
                </svg>

                {memories.map((node) => {
                    const { x, y, scale, zIndex } = project(node.x, node.y, node.z);
                    const isHovered = hoveredNode === node.id;
                    const isAutoHighlighted = autoHighlightIndex === node.id;
                    const isActive = isHovered || isAutoHighlighted;

                    // Color Palette: Rose (Emotion), White (Core), Ink (Fact)
                    const colorClass = node.type === 'core' ? 'bg-white shadow-white/50' :
                        node.type === 'sentiment' ? 'bg-rose-500 shadow-rose-500/50' :
                            'bg-ink/80 shadow-ink/50';

                    return (
                        <motion.div
                            key={node.id}
                            className="absolute flex items-center justify-center cursor-pointer group"
                            style={{
                                x,
                                y,
                                zIndex,
                                scale: isActive ? 1.5 : scale,
                                opacity: Math.max(0.3, scale)
                            }}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            {/* Hit Area (Invisible, Larger) */}
                            <div className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-transparent z-10" />

                            {/* Node Dot */}
                            <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-300 ${colorClass} ${isActive ? 'scale-125' : ''}`} />

                            {/* Pulse Ring */}
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${colorClass}`} />

                            {/* Hover Card */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute top-6 left-1/2 -translate-x-1/2 w-56 bg-white/90 backdrop-blur-xl border border-white/20 p-4 rounded-xl z-50 shadow-xl pointer-events-none"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-2 h-2 rounded-full ${colorClass.split(' ')[0]}`} />
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                                                {node.type}
                                            </div>
                                        </div>
                                        <div className="text-sm text-ink font-serif font-medium mb-1">{node.label}</div>
                                        <div className="text-xs text-ink/60 leading-relaxed border-t border-ink/5 pt-2 mt-2">
                                            "{node.detail}"
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

const TraitTuner = () => {
    const [traits, setTraits] = useState({ warmth: 50, cynicism: 20 });
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello. I am Lyra. How do you perceive me?" }
    ]);

    const handleTraitChange = (trait, value) => {
        setTraits(prev => ({ ...prev, [trait]: value }));
        // Simulate dynamic response change
        if (trait === 'cynicism' && value > 70) {
            setMessages(prev => [prev[0], { role: 'user', text: "You look sad today." }, { role: 'ai', text: "Sadness implies I care enough to be disappointed. I'm just processing." }]);
        } else if (trait === 'warmth' && value > 70) {
            setMessages(prev => [prev[0], { role: 'user', text: "You look sad today." }, { role: 'ai', text: "Oh, do I? I'm actually feeling quite peaceful, thank you for asking! 🌸" }]);
        } else {
            setMessages(prev => [prev[0], { role: 'user', text: "You look sad today." }, { role: 'ai', text: "The rain in this sector always reminds me of what I lost. It's not sadness, just... memory." }]);
        }
    };

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Trait Tuner</div>
            <div className="max-w-4xl mx-auto sunken-canvas overflow-hidden flex flex-col md:flex-row h-[500px] shadow-lg w-full">
                <div className="w-full md:w-1/3 bg-subtle/20 p-6 border-r border-subtle flex flex-col">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-ink">
                        <MessageSquare size={18} className="text-rose" />
                        Trait Tuner
                    </h3>
                    <p className="text-sm text-ink/50 mb-6">
                        Adjust personality vectors in real-time.
                    </p>

                    <div className="space-y-6 flex-1">
                        <div>
                            <div className="flex justify-between text-xs font-medium text-ink mb-2">
                                <span>Warmth</span>
                                <span>{traits.warmth}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={traits.warmth}
                                onChange={(e) => handleTraitChange('warmth', parseInt(e.target.value))}
                                className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-rose"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-medium text-ink mb-2">
                                <span>Cynicism</span>
                                <span>{traits.cynicism}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={traits.cynicism}
                                onChange={(e) => handleTraitChange('cynicism', parseInt(e.target.value))}
                                className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-rose"
                            />
                        </div>
                    </div>

                    <div className="mt-auto space-y-2">
                        <div className="text-xs font-mono text-ink/30 uppercase">Active Traits</div>
                        <div className="flex flex-wrap gap-2">
                            {traits.warmth > 60 && <span className="px-2 py-1 rounded bg-rose/10 text-rose text-xs border border-rose/20">Warm</span>}
                            {traits.cynicism > 60 && <span className="px-2 py-1 rounded bg-rose/10 text-rose text-xs border border-rose/20">Cynical</span>}
                            {traits.warmth <= 60 && traits.cynicism <= 60 && <span className="px-2 py-1 rounded bg-ink/10 text-ink text-xs border border-ink/20">Neutral</span>}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-white">
                    <div className="flex-1 p-6 overflow-y-auto">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg, i) => (
                                <ChatMessage key={i} role={msg.role} text={msg.text} />
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="p-4 border-t border-subtle">
                        <div className="h-10 bg-subtle/30 rounded-full border border-subtle flex items-center px-4 text-sm text-ink/30">
                            Type a message to Lyra...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TransparentThought = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Transparent Thought</div>
            <div className="max-w-7xl mx-auto w-full px-4 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-medium mb-6 text-ink">Transparent Thought.</h2>
                    <p className="text-xl text-ink/60 mb-8 leading-relaxed">
                        See what your characters are thinking. Citizen exposes the internal monologue, emotional state, and decision-making logic in real-time.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-ink/80 font-medium">Logic & Reasoning</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <span className="text-ink/80 font-medium">Emotional Processing</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <span className="text-ink/80 font-medium">Memory Retrieval</span>
                        </div>
                    </div>
                </div>

                <ConsciousnessStream />
            </div>
        </div>
    );
};

const TotalRecall = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Total Recall</div>
            <div className="max-w-7xl mx-auto w-full px-4 grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                    <MemoryCore />
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-4xl md:text-5xl font-medium mb-6 text-ink">Total Recall.</h2>
                    <p className="text-xl text-ink/60 mb-8 leading-relaxed">
                        A living memory architecture that grows with every interaction.
                        Hover over the nodes to explore the neural pathways.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/40">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <div className="w-3 h-3 rounded-full bg-rose-500" />
                            </div>
                            <div>
                                <div className="font-medium text-ink">Emotional Imprints</div>
                                <div className="text-xs text-ink/50">Stored sentiment analysis</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/40">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <div className="w-3 h-3 rounded-full bg-ink" />
                            </div>
                            <div>
                                <div className="font-medium text-ink">Knowledge Nodes</div>
                                <div className="text-xs text-ink/50">Factual context retention</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ARCHIVED COMPONENTS FROM OASIS ---


const PhysicsEngine = () => {
    const [params, setParams] = useState({ gravity: 50, atmosphere: 30 });

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Physics Engine</div>
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Physics Engine</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        Define the laws of nature. Gravity, atmosphere, and density are yours to command.
                        <br /><br />
                        Our simulation engine calculates interactions in real-time, ensuring every rock falls exactly as it should.
                    </p>

                    <div className="space-y-6 max-w-sm">
                        <div>
                            <div className="flex justify-between text-xs font-medium text-ink mb-2">
                                <span>Gravity</span>
                                <span>{params.gravity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={params.gravity}
                                onChange={(e) => setParams({ ...params, gravity: parseInt(e.target.value) })}
                                className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-medium text-ink mb-2">
                                <span>Atmosphere</span>
                                <span>{params.atmosphere}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={params.atmosphere}
                                onChange={(e) => setParams({ ...params, atmosphere: parseInt(e.target.value) })}
                                className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full h-[500px] sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Interactive Sphere */}
                    <motion.div
                        animate={{
                            y: [0, -20 * (100 - params.gravity) / 50, 0],
                            scale: [1, 1 + params.atmosphere / 200, 1]
                        }}
                        transition={{
                            duration: 2 + (params.gravity / 20),
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-48 h-48 rounded-full relative z-10 backdrop-blur-md bg-white/30 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
                        <Globe className="text-emerald-600 opacity-50" size={64} />
                    </motion.div>

                    {/* Atmosphere Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -100],
                                    opacity: [0, params.atmosphere / 100, 0]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                                className="absolute bg-white rounded-full blur-sm"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    bottom: '0%',
                                    width: Math.random() * 20 + 10,
                                    height: Math.random() * 20 + 10,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LODEngine = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: LOD Engine</div>
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">LOD Engine</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        From the curvature of a planet to the moss on a stone.
                        <br /><br />
                        Our adaptive Level of Detail system scales infinitely, rendering only what the camera sees.
                    </p>
                </div>

                <div className="flex-1 w-full h-[500px] sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Zoom Visual */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {[
                            { icon: <Globe size={120} />, label: "PLANET", scale: 1, opacity: 0.1 },
                            { icon: <Mountain size={80} />, label: "TERRAIN", scale: 1.5, opacity: 0.3 },
                            { icon: <Trees size={40} />, label: "FLORA", scale: 2.5, opacity: 0.6 },
                            { icon: <div className="w-4 h-4 bg-emerald-500 rounded-full" />, label: "MICRO", scale: 4, opacity: 1 }
                        ].map((layer, i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [layer.scale, layer.scale * 1.2, layer.scale] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                className="absolute flex flex-col items-center justify-center text-emerald-800"
                                style={{ opacity: layer.opacity }}
                            >
                                {layer.icon}
                                <div className="text-[10px] font-mono tracking-widest mt-2">{layer.label}</div>
                            </motion.div>
                        ))}

                        {/* Focus Reticle */}
                        <div className="absolute w-32 h-32 border border-emerald-500/50 rounded-lg flex items-center justify-center">
                            <div className="w-full h-[1px] bg-emerald-500/50 absolute" />
                            <div className="h-full w-[1px] bg-emerald-500/50 absolute" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LightingStudio = () => {
    const [time, setTime] = useState(50);

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Lighting Studio</div>
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Lighting Studio</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        Real-time global illumination. Control the sun, the shadows, and the mood.
                        <br /><br />
                        From golden hour to midnight, light behaves exactly as it does in the real world.
                    </p>

                    <div className="w-full max-w-sm">
                        <div className="flex justify-between text-xs font-medium text-ink mb-2">
                            <span>Time of Day</span>
                            <span>{time < 25 ? 'Night' : time < 50 ? 'Morning' : time < 75 ? 'Noon' : 'Evening'}</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={time}
                            onChange={(e) => setTime(parseInt(e.target.value))}
                            className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>
                </div>

                <div className="flex-1 w-full h-[500px] sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] relative overflow-hidden flex items-center justify-center">
                    {/* Sky Gradient */}
                    <div
                        className="absolute inset-0 transition-colors duration-500"
                        style={{
                            background: `linear-gradient(to bottom, 
                                ${time < 25 ? '#0f172a' : time < 50 ? '#bae6fd' : time < 75 ? '#7dd3fc' : '#f59e0b'},
                                ${time < 25 ? '#1e293b' : time < 50 ? '#e0f2fe' : time < 75 ? '#bae6fd' : '#7c2d12'}
                            )`,
                            opacity: 0.5
                        }}
                    />

                    {/* Sun/Moon */}
                    <motion.div
                        className="absolute w-24 h-24 rounded-full shadow-lg flex items-center justify-center"
                        animate={{
                            rotate: time * 3.6,
                            x: Math.cos((time / 100) * Math.PI * 2 - Math.PI / 2) * 150,
                            y: Math.sin((time / 100) * Math.PI * 2 - Math.PI / 2) * 150
                        }}
                    >
                        <div className={`w-full h-full rounded-full ${time > 25 && time < 75 ? 'bg-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.5)]' : 'bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`} />
                    </motion.div>

                    {/* Landscape Silhouette */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-ink/10 backdrop-blur-sm rounded-b-[40px]" style={{ clipPath: 'polygon(0% 100%, 0% 40%, 20% 60%, 40% 30%, 60% 50%, 80% 20%, 100% 60%, 100% 100%)' }} />
                </div>
            </div>
        </div>
    );
};

const EcosystemBalance = () => {
    const [weights, setWeights] = useState({ flora: 33, fauna: 33, atmosphere: 33 });

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Ecosystem Balance</div>
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Ecosystem Balance</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        You are the architect. Tune the delicate balance between nature, life, and the elements.
                    </p>

                    <div className="space-y-4 max-w-sm">
                        {['Flora', 'Fauna', 'Atmosphere'].map((type) => (
                            <div key={type} className="space-y-2">
                                <div className="flex justify-between text-sm font-medium text-ink/60">
                                    <span>{type}</span>
                                    <span>{weights[type.toLowerCase()]}%</span>
                                </div>
                                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${type === 'Flora' ? 'bg-emerald-400' : type === 'Fauna' ? 'bg-rose-400' : 'bg-blue-400'}`}
                                        style={{ width: `${weights[type.toLowerCase()]}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full h-[500px] sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Triangular Control Visual */}
                    <div className="relative w-64 h-64">
                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                            <polygon points="128,10 10,246 246,246" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
                            <circle cx="128" cy="10" r="8" className="fill-blue-400" />
                            <circle cx="10" cy="246" r="8" className="fill-emerald-400" />
                            <circle cx="246" cy="246" r="8" className="fill-rose-400" />
                        </svg>

                        {/* Draggable Puck (Simulated) */}
                        <motion.div
                            animate={{
                                x: [0, -50, 50, 0],
                                y: [0, 50, 50, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-black/5 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
                        >
                            <div className="w-2 h-2 bg-ink rounded-full" />
                        </motion.div>

                        {/* Biome Labels */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-500">ATMOSPHERE</div>
                        <div className="absolute -bottom-8 left-0 text-xs font-bold text-emerald-500">FLORA</div>
                        <div className="absolute -bottom-8 right-0 text-xs font-bold text-rose-500">FAUNA</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ARCHIVED COMPONENTS FROM FABLE ---

const params = { gravity: 50, atmosphere: 30 }; // Re-used for some reason or just clean up? Wait, PhysicsEngine has its own state. 

const GenreAlchemy = () => {
    const [activeGenres, setActiveGenres] = useState(['Cyberpunk']);
    const [logline, setLogline] = useState("A hacker discovers their own memories are encrypted files.");

    const genres = [
        { id: 'Cyberpunk', color: 'bg-blue-500', text: 'text-blue-500' },
        { id: 'Noir', color: 'bg-gray-600', text: 'text-gray-400' },
        { id: 'Eldritch', color: 'bg-purple-600', text: 'text-purple-500' },
        { id: 'Romance', color: 'bg-rose-500', text: 'text-rose-500' },
        { id: 'Western', color: 'bg-amber-600', text: 'text-amber-600' }
    ];

    const toggleGenre = (genre) => {
        let newGenres;
        if (activeGenres.includes(genre)) {
            if (activeGenres.length > 1) {
                newGenres = activeGenres.filter(g => g !== genre);
            } else {
                return; // Keep at least one
            }
        } else {
            if (activeGenres.length < 3) {
                newGenres = [...activeGenres, genre];
            } else {
                newGenres = [...activeGenres.slice(1), genre];
            }
        }
        setActiveGenres(newGenres);
        generateLogline(newGenres);
    };

    const generateLogline = (currentGenres) => {
        // Simple deterministic generator for demo purposes
        const bases = {
            'Cyberpunk': "A hacker discovers their own memories are encrypted files.",
            'Noir': "A detective takes a case that leads to their own past.",
            'Eldritch': "An ancient god wakes up in the basement of a coffee shop.",
            'Romance': "Two rivals fall in love against all odds.",
            'Western': "A lone drifter rides into a town with no name."
        };

        const combos = {
            'Cyberpunk+Noir': "Neon rain falls as a cyborg detective hunts a ghost in the machine.",
            'Cyberpunk+Eldritch': "The AI singularity is actually a summoning ritual for an old god.",
            'Cyberpunk+Romance': "Love blooms between a human and a rogue android in the slums of Neo-Tokyo.",
            'Cyberpunk+Western': "High-tech outlaws rob a hover-train on the Martian frontier.",
            'Noir+Eldritch': "The murder weapon was a tentacle, and the suspect doesn't exist in this dimension.",
            'Noir+Romance': "A femme fatale and a private eye share a cigarette while the world burns.",
            'Noir+Western': "A sheriff investigates a cattle mutilation that hints at a government conspiracy.",
            'Eldritch+Romance': "Dating is hard when your partner is a swarm of sentient bees.",
            'Eldritch+Western': "Cowboys vs. Cthulhu at the O.K. Corral.",
            'Romance+Western': "A forbidden love between a rancher and a railroad tycoon's daughter."
        };

        // Sort to ensure key matching works regardless of order
        const sorted = [...currentGenres].sort();
        const key = sorted.join('+');

        if (combos[key]) {
            setLogline(combos[key]);
        } else if (bases[sorted[0]]) {
            setLogline(bases[sorted[0]] + " ( ...blending genres )");
        } else {
            setLogline("Generating narrative synthesis...");
        }
    };

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Genre Alchemy</div>
            <div className="max-w-6xl mx-auto px-4 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-medium mb-6 text-ink">Genre Alchemy</h2>
                    <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                        Blend genres to discover new narrative frontiers. Fable's engine handles the tonal shifts seamlessly.
                    </p>
                </div>
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
                    {/* Background Ambience */}
                    <div className={`absolute inset-0 opacity-20 transition-colors duration-1000 bg-gradient-to-br ${activeGenres.includes('Cyberpunk') ? 'from-cobalt/40' :
                        activeGenres.includes('Romance') ? 'from-rose-500/40' : 'from-white/10'
                        } to-black`} />

                    {/* Core Visual */}
                    <div className="relative mb-12">
                        <div className="w-32 h-32 rounded-full blur-xl opacity-50 absolute inset-0 animate-pulse"
                            style={{
                                background: activeGenres.map(g => genres.find(i => i.id === g).color.replace('bg-', '')).join(', ')
                            }}
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 rounded-full border-2 border-white/20 relative flex items-center justify-center backdrop-blur-sm"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white/10 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Genre Toggles */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
                        {genres.map(genre => (
                            <button
                                key={genre.id}
                                onClick={() => toggleGenre(genre.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeGenres.includes(genre.id)
                                    ? `${genre.color} text-white border-transparent shadow-lg scale-105`
                                    : 'bg-white/5 text-ink/60 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {genre.id}
                            </button>
                        ))}
                    </div>

                    {/* Output Logline */}
                    <div className="relative z-10 text-center max-w-2xl">
                        <div className="text-xs font-mono text-ink/40 mb-2 uppercase tracking-widest">Narrative Synthesis</div>
                        <motion.div
                            key={logline} // Re-animate on change
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-3xl font-serif text-ink italic leading-relaxed"
                        >
                            "{logline}"
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SceneComposer = () => {
    const [activeType, setActiveType] = useState('COMMERCIAL');

    const scenes = {
        'FEATURE FILM': {
            prompt: "EXT. NEON ALLEY - NIGHT\n\nA rogue android (visible circuitry) clutches a data drive. Rain slicks the pavement. Anamorphic lens flares cut through the gloom.",
            slots: [
                { type: 'Character', name: 'Rogue Android', icon: '🤖', color: 'bg-blue-100 text-blue-600' },
                { type: 'Location', name: 'Neon Alley', icon: '🌃', color: 'bg-purple-100 text-purple-600' },
                { type: 'Object', name: 'Data Drive', icon: '💾', color: 'bg-emerald-100 text-emerald-600' }
            ],
            bg: 'from-blue-900 to-black'
        },
        'COMMERCIAL': {
            prompt: "INT. PARISIAN APARTMENT - DAY\n\nSoft morning light hits a bottle of Mongolfiere fragrance. A sophisticated woman (30s) smiles enigmatically. Cinematic elegance.",
            slots: [
                { type: 'Object', name: 'Perfume Bottle', icon: '🧴', color: 'bg-rose-100 text-rose-600' },
                { type: 'Character', name: 'Sophisticated Woman', icon: '👩', color: 'bg-amber-100 text-amber-600' },
                { type: 'Location', name: 'Parisian Apartment', icon: '🗼', color: 'bg-orange-100 text-orange-600' }
            ],
            bg: 'from-rose-900 to-black'
        },
        'VIDEO CLIP': {
            prompt: "EXT. FLOATING ISLANDS - DREAM\n\nSurreal landscape. Giant flowers sway in a pastel sky. A dreamer floats weightlessly. Nostalgic grain, soft focus.",
            slots: [
                { type: 'Character', name: 'Dreamer', icon: '😴', color: 'bg-indigo-100 text-indigo-600' },
                { type: 'Location', name: 'Floating Islands', icon: '☁️', color: 'bg-sky-100 text-sky-600' },
                { type: 'Object', name: 'Giant Flower', icon: '🌺', color: 'bg-pink-100 text-pink-600' }
            ],
            bg: 'from-indigo-900 to-black'
        }
    };

    const currentScene = scenes[activeType];

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Imagine Your...</div>
            <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row gap-16 items-center">
                {/* Left: Selector (On Background) */}
                <div className="flex-1 relative z-10">
                    <h3 className="text-4xl md:text-5xl font-medium text-ink mb-12">Imagine Your...</h3>
                    <div className="flex flex-col gap-2 border-l-2 border-black/5 pl-6">
                        {Object.keys(scenes).map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={`text-left text-2xl md:text-3xl font-medium transition-all duration-300 py-2 ${activeType === type
                                    ? 'text-ink translate-x-2'
                                    : 'text-ink/20 hover:text-ink/40'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Preview & Slots (In Sunken Canvas) */}
                <div className="flex-[1.5] w-full sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Video Preview Area */}
                    <div className="flex-1 bg-black rounded-2xl relative overflow-hidden shadow-2xl group ring-1 ring-black/5 aspect-video">
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentScene.bg} opacity-80 transition-colors duration-1000`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                                <Play className="text-white fill-white ml-1" size={32} />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/90 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-white/50 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center gap-2 mb-2 border-b border-black/5 pb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50">Script Generation</span>
                                </div>
                                <p className="text-sm font-mono text-ink/80 leading-relaxed whitespace-pre-wrap line-clamp-2">
                                    {currentScene.prompt}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slots Row (Asset Cards) */}
                    <div className="grid grid-cols-3 gap-4 relative z-10">
                        {currentScene.slots.map((slot, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col items-center justify-center gap-3 group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className={`w-10 h-10 rounded-full ${slot.color} flex items-center justify-center text-xl shadow-inner`}>
                                    {slot.icon}
                                </div>
                                <div className="text-center">
                                    <div className="text-[9px] font-mono text-ink/40 uppercase tracking-wider mb-1">{slot.type}</div>
                                    <div className="text-xs font-medium text-ink leading-tight">{slot.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const NarrativeLoom = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [nodes, setNodes] = useState([
        { id: 1, title: "Opening Scene", type: "scene", x: 100, y: 200 },
        { id: 2, title: "Protagonist Intro", type: "character", x: 400, y: 100 },
        { id: 3, title: "Cyberpunk City", type: "world", x: 400, y: 300 },
        { id: 4, title: "Conflict Start", type: "scene", x: 700, y: 200 }
    ]);

    const [connections, setConnections] = useState([
        { startId: 1, endId: 2 },
        { startId: 1, endId: 3 },
        { startId: 2, endId: 4 },
        { startId: 3, endId: 4 }
    ]);

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Narrative Loom</div>
            <div className="max-w-7xl mx-auto mb-32 w-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium text-ink mb-4">Narrative Loom</h2>
                    <p className="text-ink/60">Visualize and structure your story flow.</p>
                </div>
                <div className="relative h-[600px] sunken-canvas overflow-hidden shadow-inner group rounded-3xl bg-[#F5F2EB]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cobalt/5 to-transparent opacity-50" />

                    {/* Grid Background */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Interactive Graph Area */}
                    <div className="relative w-full h-full">
                        {/* Connections Layer */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            {connections.map((conn, i) => {
                                const startNode = nodes.find(n => n.id === conn.startId);
                                const endNode = nodes.find(n => n.id === conn.endId);
                                if (!startNode || !endNode) return null;

                                return (
                                    <g key={i}>
                                        {/* Base Connection Line */}
                                        <motion.path
                                            d={`M ${startNode.x + 192} ${startNode.y + 60} C ${startNode.x + 250} ${startNode.y + 60}, ${endNode.x - 50} ${endNode.y + 60}, ${endNode.x} ${endNode.y + 60}`}
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="2"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ delay: 0.5 + i * 0.1, duration: 1.5 }}
                                        />
                                        {/* Traveling Pulse (Simulation) */}
                                        {isPlaying && (
                                            <motion.path
                                                d={`M ${startNode.x + 192} ${startNode.y + 60} C ${startNode.x + 250} ${startNode.y + 60}, ${endNode.x - 50} ${endNode.y + 60}, ${endNode.x} ${endNode.y + 60}`}
                                                fill="none"
                                                stroke="#2563EB"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{
                                                    pathLength: [0, 0.2, 0],
                                                    pathOffset: [0, 0.8, 1],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    ease: "easeInOut",
                                                    repeat: Infinity,
                                                    delay: i * 0.3
                                                }}
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Draggable Nodes */}
                        {nodes.map((node) => (
                            <motion.div
                                key={node.id}
                                drag
                                dragMomentum={false}
                                onDrag={(event, info) => {
                                    const newNodes = nodes.map(n =>
                                        n.id === node.id ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y } : n
                                    );
                                    setNodes(newNodes);
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{ x: node.x, y: node.y, position: 'absolute', left: 0, top: 0 }}
                                className="absolute w-48 bg-white/90 backdrop-blur-md border border-subtle rounded-xl p-3 shadow-lg cursor-grab active:cursor-grabbing group z-10 hover:border-cobalt/50 transition-colors"
                            >
                                <div className={`text-xs font-mono mb-2 uppercase tracking-wider flex justify-between items-center ${node.type === 'scene' ? 'text-cobalt' :
                                    node.type === 'character' ? 'text-rose' : 'text-emerald'
                                    }`}>
                                    <span>{node.type}</span>
                                    <div className="w-2 h-2 rounded-full bg-current opacity-50" />
                                </div>
                                <div className="h-20 bg-subtle/30 rounded-lg mb-2 relative overflow-hidden border border-subtle group-hover:bg-white transition-colors">
                                    <div className="absolute inset-0 flex items-center justify-center text-ink/20 text-xs group-hover:text-ink/40">
                                        <div className="w-full h-full p-2">
                                            <div className="w-full h-2 bg-ink/5 rounded mb-1" />
                                            <div className="w-2/3 h-2 bg-ink/5 rounded" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-ink">{node.title}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* UI Overlay */}
                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <div className="px-3 py-1 rounded-md bg-white border border-subtle text-xs font-mono text-ink/70 shadow-sm flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Graph
                        </div>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`px-3 py-1 rounded-md border text-xs font-mono shadow-sm flex items-center gap-2 transition-all ${isPlaying
                                ? 'bg-cobalt text-white border-cobalt'
                                : 'bg-white border-subtle text-cobalt hover:bg-cobalt/5'
                                }`}
                        >
                            {isPlaying ? <span className="flex items-center gap-1">Playing...</span> : <span className="flex items-center gap-1"><Play size={10} /> Simulate Flow</span>}
                        </button>
                    </div>

                    <div className="absolute bottom-4 right-4 text-xs text-ink/30 font-mono pointer-events-none">
                        DRAG NODES TO REARRANGE
                    </div>
                </div>
            </div>
        </div>
    );
};

const FableEcosystem = () => {
    const [activeModule, setActiveModule] = useState(null);

    const modules = [
        { id: 'script', label: 'Script', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>, providers: ['OpenAI', 'Claude', 'Mistral'], color: '#10B981' },
        { id: 'video', label: 'Video', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></svg>, providers: ['Sora', 'Kling', 'Veo'], color: '#F43F5E' },
        { id: 'music', label: 'Music', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>, providers: ['Suno', 'Udio'], color: '#F59E0B' },
        { id: 'voice', label: 'Voice', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>, providers: ['ElevenLabs', 'Play.ai'], color: '#2563EB' },
    ];

    return (
        <div className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px] border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: The Melies Ecosystem</div>
            <div className="relative z-10 max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
                {/* Left: Text Content */}
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">The Melies Ecosystem</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        A living system where the world's most powerful AI models converge to fuel your creativity.
                        <br /><br />
                        Orchestrate specialized agents for scriptwriting, video generation, music composition, and voice synthesis in one unified interface.
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-ink font-medium">
                            <span className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm">1</span>
                            Unified Model Orchestration
                        </div>
                        <div className="flex items-center gap-4 text-ink font-medium">
                            <span className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm">2</span>
                            Real-time Asset Generation
                        </div>
                        <div className="flex items-center gap-4 text-ink font-medium">
                            <span className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm">3</span>
                            Seamless Pipeline Integration
                        </div>
                    </div>
                </div>

                {/* Right: Sunken Canvas Visual */}
                <div className="flex-1 w-full aspect-square relative sunken-canvas rounded-[40px] shadow-inner overflow-hidden flex items-center justify-center group bg-[#F0ECE2]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* The Orbit System */}
                    <div className="relative w-[400px] h-[400px] flex items-center justify-center scale-90 md:scale-100">

                        {/* Orbital Rings - Dark Mode */}
                        <div className="absolute inset-0 border border-black/5 rounded-full animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-12 border border-black/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="absolute inset-24 border border-black/5 rounded-full animate-[spin_20s_linear_infinite]" />

                        {/* Central Core */}
                        <div className="relative z-20 w-32 h-32 flex items-center justify-center group">
                            <div className="absolute inset-0 bg-cobalt/10 blur-2xl rounded-full animate-pulse" />
                            {/* Replaced image with a div as removing image imports */}
                            <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center relative z-10 drop-shadow-xl border border-white/20">
                                <span className="text-3xl font-serif italic text-white/90">m*</span>
                            </div>
                        </div>

                        {/* Orbiting Modules */}
                        {modules.map((module, index) => {
                            const angle = (index * (360 / modules.length)) - 90; // Start from top
                            const radius = 160; // Distance from center (adjusted for smaller container)
                            const x = Math.cos((angle * Math.PI) / 180) * radius;
                            const y = Math.sin((angle * Math.PI) / 180) * radius;

                            const isActive = activeModule === module.id;

                            return (
                                <motion.div
                                    key={module.id}
                                    className="absolute z-30"
                                    style={{ x, y }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div
                                        className={`relative group cursor-pointer`}
                                        onMouseEnter={() => setActiveModule(module.id)}
                                        onMouseLeave={() => setActiveModule(null)}
                                    >
                                        {/* Connection Beam to Core */}
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none overflow-visible" style={{ left: -x, top: -y }}>
                                            <line
                                                x1="200" y1="200"
                                                x2={200 + x} y2={200 + y}
                                                stroke={isActive ? module.color : "rgba(0,0,0,0.1)"}
                                                strokeWidth={isActive ? "2" : "1"}
                                                strokeDasharray={isActive ? "none" : "4 4"}
                                            />
                                            {isActive && (
                                                <circle r="3" fill={module.color}>
                                                    <animateMotion dur="1s" repeatCount="indefinite" path={`M 200 200 L ${200 + x} ${200 + y}`} />
                                                </circle>
                                            )}
                                        </svg>

                                        {/* Module Node */}
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-white border transition-all duration-300 flex items-center justify-center shadow-sm
                                                ${isActive ? `border-[${module.color}] scale-110 shadow-[0_0_30px_${module.color}40]` : 'border-black/5 hover:border-black/20'}
                                            `}
                                            style={{ borderColor: isActive ? module.color : '' }}
                                        >
                                            <div className={`text-ink/60 ${isActive ? 'text-ink' : ''} scale-75`}>
                                                {module.icon}
                                            </div>
                                        </div>

                                        {/* Label */}
                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${isActive ? 'text-ink' : 'text-ink/40'}`}>
                                            {module.label}
                                        </div>

                                        {/* Providers Popup (Power Source) */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 bg-white/90 backdrop-blur-xl border border-black/5 rounded-xl p-3 shadow-xl z-50"
                                                >
                                                    <div className="text-[10px] text-ink/40 uppercase tracking-widest mb-2 border-b border-black/5 pb-1">Powered By</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {module.providers.map(provider => (
                                                            <span key={provider} className="px-1.5 py-0.5 rounded bg-black/5 text-[10px] text-ink border border-black/5">
                                                                {provider}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {/* Arrow */}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/90" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AgentPipeline = () => {
    const [activeStage, setActiveStage] = useState(0);

    // Auto-cycle stages
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const stages = [
        {
            id: 0,
            title: "The Brain Trust",
            subtitle: "Strategic Planning",
            icon: <GitBranch size={24} />,
            color: "#2563EB", // Cobalt
            description: "Directors collaborate to architect the narrative blueprint."
        },
        {
            id: 1,
            title: "The Swarm",
            subtitle: "Parallel Execution",
            icon: <Network size={24} />,
            color: "#F59E0B", // Amber
            description: "Specialized experts generate assets in massive parallel streams."
        },
        {
            id: 2,
            title: "The Filter",
            subtitle: "Quality Control",
            icon: <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-current rounded-full" /></div>,
            color: "#10B981", // Emerald
            description: "Validators scan for consistency, tone, and logic."
        }
    ];

    return (
        <div className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px] border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Agentic Collaboration</div>
            <div className="relative z-10 max-w-6xl w-full px-4 flex flex-col items-center">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Agentic Collaboration</h2>
                    <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                        Not just generation. Orchestration.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
                    {/* Visualizer (Left) */}
                    <div className="w-full md:w-1/2 h-[500px] sunken-canvas rounded-3xl shadow-inner relative overflow-hidden flex items-center justify-center group bg-[#F0ECE2]">
                        {/* Grid */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />

                        {/* Stage 0: Blueprint (Wireframe) */}
                        <AnimatePresence mode="wait">
                            {activeStage === 0 && (
                                <motion.div
                                    key="blueprint"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative w-64 h-80 border-2 border-dashed border-cobalt/30 rounded-xl flex flex-col gap-4 p-4 bg-white/50">
                                        <div className="h-32 border border-cobalt/20 rounded bg-cobalt/5 animate-pulse" />
                                        <div className="flex-1 border border-cobalt/20 rounded bg-cobalt/5 animate-pulse delay-75" />
                                        <div className="h-16 border border-cobalt/20 rounded bg-cobalt/5 animate-pulse delay-150" />

                                        {/* Connecting Nodes */}
                                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-white border border-cobalt rounded-full flex items-center justify-center text-cobalt shadow-lg">1</div>
                                        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white border border-cobalt rounded-full flex items-center justify-center text-cobalt shadow-lg">2</div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Stage 1: Swarm (Execution) */}
                            {activeStage === 1 && (
                                <motion.div
                                    key="swarm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative w-64 h-80 border border-amber-500/30 rounded-xl flex flex-col gap-4 p-4 overflow-hidden bg-white/50">
                                        {/* Beams filling the blocks */}
                                        <motion.div
                                            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }}
                                            className="h-32 bg-amber-500/20 rounded relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-full animate-[shimmer_1s_infinite]" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                                            className="flex-1 bg-amber-500/20 rounded relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-full animate-[shimmer_1s_infinite]" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                                            className="h-16 bg-amber-500/20 rounded relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-full animate-[shimmer_1s_infinite]" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Stage 2: Filter (QC) */}
                            {activeStage === 2 && (
                                <motion.div
                                    key="filter"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative w-64 h-80 bg-white border border-emerald-500/50 rounded-xl flex flex-col gap-4 p-4 shadow-lg">
                                        {/* Completed Blocks */}
                                        <div className="h-32 bg-emerald-500/10 rounded border border-emerald-500/20" />
                                        <div className="flex-1 bg-emerald-500/10 rounded border border-emerald-500/20" />
                                        <div className="h-16 bg-emerald-500/10 rounded border border-emerald-500/20" />

                                        {/* Scanning Line */}
                                        <motion.div
                                            initial={{ top: 0 }}
                                            animate={{ top: "100%" }}
                                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                            className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_#10B981]"
                                        />

                                        <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/20 border border-emerald-500 text-emerald-500 text-xs font-mono rounded">
                                            PASS
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Controls (Right) */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        {stages.map((stage, index) => (
                            <div
                                key={stage.id}
                                className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer
                                    ${activeStage === index
                                        ? `bg-white border-[${stage.color}] shadow-lg scale-105`
                                        : 'bg-transparent border-black/5 opacity-50 hover:opacity-80'
                                    }
                                `}
                                style={{ borderColor: activeStage === index ? stage.color : '' }}
                                onClick={() => setActiveStage(index)}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className={`p-2 rounded-lg bg-black/5`} style={{ color: stage.color }}>
                                        {stage.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-1">Step 0{index + 1}</div>
                                        <h3 className="text-xl font-medium text-ink">{stage.title}</h3>
                                    </div>
                                </div>
                                <div className="text-ink/60 pl-14">
                                    <div className="text-sm font-medium text-ink/80 mb-1">{stage.subtitle}</div>
                                    <div className="text-sm">{stage.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskPlanning = () => {
    return (
        <div className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px] border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Strategic Planning</div>
            <div className="relative z-10 max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
                {/* Left: Text Content */}
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">Strategic Planning</h2>
                    <p className="text-xl text-ink/60 leading-relaxed mb-8">
                        Agents don't just act; they plan. Fable decomposes high-level narrative goals into executable task trees.
                        <br /><br />
                        Watch as the system allocates resources, estimates timelines, and resolves dependencies before a single frame is generated.
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-ink font-medium">
                            <CheckCircle2 className="text-cobalt" size={24} />
                            Automated Task Decomposition
                        </div>
                        <div className="flex items-center gap-4 text-ink font-medium">
                            <CheckCircle2 className="text-cobalt" size={24} />
                            Resource Allocation Optimization
                        </div>
                        <div className="flex items-center gap-4 text-ink font-medium">
                            <CheckCircle2 className="text-cobalt" size={24} />
                            Dependency Resolution
                        </div>
                    </div>
                </div>

                {/* Right: Sunken Canvas Visual */}
                <div className="flex-1 w-full aspect-square relative sunken-canvas rounded-[40px] shadow-inner overflow-hidden flex items-center justify-center group bg-[#F0ECE2]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Gantt Chart Visual */}
                    <div className="relative w-3/4 h-3/4 flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-black/5 pb-2 mb-2">
                            <div className="text-xs font-mono text-ink/40 uppercase tracking-widest">Task Queue</div>
                            <div className="text-xs font-mono text-cobalt">Processing...</div>
                        </div>

                        {/* Task Rows */}
                        {[
                            { name: "Scene Analysis", width: "30%", delay: 0, color: "bg-cobalt" },
                            { name: "Character Rigging", width: "60%", delay: 0.5, color: "bg-rose-500" },
                            { name: "Environment Gen", width: "45%", delay: 1, color: "bg-emerald-500" },
                            { name: "Lighting Bake", width: "40%", delay: 1.5, color: "bg-amber-500" },
                        ].map((task, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-24 text-xs font-medium text-ink/60 text-right">{task.name}</div>
                                <div className="flex-1 h-8 bg-white/50 rounded-lg border border-black/5 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: task.width }}
                                        transition={{ duration: 2, delay: task.delay, repeat: Infinity, repeatDelay: 3 }}
                                        className={`h-full ${task.color} opacity-80 rounded-lg relative`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-[shimmer_1s_infinite]" />
                                    </motion.div>
                                </div>
                            </div>
                        ))}

                        {/* Connection Lines (Decorative) */}
                        <svg className="absolute inset-0 pointer-events-none opacity-20">
                            <path d="M 100 20 L 100 60 L 120 60" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                            <path d="M 100 60 L 100 100 L 120 100" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VisualScripting = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Visual Scripting</div>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
                <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-cobalt/10 flex items-center justify-center mb-6 text-cobalt">
                        <GitBranch size={24} />
                    </div>
                    <h3 className="text-3xl font-medium mb-4 text-ink">Visual Scripting</h3>
                    <p className="text-ink/60 leading-relaxed">
                        Forget linear timelines. Map your story logically using our Node Flow architecture.
                        Control every beat, every transition, and every dependency visually.
                    </p>
                </div>
                <div className="flex-1 h-64 w-full bg-white rounded-2xl border border-subtle flex items-center justify-center shadow-sm">
                    <span className="text-ink/20 font-mono">Visual Scripting Demo</span>
                </div>
            </div>
        </div>
    );
};

const TemporalConsistency = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Temporal Consistency</div>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 px-4">
                <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-cobalt/10 flex items-center justify-center mb-6 text-cobalt">
                        <Clock size={24} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-ink">Temporal Consistency</h3>
                    <p className="text-ink/60 leading-relaxed">
                        Fable remembers. Minute 10 matches Minute 1 purely.
                        No hallucinations, just direction. The engine maintains context across the entire runtime.
                    </p>
                </div>
                <div className="flex-1 h-64 w-full bg-white rounded-2xl border border-subtle flex items-center justify-center shadow-sm">
                    <span className="text-ink/20 font-mono">Consistency Graph</span>
                </div>
            </div>
        </div>
    );
};

const ArchivedSparkBanner = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
            <div className="absolute top-4 left-4 text-xs font-mono text-ink/30 uppercase tracking-widest">Archive: Spark Module Banner</div>
            <div className="max-w-5xl mx-auto px-4 w-full">
                {/* SPARK MODULE (Archived) */}
                <div className="relative w-full bg-white rounded-[32px] overflow-hidden p-8 md:p-12 border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-12 group/spark grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {/* Abstract Electric Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,#fdfbf7_0%,#fff_100%)] z-0" />
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent opacity-50" />

                    <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-2 px-2 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Live Now
                            </div>
                            <span className="text-xs font-mono text-black/40 uppercase tracking-widest">Standalone Module</span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tighter">⚡ SPARK</h3>
                        </div>

                        <p className="text-black/60 text-lg md:text-xl leading-relaxed max-w-lg mb-8">
                            Not building a universe? Spark is all three engines in one lightweight model. <span className="text-black font-medium">Perfect for Shorts.</span>
                        </p>

                        <Button to="/spark" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#333] transition-colors shadow-xl inline-flex items-center gap-2">
                            Try Spark Free <ArrowRight size={14} />
                        </Button>
                    </div>

                    {/* Right Content / Visual Placeholder */}
                    <div className="relative z-10 w-full md:w-[400px] aspect-video md:aspect-auto md:h-[240px] bg-black/5 rounded-2xl overflow-hidden border border-black/5 shadow-inner flex items-center justify-center">
                        <div className="text-center p-6">
                            <div className="text-4xl font-bold text-black/10 mb-2">~20s</div>
                            <div className="text-sm font-mono text-black/30 uppercase tracking-widest">Video Generation</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ARCHIVES PAGE COMPONENT ---

const Archives = () => {
    return (
        <div className="w-full min-h-screen pt-32 pb-24 bg-paper">
            <SEO
                title="Archives - Exploring the Melies Engine"
                description="Explore the components of the Melies engine: Consciousness Stream, Memory Core, Physics Engine, and more."
                canonical="/archives"
            />
            <div className="max-w-[1400px] mx-auto px-4 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="text-xs font-mono text-ink/40 uppercase tracking-widest mb-4">Méliès Archive</div>
                    <h1 className="text-5xl md:text-7xl font-medium text-ink mb-6">Concept Vault</h1>
                    <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                        Experimental features, work in progress, and retired concepts.
                        <br />
                        Everything we love but haven't shipped yet.
                    </p>
                </motion.div>
            </div>

            <div className="w-full bg-white border-y border-black/5">
                <GenreAlchemy />
                <SceneComposer />
                <NarrativeLoom />
                <FableEcosystem />
                <AgentPipeline />
                <TaskPlanning />
                <VisualScripting />
                <TemporalConsistency />
                <PhysicsEngine />
                <LODEngine />
                <LightingStudio />
                <EcosystemBalance />
                <TraitTuner />
                <TransparentThought />
                <TotalRecall />
                <ArchivedSparkBanner />
            </div>
        </div>
    );
};

export default Archives;
