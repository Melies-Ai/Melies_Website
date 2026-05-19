# Pricing Card Design Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Spec:** `docs/superpowers/specs/2026-05-19-pricing-card-design-lab-design.md`

**Goal:** Build a dev-time visual A/B/C comparison page at `/pricing/lab` that renders three image-position variants of `PlanCard` side by side, with controls to switch plan and billing period.

**Architecture:** Three standalone variant components in `src/components/sections/pricing/variants/` plus a new `PricingLab` page. To avoid awkward cross-file imports, `PriceBlock` and `MiniBillingToggle` are extracted from their current module-local definitions into their own files first. The lab route is wired into both client (`App.jsx`) and SSR (`entry-server.jsx`) routers, but intentionally NOT added to `scripts/prerender.mjs` ROUTES — the page stays client-only, not indexed.

**Tech Stack:** React 19, Vite 7, React Router 7 (BrowserRouter + StaticRouter), framer-motion (motion components, AnimatePresence, whileHover), Tailwind CSS 3 (semantic tokens: `surface-card`, `text-strong`, `bg-ink`, `border-subtle`, `rounded-3xl`, `shadow-card`, `backdrop-blur-md`).

**Verification model:** This codebase has no unit-test framework — verification is `npx vite build` (catches type/import errors) plus manual visual inspection at `http://localhost:5173/pricing/lab` after each task. No TDD red/green cycles.

---

## File Structure

**New files (created in this plan):**
```
src/components/sections/pricing/PriceBlock.jsx                            Task 1
src/components/sections/pricing/MiniBillingToggle.jsx                     Task 2
src/pages/PricingLab.jsx                                                  Task 3
src/components/sections/pricing/variants/PlanCardBaseline.jsx             Task 4
src/components/sections/pricing/variants/PlanCardBanner.jsx               Task 5
src/components/sections/pricing/variants/PlanCardBannerFrost.jsx          Task 6
```

**Modified files:**
```
src/pages/Pricing.jsx                              Task 1   (import + delete inline PriceBlock)
src/components/sections/pricing/CostCalculator.jsx Task 2   (import + delete inline MiniBillingToggle)
src/App.jsx                                        Task 3   (add /pricing/lab route, lazy)
src/entry-server.jsx                               Task 3   (add /pricing/lab route, sync)
src/pages/PricingLab.jsx                           Tasks 4-8 (incremental builds)
```

**Not touched (by design):**
- `scripts/prerender.mjs` — the lab is client-only, intentionally NOT prerendered or indexed.

---

## Task 1: Extract `PriceBlock` to its own file

**Why first:** All three variants need `PriceBlock`. Re-exporting it from `Pricing.jsx` would create an awkward import (`import { PriceBlock } from '../../../pages/Pricing'`). Extracting first lets the variants import from a clean module path.

**Files:**
- Create: `src/components/sections/pricing/PriceBlock.jsx`
- Modify: `src/pages/Pricing.jsx` (delete inline `formatMoney` + `PriceBlock`, add import)

- [ ] **Step 1: Create `src/components/sections/pricing/PriceBlock.jsx`**

```jsx
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
```

- [ ] **Step 2: Update `src/pages/Pricing.jsx` to import `PriceBlock` and delete the inline copy**

Open `src/pages/Pricing.jsx`. Replace the inline `formatMoney` helper and `PriceBlock` component (currently around lines 72–124, between the `BillingToggle` component and the `PlanCta`-or-comment block) with a single import.

Add this import near the top of the file, in the existing import block:

```jsx
import PriceBlock from '../components/sections/pricing/PriceBlock';
```

Delete these lines from `Pricing.jsx`:
- The `// ─── Price block (price + period + billing line, 2 lines max per brief) ─────` divider comment
- `const formatMoney = (value) => { ... };`
- `const PriceBlock = ({ plan, period }) => { ... };`
- The blank lines around them

After deletion, the surrounding code should jump from `BillingToggle` directly to the next comment divider (`// ─── Plan card ─────` per the post-refactor version). The `PlanCard` already references `<PriceBlock plan={plan} period={period} />` — that JSX stays unchanged, it now resolves to the imported component.

- [ ] **Step 3: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: last line shows `💰 total savings = ...` (no `error` or `✗`).

- [ ] **Step 4: Visual spot-check `/pricing`**

```bash
npx vite dev
```
In a browser, open `http://localhost:5173/pricing`. Verify:
- All 6 plan cards render
- Prices show correctly on both Monthly and Yearly tabs
- Price-change animation (slide+fade) fires when toggling billing
- Free plan still shows `$0 / month — Free forever`

