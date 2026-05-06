import React from 'react';
import { motion } from 'framer-motion';
import { Box, Smartphone, Sparkles } from 'lucide-react';

// Per-card chromatic glow stays inline — these are the use-case mood colors
// (pink for product, orange for ad, blue for brand). They are intentional
// per-card identity, not design-system tokens.
const CASES = [
    {
        title: 'Product Demo',
        Icon: Box,
        desc: 'Showcase your product in action. Hero shots that sell.',
        tags: ['ECOM', 'BEAUTY', 'TECH'],
        gradient: 'from-pink-500/20 to-rose-500/20',
        border: 'group-hover:border-pink-500/50',
        shadow: 'group-hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)]',
    },
    {
        title: 'Story Ad',
        Icon: Smartphone,
        desc: 'Scroll-stopping paid content. Native to the feed.',
        tags: ['UGC', 'SPONSORED', 'HOOK'],
        gradient: 'from-orange-500/20 to-amber-500/20',
        border: 'group-hover:border-orange-500/50',
        shadow: 'group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]',
    },
    {
        title: 'Brand Moment',
        Icon: Sparkles,
        desc: 'Aesthetic loops for awareness. Vibes over conversion.',
        tags: ['LIFESTYLE', 'MOOD', 'EDITORIAL'],
        gradient: 'from-blue-500/20 to-cyan-500/20',
        border: 'group-hover:border-blue-500/50',
        shadow: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]',
    },
];

const UseCases = () => (
    <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-strong mb-6">One engine. Every format.</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
                Spark adapts to your content goal. Same consistency, different energy.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {CASES.map(({ title, Icon, desc, tags, gradient, border, shadow }, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className={`group relative h-80 rounded-canvas sunken-canvas surface-page shadow-inner overflow-hidden p-8 flex flex-col justify-between border border-transparent transition-all duration-500 ${border} ${shadow}`}
                >
                    <div className="absolute inset-0 grid-texture-medium opacity-30 pointer-events-none" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-multiply`} />

                    {/* Header */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="w-14 h-14 rounded-card surface-card shadow-card border-glass-subtle flex items-center justify-center text-default group-hover:scale-110 group-hover:shadow-card-hover transition-all duration-500">
                            <Icon size={24} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h3 className="text-2xl font-medium text-strong mb-3 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
                        <p className="text-muted leading-relaxed text-sm mb-6">{desc}</p>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-white/50 border-subtle text-badge font-mono font-medium text-faint uppercase tracking-wide group-hover:bg-white/80 group-hover:text-muted transition-colors duration-500 delay-75"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

export default UseCases;
