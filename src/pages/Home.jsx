import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import SystemText from '../components/SystemText';
import CTASection from '../components/CTASection'; // Added import
import appLogo from '../assets/app_logo.png';

import iconFable from '../assets/fable_icon_vertical_black.png';
import iconCitizen from '../assets/citizen_icon_vertical_black.png';
import iconOasis from '../assets/oasis_icon_vertical_black.png';

const FeatureSection = ({ title, subtitle, visual, reverse }) => (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 py-16 max-w-7xl mx-auto">
        <div className={`flex-1 space-y-6 ${reverse ? 'md:order-2' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                Conçu pour <br />
                <span className="chroma-text">{title}</span>
            </h2>
            <p className="text-xl text-secondary max-w-md leading-relaxed">
                {subtitle}
            </p>
        </div>
        <div className="flex-1 w-full">
            <div className="w-full aspect-square md:aspect-[4/3] bg-stroke rounded-[30px] overflow-hidden shadow-sm relative group">
                {visual}
            </div>
        </div>
    </section>
);

const TestimonialCard = ({ quote, author, role }) => (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[20px] border border-stroke break-inside-avoid mb-6 hover:-translate-y-1 transition-transform duration-300">
        <p className="text-lg text-primary mb-6 leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stroke" />
            <div>
                <div className="font-medium text-sm text-primary">{author}</div>
                <div className="text-xs text-secondary">{role}</div>
            </div>
        </div>
    </div>
);

import commercialDesk from '../assets/commercial_desk.png';

const Home = () => {
    return (
        <div className="bg-background min-h-screen pt-40">

            {/* HERO SECTION */}
            <section className="flex flex-col items-center justify-center text-center px-4 mb-20 md:mb-32 relative z-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl tracking-tighter text-primary mb-6 max-w-5xl font-normal"
                >
                    The Infinite <br />
                    <span className="chroma-text">Cinema</span> Engine.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-secondary max-w-2xl mb-12"
                >
                    Orchestrate multi-agent systems to generate films. <br className="hidden md:block" />
                    From script to screen, in real-time.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <Button className="bg-btn-bg text-btn-text rounded-full px-8 py-4 text-lg font-medium">
                        Start Creating
                    </Button>
                </motion.div>

                {/* Central Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="mt-24 w-full max-w-5xl aspect-video bg-stroke rounded-[40px] shadow-2xl flex items-center justify-center relative overflow-hidden"
                >
                    <img
                        src={commercialDesk}
                        alt="Melies AI Workspace"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                </motion.div>
            </section>

            {/* CREATIVE SUITE PREVIEW */}
            <section className="px-6 mb-32 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    <Link to="/spark" className="block h-full group">
                        <Card className="h-full hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                            <div className="h-48 mb-6 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 w-full relative overflow-hidden">
                                {/* Default State: System Text */}
                                <div className="absolute inset-0 p-4 flex flex-col justify-end group-hover:opacity-0 transition-opacity duration-300">
                                    <div className="font-mono text-[10px] text-orange-900/40 leading-tight">
                                        INITIALIZING_VELOCITY_ENGINE...<br />
                                        LOADING_TREND_DATA...<br />
                                        SYSTEM_READY
                                    </div>
                                </div>

                                {/* Hover State: Viral Graph */}
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-full h-full p-4 flex items-end gap-1">
                                        {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileHover={{ height: `${h}%` }}
                                                className="flex-1 bg-orange-500 rounded-t-sm opacity-80"
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute top-4 left-4 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                                        +840% Viral Lift
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-medium text-primary mb-2 group-hover:text-orange-600 transition-colors">Spark</h3>
                            <p className="text-secondary">The Idea Engine. Generate viral concepts in seconds.</p>
                        </Card>
                    </Link>

                    <Link to="/fable" className="block h-full group">
                        <Card className="h-full hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                            <div className="h-48 mb-6 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 w-full relative overflow-hidden">
                                {/* Default State */}
                                <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity duration-300">
                                    <SystemText
                                        lines={[
                                            "CONNECTING_NARRATIVE_NODES...",
                                            "SYNCING_CHARACTER_ARCS...",
                                            "STORY_CORE_ACTIVE"
                                        ]}
                                        delay={0.4}
                                        className="text-[10px] text-blue-900/60"
                                    />
                                </div>

                                {/* Hover State: Node Graph */}
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <svg className="w-full h-full p-4 overflow-visible">
                                        <circle cx="50%" cy="50%" r="20" className="fill-blue-500 opacity-20 animate-pulse" />
                                        <circle cx="30%" cy="30%" r="10" className="fill-indigo-500 opacity-60" />
                                        <circle cx="70%" cy="70%" r="15" className="fill-indigo-500 opacity-60" />
                                        <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" />
                                        <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" />
                                    </svg>
                                    <div className="absolute top-4 left-4 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                        Narrative Sync
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-medium text-primary group-hover:text-blue-600 transition-colors">Fable</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-600 border border-blue-200">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="text-secondary">The Story Weaver. Orchestrate complex narratives.</p>
                        </Card>
                    </Link>

                    <Link to="/oasis" className="block h-full group">
                        <Card className="h-full hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                            <div className="h-48 mb-6 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 w-full relative overflow-hidden">
                                {/* Default State */}
                                <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity duration-300">
                                    <SystemText
                                        lines={[
                                            "GENERATING_PHYSICS_MESH...",
                                            "RENDERING_LIGHT_MAPS...",
                                            "WORLD_BUILDER_ONLINE"
                                        ]}
                                        delay={0.6}
                                        className="text-[10px] text-emerald-900/60"
                                    />
                                </div>

                                {/* Hover State: Wireframe Reveal */}
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.1)_25%,rgba(16,185,129,0.1)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.1)_75%,rgba(16,185,129,0.1)_100%)] bg-[length:20px_20px]" />
                                    <div className="w-20 h-20 border-2 border-emerald-500 rotate-45 flex items-center justify-center bg-emerald-50">
                                        <div className="w-10 h-10 bg-emerald-500/20" />
                                    </div>
                                    <div className="absolute top-4 left-4 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                        Physics Active
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-medium text-primary group-hover:text-emerald-600 transition-colors">Oasis</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-600 border border-emerald-200">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="text-secondary">The World Builder. Construct infinite environments.</p>
                        </Card>
                    </Link>
                </div>
            </section>

            {/* STUDIO WORKFLOW PIPELINE */}
            <section className="px-6 mb-32 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium text-primary mb-4">The Studio Workflow</h2>
                    <p className="text-secondary">From concept to final render in one seamless flow.</p>
                </div>

                <div className="relative py-12">
                    {/* Connecting Line (Background) */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-stroke -z-10 hidden md:block rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent w-1/2 animate-[shimmer_2s_infinite]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {[
                            { step: "01", title: "Concept", desc: "Spark generates viral ideas", icon: "⚡", color: "border-orange-500 text-orange-600 bg-orange-50" },
                            { step: "02", title: "Narrative", desc: "Fable structures the story", icon: "📜", color: "border-blue-500 text-blue-600 bg-blue-50" },
                            { step: "03", title: "Simulation", desc: "Oasis builds the world", icon: "🌍", color: "border-emerald-500 text-emerald-600 bg-emerald-50" },
                            { step: "04", title: "Render", desc: "Cinema-grade output", icon: "🎬", color: "border-purple-500 text-purple-600 bg-purple-50" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group relative">
                                {/* Connector Dot (Mobile Hidden) */}
                                <div className={`hidden md:flex absolute top-1/2 -left-4 w-8 h-1 ${i === 0 ? 'hidden' : 'bg-stroke'}`} />

                                {/* Node */}
                                <div className={`w-20 h-20 rounded-2xl ${item.color} border-2 flex items-center justify-center text-3xl shadow-lg mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                    {item.icon}
                                    {/* Pulse Effect */}
                                    <div className={`absolute inset-0 rounded-2xl ${item.color} opacity-20 animate-ping`} />
                                </div>

                                <h3 className="text-lg font-medium text-primary mb-2">{item.title}</h3>
                                <p className="text-sm text-secondary max-w-[150px]">{item.desc}</p>

                                {/* Step Number */}
                                <div className="absolute -top-8 text-xs font-mono text-secondary/30 font-bold tracking-widest">STEP {item.step}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SYNERGY ECOSYSTEM */}
            <section className="px-6 mb-32 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="text-left">
                        <h2 className="text-3xl md:text-5xl font-medium text-primary mb-6">The Melies Ecosystem</h2>
                        <p className="text-xl text-secondary leading-relaxed mb-8">
                            A unified engine where every part amplifies the whole.
                            <br /><br />
                            Fable writes the script, Citizen casts the actors, and Oasis builds the world.
                            Together, they create a seamless production pipeline that moves at the speed of thought.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 text-primary font-medium">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span>
                                World Generation
                            </div>
                            <div className="flex items-center gap-4 text-primary font-medium">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span>
                                Narrative Logic
                            </div>
                            <div className="flex items-center gap-4 text-primary font-medium">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</span>
                                Character Agency
                            </div>
                        </div>
                    </div>

                    {/* Right: Diagram */}
                    <div className="relative aspect-square sunken-canvas overflow-hidden shadow-inner group rounded-3xl">
                        {/* Grid Background */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />

                        {/* UI Overlay */}
                        <div className="absolute top-4 left-4 flex gap-2 z-10">
                            <div className="px-3 py-1 rounded-md bg-white border border-subtle text-xs font-mono text-ink/70 shadow-sm">Auto-Save: ON</div>
                            <div className="px-3 py-1 rounded-md bg-white border border-subtle text-xs font-mono text-cobalt shadow-sm">Connected: Oasis, Fable, Citizen</div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full max-w-[400px] aspect-square">
                                {/* Connecting Circle */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full border border-dashed border-black/10 relative"
                                    >
                                        {/* Orbiting Particles */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 bg-black/20 rounded-full" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 w-3 h-3 bg-black/20 rounded-full" />
                                        <div className="absolute top-1/2 left-0 -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-black/20 rounded-full" />
                                        <div className="absolute top-1/2 right-0 translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-black/20 rounded-full" />
                                    </motion.div>
                                </div>

                                {/* Nodes */}
                                {/* Top: Oasis */}
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
                                    <div className="w-20 h-20 bg-white border border-subtle rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative">
                                        <img src={iconOasis} alt="Oasis" className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-lg font-medium text-primary bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">Oasis</h3>
                                </div>

                                {/* Bottom Left: Fable */}
                                <div className="absolute bottom-16 left-4 flex flex-col items-center group cursor-pointer">
                                    <div className="w-20 h-20 bg-white border border-subtle rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative">
                                        <img src={iconFable} alt="Fable" className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-lg font-medium text-primary bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">Fable</h3>
                                </div>

                                {/* Bottom Right: Citizen */}
                                <div className="absolute bottom-16 right-4 flex flex-col items-center group cursor-pointer">
                                    <div className="w-20 h-20 bg-white border border-subtle rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative">
                                        <img src={iconCitizen} alt="Citizen" className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-lg font-medium text-primary bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">Citizen</h3>
                                </div>

                                {/* Center Text */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center opacity-20 font-mono text-[10px] tracking-[0.2em] text-black">
                                        SYNERGY<br />LOOP
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTIONS */}
            <FeatureSection
                title="Viral Velocity"
                subtitle="Spark generates vertical video at the speed of culture. Capture trends instantly with our S-2 model."
                visual={
                    <div className="w-full h-full sunken-canvas bg-[#F0ECE2] shadow-inner relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                        <Link to="/spark" className="block h-full relative z-10 p-8 flex items-center justify-center">
                            <Card className="h-full w-full hover:scale-[1.02] transition-transform duration-300 shadow-lg">
                                <div className="h-48 mb-6 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 w-full relative overflow-hidden group-hover:shadow-inner transition-shadow">
                                    <div className="absolute bottom-3 left-3 font-mono text-[10px] text-orange-900/40 leading-tight">
                                        INITIALIZING_VELOCITY_ENGINE...<br />
                                        LOADING_TREND_DATA...<br />
                                        SYSTEM_READY
                                    </div>
                                </div>
                                <h3 className="text-2xl font-medium text-primary mb-2">Spark</h3>
                            </Card>
                        </Link>
                    </div>
                }
            />

            <FeatureSection
                title="Deep Narrative"
                subtitle="Fable is your studio. Connect agents, define arcs, and let the story emerge from the chaos."
                visual={
                    <div className="w-full h-full sunken-canvas bg-[#F0ECE2] shadow-inner relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                        <div className="w-3/4 h-3/4 bg-white rounded-2xl shadow-lg border border-black/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
                            {/* Abstract Node Graph */}
                            <svg className="absolute inset-0 w-full h-full p-8">
                                <circle cx="20%" cy="50%" r="20" className="fill-blue-500 opacity-20" />
                                <circle cx="80%" cy="50%" r="20" className="fill-indigo-500 opacity-20" />
                                <path d="M 80 150 C 150 150, 200 150, 300 150" fill="none" stroke="black" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                    </div>
                }
                reverse
            />

            <FeatureSection
                title="Living Worlds"
                subtitle="Oasis builds the stage. Infinite landscapes, physics, and lighting that react to your story."
                visual={
                    <div className="w-full h-full sunken-canvas bg-[#F0ECE2] shadow-inner relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                        <div className="w-3/4 h-3/4 bg-white rounded-2xl shadow-lg border border-black/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50" />
                            {/* Abstract Terrain */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-emerald-500/10 rounded-t-[50%] blur-xl transform scale-150" />
                        </div>
                    </div>
                }
            />

            {/* MADE WITH MELIES SHOWCASE */}
            <section className="px-6 mb-32 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium text-primary mb-4">Made with Melies</h2>
                    <p className="text-secondary">Explore what's possible. Generated in real-time.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
                    {/* Featured Item (Large) */}
                    <div className="col-span-2 row-span-2 bg-black rounded-2xl overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                        <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" alt="Sci-Fi" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />

                        {/* Video UI Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs font-mono text-white/60 mb-2">GEN_ID: 8X92_ALPHA</div>
                                    <h3 className="text-2xl font-medium text-white mb-1">Echoes of Titan</h3>
                                    <p className="text-sm text-white/70">Sci-Fi Short • 4K Render</p>
                                </div>
                                <div className="text-xs font-mono text-white/40">02:14</div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Items */}
                    {[
                        { title: "Neon Dreams", type: "Music Video", color: "from-indigo-500 to-purple-600", img: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1000&auto=format&fit=crop" },
                        { title: "Desert Storm", type: "Commercial", color: "from-rose-400 to-orange-300", img: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop" },
                        { title: "Wild AI", type: "Nature Doc", color: "from-emerald-600 to-teal-800", img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop", span: "col-span-2" }
                    ].map((item, i) => (
                        <div key={i} className={`${item.span || ''} bg-black rounded-2xl overflow-hidden relative group cursor-pointer`}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60`} />
                            <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-medium text-lg leading-tight">{item.title}</h3>
                                <p className="text-xs text-white/60">{item.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SOCIAL PROOF */}
            <section className="px-6 py-32 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium text-primary mb-4">Trusted by Visionaries</h2>
                    <p className="text-secondary">Powering the next generation of studios.</p>
                </div>

                {/* Logo Ticker (Simulated) */}
                <div className="flex justify-center gap-12 md:gap-24 opacity-40 grayscale mb-24 flex-wrap">
                    {['NEXUS', 'VORTEX', 'LUMINA', 'AETHER', 'CHRONOS'].map((logo, i) => (
                        <div key={i} className="text-2xl font-bold font-serif tracking-widest">{logo}</div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="Melies changed how we prototype scenes. It's not just a tool, it's a collaborator."
                        author="Sarah Jenkins"
                        role="Director, Indie Labs"
                    />
                    <TestimonialCard
                        quote="The speed of Spark is unmatched. We shipped 50 videos in a day."
                        author="Mike Ross"
                        role="Content Lead, Viral Inc"
                    />
                    <TestimonialCard
                        quote="Finally, AI that understands cinematic language, not just prompts."
                        author="Elena K."
                        role="Visual Artist"
                    />
                </div>
            </section>

            {/* FINAL CTA */}
            <CTASection
                title={<span>Ready to direct the <span className="chroma-text">future</span>?</span>}
                description="Join the creators redefining cinema with Melies."
                buttonText="Get Started Now"
                buttonLink="/signup"
                buttonVariant="swipe"
                className="bg-white"
            />

        </div>
    );
};

export default Home;
