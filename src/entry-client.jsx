// Client entry — hydrates the prerendered HTML in production, or simply
// renders the SPA in dev. Same fonts and global styles as before.

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/im-fell-english/latin-400.css';

import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

const root = document.getElementById('root');
const tree = (
    <StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </StrictMode>
);

// If the server prerendered something into #root, hydrate. Otherwise
// (dev or empty shell) render fresh.
if (root.hasChildNodes()) {
    hydrateRoot(root, tree);
} else {
    createRoot(root).render(tree);
}
