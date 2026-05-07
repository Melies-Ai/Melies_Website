import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SystemText from '../components/SystemText';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

import {
    Volume2,
    User,
    Package,
    Palette,
    ArrowRight
} from 'lucide-react';
import iconSpark from '../assets/icons/products/spark/spark-mark.webp';
import commercialDesk from '../assets/images/home/home-hero-workspace.webp';
import { upcomingProducts } from '../config/products';
import { getProductIcons } from '../config/products-icons';
import { getProductMedia } from '../config/products-media';
import ViralFeedSimulator from '../components/sections/ViralFeedSimulator';

// Home-specific narrative copy keyed by product id. The product registry
// owns name/route/icon/banner/accent; this map owns the page-narrative
// pieces ("One Story. Three Ways In.") that don't belong on the product.
const HOME_CARD_COPY = {
    fable: {
        verbBadge: 'Watch & Direct',
        hoverHeadline: 'Direct the Film',
        description: <>Create and direct AI films. <br />The genesis of your universe.</>,
        tint: {
            imageOverlay: 'bg-blue-900/20 group-hover/card:bg-blue-900/30',
            iconHoverBg: 'group-hover/card:bg-blue-500/20 group-hover/card:border-blue-500/30',
        },
    },
    citizen: {
        verbBadge: 'Talk',
        hoverHeadline: 'Chat with the Cast',
        description: <>Chat with the characters you created. <br />They remember everything.</>,
        tint: {
            imageOverlay: 'bg-orange-900/20 group-hover/card:bg-orange-900/30',
            iconHoverBg: 'group-hover/card:bg-orange-500/20 group-hover/card:border-orange-500/30',
        },
    },
    oasis: {
        verbBadge: 'Explore',
        hoverHeadline: 'Walk the Set',
        description: <>Walk through the worlds you built. <br />Full immersion.</>,
        tint: {
            imageOverlay: 'bg-teal-900/20 group-hover/card:bg-teal-900/30',
            iconHoverBg: 'group-hover/card:bg-teal-500/20 group-hover/card:border-teal-500/30',
        },
    },
};

const Home = () => {
    return (
        <div className="bg-background min-h-screen pt-40">
            <SEO
                title="The Infinite Cinema Engine"
                description="Orchestrate multi-agent AI systems to generate films from script to screen, in real-time. The future of filmmaking starts with Fantazia."
                canonical="/"
                preloadImage={commercialDesk}
            />

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
                    <Button shimmer={false} className="bg-btn-bg text-btn-text rounded-full px-8 py-4 text-lg font-medium">
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
                        alt="Fantazia Workspace"
                        fetchPriority="high"
                        decoding="async"
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
                            <ViralFeedSimulator variant="compact" />
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
                                        <img src={iconSpark} alt="Spark" loading="lazy" decoding="async" className="w-6 h-6 object-contain" />
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
                                    <Button to="/spark" variant="dark" className="px-8 py-3 text-sm">
                                        Start Creating
                                    </Button>
                                    <Button to="/spark" variant="outlineDark" className="px-8 py-3 text-sm">
                                        More Details <ArrowRight size={14} />
                                    </Button>
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

                        {upcomingProducts.map((product) => {
                            const copy = HOME_CARD_COPY[product.id];
                            // Guard: a new upcoming product without HOME_CARD_COPY entry
                            // should be skipped from the grid rather than crash the page.
                            if (!copy) {
                                if (import.meta.env.DEV) {
                                    // eslint-disable-next-line no-console
                                    console.warn(`Home: missing HOME_CARD_COPY entry for product "${product.id}". Skipping card.`);
                                }
                                return null;
                            }
                            const media = getProductMedia(product.id);
                            const icons = getProductIcons(product.id);
                            return (
                                <Link
                                    key={product.id}
                                    to={product.route}
                                    className="relative flex-1 group/card overflow-hidden rounded-[32px] bg-black border border-black/5 transition-[flex] duration-500 ease-out hover:flex-[1.5]"
                                >
                                    {/* Background & Overlay */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={media?.banner?.src}
                                            srcSet={media?.banner?.srcSet}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            alt={product.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover opacity-60 group-hover/card:opacity-80 group-hover/card:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
                                        <div className={`absolute inset-0 mix-blend-overlay transition-colors ${copy.tint.imageOverlay}`} />
                                    </div>

                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                                        <span className="text-3xl md:text-3xl font-bold text-white tracking-tighter text-center px-4 drop-shadow-lg">
                                            {copy.hoverHeadline}
                                        </span>
                                    </div>

                                    <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                        <div className="mb-auto pt-4 flex justify-between items-start">
                                            <div className={`w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 transition-all ${copy.tint.iconHoverBg}`}>
                                                <img src={icons?.mark} alt={product.name} loading="lazy" decoding="async" className="w-6 h-6 object-contain invert" />
                                            </div>
                                            <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest bg-black/20 backdrop-blur-sm">{product.releaseLabel}</span>
                                        </div>

                                        <div className="min-w-max group-hover/card:opacity-0 transition-opacity duration-500">
                                            <h4 className="text-3xl font-bold mb-2 tracking-tight text-white">{product.name.toUpperCase()}</h4>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/5 text-white">{copy.verbBadge}</span>
                                            </div>
                                            <p className="text-white/60 text-sm leading-relaxed max-w-xs transition-colors">
                                                {copy.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
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
                            <Button variant="dark" className="px-6 py-2 text-sm whitespace-nowrap">
                                Notify Me
                            </Button>
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
                        <Button href="https://discord.gg/g9b4z5G9DR" target="_blank" rel="noopener noreferrer" variant="outlineDark" className="px-8 py-3 text-sm">
                            Join the Discord <ArrowRight size={14} />
                        </Button>
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
                className="bg-white"
            />
        </div>
    );
};

export default Home;