Stop the dev server (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/pricing/PriceBlock.jsx src/pages/Pricing.jsx
git commit -m "Extract PriceBlock from Pricing.jsx into its own module

Pre-work for the pricing-card design lab — the lab variants need to
import PriceBlock without reaching into a page file."
```

---

## Task 2: Extract `MiniBillingToggle` to its own file

**Files:**
- Create: `src/components/sections/pricing/MiniBillingToggle.jsx`
- Modify: `src/components/sections/pricing/CostCalculator.jsx` (delete inline `MiniBillingToggle`, add import)

- [ ] **Step 1: Create `src/components/sections/pricing/MiniBillingToggle.jsx`**

```jsx
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
```

- [ ] **Step 2: Update `src/components/sections/pricing/CostCalculator.jsx` to import + delete inline copy**

Open `src/components/sections/pricing/CostCalculator.jsx`. Add this import near the other relative imports at the top of the file:

```jsx
import MiniBillingToggle from './MiniBillingToggle';
```

Then delete the inline component definition (currently around lines 102–135):
- The `// ─── Mini billing toggle (synced with main page toggle) ─────────────────────` divider comment
- `const MiniBillingToggle = ({ period, onChange }) => ( ... );`
- The blank lines around them

The JSX `<MiniBillingToggle period={period} onChange={handleBillingToggle} />` inside the calculator stays unchanged — it now resolves to the imported component.

- [ ] **Step 3: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: last line shows `💰 total savings = ...`.

- [ ] **Step 4: Visual spot-check the calculator**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing`, scroll to the "Estimate your monthly cost" section. Verify:
- The Monthly/Yearly mini-toggle inside Step 1 still renders with the green `-20%` chip on the Yearly side
- Clicking switches the active button (black background follows)
- The toggle stays in sync with the main page toggle (changing one updates the other)

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/pricing/MiniBillingToggle.jsx src/components/sections/pricing/CostCalculator.jsx
git commit -m "Extract MiniBillingToggle from CostCalculator into its own module

Pre-work for the pricing-card design lab — the lab page reuses this
toggle for its billing-period control."
```

---

## Task 3: Create the lab route + placeholder page

**Why this order:** Wire the route end-to-end first with a minimal page, so navigation to `/pricing/lab` works before we build the variants. Catches routing bugs early.

**Files:**
- Create: `src/pages/PricingLab.jsx` (minimal placeholder)
- Modify: `src/App.jsx` (add lazy route)
- Modify: `src/entry-server.jsx` (add sync route)

- [ ] **Step 1: Create `src/pages/PricingLab.jsx` (minimal placeholder)**

```jsx
import React from 'react';

/**
 * Pricing Card — Design Lab
 *
 * Internal dev-time A/B/C of the PlanCard image position.
 * Spec: docs/superpowers/specs/2026-05-19-pricing-card-design-lab-design.md
 *
 * Not linked from anywhere — accessible only by URL. Client-only:
 * intentionally NOT in scripts/prerender.mjs ROUTES so it's not
 * indexed by search engines.
 */
const PricingLab = () => (
    <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-strong mb-3 leading-[1.1]">
                Pricing Card — Design Lab
            </h1>
            <p className="text-muted text-lg font-light">
                Placeholder. Variants will be added in subsequent tasks.
            </p>
        </div>
    </div>
);

export default PricingLab;
```

- [ ] **Step 2: Add the route to `src/App.jsx`**

Open `src/App.jsx`. Add a lazy import alongside the others (around line 17-19):

```jsx
const PricingLab = lazy(() => import('./pages/PricingLab'));
```

Then add a `<Route>` inside the `<Routes>` block, directly under the `/pricing` route (around line 46-47), before the `/button-lab` redirect:

```jsx
<Route path="/pricing/lab" element={<PricingLab />} />
```

After this edit, the routes block should read (relevant section only):

```jsx
<Route path="/pricing" element={<Pricing />} />
<Route path="/pricing/lab" element={<PricingLab />} />
<Route path="/button-lab" element={<Navigate to="/" replace />} />
```

- [ ] **Step 3: Add the route to `src/entry-server.jsx`**

Open `src/entry-server.jsx`. Add a synchronous import alongside the others (around line 25-27):

```jsx
import PricingLab from './pages/PricingLab.jsx';
```

Then add a `<Route>` inside the `<Routes>` block (around line 39-40), directly under `/pricing`:

```jsx
<Route path="/pricing/lab" element={<PricingLab />} />
```

After this edit, the section reads:

```jsx
<Route path="/pricing" element={<Pricing />} />
<Route path="/pricing/lab" element={<PricingLab />} />
<Route path="/button-lab" element={<Navigate to="/" replace />} />
```

- [ ] **Step 4: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: last line shows `💰 total savings = ...`, and the build output should include a new chunk for `PricingLab` (a `dist/assets/PricingLab-*.js` file).

- [ ] **Step 5: Visual spot-check `/pricing/lab`**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing/lab` in a browser. Verify:
- The page loads (no 404, no white screen)
- Heading "Pricing Card — Design Lab" is visible
- Navbar + Footer render around it (since it's rendered inside `AppShell`)
- No console errors

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/pages/PricingLab.jsx src/App.jsx src/entry-server.jsx
git commit -m "Add /pricing/lab route + placeholder page

Client-only route — intentionally not added to scripts/prerender.mjs
ROUTES so it stays out of the indexed sitemap."
```

---

## Task 4: Build V1 — `PlanCardBaseline` and wire into the lab

**Files:**
- Create: `src/components/sections/pricing/variants/PlanCardBaseline.jsx`
- Modify: `src/pages/PricingLab.jsx` (import + render the variant)

- [ ] **Step 1: Create `src/components/sections/pricing/variants/PlanCardBaseline.jsx`**

This is a standalone copy of the current `PlanCard` from `Pricing.jsx`. The image lives between the `<h3>` title and the `PriceBlock`, in the padded zone — V1 is the control.

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl, FOUNDING_CREATOR_NOTE } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

