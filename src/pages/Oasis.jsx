import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Layers, Maximize, Sun, Mountain, Trees, Wind } from 'lucide-react';

import CTASection from '../components/CTASection';
import SystemText from '../components/SystemText';

import banner from '../assets/oasis_banner.png';
import iconVertical from '../assets/oasis_icon_vertical_white.png';

const PhysicsEngine = () => {
    const [params, setParams] = useState({ gravity: 50, atmosphere: 30 });

    return (
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
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
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
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
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
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
        <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
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

const Oasis = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-0 pt-24 px-4 overflow-hidden"
        >
            {/* HERO SECTION */}
            <div className="max-w-[1400px] mx-auto mb-32 relative h-[85vh] rounded-[32px] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src={banner}
                    alt="Oasis Header"
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
                        <img src={iconVertical} alt="Oasis" className="h-32 w-auto drop-shadow-lg" />
                    </motion.div>

                    <div className="absolute bottom-8 left-8">
                        <SystemText
                            lines={[
                                "> oasis.forge",
                                "> spawning civilizations...",
                                "> weaving magic into matter",
                                "> world pulse detected"
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
                        Infinite Worlds.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-white/90 max-w-xl font-light leading-relaxed"
                    >
                        Instant Reality. Infinite landscapes, physics, and lighting generated instantly.
                    </motion.p>

                </div>
            </div>

            {/* PHYSICS ENGINE */}
            <PhysicsEngine />

            {/* LOD ENGINE */}
            <LODEngine />

            {/* LIGHTING STUDIO */}
            <LightingStudio />

            {/* ECOSYSTEM BALANCE */}
            <EcosystemBalance />

            <CTASection
                title="Forge your world."
                description="Build immersive environments where your stories can live."
                buttonText="Enter Oasis"
                buttonLink="/login"
                gradient="from-emerald to-teal-500"
            />
        </motion.div >
    );
};

export default Oasis;
