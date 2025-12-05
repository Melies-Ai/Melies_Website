import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';

const ShowcaseButton = ({ name, className, children }) => (
    <div className="flex flex-col items-center gap-4 p-8 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
        <div className="h-20 flex items-center justify-center w-full">
            <button className={className}>
                {children || "Click Me"}
            </button>
        </div>
        <span className="text-sm font-mono text-ink/50 uppercase tracking-wider">{name}</span>
    </div>
);

const CanvasGrid = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 1;

            // Simple perspective grid drawing
            const horizon = canvas.height * 0.3;
            const centerX = canvas.width / 2;

            // Vertical lines
            for (let i = -20; i <= 20; i++) {
                ctx.beginPath();
                ctx.moveTo(centerX + i * 40, canvas.height);
                ctx.lineTo(centerX + i * 5, horizon);
                ctx.stroke();
            }

            // Horizontal lines
            for (let i = 0; i < 10; i++) {
                const y = canvas.height - i * i * 3; // Exponential spacing
                if (y < horizon) continue;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            draw();
        };

        window.addEventListener('resize', resize);
        resize();

        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ButtonShowcase = () => {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="mb-12 flex items-center gap-4">
                <Link to="/" className="p-2 rounded-full hover:bg-black/5 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-4xl font-medium">Button Test Lab</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1. Retro Relief (Current) */}
                <ShowcaseButton name="Retro Relief" className="px-8 py-3 bg-[#F0ECE2] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none font-bold text-lg transition-all rounded-full">
                    Retro Relief
                </ShowcaseButton>

                {/* 2. Soft Neumorphism */}
                <ShowcaseButton name="Soft Neumorphism" className="px-8 py-3 bg-[#F0ECE2] text-ink/80 rounded-full shadow-[6px_6px_12px_#d1cdc4,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#d1cdc4,inset_-6px_-6px_12px_#ffffff] transition-all font-medium text-lg active:scale-95">
                    Soft Touch
                </ShowcaseButton>

                {/* 3. Cyberpunk Glitch */}
                <ShowcaseButton name="Cyberpunk Glitch" className="relative px-8 py-3 bg-black text-white font-mono text-lg tracking-widest border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:bg-cyan-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all group overflow-hidden clip-path-slant">
                    <span className="relative z-10">CYBER_PUNK</span>
                    <div className="absolute inset-0 bg-cyan-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300" />
                </ShowcaseButton>

                {/* 4. Glassmorphism */}
                <ShowcaseButton name="Glassmorphism" className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-ink rounded-full hover:bg-white/20 hover:border-white/50 shadow-lg transition-all font-medium text-lg">
                    Glass UI
                </ShowcaseButton>

                {/* 5. Brutalist */}
                <ShowcaseButton name="Brutalist" className="px-8 py-3 bg-[#FF4D00] text-white font-bold text-xl border-4 border-black hover:bg-black hover:text-[#FF4D00] transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    BRUTAL
                </ShowcaseButton>

                {/* 6. Gradient Border */}
                <ShowcaseButton name="Gradient Border" className="relative px-8 py-3 bg-white text-ink font-medium text-lg rounded-full group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                        <div className="h-full w-full bg-white rounded-full flex items-center justify-center group-hover:bg-transparent group-hover:text-white transition-colors">
                            Gradient
                        </div>
                    </div>
                    <span className="opacity-0">Gradient</span> {/* Spacer */}
                </ShowcaseButton>

                {/* 7. Pixel Art */}
                <ShowcaseButton name="Pixel Art" className="px-6 py-3 bg-indigo-600 text-white font-mono text-lg border-4 border-indigo-900 shadow-[4px_0_0_0_#312e81,0_4px_0_0_#312e81,4px_4px_0_0_#312e81] hover:translate-y-1 hover:shadow-none transition-all active:bg-indigo-700">
                    PIXEL_BTN
                </ShowcaseButton>

                {/* 8. Win95 Classic */}
                <ShowcaseButton name="Win95 Classic" className="px-8 py-2 bg-[#c0c0c0] text-black font-sans text-lg border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white active:bg-[#a0a0a0]">
                    OK
                </ShowcaseButton>

                {/* 9. Playful Pop */}
                <ShowcaseButton name="Playful Pop" className="px-8 py-4 bg-yellow-400 text-black font-black text-xl rounded-2xl shadow-[0_8px_0_rgb(234,179,8)] hover:shadow-[0_4px_0_rgb(234,179,8)] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] transition-all">
                    Playful!
                </ShowcaseButton>

                {/* 10. Metallic */}
                <ShowcaseButton name="Metallic" className="px-8 py-3 bg-gradient-to-b from-gray-100 to-gray-400 text-gray-800 font-bold text-lg rounded-lg border border-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.2)] hover:brightness-105 active:brightness-95 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                    Metallic
                </ShowcaseButton>

                {/* 11. AI-First (New) */}
                <ShowcaseButton name="AI-First" className="group relative px-1 py-1 bg-gradient-to-r from-amber-200 to-amber-500 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                    <div className="relative bg-gradient-to-b from-white to-amber-50 text-black px-6 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(0,0,0,0.1)] flex items-center gap-2 font-medium text-lg">
                        <Sparkles size={18} className="text-black fill-black" />
                        AI-First
                    </div>
                </ShowcaseButton>

                {/* 12. Apple Glass (VisionOS) */}
                <ShowcaseButton name="Apple Glass" className="px-8 py-3 bg-white/40 backdrop-blur-xl border border-white/60 text-ink font-medium text-lg rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 hover:scale-105 transition-all duration-300">
                    Vision UI
                </ShowcaseButton>

                {/* 13. Neo-Skeuomorphism (Ceramic) */}
                <ShowcaseButton name="Neo-Skeuomorphism" className="px-8 py-3 bg-[#e0e5ec] text-gray-600 font-bold text-lg rounded-[20px] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:shadow-[inset_9px_9px_16px_rgb(163,177,198,0.6),inset_-9px_-9px_16px_rgba(255,255,255,0.5)] active:scale-95 transition-all duration-300">
                    Ceramic
                </ShowcaseButton>

                {/* 14. Clean Minimalist (Swiss) */}
                <ShowcaseButton name="Clean Minimalist" className="group relative px-8 py-3 bg-transparent text-black font-bold text-xl tracking-tighter overflow-hidden">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">SWISS_DESIGN</span>
                    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </ShowcaseButton>
            </div>

            {/* INTERACTIVE COMPONENTS SECTION */}
            <div className="mt-24 mb-12">
                <h2 className="text-3xl font-medium mb-8">Interactive Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* 1. Holographic Card */}
                    <div className="group relative w-full h-64 rounded-3xl bg-black/5 overflow-hidden perspective-1000 flex items-center justify-center">
                        <div className="relative w-48 h-full max-h-56 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-12 group-hover:rotate-x-6 preserve-3d">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {/* Holographic Sheen */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-xl transition-opacity duration-500 mix-blend-color-dodge" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 mb-4 backdrop-blur-md" />
                                <h3 className="font-bold text-lg">Fable Card</h3>
                                <p className="text-xs text-white/50 mt-2">Holographic Tilt Effect</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Neural Input */}
                    <div className="w-full h-64 rounded-3xl bg-black/5 flex items-center justify-center p-8">
                        <div className="relative w-full max-w-md group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                            <input
                                type="text"
                                placeholder="Enter prompt..."
                                className="relative w-full bg-black text-white px-6 py-4 rounded-lg border border-white/10 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 placeholder-white/30 transition-all shadow-xl"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-150" />
                            </div>
                        </div>
                    </div>

                    {/* 3. Reality Toggle */}
                    <div className="w-full h-64 rounded-3xl bg-black/5 flex items-center justify-center">
                        <label className="relative inline-flex items-center cursor-pointer group">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-24 h-12 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-12 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-10 after:w-10 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                            <span className="absolute left-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider peer-checked:opacity-0 transition-opacity">OFF</span>
                            <span className="absolute right-3 text-[10px] font-bold text-white uppercase tracking-wider opacity-0 peer-checked:opacity-100 transition-opacity">ON</span>
                            <div className="absolute inset-0 rounded-full ring-4 ring-emerald-500/20 opacity-0 peer-checked:opacity-100 transition-opacity duration-500 animate-pulse" />
                        </label>
                    </div>

                    {/* 4. Cinematic Loader */}
                    <div className="w-full h-64 rounded-3xl bg-black flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
                        <div className="relative w-24 h-24">
                            {/* Outer Ring */}
                            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
                            {/* Inner Ring */}
                            <div className="absolute inset-2 border-t-2 border-blue-400 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                            {/* Core */}
                            <div className="absolute inset-8 bg-blue-500/10 rounded-full backdrop-blur-sm animate-pulse flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
                            </div>
                            {/* Lens Flare */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-blue-500/20 blur-xl rotate-45 animate-pulse" />
                        </div>
                        <div className="absolute bottom-8 font-mono text-xs text-blue-400/50 tracking-[0.2em] animate-pulse">
                            RENDERING...
                        </div>
                    </div>

                </div>
            </div>


            {/* GRID LAB SECTION */}
            <div className="mt-24 mb-12">
                <h2 className="text-3xl font-medium mb-8">Grid Test Lab</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* 1. CSS Gradient (Current/Tweaked) */}
                    <div className="w-full h-64 rounded-3xl bg-[#F5F2EB] overflow-hidden relative shadow-inner group">
                        <div className="absolute top-4 left-4 z-10 text-xs font-mono text-ink/50">01. CSS GRADIENT</div>
                        <div className="absolute inset-0 flex items-center justify-center perspective-500">
                            <div
                                className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
                                style={{
                                    background: `
                                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                                    `,
                                    backgroundSize: '40px 40px',
                                    transform: 'rotateX(60deg)',
                                    maskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-rose-500 rounded-full shadow-lg" />
                        </div>
                    </div>

                    {/* 2. SVG Pattern (Sharp) */}
                    <div className="w-full h-64 rounded-3xl bg-[#F5F2EB] overflow-hidden relative shadow-inner group">
                        <div className="absolute top-4 left-4 z-10 text-xs font-mono text-ink/50">02. SVG PATTERN</div>
                        <div className="absolute inset-0 flex items-center justify-center perspective-500">
                            <div className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%] origin-center" style={{ transform: 'rotateX(60deg)' }}>
                                <svg width="100%" height="100%">
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#F5F2EB]" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-blue-500 rounded-full shadow-lg" />
                        </div>
                    </div>

                    {/* 3. Radial/Polar Grid */}
                    <div className="w-full h-64 rounded-3xl bg-[#F5F2EB] overflow-hidden relative shadow-inner group">
                        <div className="absolute top-4 left-4 z-10 text-xs font-mono text-ink/50">03. RADIAL POLAR</div>
                        <div className="absolute inset-0 flex items-center justify-center perspective-500">
                            <div
                                className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
                                style={{
                                    background: `
                                        radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px),
                                        repeating-radial-gradient(rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 40px)
                                    `,
                                    transform: 'rotateX(60deg)',
                                    maskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-amber-500 rounded-full shadow-lg" />
                        </div>
                    </div>

                    {/* 4. Canvas Render (Raw) */}
                    <div className="w-full h-64 rounded-3xl bg-[#F5F2EB] overflow-hidden relative shadow-inner group">
                        <div className="absolute top-4 left-4 z-10 text-xs font-mono text-ink/50">04. CANVAS RENDER</div>
                        <CanvasGrid />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-emerald-500 rounded-full shadow-lg" />
                        </div>
                    </div>

                    {/* 5. Dotted Texture */}
                    <div className="w-full h-64 rounded-3xl bg-[#F5F2EB] overflow-hidden relative shadow-inner group">
                        <div className="absolute top-4 left-4 z-10 text-xs font-mono text-ink/50">05. DOTTED TEXTURE</div>
                        <div className="absolute inset-0 flex items-center justify-center perspective-500">
                            <div
                                className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
                                style={{
                                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)',
                                    backgroundSize: '30px 30px',
                                    transform: 'rotateX(60deg)',
                                    maskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 bg-purple-500 rounded-full shadow-lg" />
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA STYLES LAB SECTION */}
            <div className="mt-24 mb-12">
                <h2 className="text-3xl font-medium mb-8">CTA Styles</h2>
                <div className="grid grid-cols-1 gap-12">

                    {/* 1. Standard Clean (Home Style) */}
                    <div className="w-full bg-white border-t border-stroke py-16 text-center">
                        <div className="max-w-2xl mx-auto flex flex-col items-center">
                            <h3 className="text-5xl md:text-7xl font-medium tracking-tighter text-primary mb-8">
                                Ready to direct?
                            </h3>
                            <button className="bg-ink text-white rounded-full px-12 py-6 text-xl font-medium shadow-xl hover:scale-105 transition-transform">
                                Get Started Now
                            </button>
                            <div className="mt-8 text-xs font-mono text-ink/30">USAGE: Main Page Footers (Home, Pricing)</div>
                        </div>
                    </div>

                    {/* 2. Sunken Canvas (Feature Style) */}
                    <div className="w-full h-full sunken-canvas bg-[#F0ECE2] shadow-inner rounded-[40px] p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="text-4xl font-medium text-ink mb-6">Explore the Engine</h3>
                            <p className="text-xl text-ink/60 mb-8">
                                Dive into the specific tools that power the Melies ecosystem.
                            </p>
                            <button className="bg-white text-ink border border-black/5 px-8 py-3 rounded-full font-medium shadow-sm hover:shadow-md transition-all">
                                View Features
                            </button>
                            <div className="mt-8 text-xs font-mono text-ink/30">USAGE: Internal Sections (Fable, Citizen)</div>
                        </div>
                    </div>

                    {/* 3. Glass Panel (Spark Style) */}
                    <div className="w-full bg-[#f8f6f0] p-16 rounded-[40px] flex items-center justify-center">
                        <div className="glass-panel p-12 rounded-3xl text-center max-w-xl w-full border border-white/40 shadow-xl backdrop-blur-xl bg-white/60">
                            <h3 className="text-3xl font-medium text-ink mb-4">Join the Beta</h3>
                            <p className="text-ink/60 mb-8">Limited spots available for the next cohort.</p>
                            <button className="w-full bg-accent text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:brightness-110 transition-all">
                                Request Access
                            </button>
                            <div className="mt-8 text-xs font-mono text-ink/30">USAGE: High-Tech/Overlay Contexts (Spark)</div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ButtonShowcase;
