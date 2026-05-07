import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loading pages for better initial performance.
// On the client, these are split into per-route chunks. On the server
// (entry-server.jsx) we import them statically to avoid Suspense fallbacks
// in the prerendered HTML — bundle weight there doesn't matter, the SSR
// bundle is only used at build time.
const Home = lazy(() => import('./pages/Home'));
const Fable = lazy(() => import('./pages/Fable'));
const Citizen = lazy(() => import('./pages/Citizen'));
const Oasis = lazy(() => import('./pages/Oasis'));
const Spark = lazy(() => import('./pages/Spark'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));

const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-paper z-[100]">
    <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
  </div>
);

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
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/fable" element={<Fable />} />
          <Route path="/citizen" element={<Citizen />} />
          <Route path="/oasis" element={<Oasis />} />
          <Route path="/spark" element={<Spark />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/button-lab" element={<Navigate to="/" replace />} />
          <Route path="/archives" element={<Navigate to="/" replace />} />

          {/* LEGAL */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
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
