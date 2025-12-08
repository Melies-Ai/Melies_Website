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
} from 'lucide-react';

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

            {/* SECTION 2 — SPARK SPOTLIGHT */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-[40px] border border-black/5 overflow-hidden shadow-sm relative">
                    <div className="absolute top-8 right-8">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-wider uppercase border border-green-200 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Now Live
                        </span>
                    </div>

                    <div className="p-12 md:p-20 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6 text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                                <span className="text-lg">⚡</span>
                                <span className="font-mono text-xs uppercase tracking-wider font-bold">Spark Engine</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-medium text-primary mb-6 leading-[1.1]">
                                Vertical Stories.<br />
                                <span className="text-secondary opacity-60">Perfect Consistency.</span>
                            </h2>
                            <p className="text-xl text-secondary mb-10 leading-relaxed max-w-md">
                                Create ~20-second videos with perfect consistency. Same character, same world, every frame.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {[
                                    { title: "Consistent Characters", icon: "👤" },
                                    { title: "Full Audio Gen", icon: "🔊" },
                                    { title: "Your Assets", icon: "📦" },
                                    { title: "Any Style", icon: "🎨" }
                                ].map((feature, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-[#F0ECE2] border border-black/5 flex flex-col gap-2">
                                        <div className="text-2xl">{feature.icon}</div>
                                        <div className="text-sm font-medium text-primary">{feature.title}</div>
                                    </div>
                                ))}
                            </div>

                            <Button to="/spark" variant="swipe" className="bg-black text-white w-full md:w-auto">
                                Try Spark Free
                            </Button>
                        </div>

                        {/* Demo Video Placeholder */}
                        <div className="relative aspect-[9/16] md:aspect-square bg-black rounded-[32px] overflow-hidden border-4 border-black/5 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                                        <Play className="w-8 h-8 text-white ml-1 fill-white" />
                                    </div>
                                    <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Demo Video</p>
                                </div>
                            </div>
                            {/* UI Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — THE ECOSYSTEM */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-medium text-primary mb-6">The Melies Ecosystem</h2>
                    <p className="text-xl text-secondary">Four engines. One creative brain.</p>
                </div>

                <div className="relative">
                    {/* Diagram Lines (Absolute) */}
                    <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
                        {/* Vertical line from Citizen */}
                        <div className="absolute top-[220px] left-1/2 w-px h-24 bg-gradient-to-b from-black/20 to-black/5 -translate-x-1/2" />
                        {/* Horizontal Connector */}
                        <div className="absolute top-[316px] left-[17%] right-[17%] h-px bg-black/10" />
                        {/* Downward arrows */}
                        <div className="absolute top-[316px] left-[17%] w-px h-8 bg-black/10" />
                        <div className="absolute top-[316px] left-1/2 w-px h-8 bg-black/10 -translate-x-1/2" />
                        <div className="absolute top-[316px] right-[17%] w-px h-8 bg-black/10" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-16">
                        {/* Level 1: Citizen (The Source) */}
                        <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-lg w-full max-w-sm text-center relative group hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#F0ECE2] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">👤</div>
                            <h3 className="text-2xl font-medium mb-2">CITIZEN</h3>
                            <p className="text-secondary text-sm">Characters with memory</p>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-r border-b border-black/5"></div>
                        </div>

                        {/* Level 2: The Engines */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full">
                            {/* Spark */}
                            <div className="bg-white p-6 rounded-[32px] border-2 border-orange-500/10 shadow-lg text-center hover:border-orange-500/30 transition-colors group">
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform text-orange-500">⚡</div>
                                <h3 className="text-xl font-medium mb-1">SPARK</h3>
                                <p className="text-xs font-mono text-orange-600 uppercase tracking-widest mb-4">Vertical Stories</p>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
                                </div>
                            </div>

                            {/* Fable */}
                            <div className="bg-white/60 p-6 rounded-[32px] border border-black/5 shadow-sm text-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-[#F0ECE2] rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">🎬</div>
                                <h3 className="text-xl font-medium mb-1">FABLE</h3>
                                <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">AI Director</p>
                                <div className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-secondary text-[10px] font-bold uppercase tracking-wide">
                                    2026
                                </div>
                            </div>

                            {/* Oasis */}
                            <div className="bg-white/60 p-6 rounded-[32px] border border-black/5 shadow-sm text-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-[#F0ECE2] rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">🌍</div>
                                <h3 className="text-xl font-medium mb-1">OASIS</h3>
                                <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Living Worlds</p>
                                <div className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-secondary text-[10px] font-bold uppercase tracking-wide">
                                    2026
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <p className="text-lg text-secondary leading-relaxed mb-8">
                            Each model enriches the others. A character created in <span className="text-primary font-medium">Citizen</span> can star in a <span className="text-primary font-medium">Fable</span> scene, exist in an <span className="text-primary font-medium">Oasis</span> world, and shine in <span className="text-primary font-medium">Spark</span> content.
                        </p>
                        <Link to="/manifesto" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-primary hover:text-orange-600 transition-colors border-b border-black/10 hover:border-orange-600 pb-0.5">
                            Read the Manifesto →
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — COMING SOON / WAITLIST */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-black/5">
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

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Fable Card */}
                    <Card className="h-full flex flex-col justify-between p-8 bg-gradient-to-b from-white to-[#F0ECE2]/50">
                        <div>
                            <div className="text-3xl mb-4">🎬</div>
                            <h3 className="text-xl font-medium mb-1">FABLE</h3>
                            <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-6 border-b border-black/5 pb-4">AI Director</p>
                            <p className="text-secondary text-sm leading-relaxed mb-8">
                                Direct cinematic scenes with full camera & narrative control. Storyboarding tailored by agents.
                            </p>
                        </div>
                        <button className="w-full py-3 rounded-xl border border-black/10 font-medium text-sm hover:bg-black hover:text-white transition-all duration-300">
                            Join Waitlist
                        </button>
                    </Card>

                    {/* Citizen Card */}
                    <Card className="h-full flex flex-col justify-between p-8 bg-gradient-to-b from-white to-[#F0ECE2]/50">
                        <div>
                            <div className="text-3xl mb-4">👤</div>
                            <h3 className="text-xl font-medium mb-1">CITIZEN</h3>
                            <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-6 border-b border-black/5 pb-4">AI Characters</p>
                            <p className="text-secondary text-sm leading-relaxed mb-8">
                                Create persistent characters with memory, emotion, and consistency across all engines.
                            </p>
                        </div>
                        <button className="w-full py-3 rounded-xl border border-black/10 font-medium text-sm hover:bg-black hover:text-white transition-all duration-300">
                            Join Waitlist
                        </button>
                    </Card>

                    {/* Oasis Card */}
                    <Card className="h-full flex flex-col justify-between p-8 bg-gradient-to-b from-white to-[#F0ECE2]/50">
                        <div>
                            <div className="text-3xl mb-4">🌍</div>
                            <h3 className="text-xl font-medium mb-1">OASIS</h3>
                            <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-6 border-b border-black/5 pb-4">Living Worlds</p>
                            <p className="text-secondary text-sm leading-relaxed mb-8">
                                Build universes that remember and evolve over time. Physics, lighting, and lore.
                            </p>
                        </div>
                        <button className="w-full py-3 rounded-xl border border-black/10 font-medium text-sm hover:bg-black hover:text-white transition-all duration-300">
                            Join Waitlist
                        </button>
                    </Card>
                </div>
            </section>

            {/* SECTION 5 — SOCIAL PROOF */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-medium text-primary mb-4">Trusted by Visionaries</h2>
                </div>

                <div className="max-w-4xl mx-auto text-center mb-20">
                    <p className="text-3xl md:text-4xl font-serif italic text-primary leading-tight mb-8">
                        "Spark is what I've been waiting for. Consistent characters finally make AI video usable for real brands."
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-black/5 rounded-full" />
                        <div className="text-left">
                            <div className="font-medium text-primary">Alex Chen</div>
                            <div className="text-sm text-secondary">Creative Director, Future Brand</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 border-t border-b border-black/5 py-12">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10k+</div>
                        <div className="text-xs font-mono text-secondary uppercase tracking-widest">Videos Generated</div>
                    </div>
                    <div className="text-center border-l border-r border-black/5">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                        <div className="text-xs font-mono text-secondary uppercase tracking-widest">Creators in Beta</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
                        <div className="text-xs font-mono text-secondary uppercase tracking-widest">Partner Brands</div>
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
