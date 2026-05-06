# Fantazia Design System

The visual language of Fantazia — derived from what's actually shipped, not aspiration.
Cinematic, tactile, warm-light. Depth, ambient lighting, and editorial typography.

> **How to read this doc**
> - **Primitives** are raw values (`#F0ECE2`, `font-bricolage`).
> - **Semantic tokens** are named roles (`surface-page`, `text-muted`).
> - When in doubt, **use semantic names in code**. Inline hex is a smell.

---

## 01. Foundations

### Naming convention

Components reference **semantic tokens**. Semantic tokens resolve to **primitives**. Primitives resolve to **values**. Designers tweak primitives; everything inherits.

```
component  →  semantic token  →  primitive  →  value
text-muted     text-ink/40       ink (#111111)   #111111
```

Rule of thumb: if you're typing `bg-[#F0ECE2]` or `text-ink/55`, you're skipping the system. Stop and either use a semantic token or add one.

---

## 02. Color

### Primitives

| Name | Value | Notes |
| :--- | :--- | :--- |
| `ink` | `#111111` | Primary dark. Replaces the doc's old `#080808`. |
| `paper` | `#F0ECE2` | Primary warm-beige page background. |
| `paper-light` | `#FAF9F6` | Secondary beige for subtle section breaks. |
| `accent` | `#9D9480` | Warm brown — used for ambient glows, focus, hover lighting. |
| `info` | `#2563EB` | **Reassigned cobalt.** Reserved for links in body copy, info banners, tech-status indicators. Currently zero shipped uses; first applications: Privacy/Terms link styles. |
| `highlight` | Tailwind `rose-500` `#F43F5E` | Emotion / pull-quote / love reactions. |
| `warning` | Tailwind `amber-500` `#F59E0B` | Memory / caution / soft alerts. |
| `success` | Tailwind `emerald-500` `#10B981` | Confirmation / live status. |

### Semantic tokens (the names you write in code)

#### Surfaces

| Token | Resolves to | Used for |
| :--- | :--- | :--- |
| `surface-page` | `paper` | Main `<body>` background. |
| `surface-section` | `paper-light` | Section dividers (use sparingly — most sections stay transparent). |
| `surface-card` | `white` | Floating cards, testimonials, mega-menu items. |
| `surface-glass` | `.glass-panel` utility | Frosted overlays — see §06. |
| `surface-sunken` | `.sunken-canvas` utility | Inset workspace areas — see §06. |

#### Text (strict 4-tier system)

| Token | Resolves to | Use |
| :--- | :--- | :--- |
| `text-strong` | `ink` (100%) | Headings, hero, critical CTA labels. |
| `text-default` | `ink/80` | Body copy, default paragraph text. |
| `text-muted` | `ink/60` | Descriptions, labels, secondary copy. |
| `text-faint` | `ink/40` | Disabled, placeholders, decorative captions. |

> **Strict rule**: any other opacity on `ink` (`/30`, `/50`, `/70`, `/90`) is a violation and should fail lint. The 4 tiers cover every shipped need.

#### Borders

| Token | Resolves to | Use |
| :--- | :--- | :--- |
| `border-subtle` | `black/5` | Card outlines, default dividers. |
| `border-default` | `black/10` | Visible borders, button outlines. |
| `border-strong` | `black/20` | Active/focused states, emphasized separators. |

> Same rule on `black/*` — `/25`, `/40` are violations.

#### Glass borders (light-on-light)

| Token | Resolves to | Use |
| :--- | :--- | :--- |
| `border-glass-subtle` | `white/10` | Glass panel base outline. |
| `border-glass-default` | `white/20` | Glass panel hover/active. |

---

## 03. Typography

### Font families

| Family | Loader | Use |
| :--- | :--- | :--- |
| **Inter** | Google Fonts (300, 400, 500, 600, 700) | Default. Body, UI, headings. |
| **Bricolage Grotesque** | Google Fonts (200–800) | Display only — currently the `fantazia.ai` wordmark. |
| **System mono** | `ui-monospace, SFMono-Regular, Menlo, …` (Tailwind default `font-mono`) | Tech labels, terminal text, badges. |

