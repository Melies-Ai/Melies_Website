# Spark closer redesign — "One engine. Every format."

- **Date:** 2026-05-29
- **Status:** Approved (design), pending implementation plan
- **Author:** Guillaume + Claude
- **Scope:** Single section. `src/components/sections/spark/UseCases.jsx`
- **Design system:** `DESIGN_SYSTEM.md` (warm editorial, paper/ink/accent, glass + sunken surfaces)

---

## 1. Problem

The Spark page's final content section before the CTA — `UseCases.jsx`, headed **"One engine. Every format."** — is the page's weakest block. It's three **icon-only** cards (Product Demo / Story Ad / Brand Moment): lots of dead space, generic taglines ("Vibes over conversion"), a hover chromatic glow, and **zero imagery** — on a page selling a *visual* video product.

Every other section earns its place: the hero hooks with a live phone feed; Consistency Engine, Bring Your Own Assets, and The Full Experience each *prove* a capability. The closer should land the **payoff** — but instead it lists abstract categories. Guillaume's verdict: *"c'est vide."* He asked to rethink it completely (not just bolt images onto the existing cards).

## 2. Goal / non-goals

**Goal.** Replace the abstract closer with a **proof gallery of real Spark output** — a row of finished vertical stories, each a different *genre*, all visibly held together by the same consistency engine. Stop describing, start showing. Pay off the whole page right before the CTA.

**Non-goals (out of scope for this pass):**
- Consistency Engine improvements (Guillaume likes it; possible separate follow-up).
- Asset Integration mobile animation perf (flagged separately, "pas le sujet").
- Any change to the hero, Full Experience, CTA, or page-level layout.
- New image assets / shoots. Work with what's in `src/assets/images/products/spark/`.

## 3. Key decisions (locked during brainstorm)

| Decision | Choice | Why |
| :--- | :--- | :--- |
| "Every format" meaning | **Genre** (Product / Ad / Brand), not destinations (TikTok/Reels) | Platform brand colors fight the warm palette; logos raise trademark questions and would be the only off-token thing on the page; no platform-chrome assets exist; real genre imagery *does* exist. |
| Card ratio | **9:16 vertical** | Spark *is* vertical. Three portraits read as a mini feed wall — same visual family as the Pricing `PlanCard`, in the product's native ratio. Distinct from the hero's single scrolling phone. |
| Source of the 3 visuals | **Guillaume provides 3 real 9:16 genre outputs**; build now with vertical placeholders, swap later | The square images (`perfume`, `isabelle`, `feed-character`) are *user-input* assets in a permissive format — not finished outputs. The only true vertical outputs in-repo are the 3 consistency scenes (one story, not 3 genres). So real per-genre outputs must be supplied; until then, vertical placeholders keep the layout honest. **Finals are native 9:16 → no crop problem.** |
| "Made for the feed" feeling | Kept via **feed-native chrome** on each card (glass pill, outcome line, `9:16 · 20s` tag) — without platform logos. | Honors the direction Guillaume picked without the off-brand cost. |
| Motion | Hover lift + gentle image zoom only. **No timed/looping animation.** | Page already has two timed demos; Guillaume flagged mobile animation perf. |
| Keep the headline | **"One engine. Every format."** stays. | It's good; the cards were the problem, not the title. |

## 4. Design detail

### 4.1 Section layout

- Component stays `UseCases.jsx`, still rendered from `Spark.jsx` in the same slot (lazy-loaded, before `CTASection`).
- Keep the existing outer rhythm: `max-w-7xl mx-auto px-6 py-32` (matches current).
- **Heading block** (centered, `mb-16 md:mb-20`):
  - Mono eyebrow: `ONE CONSISTENT ENGINE` — `text-label font-mono uppercase tracking-[0.25em] text-muted`.
  - `<h2>` **One engine. Every format.** — `text-4xl md:text-5xl font-medium text-strong` (unchanged from current).
  - One-line subhead — `text-lead text-muted max-w-2xl mx-auto`: *"Whatever you're making, the same engine keeps every frame consistent — and feed-ready."*
- **Cards:**
  - Desktop/tablet: `grid md:grid-cols-3 gap-6 lg:gap-8`, `items-stretch`.
  - Mobile (`< md`): horizontal **scroll-snap carousel** — `flex gap-4 overflow-x-auto snap-x snap-mandatory` with each card `snap-center shrink-0 w-[78%]` and `-mx-6 px-6` bleed so cards peek off-edge (signals swipe). **CSS-only, no JS.** Hide scrollbar.

### 4.2 Card anatomy (echoes `PlanCard`, vertical)

A single article per genre. Not a click target (no checkout) — these are showcase tiles, not CTAs. Structure top→bottom:

- Outer: `relative isolate overflow-hidden rounded-card-lg border border-subtle shadow-card aspect-[9/16] group`, `transition-[box-shadow,transform] duration-500 ease-out`, `hover:shadow-lifted`.
- **Full-bleed image**, `absolute inset-0 w-full h-full object-cover object-center` (finals are native 9:16, so center is enough — see §4.4). `loading="lazy" decoding="async"`. Gentle hover zoom: `scale-100 group-hover:scale-105 transition-transform duration-700 ease-out`.
- **Bottom scrim:** `absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none`.
- **Glass genre pill**, top-left (`absolute top-4 left-4`) — same recipe as `PlanCard`'s tier pill: `inline-block px-3 py-1 rounded-lg bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-lg text-strong text-sm font-medium`. Holds the genre name.
- **Format tag**, top-right (`absolute top-4 right-4`) — feed chrome: `bg-black/40 backdrop-blur-md text-white/90 text-badge font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20`. Text: `9:16 · 20s`.
- **Bottom content** (`absolute inset-x-0 bottom-0 p-5 z-10`, white text, sits over scrim):
  - Outcome line — `text-white text-sm md:text-base font-medium leading-snug` (the consistency-reinforcing copy, §4.3).
  - Genre tag pills row — small mono uppercase pills: `text-badge font-mono uppercase tracking-wide text-white/70 bg-white/10 border border-white/20 rounded-full px-2 py-0.5`. (Reuse the existing per-genre tag arrays.)