/**
 * V1 — Baseline. Image sits between title and price, inside the padded
 * zone (`aspect-[16/9]`, `rounded-2xl`). Acts as the control for the
 * design lab. Mirrors the production PlanCard one-to-one as of this commit.
 */
const PlanCardBaseline = ({ plan, period }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source: 'lab_v1_baseline' });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source: 'lab_v1_baseline' });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source: 'lab_v1_baseline' });
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 380, damping: 26 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            className={cn(
                'group relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8',
                'surface-card border border-subtle shadow-card cursor-pointer',
                'transition-[box-shadow,border-color] duration-300',
                'hover:shadow-lifted hover:border-ink/30',
                premium && 'ring-1 ring-accent/15',
            )}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                aria-label={`${plan.tier} — ${plan.cta}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
                <span className="sr-only">{plan.cta}</span>
            </a>

            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 z-20 px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                {plan.tier}
            </h3>

            {media && (
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[16/9] bg-paper">
                    {media.sketchSrc && (
                        <img
                            src={media.sketchSrc}
                            srcSet={media.sketchSrcSet}
                            sizes={PLAN_MEDIA_SIZES}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="360"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                    )}
                    <img
                        src={media.src}
                        srcSet={media.srcSet}
                        sizes={PLAN_MEDIA_SIZES}
                        alt={media.alt}
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="360"
                        className={cn(
                            'w-full h-full object-cover transition-opacity duration-300',
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />
                </div>
            )}

            <div className="mb-6">
                <PriceBlock plan={plan} period={period} />
            </div>

            <div className="space-y-2">
                <span
                    aria-hidden="true"
                    className={cn(
                        'block w-full py-3 px-4 rounded-full text-[15px] font-medium text-center whitespace-nowrap',
                        'border border-ink text-strong transition-all duration-300',
                        'group-hover:bg-ink group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-card',
                    )}
                >
                    {plan.cta}
                </span>
                {plan.ctaHint && (
                    <p className="text-[11px] text-center text-muted">{plan.ctaHint}</p>
                )}
            </div>

            <p
                aria-hidden={plan.free ? 'true' : undefined}
                className={cn(
                    'mt-3 mb-6 text-[10px] font-mono uppercase tracking-widest text-center text-faint',
                    plan.free && 'invisible',
                )}
            >
                {FOUNDING_CREATOR_NOTE}
            </p>

            <p className="text-sm leading-relaxed text-default mb-5">
                {plan.intro}
            </p>

            {plan.inheritsFrom && (
                <p className="text-sm font-medium text-strong mb-3">
                    Everything in {plan.inheritsFrom}, plus:
                </p>
            )}

            <ul className="space-y-3">
                {plan.bullets.map((bullet, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-default"
                    >
                        <Check size={16} className="mt-0.5 shrink-0 text-strong" />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
        </motion.article>
    );
};

export default PlanCardBaseline;
```

- [ ] **Step 2: Render V1 in `src/pages/PricingLab.jsx`**

Replace the placeholder contents of `PricingLab.jsx` with this. We hardcode `plan = Director` and `period = 'yearly'` for now — controls come in Task 7.

```jsx
import React from 'react';
import { PLANS } from '../config/pricing';
import PlanCardBaseline from '../components/sections/pricing/variants/PlanCardBaseline';

/**
 * Pricing Card — Design Lab
 *
 * Internal dev-time A/B/C of the PlanCard image position.
 * Spec: docs/superpowers/specs/2026-05-19-pricing-card-design-lab-design.md
 *
 * Not linked from anywhere — accessible only by URL. Client-only:
 * intentionally NOT in scripts/prerender.mjs ROUTES so it's not
 * indexed by search engines.
 */
const PricingLab = () => {
    const plan = PLANS.find((p) => p.id === 'director');
    const period = 'yearly';

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-strong mb-3 leading-[1.1]">
                        Pricing Card — Design Lab
                    </h1>
                    <p className="text-muted text-lg font-light">
                        Comparing 3 image-position variants. Hypothesis: positionnement de l'image.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V1 — Baseline</div>
                            <div className="text-sm text-muted">Image entre titre et prix</div>
                        </div>
                        <PlanCardBaseline plan={plan} period={period} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingLab;
```

- [ ] **Step 3: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: build succeeds.

- [ ] **Step 4: Visual spot-check V1**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing/lab`. Verify:
- V1 card renders identically to a Director card on `/pricing` (Director image between title and price, $39.99/mo yearly, "Get Director" CTA, bullets list)
- Hover lifts the card and turns the CTA black
- Click anywhere on the card opens app.fantazia.ai in a new tab (or the Stripe link if configured)

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/pricing/variants/PlanCardBaseline.jsx src/pages/PricingLab.jsx
git commit -m "Add V1 baseline variant to design lab

V1 mirrors the production PlanCard one-to-one — image between title
and price, inside the padded zone. Acts as the control for the
image-position comparison."
```

---

## Task 5: Build V2 — `PlanCardBanner` (full-bleed image at top)

**Files:**
- Create: `src/components/sections/pricing/variants/PlanCardBanner.jsx`
- Modify: `src/pages/PricingLab.jsx` (add second column)

- [ ] **Step 1: Create `src/components/sections/pricing/variants/PlanCardBanner.jsx`**

Image moves to the top of the card, edge-to-edge. Title sits below the banner in the padded zone. Card gets `overflow-hidden` so the image clips on the `rounded-3xl` corners.

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl, FOUNDING_CREATOR_NOTE } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

