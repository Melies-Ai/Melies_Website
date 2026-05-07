// JSON-LD Product schema builder.
//
// Generates schema.org/Product structured data for a given product, used
// by the SEO component to inject ld+json into the page head. Centralizing
// this here avoids drift across product pages and keeps the schema in
// sync with the product registry.

import { getProduct } from './products';
import { getProductMedia } from './products-media';

const SITE_URL = 'https://fantazia.ai';

/**
 * Build a schema.org/Product JSON-LD object for a registered product.
 * Returns null if the id isn't found in the registry.
 *
 * @param {string} id  product id (e.g. 'spark', 'fable')
 * @returns {Object|null}
 */
export const productSchema = (id) => {
    const product = getProduct(id);
    const media = getProductMedia(id);
    if (!product) return null;

    const image = media?.banner?.src ?? `${SITE_URL}/fantazia-wordmark.svg`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.seo.description,
        brand: { '@type': 'Brand', name: 'Fantazia' },
        image,
        url: `${SITE_URL}${product.route}`,
        ...(product.releaseLabel ? { releaseDate: product.releaseLabel } : {}),
    };
};
