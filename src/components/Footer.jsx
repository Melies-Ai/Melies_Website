import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { DiscordIcon, XIcon, TikTokIcon, TelegramIcon } from './SocialIcons';
import { PRODUCTS } from '../config/products';
import { cn } from '../lib/cn';

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center text-muted hover:bg-ink hover:text-paper transition-all duration-300 group"
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
                isLive ? 'text-default hover:text-accent group' : 'text-muted hover:text-strong'
            )}
        >
            {product.name}
            {isLive ? (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">→</span>
            ) : (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/5 text-faint border-subtle">
                    {product.releaseLabel.replace(/^Coming\s+/, '')}
                </span>
            )}
        </Link>
    );
};

const Footer = () => (
    <footer className="surface-page border-t border-subtle pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                {/* Brand */}
                <div className="col-span-1 md:col-span-5">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="font-display text-[1.6rem] lowercase text-strong leading-none">
                            fantazia.ai
                        </span>
                    </div>
                    <p className="text-muted max-w-sm mb-8 text-lg font-serif italic leading-relaxed">
                        "The Infinite Cinema Engine."
                    </p>
                    <p className="text-sm text-faint max-w-xs mb-8">
                        Orchestrating the future of AI filmmaking with multi-agent systems.
                    </p>
                </div>

                {/* Product Suite */}
                <div className="col-span-1 md:col-span-3 md:col-start-7">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-faint mb-8">Product Suite</h4>
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
                    <h4 className="font-mono text-xs uppercase tracking-widest text-faint mb-8">Connect</h4>
                    <div className="flex flex-wrap gap-2">
                        {SOCIAL_LINKS.map((link, i) => (
                            <SocialLink key={i} {...link} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-faint uppercase tracking-wider font-mono">
                <p>&copy; {new Date().getFullYear()} Fantazia. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link to="/privacy" className="hover:text-strong transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-strong transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
