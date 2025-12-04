import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = ({
    children,
    variant = 'primary',
    className,
    onClick,
    ...props
}) => {
    const baseStyles = "relative px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";

    const variants = {
        primary: "bg-[#F0ECE2] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        secondary: "bg-glass border border-glass-border text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md",
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        outline: "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
        custom: ""
    };

    return (
        <motion.button
            className={cn(baseStyles, variants[variant], className)}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
            )}
        </motion.button>
    );
};

export default Button;
