import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, User, Sparkles } from 'lucide-react';
import Button from '../components/Button';

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

import banner from '../assets/citizen_banner.png';
import iconVertical from '../assets/citizen_icon_vertical_white.png';

import CTASection from '../components/CTASection';

import SystemText from '../components/SystemText';

const ConsciousnessStream = () => {
    const [thoughts, setThoughts] = useState([]);

    useEffect(() => {
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
    const containerRef = React.useRef(null);
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
    useEffect(() => {
        let animationFrame;
        const animate = () => {
            setRotation(prev => (prev + 0.003) % (Math.PI * 2));
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Auto-highlight loop
    useEffect(() => {
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



const Citizen = () => {
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



            {/* INTERACTION DEMO */}
            <section className="max-w-4xl mx-auto sunken-canvas overflow-hidden flex flex-col md:flex-row h-[500px] shadow-lg mb-32">
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
            </section>

            {/* CONSCIOUSNESS STREAM SECTION */}
            <section className="max-w-7xl mx-auto mb-32 px-4 grid md:grid-cols-2 gap-16 items-center">
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
            </section>

            {/* MEMORY CORE SECTION */}
            <section className="max-w-7xl mx-auto mb-32 px-4 grid md:grid-cols-2 gap-16 items-center">
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
            </section>

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
