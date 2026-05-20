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

// Colored masters (fade-in on hover)
import exploreSrc from '../assets/images/fantazia_free.webp?w=640&format=webp';
import exploreSrcSet from '../assets/images/fantazia_free.webp?w=320;480;640;800&format=webp&as=srcset';
import creatorSrc from '../assets/images/fantazia_creator.webp?w=640&format=webp';
import creatorSrcSet from '../assets/images/fantazia_creator.webp?w=320;480;640;800&format=webp&as=srcset';
import directorSrc from '../assets/images/fantazia_director.webp?w=640&format=webp';
import directorSrcSet from '../assets/images/fantazia_director.webp?w=320;480;640;800&format=webp&as=srcset';
import studioSrc from '../assets/images/fantazia_studio.webp?w=640&format=webp';
import studioSrcSet from '../assets/images/fantazia_studio.webp?w=320;480;640;800&format=webp&as=srcset';

// Black-and-white storyboards (default state — fade out on hover)
import exploreSketchSrc from '../assets/images/fantazia_free_SB.webp?w=640&format=webp';
import exploreSketchSrcSet from '../assets/images/fantazia_free_SB.webp?w=320;480;640;800&format=webp&as=srcset';
import creatorSketchSrc from '../assets/images/fantazia_creator_SB.webp?w=640&format=webp';
import creatorSketchSrcSet from '../assets/images/fantazia_creator_SB.webp?w=320;480;640;800&format=webp&as=srcset';
import directorSketchSrc from '../assets/images/fantazia_director_SB.webp?w=640&format=webp';
import directorSketchSrcSet from '../assets/images/fantazia_director_SB.webp?w=320;480;640;800&format=webp&as=srcset';
import studioSketchSrc from '../assets/images/fantazia_studio_SB.webp?w=640&format=webp';
import studioSketchSrcSet from '../assets/images/fantazia_studio_SB.webp?w=320;480;640;800&format=webp&as=srcset';

// Map plan id → media descriptor. Plans without an entry render without
// the visual slot (no empty placeholder), so adding/removing visuals is
// a one-line edit here.
//
// Hover-swap fields (active on all four imaged plans):
//   sketchSrc / sketchSrcSet — pencil/storyboard B&W version of the
//   visual, shown by default. When the user hovers the card, the
//   colored `src` fades in over it (300ms opacity transition built
//   into every variant card in src/components/sections/pricing/variants/).
export const PLAN_MEDIA = {
    explore: {
        src: exploreSrc,
        srcSet: exploreSrcSet,
        sketchSrc: exploreSketchSrc,
        sketchSrcSet: exploreSketchSrcSet,
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
        sketchSrc: directorSketchSrc,
        sketchSrcSet: directorSketchSrcSet,
        alt: 'A creative workspace with a monitor running a Fantazia storyboard — directing weekly production.',
    },
    studio: {
        src: studioSrc,
        srcSet: studioSrcSet,
        sketchSrc: studioSketchSrc,
        sketchSrcSet: studioSketchSrcSet,
        alt: 'A film studio with camera, lights and clapperboard — sustained cinematic output.',
    },
};

// `sizes` attribute matches the responsive grid in Pricing.jsx:
//   xl (1280+): 4 cols → ~320px wide
//   md       : 2 cols → ~45vw
//   mobile   : 1 col  → ~92vw
export const PLAN_MEDIA_SIZES =
    '(min-width: 1280px) 320px, (min-width: 768px) 45vw, 92vw';
