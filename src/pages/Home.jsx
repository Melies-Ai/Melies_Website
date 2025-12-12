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
import consistency1 from '../assets/spark_consistency_1.png';
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

            {/* SECTION 2 — SPARK SPOTLIGHT (Restored) */}
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
                                    <div className="w-10 h-10 rounded-lg bg-[#F0ECE2] flex items-center justify-center border border-[#E6E2D8]">
                                        <img src={iconSpark} alt="Spark" className="w-6 h-6 object-contain" />
                                    </div>
                                    <span className="text-lg font-medium tracking-tight text-primary">Spark Engine</span>
                                </div>

                                <h2 className="text-5xl md:text-6xl font-medium text-primary mb-6 leading-[1.1] tracking-tight">
                                    Vertical Stories.<br />
                                    <span className="text-primary">Perfect Consistency.</span>
                                </h2>

                                <p className="text-lg text-secondary mb-10 leading-relaxed max-w-md">
                                    Create ~20-second videos with perfect character and world consistency. No hallucinations.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Link to="/spark" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#333333] transition-colors duration-200 shadow-lg inline-flex items-center justify-center">
                                        Start Creating
                                    </Link>
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

            {/* SECTION 3 — CORE ECOSYSTEM (One Story. Three Ways In.) */}
            <section className="w-full py-32 bg-[#FAF9F6] text-primary relative overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02),transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-mono text-secondary/60 uppercase tracking-[0.2em] mb-4"
                        >
                            One Story. Three Ways In.
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-12"
                        >
                            Make a film. <span className="text-primary/40">Then live inside it.</span>
                        </motion.h3>


                    </div>

                    {/* Core Grid (Flex Layout for "Bento" expansion) */}
                    <div className="flex flex-col md:flex-row gap-4 h-[1200px] md:h-[600px] mb-12 group/grid">

                        {/* FABLE CARD */}
                        <Link to="/fable" className="relative flex-1 group/card overflow-hidden rounded-[32px] bg-black border border-black/5 transition-[flex] duration-500 ease-out hover:flex-[1.5]">
                            {/* Background & Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img src={bannerFable} alt="Fable" className="w-full h-full object-cover opacity-60 group-hover/card:opacity-80 group-hover/card:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay group-hover/card:bg-blue-900/30 transition-colors" />
                            </div>

                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                                <span className="text-3xl md:text-3xl font-bold text-white tracking-tighter text-center px-4 drop-shadow-lg">
                                    Direct the Film
                                </span>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                <div className="mb-auto pt-4 flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover/card:bg-blue-500/20 group-hover/card:border-blue-500/30 transition-all">
                                        <img src={iconFable} alt="Fable" className="w-6 h-6 object-contain invert" />
                                    </div>
                                    <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest bg-black/20 backdrop-blur-sm">Coming 2026</span>
                                </div>

                                <div className="min-w-max group-hover/card:opacity-0 transition-opacity duration-500">
                                    <h4 className="text-3xl font-bold mb-2 tracking-tight text-white">FABLE</h4>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/5 text-white">Watch & Direct</span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-xs transition-colors">
                                        Create and direct AI films. <br />The genesis of your universe.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* CITIZEN CARD */}
                        <Link to="/citizen" className="relative flex-1 group/card overflow-hidden rounded-[32px] bg-black border border-black/5 transition-[flex] duration-500 ease-out hover:flex-[1.5]">
                            {/* Background & Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img src={bannerCitizen} alt="Citizen" className="w-full h-full object-cover opacity-60 group-hover/card:opacity-80 group-hover/card:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
                                <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay group-hover/card:bg-orange-900/30 transition-colors" />
                            </div>

                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                                <span className="text-3xl md:text-3xl font-bold text-white tracking-tighter text-center px-4 drop-shadow-lg">
                                    Chat with the Cast
                                </span>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                <div className="mb-auto pt-4 flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover/card:bg-orange-500/20 group-hover/card:border-orange-500/30 transition-all">
                                        <img src={iconCitizen} alt="Citizen" className="w-6 h-6 object-contain invert" />
                                    </div>
                                    <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest bg-black/20 backdrop-blur-sm">Coming 2026</span>
                                </div>

                                <div className="min-w-max group-hover/card:opacity-0 transition-opacity duration-500">
                                    <h4 className="text-3xl font-bold mb-2 tracking-tight text-white">CITIZEN</h4>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/5 text-white">Talk</span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-xs transition-colors">
                                        Chat with the characters you created. <br />They remember everything.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* OASIS CARD */}
                        <Link to="/oasis" className="relative flex-1 group/card overflow-hidden rounded-[32px] bg-black border border-black/5 transition-[flex] duration-500 ease-out hover:flex-[1.5]">
                            {/* Background & Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img src={bannerOasis} alt="Oasis" className="w-full h-full object-cover opacity-60 group-hover/card:opacity-80 group-hover/card:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
                                <div className="absolute inset-0 bg-teal-900/20 mix-blend-overlay group-hover/card:bg-teal-900/30 transition-colors" />
                            </div>

                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                                <span className="text-3xl md:text-3xl font-bold text-white tracking-tighter text-center px-4 drop-shadow-lg">
                                    Walk the Set
                                </span>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                <div className="mb-auto pt-4 flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover/card:bg-teal-500/20 group-hover/card:border-teal-500/30 transition-all">
                                        <img src={iconOasis} alt="Oasis" className="w-6 h-6 object-contain invert" />
                                    </div>
                                    <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest bg-black/20 backdrop-blur-sm">Coming 2026</span>
                                </div>

                                <div className="min-w-max group-hover/card:opacity-0 transition-opacity duration-500">
                                    <h4 className="text-3xl font-bold mb-2 tracking-tight text-white">OASIS</h4>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/5 text-white">Explore</span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-xs transition-colors">
                                        Walk through the worlds you built. <br />Full immersion.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end mt-20 gap-6 text-left">
                        <div>
                            <h2 className="text-3xl font-medium text-primary mb-2">Coming 2026</h2>
                            <p className="text-secondary">The future of cinema is being built. Join the waitlist.</p>
                        </div>
                        {/* Integrated Waitlist Form */}
                        <div className="flex w-full md:w-auto bg-white p-1 rounded-full border border-black/5 shadow-sm">
                            <input
                                type="email"
                                placeholder="email@address.com"
                                className="bg-transparent px-4 py-2 outline-none text-sm w-full md:w-64 placeholder:text-black/20 text-black"
                            />
                            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-black/80 transition-colors">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5 (Renumbered) — SOCIAL PROOF (Beige 2) */}
            <section className="w-full py-32 bg-[#F0ECE2] text-primary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-mono text-secondary/60 uppercase tracking-[0.2em] mb-4">Empowering Visionaries</h2>
                        <h3 className="text-3xl md:text-5xl font-medium text-primary leading-tight tracking-tight">Built by creators, for creators.</h3>
                    </div>



                    <div className="text-center">
                        <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join the filmmakers defining the next era of cinema. <br />
                            Be first in line when the full ecosystem launches.
                        </p>
                        <a href="https://discord.gg/g9b4z5G9DR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary border border-black/10 px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 font-medium text-sm">
                            Join the Discord <ArrowRight size={14} />
                        </a>
                    </div>


                </div>
            </section>

            {/* SECTION 6 — FINAL CTA */}
            <CTASection
                title={<span>Ready to direct the <span className="chroma-text">future</span>?</span>}
                description="Start with Spark. Free. No credit card."
                buttonText="Start Creating"
                buttonLink="/login"
                buttonVariant="swipe"
                className="bg-white mb-20"
            />
        </div>
    );
};

export default Home;