> **Removed**: Geist Mono and the `.font-mono-tech` utility. Never actually loaded; was falling back to Monaco. Replaced by Tailwind's `font-mono` (system stack).

### Scale (semantic sizes)

The shipped site uses 14 distinct sizes. We canonicalize to 8 semantic tokens:

| Token | Size | Line-height | Use |
| :--- | :--- | :--- | :--- |
| `text-badge` | 10px | 1.2 | Status pills, timestamp labels. |
| `text-label` | 12px | 1.4 | UI labels, helper text, mono captions. |
| `text-body` | 16px | 1.6 | Default paragraph. |
| `text-lead` | 20px | 1.5 | Section intro paragraphs. |
| `text-h3` | 24px | 1.3 | Sub-section titles. |
| `text-h2` | 36px | 1.2 | Section titles. |
| `text-h1` | 48px | 1.1 | Page-level titles. |
| `text-hero` | 96px (mobile: 48px) | 1.0 | Hero — `SPARK.`, `Vertical Stories.` |

> Arbitrary sizes (`text-[9px]`, `text-[10px]`) outside this scale are violations. Use `text-badge` or `text-label`.

### Weight, tracking, leading

- **Default body**: `font-normal` (400).
- **Headings**: `font-medium` (500). Bold (700) reserved for badges, product names in inline contexts.
- **Tracking**:
  - `tracking-tighter` for headings (h1/h2).
  - `tracking-[0.25em]–[0.3em]` for mono uppercase labels (badges, eyebrows).
  - Default for body.
- **Leading**: `leading-relaxed` (1.625) for body; `leading-tight`/`leading-none` for headings.

---

## 04. Spacing & layout

### Section rhythm

| Pattern | Value | Use |
| :--- | :--- | :--- |
| `section-pt` | `pt-24 md:pt-36` | First section after navbar (pages). |
| `section-py` | `py-24 md:py-32` | Standard section vertical padding. |
| `section-mb` | `mb-20 md:mb-32` | Spacing between sibling sections. |

### Card / container padding

| Pattern | Value | Use |
| :--- | :--- | :--- |
| `card-padding` | `p-6 md:p-8` | Standard card. |
| `canvas-padding` | `p-6 md:p-12` | Sunken-canvas (workspace) regions. |

### Gap

`gap-2` (tight) · `gap-4` (default) · `gap-6` (comfortable) · `gap-16` (between hero columns desktop / `gap-6` mobile).

---

## 05. Borders & radii

| Token | Value | Use |
| :--- | :--- | :--- |
| `radius-pill` | `rounded-full` | Buttons, badges, avatars. |
| `radius-card` | `rounded-2xl` (16px) | Standard cards. |
| `radius-card-lg` | `rounded-3xl` (24px) | Larger feature cards. |
| `radius-canvas` | `rounded-[40px]` | Sunken-canvas, hero containers. |
| `radius-phone` | `rounded-[2.5rem] md:rounded-[3.5rem]` | The phone simulator bezel — keep as a one-off. |

> Arbitrary `rounded-[20px]`, `[30px]`, `[3rem]` are violations — pick the nearest token.

---

## 06. Surfaces & utilities

### `.glass-panel`

