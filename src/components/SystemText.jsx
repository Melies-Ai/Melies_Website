import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SystemText = ({ lines = [], delay = 0, className = "" }) => {
    const [displayedLines, setDisplayedLines] = useState(lines.map(() => ""));
    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentLineIndex = 0;
        let currentCharIndex = 0;
        let timeout;
        let startTimeout;

        const typeChar = () => {
            if (currentLineIndex >= lines.length) {
                setIsComplete(true);
                return;
            }

            const currentLine = lines[currentLineIndex];

            // Randomize typing speed slightly for realism
            const speed = 30 + Math.random() * 20;

            if (currentCharIndex < currentLine.length) {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
                    return newLines;
                });
                currentCharIndex++;
                timeout = setTimeout(typeChar, speed);
            } else {
                currentLineIndex++;
                currentCharIndex = 0;
                setActiveLineIndex(currentLineIndex);
                timeout = setTimeout(typeChar, 400); // Pause between lines
            }
        };

        startTimeout = setTimeout(typeChar, delay * 1000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(startTimeout);
        };
    }, [lines, delay]);

    return (
        <div className={`font-mono text-xs text-white/60 leading-relaxed text-left ${className}`}>
            {lines.map((line, index) => {
                // Only render lines that have started typing
                if (index > activeLineIndex) return null;

                return (
                    <div key={index} className="min-h-[1.625em] flex items-center">
                        <span>{displayedLines[index]}</span>
                        {/* Show cursor only on the active line, or at the very end if complete */}
                        {(!isComplete && index === activeLineIndex) && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="inline-block w-2 h-3 bg-white/60 ml-1"
                            />
                        )}
                        {/* Keep cursor blinking at the end after completion */}
                        {(isComplete && index === lines.length - 1) && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="inline-block w-2 h-3 bg-white/60 ml-1"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SystemText;
