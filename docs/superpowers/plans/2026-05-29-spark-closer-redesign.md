# Spark Closer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Spark page's empty closer (`UseCases.jsx`, "One engine. Every format.") with a 3-up proof gallery of vertical Spark outputs.

**Architecture:** Single presentational React component, fully rewritten. A centered heading block above a responsive card row: CSS-only 3-up grid on `md+`, horizontal scroll-snap swipe-carousel on mobile. Each card is a full-bleed 9:16 image with feed-native chrome (glass genre pill, format tag, bottom scrim + outcome line + tags). Motion is hover-only (framer lift + CSS image zoom) plus a one-shot fade-up entrance — no timed/looping animation. Images are vertical in-repo placeholders wired for a 3-import swap once the real per-genre outputs land.

**Tech Stack:** React 19, framer-motion, Tailwind 3.4 (semantic tokens via plugin — verified in `tailwind.config.js`), vite-imagetools query imports (`?w=720&format=webp`).

**Spec:** `docs/superpowers/specs/2026-05-29-spark-closer-redesign-design.md`

---

## Verification model (read first)

This project has **no test runner** — `package.json` exposes `dev`, `build`, `build:client`, `build:server`, `prerender`, `lint`, `preview`, and nothing else. So "tests" for this presentational change are:

1. `npm run lint` — must be clean (the repo's ESLint config includes `react/no-unescaped-entities`, so apostrophes in JSX must be escaped as `&apos;`).
2. `npm run build:client` — must succeed, which proves the vite-imagetools query imports (`?w=720&format=webp`) resolve.
3. Visual check on `npm run dev` at `/spark` (desktop 3-up + narrow-viewport swipe carousel).

There is no value in inventing a unit test for a layout component here; follow the steps as written.

---

## File structure

| File | Responsibility | Change |
| :--- | :--- | :--- |
| `src/components/sections/spark/UseCases.jsx` | The closer section (heading + card gallery) | **Full rewrite** |
| `src/pages/Spark.jsx` | Renders `<UseCases />` (lazy) in the closer slot | **No change** — keeps the default-export import; component contract is unchanged (no props) |

No new assets, no config changes, no new global CSS. The mobile scrollbar is hidden via Tailwind arbitrary variants inside the component.

---

## Task 1: Rewrite `UseCases.jsx`

**Files:**
- Modify (full rewrite): `src/components/sections/spark/UseCases.jsx`

- [ ] **Step 1: Replace the entire file with the new implementation**

Overwrite `src/components/sections/spark/UseCases.jsx` with exactly this:

```jsx
import React from 'react';
import { motion } from 'framer-motion';

// ─── Genre showcase imagery ──────────────────────────────────────────────────
// TODO(swap): these are vertical PLACEHOLDERS (real in-repo 9:16 assets) so the
// layout is honest until the final per-genre outputs land. To swap: drop the 3
// finished 9:16 .webp files into src/assets/images/products/spark/ and repoint
// the 3 imports below — nothing else changes. The aspect-[9/16] frame +
// object-cover handle sizing/cropping for any vertical image.
import outProduct from '../../../assets/images/products/spark/spark-consistency-scene-02.webp?w=720&format=webp';
import outAd from '../../../assets/images/products/spark/spark-consistency-scene-01.webp?w=720&format=webp';
import outBrand from '../../../assets/images/products/spark/spark-location-apartment.webp?w=720&format=webp';

// One engine, three kinds of vertical story. Every outcome line reinforces the
// page's core promise — consistency — so the closer pays off everything above.
const CASES = [
    {
        genre: 'Product Demo',
        image: outProduct,
        alt: 'Spark vertical output — a product demo story',
        outcome: 'Same product, every angle, every frame — hero-lit and consistent.',
        tags: ['ECOM', 'BEAUTY'],
    },
    {
        genre: 'Story Ad',
        image: outAd,
        alt: 'Spark vertical output — a story-driven ad',
        outcome: 'One face, locked across the whole 20-second hook.',
        tags: ['UGC', 'HOOK'],
    },
    {
        genre: 'Brand Moment',
        image: outBrand,
        alt: 'Spark vertical output — an atmospheric brand moment',
        outcome: 'Aesthetic worlds that hold together, shot to shot.',
        tags: ['LIFESTYLE', 'MOOD'],
    },
];

const UseCases = () => (
    <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Heading block */}
        <div className="text-center mb-16 md:mb-20">
            <p className="text-label font-mono uppercase tracking-[0.25em] text-muted mb-4">
                One consistent engine
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-strong mb-6">
                One engine. Every format.
            </h2>
            <p className="text-lead text-muted max-w-2xl mx-auto">
                Whatever you&apos;re making, the same engine keeps every frame consistent — and feed-ready.
            </p>
        </div>

        {/* Cards: 3-up grid on md+, horizontal swipe-carousel on mobile.
            CSS-only (scroll-snap), no JS. The -mx-6/px-6 bleed lets cards peek
            off the viewport edge on mobile to signal "swipe". */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {CASES.map(({ genre, image, alt, outcome, tags }, i) => (
                <motion.article
                    key={genre}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 380, damping: 26 } }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative isolate shrink-0 w-[78%] sm:w-[58%] md:w-auto snap-center overflow-hidden rounded-card-lg border border-subtle shadow-card bg-paper aspect-[9/16] transition-shadow duration-500 hover:shadow-lifted"
                >
                    {/* Output image — fills the 9:16 frame, gentle zoom on hover */}
                    <img
                        src={image}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        width="720"
                        height="1280"
                        className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Bottom scrim — keeps white text legible over any image */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                    />

                    {/* Genre pill — glass, same recipe as the Pricing PlanCard tier pill */}
                    <span className="absolute top-4 left-4 z-10 inline-block px-3 py-1 rounded-lg bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg text-strong text-sm font-medium">
                        {genre}
                    </span>

                    {/* Format tag — feed chrome */}
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center bg-black/40 backdrop-blur-md text-white/90 text-badge font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                        9:16 · 20s
                    </span>

                    {/* Bottom content — outcome line + genre tags */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                        <p className="text-white text-sm md:text-base font-medium leading-snug mb-3">
                            {outcome}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-badge font-mono uppercase tracking-wide text-white/70 bg-white/10 border border-white/20 rounded-full px-2 py-0.5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    </div>
);

export default UseCases;
```

Notes for the implementer (do not paste into the file):
- The old `lucide-react` imports (`Box, Smartphone, Sparkles`) and the per-genre `gradient/border/shadow` classes are intentionally **gone** — the imagery carries the mood now.
- `&apos;` in "you&apos;re" is required to pass `react/no-unescaped-entities`. Do not change it to a raw apostrophe.
- All class tokens used are real (verified in `tailwind.config.js` + `src/index.css`): `text-label`, `text-lead`, `text-strong`, `text-muted`, `text-badge`, `rounded-card-lg`, `border-subtle`, `shadow-card`, `shadow-lifted`, `bg-paper`, `backdrop-saturate-150`.
- `[&::-webkit-scrollbar]:hidden` / `[scrollbar-width:none]` / `[-ms-overflow-style:none]` are Tailwind JIT arbitrary variants/properties — they hide the mobile carousel scrollbar without touching global CSS.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: clean exit (no errors). If `react/no-unescaped-entities` fires, you used a raw apostrophe — restore `&apos;`.

- [ ] **Step 3: Verify the build resolves the image query imports**

Run: `npm run build:client`
Expected: build succeeds. This confirms vite-imagetools resolved the three `?w=720&format=webp` imports. A failure here usually means a wrong asset path in one of the 3 imports.

- [ ] **Step 4: Visual check — desktop**

Run: `npm run dev`, open `http://localhost:5173/spark`, scroll to the closer ("One engine. Every format.").
Expected:
- 3 vertical cards in a row, each showing a real image.
- Glass genre pill top-left, `9:16 · 20s` tag top-right, white outcome line + tag pills legible over the bottom scrim.
- Hover a card: it lifts slightly and the image zooms gently (smooth, ~0.5–0.7s). No looping/auto animation.

- [ ] **Step 5: Visual check — mobile**

In the browser devtools, switch to a narrow viewport (e.g. 390px wide). Reload `/spark`, scroll to the closer.
Expected:
- Cards become a horizontal row you can swipe; the next card peeks off the right edge.
- Scrolling snaps card-to-card; no visible scrollbar.
- Text remains legible.

If any image's subject is awkwardly cropped, that's a placeholder artifact — it resolves when the real 9:16 outputs are swapped in (Task 2). Do **not** add per-image `object-position` hacks for placeholders.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/spark/UseCases.jsx
git commit -m "$(cat <<'EOF'
Spark: rebuild the closer as a proof gallery of vertical outputs

Replace the empty icon-only "One engine. Every format." cards with a
3-up gallery of 9:16 Spark outputs (genre cards: Product Demo / Story Ad
/ Brand Moment). Feed-native chrome (glass pill, format tag, scrim +
consistency-reinforcing copy), CSS swipe-carousel on mobile, hover-only
motion. Images are vertical placeholders wired for a 3-import swap once
the real per-genre outputs are supplied.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2 (manual, no code by the agent): swap in the real outputs

This is a documented hand-off step for Guillaume, not an agent coding task. When the three final 9:16 genre outputs exist:

- [ ] Drop the 3 finished `.webp` files into `src/assets/images/products/spark/` (any filenames).
- [ ] Repoint the 3 `import` lines at the top of `UseCases.jsx` (the block under `TODO(swap)`).
- [ ] Update each card's `alt` text to describe the real image.
- [ ] Re-run `npm run dev` and confirm the crops look right at 9:16 (they will, since finals are native 9:16).
- [ ] Commit.

No other code changes are needed.

---

## Self-Review

**1. Spec coverage** (against `2026-05-29-spark-closer-redesign-design.md`):

| Spec requirement | Covered by |
| :--- | :--- |
| §4.1 heading: mono eyebrow + h2 + subhead, centered | Task 1 heading block |
| §4.1 desktop 3-up grid | `md:grid md:grid-cols-3` |
| §4.1 mobile scroll-snap carousel, edge bleed, hidden scrollbar | `flex … overflow-x-auto snap-x snap-mandatory … -mx-6 px-6 … [&::-webkit-scrollbar]:hidden` |
| §4.2 card: 9:16, full-bleed image, glass genre pill, format tag, scrim, outcome line, tag pills | Task 1 `motion.article` |
| §4.2 hover lift + image zoom only | framer `whileHover y:-6` + `group-hover:scale-105` |
| §4.3 copy (3 genres, consistency-reinforcing) | `CASES` array (Product "bottle" → "product" generalized per spec's "copy may be tuned") |
| §4.4 placeholders now + 3-import swap convention, native-9:16 finals | `TODO(swap)` block + Task 2 |
| §4.5 tokens, no arbitrary text sizes, chromatic accents dropped | verified token list; no `text-[…]`; no per-genre gradients |
| §5 a11y: descriptive alt, native scroll, reduced-motion | `alt` per card; native overflow scroll; hover zoom is a CSS transition (neutralized by the global `prefers-reduced-motion` rule in `index.css`) |
| §6 file changes: full rewrite, remove lucide + gradients, Spark.jsx untouched | Task 1 + notes |
| §7 verification | "Verification model" + Task 1 steps 2–5 |

No gaps.

**2. Placeholder scan:** No "TBD/TODO-implement-later/handle edge cases" in code steps. The single `TODO(swap)` is an intentional, fully-specified hand-off marker, not a plan gap. The full component code is present.

**3. Type consistency:** `CASES` objects expose `{ genre, image, alt, outcome, tags }`; the `.map` destructures exactly those keys. Image import identifiers `outProduct/outAd/outBrand` match their use in `CASES`. Consistent.
