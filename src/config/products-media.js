// Product media — heavy hero assets.
//
// Banners and white lockups used on Home product cards and individual
// product pages. NOT imported by always-mounted UI (Navbar/Footer); doing
// so would hoist these into the main chunk. Vite keeps this module bound
// to the lazy routes that consume it (Home, Fable, Citizen, Oasis), so
// users on /pricing /privacy /terms /spark never download these bytes.
//
// Smaller nav-friendly assets (marks, Spark spotlight) live in
// `./products-icons.js` instead.

import lockupFable from '../assets/icons/products/fable/fable-lockup-vertical-white.webp';
import lockupCitizen from '../assets/icons/products/citizen/citizen-lockup-vertical-white.webp';
import lockupOasis from '../assets/icons/products/oasis/oasis-lockup-vertical-white.webp';

import bannerFable from '../assets/images/products/fable/fable-hero-banner.webp';
import bannerCitizen from '../assets/images/products/citizen/citizen-hero-banner.webp';
import bannerOasis from '../assets/images/products/oasis/oasis-hero-banner.webp';

/**
 * @typedef {Object} ProductMedia
 * @property {string|null} lockup   // tall white lockup used in coming-soon page heroes
 * @property {string|null} banner   // wide hero banner (Home product grid card, product page hero)
 */

/** @type {Record<string, ProductMedia>} */
export const PRODUCT_MEDIA = {
    spark: { lockup: null, banner: null },
    fable: { lockup: lockupFable, banner: bannerFable },
    citizen: { lockup: lockupCitizen, banner: bannerCitizen },
    oasis: { lockup: lockupOasis, banner: bannerOasis },
};

/**
 * Look up heavy media for a product by id.
 * @param {string} id
 * @returns {ProductMedia|undefined}
 */
export const getProductMedia = (id) => PRODUCT_MEDIA[id];
