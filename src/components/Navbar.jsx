import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/logo.png';



import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NavLink = ({ to, label, isActive, badge, badgeColor = "bg-stroke text-secondary", onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="relative group px-4 py-2.5 flex flex-col items-center justify-center rounded-full transition-all duration-200"
    >
        {isActive && (
            <motion.div
                layoutId="navbar-active"
                className="absolute inset-0 bg-[#E6E1D6]/60 backdrop-blur-sm rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <span className={`relative z-10 text-base font-medium transition-colors duration-200 ${isActive ? 'text-black' : 'text-ink/60 group-hover:text-ink'}`}>
            {label}
        </span>
        {badge && (
            <span className={`absolute -top-1 -right-2 z-20 text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase tracking-wider ${badgeColor} shadow-sm`}>
                {badge}
            </span>
        )}
    </Link>
);

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-sm"
                >
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 shrink-0">
                        <img src={logo} alt="Melies.ai" className="h-8 w-auto" />
                    </Link>

                    {/* Center Group: Product Links */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex items-center">
                            <NavLink to="/spark" label="Spark" isActive={location.pathname === '/spark'} />
                            <NavLink to="/fable" label="Fable" isActive={location.pathname === '/fable'} />
                            <NavLink to="/citizen" label="Citizen" isActive={location.pathname === '/citizen'} />
                            <NavLink to="/oasis" label="Oasis" isActive={location.pathname === '/oasis'} />
                            <NavLink to="/pricing" label="Pricing" isActive={location.pathname === '/pricing'} />
                        </div>
                    </div>

                    {/* Right Group: Actions */}
                    <div className="hidden md:flex items-center gap-6 shrink-0">
                        <Link to="/login" className="text-base font-medium text-secondary hover:text-primary transition-colors">
                            Login
                        </Link>
                        <button className="bg-black text-white rounded-full px-6 py-2 text-base font-medium hover:opacity-90 transition-opacity shadow-lg">
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
                        className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl pt-32 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            <NavLink to="/spark" label="Spark" isActive={location.pathname === '/spark'} onClick={toggleMenu} />
                            <NavLink to="/fable" label="Fable" isActive={location.pathname === '/fable'} onClick={toggleMenu} />
                            <NavLink to="/citizen" label="Citizen" isActive={location.pathname === '/citizen'} onClick={toggleMenu} />
                            <NavLink to="/oasis" label="Oasis" isActive={location.pathname === '/oasis'} onClick={toggleMenu} />
                            <NavLink to="/pricing" label="Pricing" isActive={location.pathname === '/pricing'} onClick={toggleMenu} />
                            <div className="h-px bg-ink/10 my-4" />
                            <Link to="/login" className="text-center py-3 text-lg font-medium text-ink/60" onClick={toggleMenu}>
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
