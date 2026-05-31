// Pending-concept handoff — carries the film concept a logged-out user typed
// in the hero composer across the login wall, so their effort isn't lost.
//
// sessionStorage is the durable channel: it survives a full navigation and an
// OAuth redirect round-trip (where router state would be dropped). The login
// screen prefers fresh router state when present, then falls back to this.
export const PENDING_CONCEPT_KEY = 'fz:pending-concept';

export const savePendingConcept = (text) => {
    try {
        sessionStorage.setItem(PENDING_CONCEPT_KEY, text);
    } catch {
        // Storage unavailable (private mode, quota) — non-fatal; the router
        // state still carries the concept for the immediate navigation.
    }
};

export const readPendingConcept = () => {
    try {
        return sessionStorage.getItem(PENDING_CONCEPT_KEY) || '';
    } catch {
        return '';
    }
};
