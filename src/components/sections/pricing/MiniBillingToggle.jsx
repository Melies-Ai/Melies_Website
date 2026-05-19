import React from 'react';
import { cn } from '../../../lib/cn';
import { YEARLY_SAVINGS_PERCENT } from '../../../config/pricing';

/**
 * MiniBillingToggle — compact monthly/yearly switcher used in the
 * Cost Calculator and the pricing-card design lab. Visually mirrors
 * the main BillingToggle on /pricing but at a smaller size, with a
 * green savings chip on the Yearly button.
 *
 * Controlled component. `period` is `'monthly' | 'yearly'`; `onChange`
 * is called with the new period when the user clicks the inactive side.
 */
const MiniBillingToggle = ({ period, onChange }) => (
    <div className="inline-flex items-center gap-1 surface-card border border-subtle rounded-full p-0.5 shadow-card text-xs">
        <button
            type="button"
            onClick={() => onChange('monthly')}
            className={cn(
                'relative isolate px-3 py-1 rounded-full font-medium transition-colors',
                period === 'monthly' ? 'bg-ink text-white' : 'text-muted hover:text-strong',
            )}
        >
            Monthly
        </button>
        <button
            type="button"
            onClick={() => onChange('yearly')}
            className={cn(
                'relative isolate px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1.5',
                period === 'yearly' ? 'bg-ink text-white' : 'text-muted hover:text-strong',
            )}
        >
            Yearly
            <span
                className={cn(
                    'text-[9px] font-bold px-1 rounded-full',
                    period === 'yearly' ? 'bg-emerald-300/90 text-emerald-900' : 'bg-emerald-100 text-emerald-700',
                )}
            >
                -{YEARLY_SAVINGS_PERCENT}%
            </span>
        </button>
    </div>
);

export default MiniBillingToggle;