/**
 * V2 — Banner full-bleed. Image moved to the top of the card, edge-to-edge.
 * Title sits in the padded zone below the banner. Mood-led: the image
 * leads the scan, the text follows. Card gets `overflow-hidden` so the
 * banner clips on the rounded-3xl outer corners.
 */
const PlanCardBanner = ({ plan, period }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source: 'lab_v2_banner' });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source: 'lab_v2_banner' });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source: 'lab_v2_banner' });
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 380, damping: 26 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            className={cn(
                'group relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8 overflow-hidden',
                'surface-card border border-subtle shadow-card cursor-pointer',
                'transition-[box-shadow,border-color] duration-300',
                'hover:shadow-lifted hover:border-ink/30',
                premium && 'ring-1 ring-accent/15',
            )}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                aria-label={`${plan.tier} — ${plan.cta}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
                <span className="sr-only">{plan.cta}</span>
            </a>

            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 z-20 px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            {media && (
                <div className="relative -mx-7 lg:-mx-8 -mt-7 lg:-mt-8 mb-6 lg:mb-7 overflow-hidden rounded-t-3xl aspect-[16/9] bg-paper">
                    {media.sketchSrc && (
                        <img
                            src={media.sketchSrc}
                            srcSet={media.sketchSrcSet}
                            sizes={PLAN_MEDIA_SIZES}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="360"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                    )}
                    <img
                        src={media.src}
                        srcSet={media.srcSet}
                        sizes={PLAN_MEDIA_SIZES}
                        alt={media.alt}
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="360"
                        className={cn(
                            'w-full h-full object-cover transition-opacity duration-300',
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />
                </div>
            )}

            <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                {plan.tier}
            </h3>

            <div className="mb-6">
                <PriceBlock plan={plan} period={period} />
            </div>

            <div className="space-y-2">
                <span
                    aria-hidden="true"
                    className={cn(
                        'block w-full py-3 px-4 rounded-full text-[15px] font-medium text-center whitespace-nowrap',
                        'border border-ink text-strong transition-all duration-300',
                        'group-hover:bg-ink group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-card',
                    )}
                >
                    {plan.cta}
                </span>
                {plan.ctaHint && (
                    <p className="text-[11px] text-center text-muted">{plan.ctaHint}</p>
                )}
            </div>

            <p
                aria-hidden={plan.free ? 'true' : undefined}
                className={cn(
                    'mt-3 mb-6 text-[10px] font-mono uppercase tracking-widest text-center text-faint',
                    plan.free && 'invisible',
                )}
            >
                {FOUNDING_CREATOR_NOTE}
            </p>

            <p className="text-sm leading-relaxed text-default mb-5">
                {plan.intro}
            </p>

            {plan.inheritsFrom && (
                <p className="text-sm font-medium text-strong mb-3">
                    Everything in {plan.inheritsFrom}, plus:
                </p>
            )}

            <ul className="space-y-3">
                {plan.bullets.map((bullet, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-default"
                    >
                        <Check size={16} className="mt-0.5 shrink-0 text-strong" />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
        </motion.article>
    );
};

export default PlanCardBanner;
```

- [ ] **Step 2: Add V2 to `src/pages/PricingLab.jsx`**

Update the imports block at the top of `PricingLab.jsx`:

```jsx
import PlanCardBaseline from '../components/sections/pricing/variants/PlanCardBaseline';
import PlanCardBanner from '../components/sections/pricing/variants/PlanCardBanner';
```

Add a second column inside the grid (after the V1 column). The full grid now looks like:

```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    <div>
        <div className="mb-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V1 — Baseline</div>
            <div className="text-sm text-muted">Image entre titre et prix</div>
        </div>
        <PlanCardBaseline plan={plan} period={period} />
    </div>

    <div>
        <div className="mb-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V2 — Banner</div>
            <div className="text-sm text-muted">Image full-bleed en haut, titre dessous</div>
        </div>
        <PlanCardBanner plan={plan} period={period} />
    </div>
</div>
```

- [ ] **Step 3: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: build succeeds.

- [ ] **Step 4: Visual spot-check V2**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing/lab`. Verify:
- Two cards render side-by-side on desktop (stacked on mobile)
- V2's image touches the top + left + right edges of the card (full-bleed), and its top corners follow the card's `rounded-3xl` curve cleanly (no white sliver between image and card edge)
- V2's title "Director" sits below the banner with breathing room (`mt-6 lg:mt-7`)
- Hover lifts both cards identically
- Click on V2 opens the same checkout URL as V1

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/pricing/variants/PlanCardBanner.jsx src/pages/PricingLab.jsx
git commit -m "Add V2 banner variant to design lab

Image moves to the top of the card, edge-to-edge, clipped by the card's
rounded-3xl corners via overflow-hidden. Title sits in the padded zone
below the banner."
```

---

## Task 6: Build V3 — `PlanCardBannerFrost` (banner + frosted floating title)

**Files:**
- Create: `src/components/sections/pricing/variants/PlanCardBannerFrost.jsx`
- Modify: `src/pages/PricingLab.jsx` (add third column)

- [ ] **Step 1: Create `src/components/sections/pricing/variants/PlanCardBannerFrost.jsx`**

Banner full-bleed (taller than V2), with the plan name floating in a glassmorphism pill inside the image. The `<h3>` is removed from the flow below the banner — it lives on the image.

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import { track } from '../../../../lib/analytics';
import { getCheckoutUrl, FOUNDING_CREATOR_NOTE } from '../../../../config/pricing';
import { PLAN_MEDIA, PLAN_MEDIA_SIZES } from '../../../../config/pricing-media';
import PriceBlock from '../PriceBlock';

/**
 * V3 — Banner + frost title. Banner full-bleed (taller than V2,
 * aspect-[4/3] vs 16/9), with the plan name floating at the bottom of
 * the image in a glassmorphism pill. The image and the title merge into
 * a poster-like header.
 */
const PlanCardBannerFrost = ({ plan, period }) => {
    const href = getCheckoutUrl(plan.id, period);
    const premium = !!plan.premium;
    const media = PLAN_MEDIA[plan.id];

    const hoverReportedRef = React.useRef(false);
    const handleMouseEnter = () => {
        if (hoverReportedRef.current) return;
        hoverReportedRef.current = true;
        track('plan_card_hover', { plan_name: plan.id, source: 'lab_v3_banner_frost' });
    };

    const handleCtaClick = () => {
        track('plan_cta_click', { plan_name: plan.id, billing_period: period, source: 'lab_v3_banner_frost' });
        if (!plan.free) {
            track('stripe_checkout_started', { plan_name: plan.id, billing_period: period, source: 'lab_v3_banner_frost' });
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 380, damping: 26 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            className={cn(
                'group relative isolate flex flex-col h-full rounded-3xl p-7 lg:p-8 overflow-hidden',
                'surface-card border border-subtle shadow-card cursor-pointer',
                'transition-[box-shadow,border-color] duration-300',
                'hover:shadow-lifted hover:border-ink/30',
                premium && 'ring-1 ring-accent/15',
            )}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                aria-label={`${plan.tier} — ${plan.cta}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
                <span className="sr-only">{plan.cta}</span>
            </a>

            {premium && plan.premiumLabel && (
                <div className="absolute top-4 right-4 z-20 px-2.5 py-0.5 bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full border border-accent/30">
                    {plan.premiumLabel}
                </div>
            )}

            {media ? (
                <div className="relative -mx-7 lg:-mx-8 -mt-7 lg:-mt-8 mb-6 lg:mb-7 overflow-hidden rounded-t-3xl aspect-[4/3] bg-paper">
                    {media.sketchSrc && (
                        <img
                            src={media.sketchSrc}
                            srcSet={media.sketchSrcSet}
                            sizes={PLAN_MEDIA_SIZES}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="480"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                    )}
                    <img
                        src={media.src}
                        srcSet={media.srcSet}
                        sizes={PLAN_MEDIA_SIZES}
                        alt={media.alt}
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="480"
                        className={cn(
                            'w-full h-full object-cover transition-opacity duration-300',
                            media.sketchSrc && 'opacity-0 group-hover:opacity-100',
                        )}
                    />

                    <h3 className="absolute bottom-4 left-4 inline-block px-4 py-2 rounded-2xl bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg text-strong text-[24px] lg:text-[26px] font-medium tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
                        {plan.tier}
                    </h3>
                </div>
            ) : (
                // No media for this plan — fall back to a normal title to
                // preserve hierarchy. Production and Atelier (which don't
                // have images) take this path.
                <h3 className="text-[28px] lg:text-[30px] font-medium tracking-tight text-strong mb-4 leading-none">
                    {plan.tier}
                </h3>
            )}

            <div className="mb-6">
                <PriceBlock plan={plan} period={period} />
            </div>

            <div className="space-y-2">
                <span
                    aria-hidden="true"
                    className={cn(
                        'block w-full py-3 px-4 rounded-full text-[15px] font-medium text-center whitespace-nowrap',
                        'border border-ink text-strong transition-all duration-300',
                        'group-hover:bg-ink group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-card',
                    )}
                >
                    {plan.cta}
                </span>
                {plan.ctaHint && (
                    <p className="text-[11px] text-center text-muted">{plan.ctaHint}</p>
                )}
            </div>

            <p
                aria-hidden={plan.free ? 'true' : undefined}
                className={cn(
                    'mt-3 mb-6 text-[10px] font-mono uppercase tracking-widest text-center text-faint',
                    plan.free && 'invisible',
                )}
            >
                {FOUNDING_CREATOR_NOTE}
            </p>

            <p className="text-sm leading-relaxed text-default mb-5">
                {plan.intro}
            </p>

            {plan.inheritsFrom && (
                <p className="text-sm font-medium text-strong mb-3">
                    Everything in {plan.inheritsFrom}, plus:
                </p>
            )}

            <ul className="space-y-3">
                {plan.bullets.map((bullet, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-default"
                    >
                        <Check size={16} className="mt-0.5 shrink-0 text-strong" />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
        </motion.article>
    );
};

export default PlanCardBannerFrost;
```

- [ ] **Step 2: Add V3 to `src/pages/PricingLab.jsx`**

Update the imports block:

```jsx
import PlanCardBaseline from '../components/sections/pricing/variants/PlanCardBaseline';
import PlanCardBanner from '../components/sections/pricing/variants/PlanCardBanner';
import PlanCardBannerFrost from '../components/sections/pricing/variants/PlanCardBannerFrost';
```

Add a third column inside the grid:

```jsx
<div>
    <div className="mb-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V3 — Banner + Frost</div>
        <div className="text-sm text-muted">Image full-bleed, titre flottant frost</div>
    </div>
    <PlanCardBannerFrost plan={plan} period={period} />
</div>
```

- [ ] **Step 3: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: build succeeds.

- [ ] **Step 4: Visual spot-check V3**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing/lab`. Verify:
- Three cards render side-by-side on desktop
- V3's banner is visibly taller than V2's (aspect-[4/3] vs 16/9)
- The "Director" pill floats at the bottom-left of V3's image with a frosted/blurred background — the image is visible through the pill
- The pill is readable: dark text on light frosted glass; image should not overwhelm the text
- Hover on V3 lifts the card AND lifts the frost pill slightly (the `group-hover:-translate-y-0.5` on the h3)
- No "Director" heading appears in the padded zone below the V3 banner (the h3 lives on the image)

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/pricing/variants/PlanCardBannerFrost.jsx src/pages/PricingLab.jsx
git commit -m "Add V3 banner+frost variant to design lab

Image full-bleed and taller (aspect-[4/3]). Plan name floats at the
bottom of the image inside a glassmorphism pill (backdrop-blur-md,
bg-white/30, border-white/20). Fallback to a normal h3 when the plan
has no image."
```

---

## Task 7: Add interactive controls (plan selector + billing toggle)

**Files:**
- Modify: `src/pages/PricingLab.jsx`

- [ ] **Step 1: Add state + controls to `PricingLab.jsx`**

Replace the entire contents of `PricingLab.jsx` with this. Adds `useState` for `planId` and `period`, pill-strip plan selector mirroring `MiniBillingToggle`'s pattern (4 imaged plans: explore/creator/director/studio), and reuses `MiniBillingToggle` for the billing switcher. All three variants update in lockstep.

```jsx
import React, { useState } from 'react';
import { PLANS } from '../config/pricing';
import { cn } from '../lib/cn';
import MiniBillingToggle from '../components/sections/pricing/MiniBillingToggle';
import PlanCardBaseline from '../components/sections/pricing/variants/PlanCardBaseline';
import PlanCardBanner from '../components/sections/pricing/variants/PlanCardBanner';
import PlanCardBannerFrost from '../components/sections/pricing/variants/PlanCardBannerFrost';

// The 4 plans that have images in PLAN_MEDIA. Production and Atelier are
// excluded because they're text-only — the lab is specifically about
// image position, so a no-image plan adds noise to the comparison.
const IMAGED_PLAN_IDS = ['explore', 'creator', 'director', 'studio'];

/**
 * Plan selector — pill-strip mirroring MiniBillingToggle's visual pattern.
 * Lab-local (not extracted) because nothing else needs it.
 */
const PlanSelector = ({ planId, onChange }) => (
    <div className="inline-flex items-center gap-1 surface-card border border-subtle rounded-full p-0.5 shadow-card text-xs">
        {IMAGED_PLAN_IDS.map((id) => {
            const plan = PLANS.find((p) => p.id === id);
            const isActive = planId === id;
            return (
                <button
                    key={id}
                    type="button"
                    onClick={() => onChange(id)}
                    className={cn(
                        'relative isolate px-3 py-1 rounded-full font-medium transition-colors',
                        isActive ? 'bg-ink text-white' : 'text-muted hover:text-strong',
                    )}
                >
                    {plan.tier}
                </button>
            );
        })}
    </div>
);

/**
 * Pricing Card — Design Lab
 *
 * Internal dev-time A/B/C of the PlanCard image position.
 * Spec: docs/superpowers/specs/2026-05-19-pricing-card-design-lab-design.md
 *
 * Not linked from anywhere — accessible only by URL. Client-only:
 * intentionally NOT in scripts/prerender.mjs ROUTES so it's not
 * indexed by search engines.
 */
const PricingLab = () => {
    const [planId, setPlanId] = useState('director');
    const [period, setPeriod] = useState('yearly');

    const plan = PLANS.find((p) => p.id === planId);

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 surface-page">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-strong mb-3 leading-[1.1]">
                            Pricing Card — Design Lab
                        </h1>
                        <p className="text-muted text-lg font-light">
                            Comparing 3 image-position variants. Hypothesis: positionnement de l'image.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <PlanSelector planId={planId} onChange={setPlanId} />
                        <MiniBillingToggle period={period} onChange={setPeriod} />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V1 — Baseline</div>
                            <div className="text-sm text-muted">Image entre titre et prix</div>
                        </div>
                        <PlanCardBaseline plan={plan} period={period} />
                    </div>

                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V2 — Banner</div>
                            <div className="text-sm text-muted">Image full-bleed en haut, titre dessous</div>
                        </div>
                        <PlanCardBanner plan={plan} period={period} />
                    </div>

                    <div>
                        <div className="mb-4">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">V3 — Banner + Frost</div>
                            <div className="text-sm text-muted">Image full-bleed, titre flottant frost</div>
                        </div>
                        <PlanCardBannerFrost plan={plan} period={period} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingLab;
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: build succeeds.

- [ ] **Step 3: Visual spot-check controls**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing/lab`. Verify:
- Plan selector pill-strip shows 4 plans (Explore / Creator / Director / Studio), Director active by default
- Billing toggle shows Monthly / Yearly, Yearly active by default
- Clicking a different plan updates ALL THREE variant cards simultaneously (same image, same title, same price, same CTA across V1/V2/V3)
- Clicking the billing toggle updates the price + billing line on all three cards, with the slide+fade animation firing in each
- Switching to "Explore" makes the free plan render with "$0 / month — Free forever" and "Start for free" CTA across all three
- The "Founding Creator" eyebrow line stays invisible on Explore (preserves CTA vertical alignment)

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PricingLab.jsx
git commit -m "Wire interactive controls into the pricing-card design lab

Plan selector (pill-strip, 4 imaged plans) and reused MiniBillingToggle
drive all three variants in lockstep — same plan, same period, side
by side. Lets the designer stress-test each variant across content
density (Explore = 4 bullets, Studio = 7) and billing states."
```

---

## Task 8: Polish — footer notes section

**Files:**
- Modify: `src/pages/PricingLab.jsx`

- [ ] **Step 1: Add the "Notes" section below the grid in `PricingLab.jsx`**

Inside `PricingLab.jsx`, locate the closing `</div>` of the grid (the `<div className="grid grid-cols-1 lg:grid-cols-3 ...">` block). Immediately after that closing `</div>` (still inside `max-w-7xl mx-auto`), add:

```jsx
                <section className="mt-16 max-w-3xl">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-faint mb-3">
                        Notes
                    </h2>
                    {/* TODO: add observations here as you compare the variants.
                        Things to look for:
                          - Premium feel: which variant matches Fantazia's
                            cinematic positioning best?
                          - Hierarchy: does the title still feel anchored
                            when the image leads (V2/V3)?
                          - Frost readability (V3): light vs dark image areas
                            behind the pill — does it always read?
                          - Content density: scroll through Explore (4 bullets)
                            and Studio (7 bullets) — which variant scales best? */}
                    <p className="text-sm text-default leading-relaxed">
                        Hypothesis: positionnement de l'image. Tes 4 images
                        sont aspirationnelles (lifestyle) — V2 et V3 leur
                        donnent plus de présence que V1, mais coûtent de la
                        hiérarchie textuelle. V3 ajoute un pari typographique
                        (titre en glassmorphism). Compare avec Explore et
                        Studio pour voir comment chaque traitement encaisse
                        la densité de contenu.
                    </p>
                </section>
```

- [ ] **Step 2: Verify build passes**

Run:
```bash
npx vite build 2>&1 | tail -5
```
Expected: build succeeds.

- [ ] **Step 3: Final visual pass**

```bash
npx vite dev
```
Open `http://localhost:5173/pricing/lab`. Final checklist:
- Header reads cleanly with title + subtitle + controls on the right (stacked on mobile)
- Three variant cards align cleanly at the top (`items-start` on the grid)
- Each variant has its label + spec one-liner above it
- Notes section sits below the grid with the JSX TODO comment visible in source
- Page background matches `/pricing` (same `surface-page`)
- No console errors or warnings
- Lighthouse Performance score is acceptable (the page is not optimized for prod, but should be reasonable — images are still WebP via `PLAN_MEDIA`)

Cross-checks:
- Open `http://localhost:5173/pricing` — production card unchanged
- Open `http://localhost:5173/` — Navbar still has 5 entries (no link to /pricing/lab)
- View page source on `/pricing/lab` — confirm the route is client-rendered (no prerendered HTML for it)

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PricingLab.jsx
git commit -m "Polish design lab: footer notes section with hypothesis

Adds a Notes section below the variant grid with the hypothesis
restated as a paragraph and a JSX TODO comment block inviting the
designer to capture observations directly in source while iterating."
```

---

## Done — handoff

After Task 8 commits, the lab is live at `/pricing/lab`. The designer can:

1. Visit the URL, see the three variants side by side
2. Switch plans (Explore / Creator / Director / Studio) to stress-test each variant across content density
3. Switch billing period to verify both monthly and yearly render cleanly
4. Hover to test the card-as-button interaction across all three
5. Edit any variant file in `src/components/sections/pricing/variants/` directly to iterate
6. Drop sketch images in `src/assets/images/` and add `sketchSrc` / `sketchSrcSet` fields to `PLAN_MEDIA` — all three variants will pick them up automatically

When a winner is picked, follow the **Exit strategy** in the spec to port the treatment back into the production `PlanCard` and delete the lab.

---

## Self-review (run after writing this plan, then fix anything found)

1. **Spec coverage:**
   - V1/V2/V3 components ✓ (Tasks 4/5/6)
   - Lab route at /pricing/lab ✓ (Task 3)
   - Plan selector + billing toggle ✓ (Task 7)
   - Notes section ✓ (Task 8)
   - PriceBlock + MiniBillingToggle extracted ✓ (Tasks 1/2)
   - Stretched-link, hover lift, sketch swap preserved across all 3 ✓ (in each variant)
   - Not added to prerender.mjs ROUTES ✓ (called out in Task 3 commit message and the plan header)

2. **Placeholder scan:** No "TBD", "TODO" in actual code (the one JSX `{/* TODO: ... */}` is intentional — it's a designer-facing prompt to write observations, per spec). All commands have expected output. All code blocks are complete.

3. **Type/name consistency:**
   - Component prop signatures: all three variants take `{ plan, period }` ✓
   - `PLAN_MEDIA[plan.id]` accessed identically in all three variants ✓
   - Image fields used: `src`, `srcSet`, `alt`, `sketchSrc`, `sketchSrcSet` — match `pricing-media.js` and the spec ✓
   - `PriceBlock` import path consistent (`../PriceBlock` from variants folder) ✓
   - Route path `/pricing/lab` consistent across App.jsx, entry-server.jsx, and the spec ✓
