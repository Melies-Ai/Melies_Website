import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether the referenced element is currently intersecting the
 * viewport. Used to gate framer-motion `repeat: Infinity` animations so
 * they don't burn CPU when the user has scrolled past them.
 *
 * Usage:
 *   const ref = useRef(null);
 *   const inView = useInView(ref);
 *   <motion.div animate={inView ? { y: [0, -100] } : false} />
 *
 * @param {React.RefObject} ref
 * @param {Object} [options]
 * @param {string} [options.rootMargin='200px'] - keeps animation alive
 *   slightly before the element scrolls in/out, smoothing the toggle.
 * @param {number} [options.threshold=0]
 * @returns {boolean}
 */
export function useInView(ref, { rootMargin = '200px', threshold = 0 } = {}) {
    const [inView, setInView] = useState(true); // assume visible on first render

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver === 'undefined') return; // SSR-safe

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin, threshold },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [ref, rootMargin, threshold]);

    return inView;
}
