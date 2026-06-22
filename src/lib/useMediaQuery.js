import { useEffect, useState } from 'react';

/**
 * SSR-safe media-query hook.
 *
 * Returns `false` on the server and on the client's first paint (so SSR
 * markup and hydration markup agree), then flips to the real match inside
 * an effect. Use for behaviour switches (drag vs native scroll), NOT for
 * layout — layout belongs to CSS breakpoints, which never mismatch.
 *
 * @param {string} query e.g. '(min-width: 768px)'
 * @returns {boolean}
 */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(query);
        setMatches(mql.matches);
        const onChange = (e) => setMatches(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);

    return matches;
};
