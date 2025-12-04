import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button'; // Reusing cn utility

const Card = ({
    children,
    className,
    hoverEffect = true,
    ...props
}) => {
    return (
        <motion.div
            className={cn(
                "relative overflow-hidden rounded-2xl bg-glass border border-glass-border p-6 backdrop-blur-xl",
                hoverEffect && "hover:border-white/20 transition-colors duration-300 group",
                className
            )}
            {...props}
        >
            {hoverEffect && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-white/5" />
                </div>
            )}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
