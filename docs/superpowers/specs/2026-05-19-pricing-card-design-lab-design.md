# Pricing Card — Design Lab

**Date:** 2026-05-19
**Status:** Approved — ready to implement
**Owner:** guillaume3301@proton.me
**Scope:** dev-side visual A/B/C of the `PlanCard` image position; no production traffic split

---

## Context

The `/pricing` page renders 6 plans. Each `PlanCard` currently sits in a single layout — image between the `<h3>` title and the `PriceBlock`, in the padded inner zone of the card. Four of the six plans (Explore, Creator, Director, Studio) have aspirational lifestyle images mapped via `PLAN_MEDIA`.

The image position was chosen quickly when the visuals were added; we've never compared alternatives. With the images being explicitly mood-setting (picnic, lake, workspace, studio), the current "thumbnail between text rows" treatment may not give them the visual presence they warrant.

## Hypothesis

**"Le positionnement de l'image change le caractère perçu de la carte. Sortir l'image de la zone paddée et la placer en banner full-bleed donne plus de présence à la promesse aspirationnelle, sans casser la lisibilité du contenu transactionnel (prix, CTA, features)."**

We want to validate (visually, in a dev-time side-by-side) which of three image-position treatments best serves the brand promise without hurting comprehension.

## Success criteria

This is an *internal design test*, not a quantitative A/B. Success = the designer (project owner) can compare the three variants side by side, in realistic content + style conditions, and pick a winner with confidence. Concretely:

1. The three variants render on a single page, in a 3-column grid on desktop, with the same plan/period/billing inputs.
2. Switching the plan (Explore/Creator/Director/Studio) updates all three variants in lockstep, so volume of content (bullets, intro length) can be stress-tested across treatments.
3. Switching the billing period (monthly/yearly) updates all three.
4. The hover behaviors (stretched link, lift, CTA color swap) work identically on all three.
5. The sketch → color hover swap (when `PLAN_MEDIA[id].sketchSrc` is populated) works identically on all three.

## Variants

### V1 — Baseline (`PlanCardBaseline.jsx`)

Exact copy of the current `PlanCard` from `src/pages/Pricing.jsx`, extracted to a standalone file for isolation. Acts as control.

- Image lives between `<h3>` and `<PriceBlock>`
- Image wrapper: `relative mb-5 overflow-hidden rounded-2xl aspect-[16/9] bg-paper`
- Image sits in the padded zone (`p-7 lg:p-8` on the card)
- No layout change vs. production

### V2 — Banner full-bleed (`PlanCardBanner.jsx`)

Image moved to the top of the card, edge-to-edge.

- Card gains `overflow-hidden` so the image clips on the `rounded-3xl` outer corners
- Image wrapper escapes the card's padding via negative margins: `-mx-7 lg:-mx-8 -mt-7 lg:-mt-8`
- Image wrapper: `relative overflow-hidden rounded-t-3xl aspect-[16/9] bg-paper`
- `<h3>Director</h3>` is below the banner with `mt-6 lg:mt-7` to breathe
- Sequence under the title: `<PriceBlock>` → CTA span → founding note → intro → inherits line → bullets (same as today, minus the inline image slot)
- The image is part of the stretched-link click target (no special handling needed; the stretched `<a>` covers the whole article)

### V3 — Banner + frost titre (`PlanCardBannerFrost.jsx`)

Banner full-bleed, taller, with the plan name floating on the image inside a glassmorphism pill.

- Same full-bleed mechanics as V2 (`-mx`, `-mt`, `rounded-t-3xl`, `overflow-hidden` on the card)
- Image wrapper: `relative overflow-hidden rounded-t-3xl aspect-[4/3] bg-paper` (taller than V2 to give the title room)
- `<h3>` is positioned `absolute bottom-4 left-4` inside the image wrapper
- Frost pill styling on the `<h3>`:
  ```
  inline-block px-4 py-2 rounded-2xl
  bg-white/30 backdrop-blur-md backdrop-saturate-150
  border border-white/20 shadow-lg
  text-strong text-[24px] lg:text-[26px] font-medium tracking-tight
  ```
- No separate `<h3>` in the flow under the banner — the title lives on the image
- Sequence under the banner: `<PriceBlock>` → CTA span → founding note → intro → inherits line → bullets
- Optional delight: a subtle `transition-transform group-hover:-translate-y-0.5` on the frost pill so it lifts slightly with the card on hover

### Sketch → color hover (cross-variant)

All three variants render images via the same `PLAN_MEDIA[plan.id]` descriptor. When `media.sketchSrc` is provided, the sketch layer sits absolute under the colored layer with `group-hover:opacity-0` on the sketch and `group-hover:opacity-100` on the colored. The mechanic is identical across V1/V2/V3 — the sketch swap is orthogonal to image position.

### Constants across all three variants

To keep the comparison fair, these stay identical:

- Card outer shell: `rounded-3xl p-7 lg:p-8`, `surface-card border border-subtle shadow-card`
- Card-as-button stretched link (`absolute inset-0 z-10`)
- Hover lift: `whileHover={{ y: -10, transition: { type: 'spring', stiffness: 380, damping: 26 } }}`
- Hover styling: `hover:shadow-lifted hover:border-ink/30`
- CTA visual span (no nested `<a>`), with `group-hover:bg-ink group-hover:text-white`
- Founding note, intro, inherits line, bullets — same content, same styling
- PriceBlock — same component imported

## Lab page UX

**Route:** `/pricing/lab`

