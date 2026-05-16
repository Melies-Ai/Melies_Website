import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { track } from '../../../lib/analytics';
import { FAQ_ITEMS } from '../../../config/pricing-comparison';

const FaqItem = ({ item, isOpen, onToggle }) => (
    <div className="border-b border-subtle">
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${item.id}`}
            className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        >
            <span className="text-base md:text-lg font-medium text-strong group-hover:text-ink transition-colors">
                {item.q}
            </span>
            <ChevronDown
                size={20}
                className={cn(
                    'text-muted transition-transform duration-200 shrink-0 mt-1',
                    isOpen && 'rotate-180'
                )}
            />
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    id={`faq-panel-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 pr-10 text-default leading-relaxed">{item.a}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const PricingFaq = () => {
    const [openId, setOpenId] = useState(null);

    return (
        <section className="mt-24 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <header className="lg:col-span-4">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-strong mb-3">
                        Frequently asked questions.
                    </h2>
                    <p className="text-muted text-lg font-light">
                        Everything we get asked most. Reach out if your question isn't here.
                    </p>
                </header>

                <div className="lg:col-span-8">
                    {FAQ_ITEMS.map((item) => (
                        <FaqItem
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => {
                                setOpenId((cur) => {
                                    const next = cur === item.id ? null : item.id;
                                    // Fire only on open, not on close.
                                    if (next === item.id) track('faq_open', { question_id: item.id });
                                    return next;
                                });
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingFaq;
