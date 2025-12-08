import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import SystemText from '../components/SystemText';
import CTASection from '../components/CTASection'; // Added import
import appLogo from '../assets/app_logo.png';

import {
    Play,
    Pause,
    Volume2,
    User,
    Package,
    Palette,
    ArrowRight
} from 'lucide-react';
import iconFable from '../assets/fable_icon_only.png';
import iconCitizen from '../assets/citizen_icon_only.png';
import iconOasis from '../assets/oasis_icon_only.png';
import iconSpark from '../assets/spark_icon_only.png';
import sparkLocation from '../assets/spark_location_appartement.webp';
import sparkCharacter from '../assets/spark_character_isabelle.png';
import sparkProduct from '../assets/spark_product_parfume.png';
import consistency1 from '../assets/spark_consistency_1.webp';
import consistency2 from '../assets/spark_consistency_2.webp';
import consistency3 from '../assets/spark_consistency_3.webp';
import character2 from '../assets/character.png';
import bannerFable from '../assets/fable_banner.png';
import bannerCitizen from '../assets/citizen_banner.png';
import bannerOasis from '../assets/oasis_banner.png';

const ViralFeedSimulator = () => {
    return (
        <div className="relative w-72 h-[580px] bg-black rounded-[3rem] border-[8px] border-ink/10 overflow-hidden shadow-2xl mx-auto z-10 box-border transform rotate-3 hover:rotate-0 transition-all duration-500">
            {/* Feed Content */}
            <div className="absolute inset-0 overflow-hidden bg-[#111]">
                <motion.div
                    animate={{ y: [0, -1160] }} // Adjusted for shorter height
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="space-y-0"
                >
                    {[consistency1, consistency2, consistency3, character2, consistency1].map((img, i) => (
                        <div key={i} className="w-full h-[580px] relative border-b border-white/5">
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
            <div className="absolute inset-0 z-20 pointer-events-none p-5 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    {/* LEFT: Creator Info */}
                    <div className="flex-1 space-y-2 pb-1 pr-2">
                        <div className="font-bold text-white text-shadow-sm flex items-center gap-1.5 text-sm">
                            @melies.creator
                        </div>
                        <p className="text-white/90 text-[10px] leading-snug line-clamp-2 text-shadow-sm font-light">
                            Line-drawn minimalist animation. The two characters...
                        </p>
                        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-medium text-white/90 shadow-sm">
                            Spark 1.0
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex flex-col gap-4 items-center w-8 pb-1">
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                                <span className="text-lg text-red-500 drop-shadow-md">♥</span>
                            </div>
                            <span className="text-white text-[9px] font-medium drop-shadow-md">84K</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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

            {/* SECTION 2 — SPARK SPOTLIGHT (Beige 1) */}
            <section className="w-full py-32 bg-[#FAF9F6]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        {/* LEFT: Visuals (ViralFeedSimulator) */}
                        <div className="flex-1 w-full flex justify-center relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-orange-200/20 to-purple-200/20 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
                            <ViralFeedSimulator />
                        </div>

                        {/* RIGHT: Text Content */}
                        <div className="flex-1 pl-0 md:pl-10">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold tracking-wider uppercase border border-green-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Available Now
                                </span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                        <img src={iconSpark} alt="Spark" className="w-6 h-6 object-contain" />
                                    </div>
                                    <span className="text-lg font-medium tracking-tight text-primary">Spark Engine</span>
                                </div>

                                <h2 className="text-5xl md:text-6xl font-medium text-primary mb-6 leading-[1.1] tracking-tight">
                                    Vertical Stories.<br />
                                    <span className="text-secondary opacity-40">Perfect Consistency.</span>
                                </h2>

                                <p className="text-lg text-secondary mb-10 leading-relaxed max-w-md">
                                    Create ~20-second videos with perfect character and world consistency. No hallucinations.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Button to="/spark" variant="swipe" className="bg-black text-white px-8 py-3 rounded-full text-sm">
                                        Try Spark Free
                                    </Button>
                                    <Link to="/spark" className="px-8 py-3 rounded-full text-sm font-medium border border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-primary flex items-center gap-2">
                                        More Details <ArrowRight size={14} />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: "Consistent Characters", icon: <User size={16} /> },
                                        { title: "Full Audio Generation", icon: <Volume2 size={16} /> },
                                        { title: "Your Assets Integrated", icon: <Package size={16} /> },
                                        { title: "Any Style, Any Brand", icon: <Palette size={16} /> }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-black/5 hover:bg-white/50 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-black/5 text-primary flex items-center justify-center shrink-0">
                                                {feature.icon}
                                            </div>
                                            <div className="text-sm font-medium text-secondary hover:text-primary transition-colors leading-tight">{feature.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — THE ECOSYSTEM (Beige 2) */}
            <section className="w-full py-32 bg-[#F0ECE2]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-medium text-primary mb-6">The Melies Ecosystem</h2>
                        <p className="text-xl text-secondary">Four engines. One creative brain.</p>
                    </div>

                    <div className="relative mb-16">
                        {/* Wrapper for Diagram */}
                        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-16">
                            {/* Level 1: Citizen */}
                            <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-xl w-64 text-center ring-1 ring-black/5">
                                <div className="w-16 h-16 bg-[#F0ECE2] rounded-xl flex items-center justify-center mx-auto mb-4 p-3">
                                    <img src={iconCitizen} alt="Citizen" className="w-full h-full object-contain opacity-80" />
                                </div>
                                <h3 className="text-xl font-serif font-medium mb-1 text-primary">CITIZEN</h3>
                                <p className="text-secondary text-xs uppercase tracking-wide opacity-60">The Soul</p>
                                {/* Connecting Line Down */}
                                <div className="absolute top-full left-1/2 w-px h-16 bg-black/20 -translate-x-1/2" />
                            </div>

                            {/* Level 2: Engines */}
                            <div className="relative w-full">
                                {/* Horizontal Connector Line */}
                                <div className="absolute -top-16 left-[15%] right-[15%] h-px bg-black/20" />
                                {/* Vertical Connectors */}
                                <div className="absolute -top-16 left-[15%] w-px h-16 bg-black/20" />
                                <div className="absolute -top-16 right-[15%] w-px h-16 bg-black/20" />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* SPARK */}
                                    <div className="bg-white p-6 rounded-[24px] border-2 border-orange-500/20 shadow-lg text-center relative group">
                                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-orange-600 p-2">
                                            <img src={iconSpark} alt="Spark" className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-1">SPARK</h3>
                                        <p className="text-xs text-orange-600 uppercase tracking-widest mb-3">The Spark</p>
                                        <div className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wide">
                                            ● Live
                                        </div>
                                    </div>

                                    {/* FABLE */}
                                    <div className="bg-white/60 p-6 rounded-[24px] border border-black/5 shadow-sm text-center opacity-80 hover:opacity-100 transition-all">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-black/5 p-2">
                                            <img src={iconFable} alt="Fable" className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-1">FABLE</h3>
                                        <p className="text-xs text-secondary uppercase tracking-widest mb-3">The Story</p>
                                        <div className="inline-block px-2 py-0.5 rounded-full bg-black/5 text-secondary text-[10px] font-bold uppercase tracking-wide">
                                            2026
                                        </div>
                                    </div>

                                    {/* OASIS */}
                                    <div className="bg-white/60 p-6 rounded-[24px] border border-black/5 shadow-sm text-center opacity-80 hover:opacity-100 transition-all">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-black/5 p-2">
                                            <img src={iconOasis} alt="Oasis" className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-1">OASIS</h3>
                                        <p className="text-xs text-secondary uppercase tracking-widest mb-3">The World</p>
                                        <div className="inline-block px-2 py-0.5 rounded-full bg-black/5 text-secondary text-[10px] font-bold uppercase tracking-wide">
                                            2026
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-lg text-secondary leading-relaxed mb-8">
                            Each model enriches the others. A character created in <span className="font-medium text-primary">Citizen</span> can star in a <span className="font-medium text-primary">Fable</span> scene, exist in an <span className="font-medium text-primary">Oasis</span> world, and shine in <span className="font-medium text-primary">Spark</span> content.
                        </p>
                        <Link to="/manifesto" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-primary hover:text-orange-600 transition-colors border-b border-black/10 hover:border-orange-600 pb-0.5">
                            Read the Manifesto <ArrowRight size={14} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — COMING 2026 (Beige 1) */}
            <section className="w-full py-32 bg-[#FAF9F6] border-t border-black/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-medium text-primary mb-2">Coming 2026</h2>
                            <p className="text-secondary">The future of cinema is being built. Join the waitlist.</p>
                        </div>
                        {/* Integrated Waitlist Form */}
                        <div className="flex w-full md:w-auto bg-white p-1 rounded-full border border-black/5 shadow-sm">
                            <input
                                type="email"
                                placeholder="email@address.com"
                                className="bg-transparent px-4 py-2 outline-none text-sm w-full md:w-64 placeholder:text-black/20"
                            />
                            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-black/80 transition-colors">
                                Notify Me
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Fable Hover Card */}
                        <Link to="/fable" className="h-full group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
                            {/* Hover Image Background */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                                <img src={bannerFable} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
                            </div>

                            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 p-2 rounded-lg bg-[#FAF9F6] border border-black/5 group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                                            <img src={iconFable} alt="Fable" className="w-full h-full object-contain group-hover:invert group-hover:brightness-0 group-hover:grayscale transition-all" />
                                        </div>
                                        <h3 className="text-lg font-bold group-hover:text-white transition-colors">FABLE</h3>
                                    </div>
                                    <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4 border-b border-black/5 pb-4 group-hover:text-white/60 group-hover:border-white/20 transition-colors">AI Director</p>
                                    <p className="text-secondary text-sm leading-relaxed mb-8 group-hover:text-white/90 transition-colors">
                                        Direct scenes with full camera and narrative control.
                                    </p>
                                </div>
                                <div className="text-sm font-medium text-primary flex items-center gap-2 group-hover:text-white transition-colors">
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>

                        {/* Citizen Hover Card */}
                        <Link to="/citizen" className="h-full group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
                            {/* Hover Image Background */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                                <img src={bannerCitizen} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60" />
                            </div>

                            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 p-2 rounded-lg bg-[#FAF9F6] border border-black/5 group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                                            <img src={iconCitizen} alt="Citizen" className="w-full h-full object-contain group-hover:invert group-hover:brightness-0 group-hover:grayscale transition-all" />
                                        </div>
                                        <h3 className="text-lg font-bold group-hover:text-white transition-colors">CITIZEN</h3>
                                    </div>
                                    <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4 border-b border-black/5 pb-4 group-hover:text-white/60 group-hover:border-white/20 transition-colors">AI Characters</p>
                                    <p className="text-secondary text-sm leading-relaxed mb-8 group-hover:text-white/90 transition-colors">
                                        Persistent characters with memory and emotion.
                                    </p>
                                </div>
                                <div className="text-sm font-medium text-primary flex items-center gap-2 group-hover:text-white transition-colors">
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>

                        {/* Oasis Hover Card */}
                        <Link to="/oasis" className="h-full group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
                            {/* Hover Image Background */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                                <img src={bannerOasis} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60" />
                            </div>

                            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 p-2 rounded-lg bg-[#FAF9F6] border border-black/5 group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                                            <img src={iconOasis} alt="Oasis" className="w-full h-full object-contain group-hover:invert group-hover:brightness-0 group-hover:grayscale transition-all" />
                                        </div>
                                        <h3 className="text-lg font-bold group-hover:text-white transition-colors">OASIS</h3>
                                    </div>
                                    <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4 border-b border-black/5 pb-4 group-hover:text-white/60 group-hover:border-white/20 transition-colors">Living Worlds</p>
                                    <p className="text-secondary text-sm leading-relaxed mb-8 group-hover:text-white/90 transition-colors">
                                        Worlds that remember and evolve over time.
                                    </p>
                                </div>
                                <div className="text-sm font-medium text-primary flex items-center gap-2 group-hover:text-white transition-colors">
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </section>

            {/* SECTION 5 — SOCIAL PROOF (Beige 2) */}
            <section className="w-full py-32 bg-[#F0ECE2]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-medium text-primary mb-4">Built by creators, for creators.</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 border-t border-b border-black/5 py-12 mb-20 bg-white/50 rounded-3xl backdrop-blur-sm">
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-primary mb-2">10k+</div>
                                <div className="text-xs font-mono text-secondary uppercase tracking-widest">Videos Generated</div>
                            </div>
                            <div className="text-center border-l border-r border-black/5">
                                <div className="text-3xl md:text-5xl font-bold text-primary mb-2">500+</div>
                                <div className="text-xs font-mono text-secondary uppercase tracking-widest">Creators in Beta</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-primary mb-2">50+</div>
                                <div className="text-xs font-mono text-secondary uppercase tracking-widest">Brands using Spark</div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-6xl text-black/5 font-serif">"</div>
                            <p className="text-2xl md:text-3xl font-serif italic text-primary leading-tight mb-8 relative z-10">
                                Join 500+ creators already building with Spark.<br />
                                Be first in line when the full ecosystem launches.
                            </p>
                            <Link to="/community" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-primary hover:text-orange-600 transition-colors border-b border-black/10 hover:border-orange-600 pb-0.5">
                                Join the Community <ArrowRight size={14} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6 — FINAL CTA */}
            <CTASection
                title={<span>Ready to direct the <span className="chroma-text">future</span>?</span>}
                description="Start with Spark. Free. No credit card."
                buttonText="Try Spark Free"
                buttonLink="/spark"
                buttonVariant="swipe"
                className="bg-white mb-20"
            />
        </div>
    );
};

export default Home;
