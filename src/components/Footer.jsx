import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Youtube, MessageCircle, Send, Music, BookOpen } from 'lucide-react';

import logo from '../assets/logo.png';

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center text-ink/60 hover:bg-ink hover:text-paper transition-all duration-300 group"
        aria-label={label}
    >
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
    </a>
);

const SOCIAL_LINKS = [
    { href: "https://discord.gg/g9b4z5G9DR", icon: MessageCircle, label: "Discord" },
    { href: "https://x.com/MeliesAi", icon: Twitter, label: "Twitter (X)" },
    { href: "https://t.me/melies_ai", icon: Send, label: "Telegram" },
    { href: "https://tiktok.com/@melies_ai", icon: Music, label: "TikTok" },
    { href: "https://www.instagram.com/melies_ai/", icon: Instagram, label: "Instagram" },
    { href: "https://www.youtube.com/@Melies-technology", icon: Youtube, label: "YouTube" },
    { href: "https://www.linkedin.com/company/melies-ai/", icon: Linkedin, label: "LinkedIn" }
];

const Footer = () => {
    return (
        <footer className="bg-[#F0ECE2] border-t border-black/5 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="Melies.ai" className="h-8 w-auto opacity-80" />
                        </div>
                        <p className="text-ink/60 max-w-sm mb-8 text-lg font-serif italic leading-relaxed">
                            "The Infinite Cinema Engine."
                        </p>
                        <p className="text-sm text-ink/40 max-w-xs mb-8">
                            Orchestrating the future of AI filmmaking with multi-agent systems.
                        </p>
                        <Link
                            to="/manifesto"
                            className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-ink/40 hover:text-accent transition-colors"
                        >
                            <BookOpen size={14} className="mr-2" />
                            Read the Manifesto
                        </Link>
                    </div>

                    {/* Links Column 1 */}
                    <div className="col-span-1 md:col-span-3 md:col-start-7">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-8">Product Suite</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/spark" className="text-ink/80 hover:text-accent transition-colors flex items-center gap-2 group">
                                    Spark
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">→</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/fable" className="text-ink/60 hover:text-ink transition-colors flex items-center gap-2">
                                    Fable
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/5 text-ink/40 border border-black/5">
                                        2026
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/citizen" className="text-ink/60 hover:text-ink transition-colors flex items-center gap-2">
                                    Citizen
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/5 text-ink/40 border border-black/5">
                                        2026
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/oasis" className="text-ink/60 hover:text-ink transition-colors flex items-center gap-2">
                                    Oasis
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/5 text-ink/40 border border-black/5">
                                        2026
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-8">Connect</h4>
                        <div className="flex flex-wrap gap-2">
                            {SOCIAL_LINKS.map((link, index) => (
                                <SocialLink key={index} {...link} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-ink/30 uppercase tracking-wider font-mono">
                    <p>&copy; {new Date().getFullYear()} Melies.ai. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