> Readability rule: bottom content is white-on-image, so it MUST sit over the dark scrim. This is the inverse of `.scene-frost` (which is bright) — here the image is darkened at the bottom, so white text is correct, unlike inside a sunken-canvas.

### 4.3 Content / copy

Three genres. Every outcome line reinforces **consistency** so the closer pays off the page instead of making new claims.

| Genre (pill) | Final image (Guillaume supplies, 9:16) | Placeholder (in-repo, vertical) | Outcome line | Tags |
| :--- | :--- | :--- | :--- | :--- |
| **Product Demo** | `spark-output-product.webp` | `spark-consistency-scene-02` | "Same bottle, every angle, every frame — hero-lit and consistent." | `ECOM` · `BEAUTY` |
| **Story Ad** | `spark-output-ad.webp` | `spark-consistency-scene-01` | "One face, locked across the whole 20-second hook." | `UGC` · `HOOK` |
| **Brand Moment** | `spark-output-brand.webp` | `spark-location-apartment` | "Aesthetic worlds that hold together, shot to shot." | `LIFESTYLE` · `MOOD` |

Copy is final-draft but may be tuned during implementation/review. Placeholder filenames are suggestions — Guillaume can name the finals anything; only the 3 import lines change.

### 4.4 Assets, placeholders & swap convention

**Asset semantics (clarified by Guillaume).** The square images are *user-input* assets (permissive format), not finished outputs:

| Asset | Dimensions | Role |
| :--- | :--- | :--- |
| `spark-consistency-scene-01/02/03.webp` | 720×1280 (9:16) | Real vertical **output** — but one story / 3 plans, not 3 genres |
| `spark-location-apartment.webp` | 768×1344 (~9:16) | Location input, vertical |
| `spark-product-perfume.webp` | 1024×1024 (1:1) | Product **input** (user asset, permissive ratio) |
| `spark-character-isabelle.webp` | 1024×1024 (1:1) | Character **input** (user asset, permissive ratio) |
| `spark-feed-character.webp` | 960×960 (1:1) | Character input |

**Decision:** Guillaume supplies **3 real 9:16 genre outputs** later. Build now with the in-repo vertical assets as placeholders (§4.3) so the layout is honest and the preview is real. Because finals are native 9:16, **there is no crop problem to solve** — `object-cover` + `object-center` is enough.

**Swap convention (make this effortless):**

1. At the top of `UseCases.jsx`, the three genre images are **three clearly-commented `import` lines** — the only thing Guillaume edits to swap.
2. A `// TODO(swap):` comment block states: drop the final 9:16 files into `src/assets/images/products/spark/` and repoint these 3 imports. Placeholders are the `consistency-scene` / `apartment` files.
3. Build with vite-imagetools query imports for a sensible payload (cards render ~340–420px wide): `?w=720&format=webp`, mirroring `ViralFeedSimulator`'s `?w=480&format=webp`. Provide `width`/`height` attrs to avoid layout shift.
4. `object-cover object-center` on every card — placeholders that happen to be true 9:16 won't crop at all; finals won't either.

### 4.5 Tokens / design-system compliance

- Radii: `rounded-card-lg` (cards), `rounded-full`/`rounded-lg` (pills) — per §05.
- Surfaces: glass pill recipe matches `PlanCard`; no new utilities needed.
- Type: `text-badge` / `text-label` / `text-sm` / `text-lead` / h2 scale — per §03. **No arbitrary `text-[9px]` etc.**
- Color: white-on-scrim for in-image text; `text-strong`/`text-muted` for the heading block. Per-genre chromatic accents from the *old* design are **dropped** (the imagery carries the mood now).
- Transitions: 500–700ms ease-out, per §09 "Fantazia Magic".

## 5. Accessibility

- Each image needs a descriptive `alt` (the genre + what's shown), not empty — these are content, not decoration.
- Carousel: native scroll (keyboard/touch accessible by default). No focus traps.
- Respect `prefers-reduced-motion`: the only motion is hover zoom (no autoplay), so no reduced-motion branch is strictly required, but the hover zoom should be a `transition` (interrupted gracefully), not an `animate` loop.
- Color contrast: white text sits over the `from-black/70` scrim base — verify ≥ 4.5:1 on the brightest images during preview.

## 6. File changes

- **`src/components/sections/spark/UseCases.jsx`** — full rewrite of the card grid + heading block per §4. Replace the `CASES` array (icons/gradients/shadows) with a genre array (image import, pill label, outcome line, tags, `object-position`). Add the mobile scroll-snap wrapper. Remove the now-unused `lucide-react` icon imports and the chromatic gradient/border/shadow classes.
- No changes to `Spark.jsx` (same slot, same lazy import).
- No new assets, no config changes.

## 7. Verification

- `npm run dev`, open `/spark`, scroll to the closer.
- Desktop: 3-up grid, real images, glass pills, scrim + readable white outcome lines, hover lift + zoom feels smooth.
- Mobile (narrow viewport): horizontal swipe carousel snaps; cards peek off-edge.
- Placeholders are true 9:16 (no crop). Confirm the 3 import lines are clearly marked for Guillaume's swap.
- `npm run lint` clean.
- Sanity: section no longer feels "vide" — it reads as proof of output, on-brand with Pricing.
