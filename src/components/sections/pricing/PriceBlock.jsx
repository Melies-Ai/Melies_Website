import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatYearlyTotal, YEARLY_SAVINGS_PERCENT } from '../../../config/pricing';

// Whole numbers display without decimals ($199), .99 prices keep them ($15.99).
const formatMoney = (value) =>
    value % 1 === 0 ? `$${value.toLocaleString()}` : `$${value.toFixed(2)}`;

/**
 * PriceBlock — renders the price + period + billing detail line for a plan.
 *
 * Four render modes:
 *   1. Free tier             → "$0 / month — Free forever"
 *   2. Monthly + intro promo → strikethrough monthly + "First month -X%" tag,
 *                               big number = discounted first-month price,
 *                               "Then $X / month" below. Activated when the
 *                               plan has `monthlyIntroDiscount` set in
 *                               pricing.js.
 *   3. Yearly                → strikethrough monthly + "Save Y%" tag,
 *                               big number = yearly-effective monthly price,
 *                               "$X billed yearly" below. Mirrors the
 *                               monthly-intro pattern so both tabs read the
 *                               same way (eyebrow = the deal, big number =
 *                               what you pay).
 *   4. Monthly, no intro     → big number = monthly price, "Switch to yearly
 *                               to save Y%" hint below.
 *
 * Shared across the production PlanCard (Pricing.jsx) and the lab variants.
 */
const PriceBlock = ({ plan, period }) => {
    if (plan.free) {
        return (
            <div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-medium tracking-tight text-strong">$0</span>
                    <span className="text-sm text-muted">/ month</span>
                </div>
                <div className="mt-1 text-sm text-muted">Free forever</div>
            </div>
        );
    }

    // Monthly mode with a first-month intro promo (e.g., 50% off).
    if (period === 'monthly' && plan.monthlyIntroDiscount) {
        const monthly = plan.monthlyPrice;
        const introPrice = monthly * (1 - plan.monthlyIntroDiscount);
        const introPercent = Math.round(plan.monthlyIntroDiscount * 100);

        return (
            <div>
                {/* Eyebrow: struck monthly price + promo tag */}
                <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-sm text-muted line-through">{formatMoney(monthly)}</span>
                    <span className="text-xs font-medium text-emerald-700">
                        First month -{introPercent}%
                    </span>
                </div>
                {/* Big number: discounted first-month price */}
                <div className="flex items-baseline gap-1.5">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`${plan.id}-monthly-intro`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="text-5xl font-medium tracking-tight text-strong"
                        >
                            {formatMoney(introPrice)}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-muted">/ month</span>
                </div>
                {/* Transparency line: what the price becomes after month 1 */}
                <div className="mt-1 text-sm text-muted min-h-[1.4em]">
                    Then {formatMoney(monthly)} / month
                </div>
            </div>
        );
    }

    // Yearly mode: eyebrow with strikethrough monthly + 'Save X%' tag,
    // big number = yearly-effective monthly price, sub-line = annual total.
    // Mirrors the monthly-intro pattern above.
    if (period === 'yearly') {
        const monthly = plan.monthlyPrice;
        const yearlyMonthly = plan.yearlyPriceMonthly;
        const yearlyTotal = formatYearlyTotal(yearlyMonthly);

        return (
            <div>
                {/* Eyebrow: struck monthly price + savings tag */}
                <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-sm text-muted line-through">{formatMoney(monthly)}</span>
                    <span className="text-xs font-medium text-emerald-700">
                        Save {YEARLY_SAVINGS_PERCENT}%
                    </span>
                </div>
                {/* Big number: yearly-effective monthly price */}
                <div className="flex items-baseline gap-1.5">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`${plan.id}-yearly`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="text-5xl font-medium tracking-tight text-strong"
                        >
                            {formatMoney(yearlyMonthly)}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-muted">/ month</span>
                </div>
                {/* Sub-line: annual total */}
                <div className="mt-1 text-sm text-muted min-h-[1.4em]">
                    ${yearlyTotal.toLocaleString()} billed yearly
                </div>
            </div>
        );
    }

    // Monthly mode, no intro promo (Production / Atelier).
    return (
        <div>
            <div className="flex items-baseline gap-1.5">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`${plan.id}-monthly`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-5xl font-medium tracking-tight text-strong"
                    >
                        {formatMoney(plan.monthlyPrice)}
                    </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted">/ month</span>
            </div>
            <div className="mt-1 text-sm text-muted min-h-[1.4em]">
                <span className="text-faint">
                    Switch to yearly to save {YEARLY_SAVINGS_PERCENT}%
                </span>
            </div>
        </div>
    );
};

export default PriceBlock;
