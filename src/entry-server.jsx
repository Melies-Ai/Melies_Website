// SSR entry — used at build time by scripts/prerender.mjs to render each
// route to static HTML. Bundle size doesn't matter here; we import every
// page synchronously so React.lazy doesn't suspend during renderToString.

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Routes, Route, Navigate, StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Force Helmet into server mode. With Vite SSR + jsdom-like globals, the
// auto-detection sometimes flips to client mode and the helmet context
// stays empty. Explicit toggle guarantees mapStateOnServer fires.
HelmetProvider.canUseDOM = false;

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sync imports — server bundle is build-time only, weight doesn't matter,
// and this avoids Suspense fallbacks during renderToString.
import Home from './pages/Home.jsx';
import Fable from './pages/Fable.jsx';
import Citizen from './pages/Citizen.jsx';
import Oasis from './pages/Oasis.jsx';
import Spark from './pages/Spark.jsx';
import Pricing from './pages/Pricing.jsx';
import PricingLab from './pages/PricingLab.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';

// Server-side route table mirrors App.jsx without React.lazy. The client's
// AnimatePresence/route animations are skipped here — initial paint is
// static HTML; framer-motion's mount-time animations run on hydration.
const ServerRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fable" element={<Fable />} />
        <Route path="/citizen" element={<Citizen />} />
        <Route path="/oasis" element={<Oasis />} />
        <Route path="/spark" element={<Spark />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/lab" element={<PricingLab />} />
        <Route path="/button-lab" element={<Navigate to="/" replace />} />
        <Route path="/archives" element={<Navigate to="/" replace />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
    </Routes>
);

const ServerShell = () => (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/30 relative">
        <Navbar />
        <ServerRoutes />
        <Footer />
    </div>
);

/**
 * Render a single route to HTML and harvest its <head> tags via
 * react-helmet-async's server context.
 *
 * @param {string} url  pathname to render (e.g. "/", "/spark")
 * @returns {{ html: string, head: { title: string, meta: string, link: string, script: string } }}
 */
export function render(url) {
    const helmetContext = {};

    const tree = (
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
                <ServerShell />
            </StaticRouter>
        </HelmetProvider>
    );

    const html = renderToString(tree);

    const helmet = helmetContext.helmet ?? {};
    const head = {
        title: helmet.title?.toString?.() ?? '',
        meta: helmet.meta?.toString?.() ?? '',
        link: helmet.link?.toString?.() ?? '',
        script: helmet.script?.toString?.() ?? '',
    };

    return { html, head };
}
