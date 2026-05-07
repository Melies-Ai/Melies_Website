import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { DiscordIcon, XIcon, TikTokIcon, TelegramIcon } from './SocialIcons';
import { PRODUCTS } from '../config/products';
import { cn } from '../lib/cn';

import footerBgSrc from '../assets/images/home/footer-desk.webp?w=1200&format=webp';
import footerBgSrcSet from '../assets/images/home/footer-desk.webp?w=800;1200;1800&format=webp&as=srcset';

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/95 hover:text-ink hover:border-white transition-all duration-300 group"
        aria-label={label}
    >
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
    </a>
);

const SOCIAL_LINKS = [
    { href: 'https://discord.gg/g9b4z5G9DR', icon: DiscordIcon, label: 'Discord' },
    { href: 'https://x.com/FantaziaAI', icon: XIcon, label: 'Twitter (X)' },
    { href: 'https://t.me/fantazia_ai', icon: TelegramIcon, label: 'Telegram' },
    { href: 'https://tiktok.com/@fantazia_ai', icon: TikTokIcon, label: 'TikTok' },
    { href: 'https://www.instagram.com/fantazia_ai/', icon: Instagram, label: 'Instagram' },
    { href: 'https://www.youtube.com/@FantaziaAI', icon: Youtube, label: 'YouTube' },
    { href: 'https://www.linkedin.com/company/fantazia-ai/', icon: Linkedin, label: 'LinkedIn' },
];

const ProductLink = ({ product }) => {
    const isLive = product.status === 'live';
    return (
        <Link
            to={product.route}
            className={cn(
                'transition-colors flex items-center gap-2',
                isLive ? 'text-white/90 hover:text-accent group' : 'text-white/60 hover:text-white'
            )}
        >
            {product.name}
            {isLive ? (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">→</span>
            ) : (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/10 text-white/50 border border-white/10">
                    {product.releaseLabel.replace(/^Coming\s+/, '')}
                </span>
            )}
        </Link>
    );
};

const Footer = () => (
    <footer className="relative isolate overflow-hidden">
        {/* Cinematic background — daffodils, laptop, distant city through morning light. */}
        <div className="absolute inset-0 -z-10">
            <img
                src={footerBgSrc}
                srcSet={footerBgSrcSet}
                sizes="100vw"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
            />
            {/* Body overlay — keeps text readable while letting the scene breathe */}
            <div className="absolute inset-0 bg-ink/45" />
            {/* Subtle right-side vignette to anchor the text columns */}
            <div className="absolute inset-0 bg-gradient-to-l from-ink/60 via-ink/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto pt-[12.5rem] pb-10 px-6 relative">
            {/* Three-column row. Brand alone is bottom-aligned (its description
                tail sits down toward the desk surface in the image). Product
                Suite and Connect stay top-aligned so their headings line up
                on the same baseline. */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-5 md:self-end">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-display text-[1.7rem] lowercase text-white leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                            fantazia.ai
                        </span>
                    </div>
                    <p className="text-white/80 max-w-sm text-lg font-serif italic leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                        "The Infinite Cinema Engine."
                    </p>
                </div>

                {/* Product Suite */}
                <div className="col-span-1 md:col-span-3 md:col-start-7">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8">Product Suite</h4>
                    <ul className="space-y-4">
                        {PRODUCTS.map((product) => (
                            <li key={product.id}>
                                <ProductLink product={product} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Connect */}
                <div className="col-span-1 md:col-span-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8">Connect</h4>
                    <div className="grid grid-cols-4 gap-2 w-fit">
                        {SOCIAL_LINKS.map((link, i) => (
                            <SocialLink key={i} {...link} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Legal row — separate sibling under the bottom-aligned grid */}
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40 uppercase tracking-wider font-mono">
                <p>&copy; {new Date().getFullYear()} Fantazia. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
