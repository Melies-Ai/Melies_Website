// Product media — heavy hero assets, with responsive srcsets.
//
// Banners and white lockups used on Home product cards and individual
// product pages. NOT imported by always-mounted UI (Navbar/Footer); doing
// so would hoist these into the main chunk. Vite keeps this module bound
// to the lazy routes that consume it (Home, Fable, Citizen, Oasis), so
// users on /pricing /privacy /terms /spark never download these bytes.
//
// Banners ship as `{ src, srcSet }` so consumers can render
// `<img src={banner.src} srcSet={banner.srcSet} sizes="..." />` and let
// the browser pick the smallest variant that fits the viewport. Mobile
// users save ~100 KB per banner over the original full-size asset.
//
// Smaller nav-friendly assets (marks, Spark spotlight) live in
// `./products-icons.js` instead.

import lockupFable from '../assets/icons/products/fable/fable-lockup-vertical-white.webp';
import lockupCitizen from '../assets/icons/products/citizen/citizen-lockup-vertical-white.webp';
import lockupOasis from '../assets/icons/products/oasis/oasis-lockup-vertical-white.webp';

import bannerFableSrc from '../assets/images/products/fable/fable-hero-banner.webp?w=800&format=webp';
import bannerFableSrcSet from '../assets/images/products/fable/fable-hero-banner.webp?w=480;800;1200;1600&format=webp&as=srcset';
import bannerCitizenSrc from '../assets/images/products/citizen/citizen-hero-banner.webp?w=800&format=webp';
import bannerCitizenSrcSet from '../assets/images/products/citizen/citizen-hero-banner.webp?w=480;800;1200;1600&format=webp&as=srcset';
import bannerOasisSrc from '../assets/images/products/oasis/oasis-hero-banner.webp?w=800&format=webp';
import bannerOasisSrcSet from '../assets/images/products/oasis/oasis-hero-banner.webp?w=480;800;1200;1600&format=webp&as=srcset';

/**
 * @typedef {Object} ResponsiveImage
 * @property {string} src           // single-URL fallback (~800w variant)
 * @property {string} srcSet        // 480w/800w/1200w/1600w variants
 *
 * @typedef {Object} ProductMedia
 * @property {string|null} lockup           // tall white lockup used in coming-soon page heroes
 * @property {ResponsiveImage|null} banner  // wide hero banner with responsive variants
 */

/** @type {Record<string, ProductMedia>} */
export const PRODUCT_MEDIA = {
    spark: { lockup: null, banner: null },
    fable: {
        lockup: lockupFable,
        banner: { src: bannerFableSrc, srcSet: bannerFableSrcSet },
    },
    citizen: {
        lockup: lockupCitizen,
        banner: { src: bannerCitizenSrc, srcSet: bannerCitizenSrcSet },
    },
    oasis: {
        lockup: lockupOasis,
        banner: { src: bannerOasisSrc, srcSet: bannerOasisSrcSet },
    },
};

/**
 * Look up heavy media for a product by id.
 * @param {string} id
 * @returns {ProductMedia|undefined}
 */
export const getProductMedia = (id) => PRODUCT_MEDIA[id];
