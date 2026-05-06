// Product registry — single source of truth for all product metadata.
// Consumers: Navbar (mega-menu), Footer (links), Home (product grid),
// individual product pages (hero, SEO, SystemText, WaitlistCTA).
//
// Adding a product: add an entry below, ensure assets exist under
// `src/assets/icons/products/<id>/` and `src/assets/images/products/<id>/`,
// and the rest follows automatically wherever consumers iterate.

// ─── Asset imports ────────────────────────────────────────────────────────
import iconSpark from '../assets/icons/products/spark/spark-mark.webp';
import iconFable from '../assets/icons/products/fable/fable-mark.webp';
import iconCitizen from '../assets/icons/products/citizen/citizen-mark.webp';
import iconOasis from '../assets/icons/products/oasis/oasis-mark.webp';

import lockupFable from '../assets/icons/products/fable/fable-lockup-vertical-white.webp';
import lockupCitizen from '../assets/icons/products/citizen/citizen-lockup-vertical-white.webp';
import lockupOasis from '../assets/icons/products/oasis/oasis-lockup-vertical-white.webp';

import sparkSpotlight from '../assets/images/products/spark/spark-consistency-scene-01.webp';
import bannerFable from '../assets/images/products/fable/fable-hero-banner.webp';
import bannerCitizen from '../assets/images/products/citizen/citizen-hero-banner.webp';
import bannerOasis from '../assets/images/products/oasis/oasis-hero-banner.webp';

// ─── Registry ─────────────────────────────────────────────────────────────
/**
 * @typedef {Object} ProductWaitlistCTA
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} ProductSEO
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} ProductImages
 * @property {string|null} spotlight  // featured image (Spark in Navbar mega-menu)
 * @property {string|null} banner     // wide hero banner (Home product grid card)
 *
 * @typedef {Object} ProductIcons
 * @property {string} mark            // square brand mark (favicons, nav icons)
 * @property {string=} lockup         // tall white lockup used in coming-soon page heroes
 *
 * @typedef {Object} ProductAccent
 * @property {string|null} tint       // Tailwind color token used for card overlay (e.g. 'blue-900')
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} route
 * @property {'live'|'coming-soon'} status
 * @property {string} releaseLabel
 * @property {string} tagline
 * @property {string} description
 * @property {string} heroTitle
 * @property {string=} heroSubtitle           // poetic one-liner under the page hero (coming-soon only)
 * @property {ProductIcons} icons
 * @property {ProductImages} images
 * @property {ProductAccent} accent
 * @property {ProductSEO} seo
 * @property {string[]=} terminal              // present iff status === 'coming-soon'
 * @property {ProductWaitlistCTA=} waitlistCTA // present iff status === 'coming-soon'
 */

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: 'spark',
    name: 'Spark',
    route: '/spark',
    status: 'live',
    releaseLabel: 'Spark 1.0',
    tagline: 'Vertical Stories',
    description: 'Create 20-sec videos with perfect consistency.',
    heroTitle: 'Vertical Stories.',
    icons: { mark: iconSpark },
    images: { spotlight: sparkSpotlight, banner: null },
    accent: { tint: null }, // Spark has bespoke styling, not a tinted card
    seo: {
      title: 'Spark - Vertical Story Engine',
      description: 'Create perfect vertical videos with consistent characters and worlds. No hallucinations. Start creating today.',
    },
  },
  {
    id: 'fable',
    name: 'Fable',
    route: '/fable',
    status: 'coming-soon',
    releaseLabel: 'Coming 2026',
    tagline: 'AI Director',
    description: 'Weave stories with infinite narrative arcs.',
    heroTitle: 'Weave Stories.',
    heroSubtitle: 'The studio for infinite narrative arcs.',
    icons: { mark: iconFable, lockup: lockupFable },
    images: { spotlight: null, banner: bannerFable },
    accent: { tint: 'blue-900' },
    seo: {
      title: 'Fable - Direct Your Own AI Films',
      description: 'Weave stories with Fable. The studio for infinite narrative arcs. Coming 2026.',
    },
    terminal: [
      '> fable.direct',
      '> cast assembling in costume',
      '> cameras loaded, sets rising',
      '> lights, camera [ACTION]',
    ],
    waitlistCTA: {
      title: 'Direct your masterpiece.',
      description: 'Unlock infinite narrative possibilities with Fable. Join the waitlist for early access.',
    },
  },
  {
    id: 'citizen',
    name: 'Citizen',
    route: '/citizen',
    status: 'coming-soon',
    releaseLabel: 'Coming 2026',
    tagline: 'AI Characters',
    description: 'Living, breathing characters that remember everything.',
    heroTitle: 'Create Life.',
    heroSubtitle: 'Create living, breathing characters.',
    icons: { mark: iconCitizen, lockup: lockupCitizen },
    images: { spotlight: null, banner: bannerCitizen },
    accent: { tint: 'orange-900' },
    seo: {
      title: 'Citizen - Create AI Characters',
      description: 'Create living, breathing characters with Citizen. They remember everything. Coming 2026.',
    },
    terminal: [
      '> citizen.wake',
      '> personality layers emerging',
      '> emotional core forming...',
      '> ready to dream, to choose, to become',
    ],
    waitlistCTA: {
      title: 'Breathe life into AI.',
      description: 'Design complex personas that evolve with every interaction. Join the waitlist.',
    },
  },
  {
    id: 'oasis',
    name: 'Oasis',
    route: '/oasis',
    status: 'coming-soon',
    releaseLabel: 'Coming 2026',
    tagline: 'Living Worlds',
    description: 'Infinite landscapes, physics, and lighting generated instantly.',
    heroTitle: 'Infinite Worlds.',
    heroSubtitle: 'Instant Reality. Infinite landscapes, physics, and lighting generated instantly.',
    icons: { mark: iconOasis, lockup: lockupOasis },
    images: { spotlight: null, banner: bannerOasis },
    accent: { tint: 'teal-900' },
    seo: {
      title: 'Oasis - Infinite Worlds',
      description: 'Instant reality. Infinite landscapes, physics, and lighting generated instantly. Coming 2026.',
    },
    terminal: [
      '> oasis.forge',
      '> spawning civilizations...',
      '> weaving magic into matter',
      '> world pulse detected',
    ],
    waitlistCTA: {
      title: 'Forge your world.',
      description: 'Build immersive environments where your stories can live. Reserve your spot now.',
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Look up a product by id.
 * @param {string} id
 * @returns {Product|undefined}
 */
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

/** Products currently shipping (status === 'live'). */
export const liveProducts = PRODUCTS.filter((p) => p.status === 'live');

/** Products on the roadmap (status === 'coming-soon'). */
export const upcomingProducts = PRODUCTS.filter((p) => p.status === 'coming-soon');