Frosted, semi-transparent panel for floating UI (testimonial card in hero, navbar, mobile drawer).

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
}
```

### `.sunken-canvas`

Light inset surface for workspaces (Spark consistency engine, asset integration, full experience).

```css
.sunken-canvas {
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 24px;
}
```

> Inside a sunken-canvas: **always use `text-strong` / `text-muted`**, never `text-white`.

### Recurring patterns to extract (planned utilities)

These appear 3+ times inline and should become utilities once we touch their callers:

| Utility | Pattern |
| :--- | :--- |
| `.grid-texture-subtle` | `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px); background-size: 40px 40px;` |
| `.grid-texture-medium` | Same, `32px 32px`. |
| `.glow-accent` | `radial-gradient(closest-side, rgba(157,148,128,0.45), rgba(157,148,128,0.12) 55%, transparent 75%)` — used behind hero illustrations. |
| `.shadow-retro` / `.shadow-retro-pressed` | `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` ↔ `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]` for the retro button variant. |

---

## 07. Shadows

| Token | Value | Use |
| :--- | :--- | :--- |
| `shadow-card` | `shadow-sm` | Resting cards, inputs. |
| `shadow-card-hover` | `shadow-md` | Card hover lift. |
| `shadow-lifted` | `shadow-lg` | Modals, overlays, hero images on light bg. |
| `shadow-heavy` | `shadow-2xl` | Phone simulator, featured cards. |
| `shadow-inset` | `shadow-inner` | Sunken-canvas inset feel. |
| `shadow-retro` / `shadow-retro-pressed` | See §06 utilities | Retro button variant only. |

---

## 08. Components

### Button (5 variants)

| Variant | Background | Text | Border | Shadow | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `primary` | `surface-page` (`paper`) | `text-strong` | `border-2 border-ink` | `shadow-retro` | Hero CTA, retro emphasis. |
| `dark` | `ink` | `white` | none | `shadow-card` | Default action ("Start Creating", nav CTA). |
| `swipe` | `transparent` | `text-strong` | `border-2 border-ink` | none | Hero secondary CTA — fills on hover. |
| `secondary` | `transparent` | `text-strong` | `border border-ink` | none | Tertiary actions. |
| `ghost` | `transparent` | `text-muted` | none | none | Inline links, in-card actions. |

### Card patterns

| Pattern | Surface | Border | Shadow |
| :--- | :--- | :--- | :--- |
| Floating card | `surface-card` (white) | `border-subtle` | `shadow-card` |
| Glass card | `surface-glass` | `border-glass-subtle` | (built-in) |
| Sunken workspace | `surface-sunken` | (built-in) | `shadow-inset` |
| Product card | `ink` background + image overlay | `border-glass-subtle` | `shadow-heavy` |

### Badge / pill

```
rounded-full
bg-{surface-card | surface-glass}
border border-subtle
px-3 py-1
text-badge font-mono uppercase tracking-[0.25em]
text-muted
```

Status variants:
- **Live**: `bg-green-100 text-emerald-700` — kept (semantic `success`).
- **Coming 2026**: default badge with `text-muted`.
- **New / Featured**: `info` or `accent` tint TBD.

### Mono terminal text (`SystemText`)

- Family: system mono (`font-mono`).
- Color: `text-muted` on light, `white/60` on dark.
- Tracking: `tracking-[0.25em]` uppercase.
- Lines start with `> ` per product page.

---

## 09. Principles

### Fantazia Magic

Every interaction should feel magical. Subtle glows (`.glow-accent`), smooth transitions (300–700ms `ease-out`), "alive" hover states.

### Depth & Layering

- **Sunken-canvas** for workspaces and demos.
- **Floating cards** (white + `shadow-card`) for tools and modules.
- **Glass-panel** for over-content overlays (testimonials, navbar).
- Stack via `z-index` consistently: `z-0` (ambient), `z-10` (content), `z-20` (overlays), `z-50` (navbar).

### Cinematic Focus

Guide the eye with lighting and contrast. Use `.glow-accent` behind hero illustrations. Inside dark surfaces, treat them like a movie set: warm rim light, subtle depth-of-field (gradient fades).

### Sober structure

Sections rarely have their own background — the page warmth (`paper`) carries them. When a section needs visual separation, prefer **rhythm** (whitespace, type scale shift) over color. `paper-light` is a fallback, not a default.

---

## 10. Adoption status

This doc was reverse-engineered from the shipped site (May 2026). Tokens listed above match what's actually used at the time of writing. Drift between this doc and the code is **the doc's responsibility to absorb** — re-audit quarterly.

| Area | Status | Next |
| :--- | :--- | :--- |
| Color primitives | Documented | Add to `tailwind.config.js` (phase C). |
| Text tiers (4 strict) | Documented | Add tokens; sweep callers (`text-ink/30`, `/50`, `/70`, `/90`). |
| Border tiers | Documented | Add tokens; sweep callers. |
| Spacing rhythm | Documented | Codify as Tailwind plugin or kept manual. |
| `.grid-texture-*`, `.glow-accent` | Spec'd | Extract from inline `style={{ … }}`. |
| Cobalt → `info` | Reassigned | Apply on first qualifying use case. |
| Geist Mono | **Removed** | `.font-mono-tech` utility deletable. |
