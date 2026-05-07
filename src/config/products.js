// Product metadata — pure data, no asset imports.
//
// Always-mounted UI (Navbar, Footer) imports from this file safely without
// dragging hero banners and product lockups into the main JS chunk. Pages
// that need imagery import from `./products-media.js` separately so those
// assets stay in the route's lazy chunk.

/**
 * @typedef {Object} ProductWaitlistCTA
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} ProductSEO
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} ProductAccent
 * @property {string|null} tint  // Tailwind color token (e.g. 'blue-900') for card overlays
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
 * @property {string=} heroSubtitle
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
        accent: { tint: null },
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