**Header (top of page, inside `max-w-7xl mx-auto`):**
- `<h1>Pricing Card — Design Lab</h1>` (same h1 styling as `/pricing`)
- Subtitle: "Comparing 3 image-position variants. Hypothesis: positionnement de l'image."
- Right-aligned controls row:
  - **Plan selector** — pill-strip switching between the 4 imaged plans (Explore / Creator / Director / Studio). Default: Director. Reuses the visual pattern of `MiniBillingToggle` (rounded-full container, `bg-ink text-white` for active, `text-muted` for inactive). Implemented inline in `PricingLab.jsx`; no need to extract into a shared component.
  - **Billing toggle** — reuses the existing `MiniBillingToggle` (extracted to its own file per the Files section below). Default: yearly (matches Pricing.jsx default).

**Grid:**
- `grid grid-cols-1 lg:grid-cols-3 gap-8 items-start`
- Each cell:
  - `<h3>` label: "V1 — Baseline" / "V2 — Banner" / "V3 — Banner + Frost" (small uppercase font-mono eyebrow style)
  - One-liner spec under the label
  - The variant card itself

**Footer:**
- A "Notes" section below the grid: a small heading, the hypothesis quoted as a `<p>`, and a `{/* TODO: add observations here */}` JSX comment block above it inviting the designer to write observations directly in the source file (`PricingLab.jsx`). No persisted state, no DB — observations live in code.

**Page surface:**
- `surface-page` background, same as `/pricing`, so the cards land on the same color and the comparison is realistic.

**Discoverability:**
- The route is **not linked** from header, footer, or any other page.
- Accessible only by typing `/pricing/lab` in the URL bar.
- No `import.meta.env.DEV` gating — ships to production. The URL is obscure; leaving it accessible is useful for sharing with collaborators / clients for a quick visual review.

## Files & routing

**New files:**
```
src/pages/PricingLab.jsx                                                  ← lab page
src/components/sections/pricing/variants/PlanCardBaseline.jsx             ← V1
src/components/sections/pricing/variants/PlanCardBanner.jsx               ← V2
src/components/sections/pricing/variants/PlanCardBannerFrost.jsx          ← V3
src/components/sections/pricing/PriceBlock.jsx                            ← extracted from Pricing.jsx
src/components/sections/pricing/MiniBillingToggle.jsx                     ← extracted from CostCalculator.jsx
```

**Modified files:**
```
src/pages/Pricing.jsx                — import PriceBlock from its new file; delete the inline component
src/components/sections/pricing/CostCalculator.jsx  — import MiniBillingToggle from its new file; delete the inline component
src/App.jsx                          — add <Route path="/pricing/lab" element={<PricingLab />} />
src/entry-server.jsx                 — add the same route (server-rendered routes must mirror client)
```

**Why extract `PriceBlock` and `MiniBillingToggle`:** both are currently defined as module-local components inside larger files. Importing them across the 3 variant files + the lab page would require either re-exporting from page/component files (awkward import paths) or duplicating them (drift risk). Extracting each to its own file in `src/components/sections/pricing/` is the cleaner move, and the extracted files remain useful regardless of which variant wins.

**Shared imports (already in their own modules — no extraction needed):**
- `cn` from `src/lib/cn`
- `track` from `src/lib/analytics`
- `getCheckoutUrl`, `FOUNDING_CREATOR_NOTE`, `PLANS`, `YEARLY_SAVINGS_PERCENT`, `formatYearlyTotal` from `src/config/pricing`
- `PLAN_MEDIA`, `PLAN_MEDIA_SIZES` from `src/config/pricing-media`

**Routing note:** the project has two route files (`App.jsx` for client, `entry-server.jsx` for SSR). Both must be updated for the route to work in dev AND in any future SSR build. The existing `/button-lab` redirect in both files confirms a previous lab page existed at this codebase — same precedent applies here.

## Exit strategy

Once a winner is picked:

1. Port the winning treatment into `src/pages/Pricing.jsx` → `PlanCard`
2. Delete `src/components/sections/pricing/variants/` (3 files)
3. Delete `src/pages/PricingLab.jsx`
4. Remove the `/pricing/lab` route from `src/App.jsx` AND `src/entry-server.jsx`
5. Keep `src/components/sections/pricing/PriceBlock.jsx` and `MiniBillingToggle.jsx` extracted (they're cleaner that way regardless of the lab outcome — Pricing.jsx and CostCalculator.jsx already use them by then).
6. Commit: `Adopt V[winner] for plan card image position; remove design lab`

The tree returns to its current shape minus three files and one route, plus the chosen treatment and two well-extracted shared components.

## Out of scope (explicit non-goals)

- **No production traffic split / no real A/B.** This is dev-time visual comparison only. A production A/B would require a feature-flag library (PostHog, GrowthBook) and statistical significance tracking — not in this spec.
- **No new analytics events.** The `track()` calls on hover and CTA click stay as-is; the lab page is for design judgment, not metrics.
- **No new design tokens or Tailwind config changes.** All variants use existing tokens (`surface-card`, `text-strong`, `bg-ink`, `border-subtle`, `rounded-2xl/3xl`, `shadow-card/lifted`, etc.). The frost effect uses Tailwind's built-in `backdrop-blur-md` and `backdrop-saturate-150` utilities — no plugin needed.
- **No sketch images.** The slot for `sketchSrc`/`sketchSrcSet` already exists in `PLAN_MEDIA`; this spec does not introduce sketches. They can be dropped in later and all three variants will pick them up automatically.
- **No accessibility regression.** Keyboard nav, focus rings, aria-labels — all preserved from the current `PlanCard` implementation across the three variants.

## Open questions

None as of approval. Any tweaks during implementation (exact frost pill colors against the actual image, exact banner height in V2, exact size of plan-selector pills) are micro-decisions that the implementer will resolve and surface for review if non-trivial.
