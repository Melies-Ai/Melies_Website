import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../components/Button';

const PricingCard = ({ tier, price, yearlyPrice, billingText, features, recommended, saveBadge, buttonText, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`relative p-8 rounded-[30px] border flex flex-col h-full transition-transform hover:scale-[1.02] duration-300 ${recommended
            ? 'border-primary bg-white shadow-xl'
            : 'border-stroke bg-white/50'
            }`}
    >
        {recommended && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-xs font-medium rounded-full uppercase tracking-wider shadow-lg">
                Recommended
            </div>
        )}

        <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-secondary">{tier}</h3>
                {saveBadge && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                        {saveBadge}
                    </span>
                )}
            </div>

            <div className="flex items-baseline gap-1 mb-1 h-10 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={price}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-medium text-primary tracking-tight block"
                    >
                        {price}
                    </motion.span>
                </AnimatePresence>
                {price !== '$0' && <span className="text-secondary text-sm">/mo</span>}
            </div>
            {billingText && (
                <p className="text-xs text-secondary/70">{billingText}</p>
            )}
        </div>

        <ul className="space-y-4 mb-8 flex-1">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <Button variant="custom" className={`w-full py-3 rounded-xl font-medium transition-transform ${recommended
            ? 'bg-black text-white hover:bg-black/90'
            : 'bg-white border border-stroke text-primary hover:bg-gray-50'
            }`}>
            {buttonText || 'Get Started'}
        </Button>
    </motion.div>
);

const INDIVIDUAL_PLANS = [
    {
        tier: "Free",
        price: "$0",
        features: [
            "80 credits (One-time trial)",
            "Access to Standard models"
        ],
        buttonText: "Start for Free",
        delay: 0.1
    },
    {
        tier: "Indie",
        monthlyPrice: "$9.99",
        yearlyPrice: "$7.99",
        yearlyBill: "$95.9",
        saveBadge: "SAVE $24/YR",
        features: [
            "500 monthly credits",
            "Access to all Premium models",
            "2 generation at a time",
            "Commercial license (No watermark)"
        ],
        buttonText: "Get Indie",
        delay: 0.2
    },
    {
        tier: "Creator",
        monthlyPrice: "$19.99",
        yearlyPrice: "$15.99",
        yearlyBill: "$191.9",
        saveBadge: "SAVE $48/YR",
        features: [
            "1,099 monthly credits",
            "Access to all Premium models",
            "3 simultaneous generations",
            "Fast processing queue"
        ],
        recommended: true,
        buttonText: "Get Creator",
        delay: 0.3
    }
];

const PROFESSIONAL_PLANS = [
    {
        tier: "Pro",
        monthlyPrice: "$49.99",
        yearlyPrice: "$39.99",
        yearlyBill: "$479.9",
        saveBadge: "SAVE $120/YR",
        features: [
            "2,874 monthly credits",
            "Access to all Premium models",
            "5 simultaneous generations",
            "Fast processing queue"
        ],
        buttonText: "Get Pro",
        delay: 0.4
    },
    {
        tier: "Studio",
        monthlyPrice: "$99.99",
        yearlyPrice: "$79.99",
        yearlyBill: "$959.9",
        saveBadge: "SAVE $240/YR",
        features: [
            "5,999 monthly credits",
            "Access to all Premium models",
            "10 simultaneous generations",
            "Fast processing queue",
            "Dedicated account support"
        ],
        buttonText: "Contact Sales",
        delay: 0.5
    }
];

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-primary mb-6">
                        Simple, transparent <span className="chroma-text">pricing</span>.
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto font-light mb-8">
                        Start for free, upgrade as you scale. No hidden fees.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="bg-white p-1 rounded-full border border-stroke inline-flex relative">
                            <button
                                onClick={() => setIsYearly(false)}
                                className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10"
                            >
                                {!isYearly && (
                                    <motion.div
                                        layoutId="billing-toggle"
                                        className="absolute inset-0 bg-black rounded-full -z-10 shadow-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 transition-colors duration-200 ${!isYearly ? 'text-white' : 'text-secondary hover:text-primary'}`}>
                                    Monthly
                                </span>
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 flex items-center gap-2"
                            >
                                {isYearly && (
                                    <motion.div
                                        layoutId="billing-toggle"
                                        className="absolute inset-0 bg-black rounded-full -z-10 shadow-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 transition-colors duration-200 ${isYearly ? 'text-white' : 'text-secondary hover:text-primary'}`}>
                                    Yearly
                                </span>
                                <span className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-200 ${isYearly ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-100/50 text-emerald-600/70'}`}>
                                    -20%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* INDIVIDUAL PLANS */}
                <div className="mb-24">
                    <h2 className="text-2xl font-medium text-primary mb-8 text-center">For Individuals</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {INDIVIDUAL_PLANS.map((plan, index) => (
                            <PricingCard
                                key={index}
                                {...plan}
                                price={isYearly && plan.yearlyPrice ? plan.yearlyPrice : (plan.monthlyPrice || plan.price)}
                                billingText={isYearly && plan.yearlyBill ? `Billed ${plan.yearlyBill} yearly` : null}
                                saveBadge={isYearly ? plan.saveBadge : null}
                            />
                        ))}
                    </div>
                </div>

                {/* PROFESSIONAL PLANS */}
                <div>
                    <h2 className="text-2xl font-medium text-primary mb-8 text-center">For Professionals</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {PROFESSIONAL_PLANS.map((plan, index) => (
                            <PricingCard
                                key={index}
                                {...plan}
                                price={isYearly && plan.yearlyPrice ? plan.yearlyPrice : (plan.monthlyPrice || plan.price)}
                                billingText={isYearly && plan.yearlyBill ? `Billed ${plan.yearlyBill} yearly` : null}
                                saveBadge={isYearly ? plan.saveBadge : null}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
