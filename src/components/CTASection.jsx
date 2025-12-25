import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const CTASection = ({ title, description, buttonText, buttonLink, gradient = "from-ink to-ink/80", buttonVariant = "primary", showArrow = true, className = "" }) => {
    const navigate = useNavigate();

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
                        onClick={() => {
                            if (buttonLink?.startsWith('http')) {
                                window.location.href = buttonLink;
                            } else {
                                navigate(buttonLink || '#');
                            }
                        }}
                        className="px-10 py-5 text-xl"
                    >
                        {buttonText || "Get Started"}
                        {showArrow && (
                            <ArrowRight className="w-0 opacity-0 -translate-x-2 ml-0 group-hover:ml-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        )}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
