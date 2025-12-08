import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/logo.png';
import iconFable from '../assets/fable_icon_vertical_black.png';
import iconCitizen from '../assets/citizen_icon_vertical_black.png';
import iconOasis from '../assets/oasis_icon_vertical_black.png';
import sparkImage from '../assets/spark_consistency_1.webp';

import { Menu, X, ChevronDown } from 'lucide-react';

const NavLink = ({ to, label, isActive, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="relative group px-4 py-2.5 flex flex-col items-center justify-center rounded-full transition-all duration-200"
    >
        <span className={`relative z-10 text-base font-medium transition-all duration-200 ${isActive ? 'text-black' : 'text-ink/60 group-hover:text-ink'}`}>
            {label}
        </span>
    </Link>
);

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const timeoutRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = (menu) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 100);
    };

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-5xl bg-white/40 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-sm relative"
                >
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 mr-8">
                        <img src={logo} alt="Melies.ai" className="h-8 w-auto" />
                    </Link>

                    {/* Center Group: Navigation */}
                    <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                        {/* Products Dropdown Trigger */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('products')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className={`px-4 py-2.5 flex items-center gap-1.5 rounded-full text-base font-medium transition-colors ${activeDropdown === 'products' ? 'text-black bg-white/50' : 'text-ink/60 hover:text-ink'}`}
                            >
                                Products
                                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {activeDropdown === 'products' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.98, x: "-35%" }}
                                        animate={{ opacity: 1, y: 0, scale: 1, x: "-35%" }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98, x: "-35%" }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 mt-6 w-[600px] bg-white rounded-2xl border border-black/5 shadow-xl p-2 overflow-hidden z-50"
                                    >
                                        {/* Available Now Section (Header Removed) */}
                                        <div className="mb-4">
                                            <Link to="/spark" className="flex items-start gap-4 p-1 rounded-xl hover:bg-[#F0ECE2]/50 transition-colors group">
                                                {/* Vertical Mobile Image */}
                                                <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 border border-black/5 shadow-sm relative">
                                                    <img src={sparkImage} alt="Spark" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-primary text-lg">Spark</span>
                                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide">Live</span>
                                                    </div>
                                                    <p className="text-sm text-secondary leading-snug">
                                                        Vertical Stories. Create 20-sec videos with perfect consistency.
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Coming Soon Section */}
                                        <div>
                                            <div className="text-[10px] font-mono text-secondary/40 uppercase tracking-widest mb-3 px-2">Coming 2026</div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {[
                                                    { name: "Fable", icon: iconFable, desc: "AI Director", link: "/fable" },
                                                    { name: "Citizen", icon: iconCitizen, desc: "AI Characters", link: "/citizen" },
                                                    { name: "Oasis", icon: iconOasis, desc: "Living Worlds", link: "/oasis" }
                                                ].map((item, i) => (
                                                    <Link key={i} to={item.link} className="flex flex-col gap-3 p-2 rounded-xl hover:bg-[#F0ECE2]/50 transition-colors group text-center border border-transparent hover:border-black/5">
                                                        <div className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform opacity-60 group-hover:opacity-100">
                                                            <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-primary text-sm mb-0.5">{item.name}</div>
                                                            <div className="text-[9px] text-secondary uppercase tracking-widest mb-2">{item.desc}</div>
                                                            <div className="text-[9px] font-medium text-black/40 border border-black/10 rounded-full px-2 py-0.5 inline-block group-hover:bg-black group-hover:text-white transition-colors">
                                                                Waitlist
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink to="/pricing" label="Pricing" isActive={location.pathname === '/pricing'} />
                        <NavLink to="/about" label="About" isActive={location.pathname === '/about'} />
                    </div>

                    {/* Right Group: Actions */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        <Link to="/login" className="text-base font-medium text-secondary hover:text-primary transition-colors px-4">
                            Login
                        </Link>
                        <button className="bg-black text-white rounded-full px-6 py-2.5 text-base font-medium hover:opacity-90 transition-opacity shadow-lg">
                            Try Spark
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-ink" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </motion.nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl pt-32 px-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="space-y-4">
                                <div className="text-xs font-mono text-secondary/40 uppercase tracking-widest mb-2">Products</div>
                                <NavLink to="/spark" label="⚡ Spark (Live)" isActive={location.pathname === '/spark'} onClick={toggleMenu} />
                                <NavLink to="/fable" label="🎬 Fable (2025)" isActive={location.pathname === '/fable'} onClick={toggleMenu} />
                                <NavLink to="/citizen" label="👤 Citizen (2025)" isActive={location.pathname === '/citizen'} onClick={toggleMenu} />
                                <NavLink to="/oasis" label="🌍 Oasis (2025)" isActive={location.pathname === '/oasis'} onClick={toggleMenu} />
                            </div>

                            <div className="h-px bg-ink/10" />

                            <NavLink to="/pricing" label="Pricing" isActive={location.pathname === '/pricing'} onClick={toggleMenu} />
                            <NavLink to="/about" label="About" isActive={location.pathname === '/about'} onClick={toggleMenu} />

                            <div className="h-px bg-ink/10" />

                            <Link to="/login" className="text-center py-2 text-lg font-medium text-ink/60" onClick={toggleMenu}>
                                Login
                            </Link>
                            <button className="bg-black text-white rounded-xl py-4 text-lg font-medium shadow-lg w-full">
                                Try Spark
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
