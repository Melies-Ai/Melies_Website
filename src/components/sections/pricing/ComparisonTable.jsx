import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { track } from '../../../lib/analytics';
import { COMPARISON_COLUMNS, COMPARISON_TABS } from '../../../config/pricing-comparison';
import { isPlanActive } from '../../../config/pricing';

// COMPARISON_COLUMNS lists ALL 6 plans in a fixed order. We hide columns
// for plans flagged `enabled: false` in PLANS, but keep each column's
// ORIGINAL index so we can pull the matching value out of every row's
// `values` array (rows still carry 6 values, one per original plan).
const visibleColumns = COMPARISON_COLUMNS
    .map((col, idx) => ({ ...col, originalIndex: idx }))
    .filter((col) => isPlanActive(col.id));

// Render a single cell value (boolean → icon, string → text).
const Cell = ({ value }) => {
    if (value === true) return <Check size={18} className="text-strong inline" aria-label="Yes" />;
    if (value === false) return <Minus size={18} className="text-faint inline" aria-label="No" />;
    return <span className="text-default">{value}</span>;
};

// ─── Desktop: tab strip + full table ────────────────────────────────────────

const TabStrip = ({ activeTabId, onChange }) => (
    <div
        role="tablist"
        className="inline-flex flex-wrap items-center gap-1 surface-card border border-subtle rounded-full p-1 shadow-card"
    >
        {COMPARISON_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
                <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        'relative isolate px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        isActive ? 'text-white' : 'text-muted hover:text-strong'
                    )}
                >
                    {isActive && (
                        <motion.span
                            layoutId="comparison-tab-bg"
                            className="absolute inset-0 bg-ink rounded-full -z-10"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            );
        })}
    </div>
);

const TableForTab = ({ tab }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto"
        >
            <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10 surface-page">
                    <tr>
                        <th className="text-left text-[11px] font-mono uppercase tracking-widest text-faint font-medium py-4 pr-4">
                            {tab.label}
                        </th>
                        {visibleColumns.map((col) => (
                            <th
                                key={col.id}
                                className="text-left text-sm font-medium text-strong py-4 px-3 min-w-[8.5rem]"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tab.rows.map((row, i) => (
                        <tr key={i} className={cn('border-t border-subtle', i % 2 === 1 && 'bg-paper/40')}>
                            <th
                                scope="row"
                                className="text-left text-sm font-normal text-muted py-4 pr-4 align-middle"
                            >
                                {row.label}
                            </th>
                            {visibleColumns.map((col) => (
                                <td key={col.id} className="py-4 px-3 align-middle">
                                    <Cell value={row.values[col.originalIndex]} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    </AnimatePresence>
);

// ─── Mobile: accordion by tab category ──────────────────────────────────────

const MobileCategory = ({ tab, isOpen, onToggle }) => (
    <div className="border-b border-subtle">
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full flex items-center justify-between py-4 text-left"
        >
            <span className="text-base font-medium text-strong">{tab.label}</span>
            <ChevronDown
                size={20}
                className={cn(
                    'text-muted transition-transform duration-200 shrink-0',
                    isOpen && 'rotate-180'
                )}
            />
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className="pb-6 space-y-5">
                        {tab.rows.map((row, i) => (
                            <div key={i}>
                                <div className="text-xs font-medium text-muted mb-2">{row.label}</div>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                                    {visibleColumns.map((col) => (
                                        <div key={col.id} className="flex items-baseline gap-2">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-faint w-16 shrink-0">
                                                {col.label}
                                            </span>
                                            <span>
                                                <Cell value={row.values[col.originalIndex]} />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// ─── Main ───────────────────────────────────────────────────────────────────

const ComparisonTable = () => {
    const [activeTabId, setActiveTabId] = useState(COMPARISON_TABS[0].id);
    const [openCategoryId, setOpenCategoryId] = useState(COMPARISON_TABS[0].id);

    const activeTab = COMPARISON_TABS.find((t) => t.id === activeTabId) ?? COMPARISON_TABS[0];

    const handleTabChange = (nextId) => {
        if (nextId === activeTabId) return;
        track('comparison_tab_switch', { tab_name: nextId });
        setActiveTabId(nextId);
    };

    return (
        <section className="mt-24 mb-16">
            <header className="mb-8 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-strong mb-3">
                    Compare every plan, side by side.
                </h2>
                <p className="text-muted text-lg font-light">
                    The same details you'd see in your account, organized by what matters most.
                </p>
            </header>

            {/* Desktop view: tabs + table */}
            <div className="hidden md:block">
                <div className="mb-6">
                    <TabStrip activeTabId={activeTabId} onChange={handleTabChange} />
                </div>
                <TableForTab tab={activeTab} />
            </div>

            {/* Mobile view: accordion by category */}
            <div className="md:hidden">
                {COMPARISON_TABS.map((tab) => (
                    <MobileCategory
                        key={tab.id}
                        tab={tab}
                        isOpen={openCategoryId === tab.id}
                        onToggle={() => setOpenCategoryId((cur) => (cur === tab.id ? null : tab.id))}
                    />
                ))}
            </div>
        </section>
    );
};

export default ComparisonTable;
