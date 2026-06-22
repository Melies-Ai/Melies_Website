// Product icons — small, navbar-friendly assets.
//
// All marks are vector (SVG) — crisp at any display size, no retina
// variants needed.
// Heavier media (banners, lockups) lives in `./products-media.js`.

import iconSpark from '../assets/icons/products/spark/spark-mark.svg';
import iconFable from '../assets/icons/products/fable/fable-mark.svg';
import iconCitizen from '../assets/icons/products/citizen/citizen-mark.svg';
import iconOasis from '../assets/icons/products/oasis/oasis-mark.svg';

// Spotlight: navbar dropdown thumbnail (~48x64 display). 256w covers
// 2x retina with much less weight than the 608x1298 source.
import sparkSpotlight from '../assets/images/products/spark/spark-consistency-scene-01.webp?w=256&format=webp';

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
