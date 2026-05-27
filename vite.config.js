import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    // Emit .map files alongside bundles. Lighthouse uses these to flag
    // unused code accurately, Sentry/error trackers to symbolicate stack
    // traces, and devs to debug minified prod code. Adds ~1MB to dist/
    // but maps are loaded only on demand (devtools opens them).
    sourcemap: true,
  },
  plugins: [
    react(),
    // Generate responsive variants on demand. Use via query string:
    //   import banner from './banner.webp?w=480;800;1200;1600&format=webp&as=srcset'
    // Returns a srcset string ready for <img srcSet={...}>.
    imagetools(),
    // Recompresses imported images at build time. WebP we ship is already
    // tight, but this re-runs sharp/svgo with conservative settings so any
    // future asset added to /src/assets is auto-optimized without manual
    // tooling. SVG goes through SVGO with safe defaults.
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80, effort: 6 },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
            },
          },
          'sortAttrs',
          { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
        ],
      },
    }),
  ],
})
