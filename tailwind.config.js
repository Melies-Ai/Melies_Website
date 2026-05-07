import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Color primitives ───────────────────────────────────────────────
      // Semantic tokens (text-strong, surface-page, border-subtle, …) live
      // in the plugin below. These are the raw values designers tweak.
      colors: {
        // Existing — kept for back-compat, do not remove until callers migrate
        ink: 'var(--primary-text)',          // #111111
        paper: 'var(--background)',           // #F0ECE2
        secondary: 'var(--secondary-text)',   // #666666 — kept; deprecated, use text-muted
        accent: '#9D9480',                    // Spark/Fantazia warm brown
        // New primitives (per DESIGN_SYSTEM.md §02)
        'paper-light': '#FAF9F6',
        info: '#2563EB',                      // reassigned cobalt (links, info banners, tech indicators)
      },

      // ─── Typography scale ───────────────────────────────────────────────
      // Semantic sizes per DESIGN_SYSTEM.md §03. Use these instead of
      // arbitrary `text-[10px]`/`text-[9px]`. Existing `text-{xs,sm,…,9xl}`
      // remain available; treat as legacy and migrate over time.
      fontSize: {
        badge:   ['10px', { lineHeight: '1.2' }],
        label:   ['12px', { lineHeight: '1.4' }],
        body:    ['16px', { lineHeight: '1.6' }],
        lead:    ['20px', { lineHeight: '1.5' }],
        h3:      ['24px', { lineHeight: '1.3' }],
        h2:      ['36px', { lineHeight: '1.2' }],
        h1:      ['48px', { lineHeight: '1.1' }],
        hero:    ['96px', { lineHeight: '1' }],
      },

      // ─── Radius ─────────────────────────────────────────────────────────
      borderRadius: {
        card:    '16px',  // alias of rounded-2xl, prefer this name
        'card-lg': '24px', // alias of rounded-3xl
        canvas:  '40px',
      },

      // ─── Shadows ────────────────────────────────────────────────────────
      boxShadow: {
        card:           '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card-hover':   '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lifted:         '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        heavy:          '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inset-canvas': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        retro:          '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'retro-pressed':'2px 2px 0px 0px rgba(0, 0, 0, 1)',
      },

      // ─── Font families ─────────────────────────────────────────────────
      fontFamily: {
        display: ['"IM Fell Great Primer"', 'serif'],
      },

      // ─── Background images ─────────────────────────────────────────────
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    // ─── Semantic tokens (utilities) ──────────────────────────────────────
    // Author code with these names. They support all variants (hover:, md:, …).
    plugin(function ({ addUtilities }) {
      addUtilities({
        // Text — strict 4-tier system (per DESIGN_SYSTEM.md §02)
        '.text-strong':  { color: 'rgb(17 17 17)' },               // 100%
        '.text-default': { color: 'rgb(17 17 17 / 0.8)' },         // 80% — body
        '.text-muted':   { color: 'rgb(17 17 17 / 0.6)' },         // 60% — descriptions
        '.text-faint':   { color: 'rgb(17 17 17 / 0.4)' },         // 40% — disabled, captions

        // Borders on light surfaces
        '.border-subtle':  { borderColor: 'rgb(0 0 0 / 0.05)' },
        '.border-default': { borderColor: 'rgb(0 0 0 / 0.1)' },
        '.border-strong':  { borderColor: 'rgb(0 0 0 / 0.2)' },
        // Borders on glass / dark surfaces
        '.border-glass-subtle':  { borderColor: 'rgb(255 255 255 / 0.1)' },
        '.border-glass-default': { borderColor: 'rgb(255 255 255 / 0.2)' },

        // Surfaces (semantic background aliases)
        '.surface-page':    { backgroundColor: 'var(--background)' },     // = paper
        '.surface-section': { backgroundColor: '#FAF9F6' },                // = paper-light
        '.surface-card':    { backgroundColor: '#FFFFFF' },

        // Composition primitives (recurring decorative patterns)
        '.grid-texture-subtle': {
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        },
        '.grid-texture-medium': {
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        },
        '.glow-accent': {
          background:
            'radial-gradient(closest-side, rgba(157,148,128,0.45), ' +
            'rgba(157,148,128,0.12) 55%, transparent 75%)',
        },
      })
    }),
  ],
}
