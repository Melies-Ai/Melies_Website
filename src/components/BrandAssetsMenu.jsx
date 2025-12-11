import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileImage, FileCode } from 'lucide-react';

const AssetOption = ({ label, format, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-black/5 rounded-md group transition-colors"
    >
        <div className="flex items-center gap-2 text-ink/80 group-hover:text-ink">
            {format === 'SVG' ? <FileCode size={14} /> : <FileImage size={14} />}
            <span>{label}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono text-ink/40">{format}</span>
            <Download size={12} className="text-ink/60" />
        </div>
    </button>
);

const BrandAssetsMenu = ({ isOpen, onClose, position }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', onClose);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', onClose);
        };
    }, [isOpen, onClose]);

    const downloadAsset = (filename) => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.BASE_URL}${filename}`; // Assumes assets are in public folder
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.1 }}
                    style={{
                        position: 'fixed',
                        top: position.y,
                        left: position.x,
                        zIndex: 100
                    }}
                    className="bg-white rounded-xl shadow-2xl border border-black/10 p-2 w-64 backdrop-blur-xl"
                >
                    <div className="px-3 py-2 border-b border-black/5 mb-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-ink/40">Brand Assets</h4>
                    </div>

                    <div className="space-y-0.5">
                        <div className="px-3 py-1.5 text-[10px] uppercase tracking-wide text-ink/40 font-medium mt-1">Logo Black</div>
                        <AssetOption
                            label="Vector (Scalable)"
                            format="SVG"
                            onClick={() => downloadAsset('logo_black.svg')}
                        />
                        <AssetOption
                            label="High Res (2000px)"
                            format="PNG"
                            onClick={() => downloadAsset('logo_black_512.png')}
                        />

                        <div className="px-3 py-1.5 text-[10px] uppercase tracking-wide text-ink/40 font-medium mt-2">Logo White</div>
                        <AssetOption
                            label="Vector (Scalable)"
                            format="SVG"
                            onClick={() => downloadAsset('logo_white.svg')}
                        />
                        <AssetOption
                            label="High Res (2000px)"
                            format="PNG"
                            onClick={() => downloadAsset('logo_white_512.png')}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BrandAssetsMenu;
