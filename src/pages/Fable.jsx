import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, GitBranch, Clock, Play, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';



import banner from '../assets/fable_banner.png';
import iconVertical from '../assets/fable_icon_vertical_white.png';
import meliesChip from '../assets/melies_chip.png';

import CTASection from '../components/CTASection';

import SystemText from '../components/SystemText';

const GenreAlchemy = () => {
    const [activeGenres, setActiveGenres] = React.useState(['Cyberpunk']);
    const [logline, setLogline] = React.useState("A hacker discovers their own memories are encrypted files.");

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
                        // This is a bit hacky for Tailwind colors in style, let's use a simpler approach for the orb
                    }}
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-white/20 relative flex items-center justify-center backdrop-blur-sm"
                >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white/10 to-transparent" />
                </motion.div>

                {/* Floating Particles/Icons based on genre could go here */}
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
    );
};

const FableModules = () => {
    const modules = [
        { name: 'Script', icon: '📜' },
        { name: 'Storyboard', icon: '🎬' },
        { name: 'Video', icon: '🎞️' },
        { name: 'Music', icon: '🎵' },
        { name: 'Sound Effects', icon: '🔊' },
        { name: 'Voices', icon: '🗣️' },
        { name: 'Characters', icon: '🎭' },
        { name: 'Locations', icon: '🏰' }
    ];

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 bg-[#080808]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

            {/* Central Card */}
            <div className="relative z-10 mb-16 group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative w-80 h-48 bg-[#111] border border-white/10 rounded-xl flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 text-amber-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-2xl font-medium text-white tracking-tight">Fable 1.0</span>
                    </div>
                    <div className="w-32 h-32 border border-amber-500/20 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out" />
                    <div className="w-40 h-40 border border-amber-500/10 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out delay-100" />
                </div>
            </div>

            {/* Modules Dock */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 max-w-5xl px-4">
                {modules.map((mod, i) => (
                    <div key={i} className="group flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-3xl shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/30 group-hover:shadow-amber-500/10 group-hover:shadow-2xl cursor-pointer relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            {mod.icon}
                        </div>
                        <span className="text-xs font-mono text-white/40 uppercase tracking-wider group-hover:text-white/80 transition-colors">{mod.name}</span>
                    </div>
                ))}
            </div>

            {/* Golden Line */}
            <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mt-16" />
        </div>
    );
};

const IntegrationHub = () => {
    const categories = [
        {
            id: 'music',
            label: 'Music',
            icon: '🎵',
            providers: ['SUNO', 'udio']
        },
        {
            id: 'voice',
            label: 'Voice & Sound',
            icon: '🗣️',
            providers: ['ElevenLabs', 'PLAY.AI', 'hume']
        },
        {
            id: 'video',
            label: 'Video',
            icon: '🎞️',
            providers: ['Sora', 'ByteDance', 'KLING', 'Veo']
        },
        {
            id: 'script',
            label: 'Script',
            icon: '📜',
            providers: ['OpenAI', 'Claude', 'MISTRAL', 'Gemini']
        }
    ];

    return (
        <div className="w-full py-32 relative overflow-hidden flex justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[#080808]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <div className="relative z-10 max-w-7xl w-full flex items-center justify-between px-8">
                {/* Left: Categories & Providers */}
                <div className="flex flex-col gap-6 w-full max-w-3xl">
                    {categories.map((cat, i) => (
                        <div key={cat.id} className="flex items-center gap-8 group">
                            {/* Category Label */}
                            <div className="w-24 flex flex-col items-center gap-2 text-white/30 group-hover:text-white/80 transition-colors">
                                <div className="text-3xl">{cat.icon}</div>
                                <div className="text-xs font-mono uppercase tracking-wider text-center">{cat.label}</div>
                            </div>

                            {/* Provider Card */}
                            <div className="flex-1 h-24 bg-[#111] border border-white/10 rounded-2xl flex items-center px-8 gap-8 relative overflow-hidden group-hover:border-white/30 transition-colors shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                {cat.providers.map((p, j) => (
                                    <span key={j} className="text-xl font-bold text-white/60 group-hover:text-white transition-colors">
                                        {p}
                                    </span>
                                ))}

                                {/* Connection Point */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full translate-x-1/2" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Connections SVG Layer */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        {/* Hardcoded paths for visual simplicity - assuming fixed heights */}
                        <path d="M 850 200 C 950 200, 950 400, 1050 400" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                        <path d="M 850 320 C 950 320, 950 400, 1050 400" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                        <path d="M 850 440 C 950 440, 950 400, 1050 400" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                        <path d="M 850 560 C 950 560, 950 400, 1050 400" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
                    </svg>
                </div>

                {/* Right: Melies Chip */}
                <div className="relative w-64 h-64 bg-[#1a1a1a] rounded-[40px] border-4 border-[#333] shadow-2xl flex items-center justify-center z-20">
                    {/* Heatsink Fins */}
                    <div className="absolute -inset-2 border border-white/5 rounded-[48px]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#222] rounded-b-xl border-b border-white/10 flex justify-center gap-1 p-1">
                        {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-full bg-black/50 rounded-full" />)}
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#222] rounded-t-xl border-t border-white/10 flex justify-center gap-1 p-1">
                        {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-full bg-black/50 rounded-full" />)}
                    </div>

                    {/* Core */}
                    <div className="w-40 h-40 bg-gradient-to-br from-[#2a2a2a] to-black rounded-2xl border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                        <span className="text-5xl font-serif italic text-white/90 relative z-10">m*</span>
                        <div className="absolute inset-0 border border-amber-500/20 rounded-2xl animate-pulse" />
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
        <div className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">

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
                            <img src={meliesChip} alt="Melies Core" className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
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
        <div className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">

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
        <div className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
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

const SceneComposer = () => {
    const [activeType, setActiveType] = React.useState('COMMERCIAL');

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
        <div className="w-full py-24 relative overflow-hidden flex items-center justify-center">
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
                        {/* Placeholder Content */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentScene.bg} opacity-80 transition-colors duration-1000`} />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                                <Play className="text-white fill-white ml-1" size={32} />
                            </div>
                        </div>

                        {/* Script Snippet Overlay */}
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

const Fable = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [nodes, setNodes] = React.useState([
        { id: 1, title: "Opening Scene", type: "scene", x: 100, y: 200 },
        { id: 2, title: "Protagonist Intro", type: "character", x: 400, y: 100 },
        { id: 3, title: "Cyberpunk City", type: "world", x: 400, y: 300 },
        { id: 4, title: "Conflict Start", type: "scene", x: 700, y: 200 }
    ]);

    const [connections, setConnections] = React.useState([
        { startId: 1, endId: 2 },
        { startId: 1, endId: 3 },
        { startId: 2, endId: 4 },
        { startId: 3, endId: 4 }
    ]);



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
                                "> fable.shoot",
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

            {/* SCENE COMPOSER (INTERACTIVE) */}
            <section className="max-w-7xl mx-auto mb-32">
                <div className="relative h-[800px] sunken-canvas overflow-hidden shadow-inner group rounded-3xl bg-[#111] flex flex-col md:flex-row">
                    {/* Grid Background */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />

                    <SceneComposer />
                </div>
            </section>

            {/* NARRATIVE LOOM (INTERACTIVE) */}
            <section className="max-w-7xl mx-auto mb-32">
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
            </section>

            {/* FABLE ECOSYSTEM (Replaces Modules & Integration Hub) */}
            <section className="w-full mb-32">
                <FableEcosystem />
            </section>

            {/* AGENT PIPELINE */}
            <section className="w-full mb-32">
                <AgentPipeline />
            </section>

            {/* TASK PLANNING */}
            <section className="w-full mb-32">
                <TaskPlanning />
            </section>

            {/* FEATURES SECTION */}
            <section className="max-w-5xl mx-auto grid gap-24 mb-32">
                <div className="flex flex-col md:flex-row items-center gap-12">
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
                    <div className="flex-1 h-64 bg-white rounded-2xl border border-subtle flex items-center justify-center shadow-sm">
                        <span className="text-ink/20 font-mono">Visual Scripting Demo</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
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
                    <div className="flex-1 h-64 bg-white rounded-2xl border border-subtle flex items-center justify-center shadow-sm">
                        <span className="text-ink/20 font-mono">Consistency Graph</span>
                    </div>
                </div>
            </section>

            {/* GENRE ALCHEMY SECTION */}
            <section className="max-w-6xl mx-auto mb-32 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-medium mb-6 text-ink">Genre Alchemy</h2>
                    <p className="text-xl text-ink/60 max-w-2xl mx-auto">
                        Blend genres to discover new narrative frontiers. Fable's engine handles the tonal shifts seamlessly.
                    </p>
                </div>

                <GenreAlchemy />
            </section>

            <CTASection
                title="Direct your masterpiece."
                description="Unleash infinite narrative possibilities with Fable."
                buttonText="Enter Fable Studio"
                buttonLink="/login"
                gradient="from-cobalt to-blue-400"
            />
        </motion.div>
    );
};

export default Fable;
