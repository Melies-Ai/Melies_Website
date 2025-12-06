import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Gamepad2, Clapperboard, MonitorPlay } from 'lucide-react';
import iconFable from '../assets/fable_icon_vertical_black.png';
import iconCitizen from '../assets/citizen_icon_vertical_black.png';
import iconOasis from '../assets/oasis_icon_vertical_black.png';

// --- Shared Components ---
const Node = ({ icon, label, color, x, y, size = 'normal', delay = 0 }) => {
    const isLarge = size === 'large';
    return (
        <motion.div
            className="absolute flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay, type: "spring" }}
            style={{ left: x, top: y, x: "-50%", y: "-50%" }}
        >
            <div className={`
                ${isLarge ? 'w-24 h-24' : 'w-16 h-16'} 
                bg-white border rounded-2xl flex items-center justify-center shadow-lg relative
                ${color === 'orange' ? 'border-orange-200' : color === 'blue' ? 'border-blue-200' : 'border-green-200'}
            `}>
                {typeof icon === 'string' ? (
                    <img src={icon} alt={label} className={`${isLarge ? 'h-12' : 'h-8'} w-auto opacity-90`} />
                ) : (
                    <div className={`opacity-60 ${color === 'orange' ? 'text-orange-600' : color === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>
                        {icon}
                    </div>
                )}
            </div>
            <div className={`
                mt-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/50 backdrop-blur-sm border border-black/5
                ${color === 'orange' ? 'text-orange-600' : color === 'blue' ? 'text-blue-600' : 'text-green-600'}
            `}>
                {label}
            </div>
        </motion.div>
    );
};

const Connection = ({ d, color, delay = 0 }) => (
    <>
        <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay }}
        />
        <motion.circle
            r="3"
            fill={color}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            style={{ offsetPath: `path('${d}')` }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 0.5 }}
        />
    </>
);

// --- SCENE 1: FABLE (The Pipeline / Convergence) ---
const FableScene = () => (
    <div className="w-full h-full relative">
        {/* Nodes */}
        <Node icon={iconFable} label="Director" color="orange" x="50%" y="80%" size="large" /> {/* Fable Bottom */}
        <Node icon={iconCitizen} label="Cast" color="blue" x="20%" y="20%" delay={0.2} />      {/* Citizen Top Left */}
        <Node icon={iconOasis} label="Set" color="green" x="80%" y="20%" delay={0.4} />        {/* Oasis Top Right */}

        {/* Connections: Top -> Bottom Convergence */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
            {/* Citizen -> Fable */}
            <Connection d="M 80 80 Q 80 320 200 320" color="#EA580C" delay={0.5} />
            {/* Oasis -> Fable */}
            <Connection d="M 320 80 Q 320 320 200 320" color="#EA580C" delay={0.7} />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-900/10 font-bold text-6xl tracking-widest pointer-events-none">
            CUT
        </div>
    </div>
);

// --- SCENE 2: CITIZEN (The Hub / Divergence) ---
const CitizenScene = () => (
    <div className="w-full h-full relative">
        {/* Nodes */}
        <Node icon={iconCitizen} label="Agent" color="blue" x="50%" y="50%" size="large" /> {/* Center */}

        {/* Satellites */}
        <Node icon={<MessageSquare size={24} />} label="Chat" color="blue" x="20%" y="20%" delay={0.2} />
        <Node icon={iconOasis} label="World" color="green" x="80%" y="20%" delay={0.3} />
        <Node icon={<Gamepad2 size={24} />} label="Game" color="blue" x="80%" y="80%" delay={0.4} />
        <Node icon={<Clapperboard size={24} />} label="Movie" color="orange" x="20%" y="80%" delay={0.5} />

        {/* Connections: Center -> Outwards */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
            <Connection d="M 200 200 L 80 80" color="#2563EB" delay={0.2} />
            <Connection d="M 200 200 L 320 80" color="#2563EB" delay={0.3} />
            <Connection d="M 200 200 L 320 320" color="#2563EB" delay={0.4} />
            <Connection d="M 200 200 L 80 320" color="#2563EB" delay={0.5} />
        </svg>
    </div>
);

// --- SCENE 3: OASIS (The Foundation / Construction) ---
const OasisScene = () => (
    <div className="w-full h-full relative">
        {/* Isometric Grid Floor */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-green-500/5 rounded-full rotate-x-60 border border-green-500/10" style={{ transform: 'translateX(-50%) rotateX(60deg)' }}>
            <div className="w-full h-full bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Nodes */}
        <Node icon={iconOasis} label="World" color="green" x="50%" y="70%" size="large" />

        {/* Falling Elements */}
        <Node icon={iconFable} label="Script" color="orange" x="30%" y="20%" delay={0.2} />
        <Node icon={iconCitizen} label="NPC" color="blue" x="70%" y="20%" delay={0.4} />

        {/* Connections: Drop Down */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
            {/* Fable Drop */}
            <Connection d="M 120 80 L 120 250 L 200 280" color="#059669" delay={0.2} />
            {/* Citizen Drop */}
            <Connection d="M 280 80 L 280 250 L 200 280" color="#059669" delay={0.4} />
        </svg>
    </div>
);


const EcosystemV3 = () => {
    const [activeTab, setActiveTab] = useState('fable');

    const content = {
        fable: {
            title: "FABLE",
            subtitle: "The Director",
            desc: "The central nervous system. Fable pulls assets from Citizen and environments from Oasis, assembling them into a coherent narrative output.",
            color: "bg-orange-500",
            component: <FableScene />
        },
        citizen: {
            title: "CITIZEN",
            subtitle: "The Characters",
            desc: "One soul, many stages. Your characters live centrally in Citizen but project themselves into Movies, Games, Chats, and VR experiences simultaneously.",
            color: "bg-blue-500",
            component: <CitizenScene />
        },
        oasis: {
            title: "OASIS",
            subtitle: "The Worlds",
            desc: "The foundation layer. Oasis provides the consistent physics and environmental logic that Fable scripts and Citizen agents inhabit.",
            color: "bg-green-500",
            component: <OasisScene />
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Interactive Tabs */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-medium text-ink mb-6">The Melies Ecosystem</h2>
                    <h3 className="text-xl text-ink/60 mb-2">3 Perspectives. 1 Synergy.</h3>
                    <p className="text-sm text-ink/40">Select a perspective to see the workflow.</p>
                </div>

                <div className="flex flex-col gap-4">
                    {Object.entries(content).map(([key, data]) => (
                        <div
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${activeTab === key ? 'bg-white shadow-md border-black/5 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full ${data.color} text-white flex items-center justify-center shrink-0`}>
                                <div className="font-bold text-lg">{key[0].toUpperCase()}</div>
                            </div>
                            <div>
                                <h4 className="font-medium text-ink">{data.title} <span className="text-ink/40 font-normal">/ {data.subtitle}</span></h4>
                                <AnimatePresence mode="wait">
                                    {activeTab === key && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-sm text-ink/60 mt-1"
                                        >
                                            {data.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Visual */}
            <div className="aspect-square rounded-[40px] sunken-canvas bg-[#F0ECE2] shadow-inner overflow-hidden relative group">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5 text-[10px] font-mono text-ink/40 uppercase">
                        View: {activeTab}
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="w-full h-full relative"
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {content[activeTab].component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default EcosystemV3;
