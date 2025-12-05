import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Fable from './pages/Fable';
import Citizen from './pages/Citizen';
import Oasis from './pages/Oasis';
import Spark from './pages/Spark';
import Pricing from './pages/Pricing';
import Manifesto from './pages/Manifesto';


import ButtonShowcase from './pages/ButtonShowcase';
import TestLabOverlay from './components/TestLabOverlay';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/fable" element={<Fable />} />
        <Route path="/citizen" element={<Citizen />} />
        <Route path="/oasis" element={<Oasis />} />
        <Route path="/spark" element={<Spark />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/manifesto" element={<Manifesto />} />

        {/* TEST LAB ROUTE - REMOVE FOR PRODUCTION */}
        <Route path="/buttons" element={<ButtonShowcase />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router basename="/Melies_Website">
      <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/30 relative">
        <Navbar />
        <AnimatedRoutes />
        <Footer />

        {/* TEST LAB OVERLAY - REMOVE FOR PRODUCTION */}
        <TestLabOverlay />
      </div>
    </Router>
  );
}

export default App;
