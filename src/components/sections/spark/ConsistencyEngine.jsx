import React from 'react';
import { motion } from 'framer-motion';

import consistency1 from '../../../assets/images/products/spark/spark-consistency-scene-01.webp';
import consistency2 from '../../../assets/images/products/spark/spark-consistency-scene-02.webp';
import consistency3 from '../../../assets/images/products/spark/spark-consistency-scene-03.webp';

const SCENES = [consistency1, consistency2, consistency3];

const ConsistencyEngine = () => (
    <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-left">
                <h2 className="text-4xl md:text-5xl font-medium text-strong mb-6">Consistency Engine</h2>
                <p className="text-xl text-muted leading-relaxed mb-8">
                    Keep your background, characters, and objects consistent throughout the shot.
                    <br /><br />
                    Our Vertical Story Model ensures identity retention across every frame of your 20-second loop.
                </p>
            </div>

            <div className="w-full md:flex-1 sunken-canvas surface-page shadow-inset-canvas rounded-canvas p-6 md:p-8 relative overflow-hidden group">
                <div className="absolute inset-0 grid-texture-subtle opacity-20 pointer-events-none" />

                <motion.div
                    className="flex flex-col md:flex-row items-center gap-4 relative p-2 md:cursor-grab md:active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: -100, right: 0 }}
                    dragElastic={0.1}
                >
                    {SCENES.map((img, i) => (
                        <div
                            key={i}
                            className="w-40 h-72 md:w-48 md:h-80 surface-card rounded-xl border-subtle shadow-lifted flex-shrink-0 relative overflow-hidden pointer-events-none"
                        >
                            <img src={img} alt={`Consistency Scene ${i + 1}`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 text-badge font-mono text-white/80 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                SCENE_0{i + 1}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </div>
);

export default ConsistencyEngine;
