import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Sparkles, ArrowRight, Check, Layout, Box, ExternalLink, Zap, MousePointer2 } from 'lucide-react';

const LabSection = ({ title, children, className = "bg-white", description }) => (
    <section className={`p-10 rounded-[32px] border border-stroke overflow-hidden ${className}`}>
        <div className="mb-8">
            <h2 className="text-xl font-mono text-ink/70 uppercase tracking-widest flex items-center gap-2">
                {title}
            </h2>
            {description && <p className="text-ink/40 text-sm mt-2 font-mono">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-8 items-center justify-center">
            {children}
        </div>
    </section>
);

const ProposalSection = ({ title, description, children }) => (
    <section className="p-10 rounded-[32px] border-2 border-dashed border-orange-500/30 bg-orange-500/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl font-mono">
            UX EXPERT PROPOSALS
        </div>
        <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-ink flex items-center justify-center gap-3">
                <Sparkles size={20} className="text-orange-500" />
                {title}
            </h2>
            <p className="text-ink/60 text-sm mt-3 font-mono leading-relaxed">{description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {children}
        </div>
    </section>
);

const Label = ({ title, location, link, isProposal }) => (
    <div className={`absolute ${isProposal ? '-bottom-16' : '-bottom-14'} left-0 right-0 text-center flex flex-col items-center gap-1`}>
        <div className={`text-xs font-bold uppercase tracking-wider ${isProposal ? 'text-orange-600' : 'text-ink/70'}`}>
            {title}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-ink/40">
            <span>{location}</span>
            {link && (
                <Link
                    to={link}
                    className="hover:text-ink/80 transition-colors flex items-center gap-0.5"
                    title="View on site"
                >
                    <ExternalLink size={10} />
                </Link>
            )}
        </div>
    </div>
);

const ButtonShowcase = () => {
    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-32 px-6 pb-48">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-medium text-ink">Design System Lab</h1>
                    <p className="text-ink/50 font-mono">Buttons, CDAs & Containers • Audit v1.2</p>
                </div>

                {/* 1. CONTAINER STYLES */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-medium text-ink px-4">1. Surface & Containers</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Standard Base */}
                        <div className="h-64 rounded-[32px] bg-white border border-stroke p-8 flex flex-col items-center justify-center text-center relative group">
                            <Box className="w-8 h-8 text-ink/20 mb-4" />
                            <span className="font-mono text-sm text-ink/50">Standard Base</span>
                            <span className="text-xs text-ink/30 mt-2">bg-white</span>
                        </div>

                        {/* Sunken Canvas (Matching Site Usage) */}
                        <div className="h-64 rounded-[32px] sunken-canvas bg-[#F0ECE2] shadow-inner p-8 flex flex-col items-center justify-center text-center relative group overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                                backgroundSize: '40px 40px'
                            }} />
                            <div className="relative z-10 flex flex-col items-center">
                                <Box className="w-8 h-8 text-ink/20 mb-4" />
                                <span className="font-mono text-sm text-ink/50">Sunken Canvas</span>
                                <span className="text-xs text-ink/30 mt-2">Beige + Grid + Inner Shadow</span>
                            </div>
                        </div>

                        {/* Glass Panel */}
                        <div className="h-64 rounded-[32px] glass-panel bg-black/90 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            <Box className="w-8 h-8 text-white/20 mb-4" />
                            <span className="font-mono text-sm text-white/50">Glass Panel</span>
                            <span className="text-xs text-white/30 mt-2">Usage: Spark Quote, Overlays</span>
                        </div>
                    </div>
                </div>

                {/* NEW: UX PROPOSALS */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-medium text-ink px-4">2. Design Lab: Spark Hero</h3>
                    <ProposalSection
                        title="Candidate Replacements"
                        description="The current 'Neon Accent' button feels disconnected from the 'Tech Ethereal' system. Here are 3 expert proposals that better harmonize 'Retro' structure with 'Spark' energy (Orange/Velocity)."
                    >
                        {/* Option A: Industrial Retro */}
                        <div className="flex flex-col items-center justify-center p-8 bg-[#F0ECE2] rounded-2xl relative group h-80 border-2 border-transparent hover:border-orange-200 transition-colors">
                            <div className="absolute top-4 left-4 font-mono text-[10px] text-orange-600 font-bold bg-orange-100 px-2 py-1 rounded">OPTION A</div>
                            <div className="relative mb-12">
                                <button className="bg-[#FFFFF0] text-black border-2 border-black px-8 py-3 rounded-full text-lg font-medium shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2">
                                    <Sparkles size={18} className="text-orange-600" />
                                    Start Creating
                                </button>
                                <Label title="Industrial Retro" location="Harmonizes with Site" isProposal />
                            </div>
                            <p className="text-xs text-center text-ink/60 px-4">
                                Maintains the site's tactile "Retro Relief" geometry but swaps the black shadow for a <b>Vibrant Orange</b> hard shadow. Bridges branding + system.
                            </p>
                        </div>

                        {/* Option B: Holo-Field */}
                        <div className="flex flex-col items-center justify-center p-8 bg-[#1a1a1a] rounded-2xl relative group h-80 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="absolute top-4 left-4 font-mono text-[10px] text-white font-bold bg-white/20 backdrop-blur px-2 py-1 rounded">OPTION B</div>
                            <div className="relative mb-12 z-10">
                                <button className="relative group/btn overflow-hidden rounded-full p-[1px]">
                                    <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 opacity-100 animate-[spin_4s_linear_infinite]" />
                                    <div className="relative bg-black rounded-full px-8 py-3 text-white flex items-center gap-2 transition-transform group-hover/btn:scale-[0.98]">
                                        <Zap size={18} className="text-yellow-400 fill-yellow-400" />
                                        <span className="font-medium">Ignite Spark</span>
                                    </div>
                                </button>
                                <Label title="Holo-Field (Dark)" location="High Contrast / Tech" isProposal />
                            </div>
                            <p className="text-xs text-center text-white/60 px-4 relative z-10">
                                A dark-mode entry point. Uses a <b>gradient border spin</b> to suggest kinetic energy without overwhelming neon blocks. Best for "Cinema/Dark" modes.
                            </p>
                        </div>

                        {/* Option C: Glass Morphic */}
                        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-white rounded-2xl relative group h-80 border border-orange-100/50">
                            <div className="absolute top-4 left-4 font-mono text-[10px] text-ink font-bold bg-white border border-ink/10 px-2 py-1 rounded">OPTION C</div>
                            <div className="relative mb-12">
                                <button className="bg-white/50 backdrop-blur-md border border-orange-200 text-orange-900 px-8 py-3 rounded-2xl text-lg font-medium shadow-xl hover:bg-white hover:scale-105 transition-all flex items-center gap-3 group/c">
                                    Start Creating
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white group-hover/c:rotate-45 transition-transform">
                                        <ArrowRight size={16} />
                                    </div>
                                </button>
                                <Label title="Glass Morphic" location="Modern / Ethereal" isProposal />
                            </div>
                            <p className="text-xs text-center text-ink/60 px-4">
                                A softer, Apple-vision-esque approach. <b>Frosted glass</b> with a distinct vibrant circular action trigger. Very clean, high perceived value.
                            </p>
                        </div>
                    </ProposalSection>
                </div>

                {/* 3. BUTTON AUDIT (Legacy/Current) */}
                <div className="space-y-6 opacity-60 hover:opacity-100 transition-opacity">
                    <h3 className="text-2xl font-medium text-ink px-4">3. Current Site Inventory</h3>

                    {/* NAV & HEADER */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <LabSection title="Navigation" className="bg-[#1A1A1A]" description="Context: Stick Navbar">
                            <div className="relative mb-8 group">
                                <button className="bg-black text-white rounded-full px-6 py-2 text-base font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10">
                                    Try Spark
                                </button>
                                <Label title="Navbar CTA" location="Navbar.jsx" link="/" />
                            </div>
                        </LabSection>

                        <LabSection title="Hero (Standard)" className="bg-[#F0ECE2]" description="Context: Home Page Hero">
                            <div className="relative mb-8">
                                <Button variant="primary">
                                    Start Creating
                                </Button>
                                <Label title="Retro Relief" location="Home.jsx > Hero" link="/" />
                            </div>
                        </LabSection>
                    </div>

                    {/* SPARK & SPECIALTY */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <LabSection title="Spark Page" className="bg-white" description="Context: Spark Landing Page">
                            <div className="relative mb-8">
                                <Button variant="primary" className="bg-accent text-ink hover:bg-accent/90 shadow-lg shadow-accent/20 border-none">
                                    Start Creating
                                </Button>
                                <Label title="Current Neon Override" location="Spark.jsx > Hero" link="/spark" />
                            </div>

                            <div className="relative mb-8">
                                <button className="rounded-full px-12 py-6 text-xl font-bold inline-flex items-center gap-3 bg-gradient-to-r from-accent to-orange-400 text-white">
                                    Start Creating <ArrowRight size={24} />
                                </button>
                                <Label title="Gradient CTA" location="Spark.jsx > Footer" link="/spark" />
                            </div>
                        </LabSection>
                    </div>

                    {/* SECTION CONTEXTS */}
                    <LabSection title="In Context: Sunken Canvas" className="bg-[#F0ECE2] sunken-canvas shadow-inner relative overflow-hidden" description="How buttons appear inside Feature sections">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                        <div className="relative mb-8 z-10">
                            <Button variant="primary">
                                Create Citizen
                            </Button>
                            <Label title="Standard on Sunken" location="Citizen.jsx" link="/citizen" />
                        </div>
                    </LabSection>

                </div>
            </div>
        </div>
    );
};

export default ButtonShowcase;
