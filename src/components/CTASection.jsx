import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const CTASection = ({ title, description, buttonText, buttonLink, gradient = "from-ink to-ink/80", buttonVariant = "primary", className = "" }) => {
    return (
        <section className={`py-32 px-4 ${className}`}>
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-medium tracking-tighter text-ink mb-8"
                >
                    {title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-ink/60 max-w-2xl mx-auto mb-12 font-light"
                >
                    {description}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <Button
                        variant={buttonVariant}
                        onClick={() => window.location.href = buttonLink || '#'}
                        className="px-10 py-5 text-xl"
                    >
                        {buttonText || "Get Started"}
                        <ArrowRight size={22} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
