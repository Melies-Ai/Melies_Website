// Pricing card media — imported via vite-imagetools so the source WebPs
// in /src/assets/images/fantazia_*.webp are sliced into responsive
// variants at build time (~30-80kB WebP per breakpoint, served via srcset).
//
// Source originals are committed as full-resolution WebP (q=90) rather
// than PNG, so the repo stays light without losing visual fidelity.
//
// Add a new plan visual:
//   1. Drop a high-quality WebP in /src/assets/images/ (convert with
//      `cwebp -q 90 -m 6 source.png -o source.webp` if you start from PNG).
//   2. Import it here with the same `?w=...&format=webp` query.
//   3. Add an entry to PLAN_MEDIA keyed by the plan id.

import exploreSrc from '../assets/images/fantazia_free.webp?w=640&format=webp';
import exploreSrcSet from '../assets/images/fantazia_free.webp?w=320;480;640;800&format=webp&as=srcset';
import creatorSrc from '../assets/images/fantazia_creator.webp?w=640&format=webp';
import creatorSrcSet from '../assets/images/fantazia_creator.webp?w=320;480;640;800&format=webp&as=srcset';
import creatorSketchSrc from '../assets/images/fantazia_storyboard_creator.webp?w=640&format=webp';
import creatorSketchSrcSet from '../assets/images/fantazia_storyboard_creator.webp?w=320;480;640;800&format=webp&as=srcset';
import directorSrc from '../assets/images/fantazia_director.webp?w=640&format=webp';
import directorSrcSet from '../assets/images/fantazia_director.webp?w=320;480;640;800&format=webp&as=srcset';
import studioSrc from '../assets/images/fantazia_studio.webp?w=640&format=webp';
import studioSrcSet from '../assets/images/fantazia_studio.webp?w=320;480;640;800&format=webp&as=srcset';

// Map plan id → media descriptor. Plans without an entry render without
// the visual slot (no empty placeholder), so adding/removing visuals is
// a one-line edit here.
//
// Optional hover-swap fields:
//   sketchSrc / sketchSrcSet — pencil or sketch version of the visual,
//   shown by default. When the user hovers the card, the colored `src`
//   fades in over it. Drop the sketch in /src/assets/images/, import it
//   with the same `?w=320;480;640;800&format=webp&as=srcset` pattern,
//   and add the two fields next to `src` / `srcSet` below. If absent,
//   the colored image renders normally without any swap.
export const PLAN_MEDIA = {
    explore: {
        src: exploreSrc,
        srcSet: exploreSrcSet,
        alt: 'A sunlit park picnic with a laptop, notebook and coffee — start your first cinematic concept anywhere.',
    },
    creator: {
        src: creatorSrc,
        srcSet: creatorSrcSet,
        sketchSrc: creatorSketchSrc,
        sketchSrcSet: creatorSketchSrcSet,
        alt: 'A quiet morning by the lake — solo creators producing at their own rhythm.',
    },
    director: {
        src: directorSrc,
        srcSet: directorSrcSet,
        alt: 'A creative workspace with a monitor running a Fantazia storyboard — directing weekly production.',
    },
    studio: {
        src: studioSrc,
        srcSet: studioSrcSet,
        alt: 'A film studio with camera, lights and clapperboard — sustained cinematic output.',
    },
};

// `sizes` attribute matches the responsive grid in Pricing.jsx:
//   xl (1280+): 4 cols → ~320px wide
//   md       : 2 cols → ~45vw
//   mobile   : 1 col  → ~92vw
export const PLAN_MEDIA_SIZES =
    '(min-width: 1280px) 320px, (min-width: 768px) 45vw, 92vw';
