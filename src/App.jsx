import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Eager route imports. We used to lazy-load these via React.lazy() for
// smaller initial JS, but that broke hydration on the prerendered HTML:
// while a route's chunk was in-flight, React.Suspense replaced the
// prerendered route content with a fixed-positioned fallback (out of flow)
// — the Footer suddenly had nothing above it and jumped to the top of the
// viewport, then jumped back down when the chunk arrived. Net result:
// CLS ≈ 0.95 on the Footer at every first-paint, confirmed via a
// PerformanceObserver capture.
//
// The SSR entry already imports these synchronously (entry-server.jsx),
// so going eager on the client unifies the two render paths and eliminates
// the hydration mismatch. The ~150kB of extra JS in the initial bundle is
// well worth the Core Web Vitals win + instant route-to-route navigation.
import Home from './pages/Home';
import Fable from './pages/Fable';
import Citizen from './pages/Citizen';
import Oasis from './pages/Oasis';
import Spark from './pages/Spark';
import Pricing from './pages/Pricing';
import PricingLab from './pages/PricingLab';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// AnimatedRoutes — relies on a Router context being mounted upstream (either
// BrowserRouter for client, StaticRouter for SSR). Touches `window` only via
// framer-motion's onExitComplete, which fires on route transition (client-only).
const AnimatedRoutes = () => {
  const location = useLocation();
  // Skip onExitComplete server-side; window doesn't exist there.
  const onExitComplete = typeof window !== 'undefined'
    ? () => window.scrollTo(0, 0)
    : undefined;

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/fable" element={<Fable />} />
        <Route path="/citizen" element={<Citizen />} />
        <Route path="/oasis" element={<Oasis />} />
        <Route path="/spark" element={<Spark />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/lab" element={<PricingLab />} />
        <Route path="/button-lab" element={<Navigate to="/" replace />} />
        <Route path="/archives" element={<Navigate to="/" replace />} />

        {/* LEGAL */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </AnimatePresence>
  );
};

// AppShell — Router-agnostic. Used by both client (wrapped in BrowserRouter)
// and SSR (wrapped in StaticRouter). Doesn't touch window or any browser-only
// API outside of components rendered into AnimatedRoutes.
export const AppShell = () => (
  <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/30 relative">
    <Navbar />
    <AnimatedRoutes />
    <Footer />
  </div>
);

// Default export — client SPA bootstrap, used by entry-client.jsx.
function App() {
  return (
    <BrowserRouter basename="/">
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
