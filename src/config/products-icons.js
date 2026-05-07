// Product icons — small, navbar-friendly assets.
//
// These are imported by always-mounted UI (Navbar) and consumed by Home
// product cards. Total weight ~50 KB across all four products, so they
// are safe to ship in the main JS chunk. Heavier media (banners, lockups)
// lives in `./products-media.js` which is page-only.

import iconSpark from '../assets/icons/products/spark/spark-mark.webp';
import iconFable from '../assets/icons/products/fable/fable-mark.webp';
import iconCitizen from '../assets/icons/products/citizen/citizen-mark.webp';
import iconOasis from '../assets/icons/products/oasis/oasis-mark.webp';

import sparkSpotlight from '../assets/images/products/spark/spark-consistency-scene-01.webp';

/**
 * @typedef {Object} ProductIcons
 * @property {string} mark             // square brand mark
 * @property {string|null} spotlight   // featured image (only Spark, used in nav mega-menu)
 */

/** @type {Record<string, ProductIcons>} */
export const PRODUCT_ICONS = {
    spark: { mark: iconSpark, spotlight: sparkSpotlight },
    fable: { mark: iconFable, spotlight: null },
    citizen: { mark: iconCitizen, spotlight: null },
    oasis: { mark: iconOasis, spotlight: null },
};

/**
 * Look up icons for a product by id.
 * @param {string} id
 * @returns {ProductIcons|undefined}
 */
export const getProductIcons = (id) => PRODUCT_ICONS[id];
