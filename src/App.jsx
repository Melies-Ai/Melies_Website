import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loading pages for better initial performance
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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
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

function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/30 relative">
        <Navbar />
        <AnimatedRoutes />
        <Footer />


      </div>
    </Router>
  );
}

export default App;
