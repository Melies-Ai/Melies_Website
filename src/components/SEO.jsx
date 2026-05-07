import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Fantazia';
const SITE_URL = 'https://fantazia.ai';
const DEFAULT_IMAGE = `${SITE_URL}/fantazia-wordmark.svg`;
const TWITTER_HANDLE = '@FantaziaAI';

const ORG_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fantazia',
    url: SITE_URL,
    logo: `${SITE_URL}/fantazia-wordmark.svg`,
    sameAs: [
        'https://x.com/FantaziaAI',
        'https://www.instagram.com/fantazia_ai/',
        'https://www.linkedin.com/company/fantazia-ai/',
        'https://www.youtube.com/@FantaziaAI',
    ],
    description:
        'The Infinite Cinema Engine. Orchestrating multi-agent AI systems to generate films from script to screen, in real-time.',
};

/**
 * Per-page SEO metadata. Renders into <head> via react-helmet-async.
 *
 * @param {Object} props
 * @param {string} [props.title]            // page-specific title; appended with " | Fantazia"
 * @param {string} [props.description]      // 150-160 chars, page-specific
 * @param {string} [props.canonical]        // pathname or full URL
 * @param {'website'|'article'|'product'} [props.type]
 * @param {string} [props.image]            // og:image (path or full URL)
 * @param {string} [props.preloadImage]     // <link rel="preload"> for the LCP image of the page
 * @param {Object|Array} [props.structuredData]  // additional JSON-LD; merged with Organization
 */
const SEO = ({
    title,
    description,
    canonical,
    type = 'website',
    image,
    preloadImage,
    structuredData,
}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | The Infinite Cinema Engine`;
    const finalDescription =
        description ||
        'Orchestrate multi-agent AI systems to generate films from script to screen, in real-time. The future of filmmaking starts here.';
    const finalImage = image
        ? image.startsWith('http')
            ? image
            : `${SITE_URL}${image}`
        : DEFAULT_IMAGE;
    const finalCanonical = canonical
        ? canonical.startsWith('http')
            ? canonical
            : `${SITE_URL}${canonical}`
        : SITE_URL;

    const allJsonLd = [ORG_JSON_LD];
    if (structuredData) {
        if (Array.isArray(structuredData)) allJsonLd.push(...structuredData);
        else allJsonLd.push(structuredData);
    }

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={finalCanonical} />

            {/* Hint the LCP image so the browser kicks off the fetch in parallel. */}
            {preloadImage && (
                <link
                    rel="preload"
                    as="image"
                    href={preloadImage}
                    fetchPriority="high"
                />
            )}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* JSON-LD: always include Organization, plus any page-specific data. */}
            {allJsonLd.map((data, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(data)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
