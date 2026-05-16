// Minimal analytics shim.
//
// Pushes events to window.dataLayer (GTM-compatible). If no provider is
// wired, logs to console in development so events stay visible.
//
// Drop the GTM / GA4 / posthog snippet in index.html when ready; no
// other code change is needed — the events already flow.

export const track = (event, params = {}) => {
    if (typeof window === 'undefined') return;

    const payload = { event, ...params, timestamp: Date.now() };

    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
        return;
    }

    if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug('[analytics]', event, params);
    }
};
