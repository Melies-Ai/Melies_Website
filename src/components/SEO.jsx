import React from 'react';
import { Helmet } from 'react-helmet-async';


const SEO = ({ title, description, canonical, type = 'website', image }) => {
    // Default values
    const siteName = 'Fantazia';
    const siteUrl = 'https://fantazia.ai';
    const defaultImage = `${siteUrl}/fantazia-wordmark.svg`;
    const twitterHandle = '@FantaziaAI';

    const fullTitle = title ? `${title} | ${siteName}` : 'Fantazia | The Infinite Cinema Engine';
    const finalDescription = description || "Orchestrate multi-agent systems to generate films. From script to screen, in real-time. The future of filmmaking starts here.";
    const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
    const finalCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name='description' content={finalDescription} />
            <link rel="canonical" href={finalCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
        </Helmet>
    );
};



export default SEO;
