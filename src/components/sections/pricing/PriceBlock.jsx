import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatYearlyTotal, YEARLY_SAVINGS_PERCENT } from '../../../config/pricing';

// Whole numbers display without decimals ($199), .99 prices keep them ($15.99).
const formatMoney = (value) =>
    value % 1 === 0 ? `$${value.toLocaleString()}` : `$${value.toFixed(2)}`;

/**
 * PriceBlock — renders the price + period + billing detail line for a plan.
 * Free tier shows "$0 / month — Free forever". Paid tiers animate the price
 * on period change (monthly ↔ yearly) and show the yearly total + savings
 * line, or a "switch to yearly to save" hint on the monthly side.
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

    const price = period === 'yearly' ? plan.yearlyPriceMonthly : plan.monthlyPrice;
    const yearlyTotal = formatYearlyTotal(plan.yearlyPriceMonthly);

    return (
        <div>
            <div className="flex items-baseline gap-1.5">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`${plan.id}-${period}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-5xl font-medium tracking-tight text-strong"
                    >
                        {formatMoney(price)}
                    </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted">/ month</span>
            </div>
            <div className="mt-1 text-sm text-muted min-h-[1.4em]">
                {period === 'yearly' ? (
                    <>
                        ${yearlyTotal.toLocaleString()} billed yearly,{' '}
                        <span className="text-emerald-700 font-medium">save {YEARLY_SAVINGS_PERCENT}%</span>
                    </>
                ) : (
                    <span className="text-faint">
                        Switch to yearly to save {YEARLY_SAVINGS_PERCENT}%
                    </span>
                )}
            </div>
        </div>
    );
};

export default PriceBlock;
