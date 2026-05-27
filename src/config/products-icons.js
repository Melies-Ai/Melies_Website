// Product icons — small, navbar-friendly assets.
//
// `?w=96` asks vite-imagetools to emit a 96px-wide variant (instead of
// the 200-275px sources), which is plenty for the 24-32px display sizes
// (2x retina headroom). Cuts each mark from ~8-11kB down to ~2-3kB.
// Heavier media (banners, lockups) lives in `./products-media.js`.

import iconSpark from '../assets/icons/products/spark/spark-mark.webp?w=96&format=webp';
import iconFable from '../assets/icons/products/fable/fable-mark.webp?w=96&format=webp';
import iconCitizen from '../assets/icons/products/citizen/citizen-mark.webp?w=96&format=webp';
import iconOasis from '../assets/icons/products/oasis/oasis-mark.webp?w=96&format=webp';

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
