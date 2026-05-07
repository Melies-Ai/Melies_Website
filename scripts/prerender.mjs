// Prerender each route to static HTML.
//
// Pipeline (called by `npm run build`):
//   1. `vite build` produces dist/ (client) with index.html + assets
//   2. `vite build --ssr src/entry-server.jsx` produces dist-ssr/entry-server.js
//   3. This script imports the SSR bundle, renders each route to a string,
//      hoists the head tags React 19 leaves in the body up to <head>, and
//      writes dist/<route>/index.html
//
// Crawlers without JS see the prerendered HTML; the client hydrates on top.
// React 19 hoists <title>/<meta>/<link>/JSON-LD <script> from anywhere in
// the tree to <head> at runtime — but only when streamed. With
// renderToString these stay inline, so we hoist them manually here.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const SSR_BUNDLE = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const ROUTES = ['/', '/spark', '/fable', '/citizen', '/oasis', '/pricing', '/terms', '/privacy'];

const log = (msg) => console.log(`[prerender] ${msg}`);

// Match self-contained head tags rendered into the body by React 19. We
// keep things tight: <title>...</title>, <meta ... />, <link ... />, and
// <script type="application/ld+json">...</script>. Anything else stays
// in the body.
const HEAD_TAG_PATTERNS = [
    /<title\b[^>]*>[^<]*<\/title>/g,
    /<meta\b[^>]*\/?>/g,
    /<link\b[^>]*\/?>/g,
    /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,
];

function extractHeadTags(bodyHtml) {
    const tags = [];
    let cleaned = bodyHtml;
    for (const re of HEAD_TAG_PATTERNS) {
        cleaned = cleaned.replace(re, (match) => {
            tags.push(match);
            return '';
        });
    }
    return { headTags: tags, body: cleaned };
}

async function main() {
    const templatePath = path.join(DIST_DIR, 'index.html');
    const template = await fs.readFile(templatePath, 'utf8');

    const { render } = await import(pathToFileURL(SSR_BUNDLE).href);

    for (const url of ROUTES) {
        const { html: rawHtml } = render(url);
        const { headTags, body } = extractHeadTags(rawHtml);

        // Pick out <title> from the extracted head tags so we can replace
        // the static one in the template (multiple <title> in <head> is
        // invalid; we keep the page-specific one).
        const titleTag = headTags.find((t) => t.startsWith('<title')) ?? '';
        const otherHeadTags = headTags.filter((t) => !t.startsWith('<title'));

        let pageHtml = template;

        if (titleTag) {
            pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, titleTag);
        }

        // Drop the static index.html `<meta name="description">` if the
        // hoisted page tags include one — avoids duplicate meta descriptions
        // (Codex specifically flagged this).
        const hasDescription = otherHeadTags.some((t) => /name="description"/.test(t));
        if (hasDescription) {
            pageHtml = pageHtml.replace(/\s*<meta\s+name="description"[^>]*\/?>/g, '');
            // Also drop og:description / twitter:description from index.html;
            // page versions are richer.
            pageHtml = pageHtml.replace(/\s*<meta\s+property="og:(?:title|description|type|url)"[^>]*\/?>/g, '');
            pageHtml = pageHtml.replace(/\s*<meta\s+name="twitter:card"[^>]*\/?>/g, '');
        }

        // Inject hoisted tags before </head>. Indent for readability in the
        // generated file even though it doesn't matter for the parser.
        const headInsert = otherHeadTags.map((t) => `    ${t}`).join('\n');
        pageHtml = pageHtml.replace('</head>', `${headInsert}\n  </head>`);

        // Inject prerendered body into #root. React 19 hydration will pick
        // up matching DOM and avoid replacing it.
        pageHtml = pageHtml.replace(
            '<div id="root"></div>',
            `<div id="root">${body}</div>`,
        );

        const outDir = url === '/' ? DIST_DIR : path.join(DIST_DIR, url);
        await fs.mkdir(outDir, { recursive: true });
        await fs.writeFile(path.join(outDir, 'index.html'), pageHtml, 'utf8');
        log(`✓ ${url} → ${path.relative(ROOT, path.join(outDir, 'index.html'))}`);
    }

    log(`Prerendered ${ROUTES.length} routes.`);
}

main().catch((err) => {
    console.error('[prerender] failed:', err);
    process.exit(1);
});
