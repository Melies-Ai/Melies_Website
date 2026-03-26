import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';

const Button = ({
    children,
    variant = 'primary',
    className,
    onClick,
    shimmer = true,
    to,
    href,
    ...props
}) => {
    const baseStyles = "relative px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden group";

    const variants = {
        primary: "bg-[#F0ECE2] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        dark: "bg-black text-white hover:bg-[#333333] shadow-lg",
        outlineDark: "bg-transparent border border-black/10 text-primary hover:bg-black hover:text-white hover:border-black",
        secondary: "bg-glass border border-glass-border text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md",
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        outline: "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
        swipe: "bg-transparent border-2 border-black text-black hover:text-white overflow-hidden relative"
    };

    const sharedClassName = cn(baseStyles, variants[variant], className);
    const content = (
        <>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {variant === 'primary' && shimmer && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
            )}
            {variant === 'swipe' && (
                <span className="absolute -inset-[1px] bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out will-change-transform" />
            )}
        </>
    );

    if (to) {
        return (
            <Link
                to={to}
                className={sharedClassName}
                onClick={onClick}
                {...props}
            >
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                className={sharedClassName}
                onClick={onClick}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <motion.button
            className={sharedClassName}
            onClick={onClick}
            {...props}
        >
            {content}
        </motion.button>
    );
};

export default Button;
