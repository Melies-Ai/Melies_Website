
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import Button from './Button';

const WaitlistCTA = ({ title, description }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setEmail('');
    };

    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-medium tracking-tighter text-ink mb-6"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-ink/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md mx-auto"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
                            >
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                                    <Check size={24} />
                                </div>
                                <h3 className="text-ink font-medium text-lg mb-1">You're on the list!</h3>
                                <p className="text-ink/60 text-sm">We'll notify you when access opens.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="relative flex flex-col items-center"
                            >
                                <div className="relative group w-full">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@address.com"
                                        disabled={status === 'loading'}
                                        className="w-full bg-white border border-black/10 rounded-full px-6 py-4 pr-36 text-ink placeholder:text-ink/30 outline-none focus:border-black/30 focus:shadow-sm transition-all disabled:opacity-50"
                                        required
                                    />
                                    <div className="absolute top-1.5 right-1.5 bottom-1.5">
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="bg-black text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[#333333] transition-colors duration-200 shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 h-full"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <>
                                                    Join Waitlist <ArrowRight size={16} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center space-y-1">
                                    <p className="text-ink/60 text-sm font-medium">
                                        Limited spots for early access. No spam, ever.
                                    </p>
                                    <p className="text-ink/30 text-[10px] flex flex-col gap-1">
                                        <span>By joining, you agree to receive project updates from Melies. Unsubscribe anytime.</span>
                                        <a href="/privacy" className="underline hover:text-ink/50">Privacy Policy</a>
                                    </p>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default WaitlistCTA;
