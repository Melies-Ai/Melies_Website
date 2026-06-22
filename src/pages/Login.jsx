import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Film, Lightbulb, Check, Loader2, Users, MapPin, BookOpen } from 'lucide-react';
import { readPendingConcept } from '../lib/pendingConcept';
import SEO from '../components/SEO';

// Left-panel backdrop: the enchanted-portal scene (an ivy-framed archway
// opening onto a sparkling fairytale realm) — a "step through into your story"
// mood for the sign-in. Square 1254² source, so we cap srcset at native width
// to avoid upscaling. Same responsive query convention as the rest of the site.
import panelBg from '../assets/images/home/login-portal.webp?w=1254&format=webp';
import panelBgSrcSet from '../assets/images/home/login-portal.webp?w=640;900;1254&format=webp&as=srcset';

// GoogleIcon — lucide has no Google brand glyph, so we inline the official
// four-colour "G". Same convention as src/components/SocialIcons.jsx (a small
// functional component taking size + className), but coloured per-path rather
// than via currentColor since the mark is intentionally multi-hue.
const GoogleIcon = ({ size = 18, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
        />
        <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
        />
        <path
            fill="#FBBC05"
            d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
        />
        <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
        />
    </svg>
);

// Sample first prompt shown when the visitor arrives without a carried concept
// (e.g. straight to /login), so the simulated chat still reads naturally instead
// of an empty placeholder.
const SAMPLE_PROMPT = 'A lighthouse keeper who discovers the sea is alive.';
// Scripted follow-ups after the user's own first line. Intentionally generic so
// the exchange reads naturally for ANY opening prompt. This is a pure animation,
// NOT a real model call (no LLM here, just motion).
//
// The SECOND assistant turn is an `activity` block instead of a plain line: it
// stages the agent "working" — running tools (a step with a spinner that
// resolves to a check, an insight it derives) and then materialising a grid of
// artifact cards (characters, locations, story, the opening scene) so the demo
// reads as "we build a whole world", not just one shot. Purely choreographed;
// it shows the product's working surface, not a real run.
const FOLLOW_UPS = [
    { from: 'assistant', text: 'Love it. Let me build the whole world around it.' },
    { from: 'user', text: 'Make it feel cinematic.' },
    {
        from: 'assistant',
        kind: 'activity',
        steps: [
            { type: 'tool', label: 'Casting characters, designing locations' },
            { type: 'tool', label: 'Outlining the story, scene by scene' },
            { type: 'insight', label: 'One consistent world — every face, place, and beat.' },
        ],
        // Each card maps to an ARTIFACT_ICONS kind; rendered as a 2×2 grid that
        // cascades in once the working steps land.
        artifacts: [
            { kind: 'characters', title: 'Characters' },
            { kind: 'location', title: 'Locations' },
            { kind: 'story', title: 'Story' },
            { kind: 'scene', title: 'Opening Scene' },
        ],
    },
];

// Shared motion tuning — a soft custom ease for the height reveal and the inner
// dots→text crossfade, so everything feels smooth rather than snappy. We
// deliberately avoid animating opacity/transform on any ANCESTOR of a frosted
// bubble: backdrop-filter is silently disabled while an ancestor has opacity<1
// or a transform, which made the blur "snap in" only at the end of the entrance.
// Height animation doesn't create that backdrop root, so the frost stays live
// throughout the reveal.
const CHAT_EASE = [0.22, 1, 0.36, 1];

// Stream ("typing") duration for an assistant line, in ms. A steady linear
// pace scaled to length, floored/capped so very short or long lines still
// read naturally. Shared by the timeline (so the next bubble waits for the
// current line to finish typing) and by the width-grow transition.
const STREAM_MS = (text) => Math.min(1800, Math.max(800, text.length * 35));

// Width of the soft reveal edge, in em (scales with the text size). A wide
// feather so characters ease in over a broad zone rather than a hard wipe.
const STREAM_FADE = '3em';

/**
 * StreamingLine — one assistant reply that "types" itself. The text sits on a
 * single nowrap row whose width grows 0 → auto at a linear pace, so characters
 * are revealed left-to-right. A right-edge mask gradient feathers that reveal
 * so each character fades in instead of being hard-clipped at the growing
 * width. Once the line has finished typing the mask is dropped, leaving the
 * full text crisp (an always-on mask would permanently dim the last word).
 * The mask lives on the <p> itself, never an ancestor of the frosted bubble,
 * so it can't flatten the backdrop-filter.
 */
const StreamingLine = ({ text, prefersReduced }) => {
    // Reduced motion: no typing, so start "done" (no mask, full text at once).
    const [done, setDone] = useState(prefersReduced);
    const feather = !done && !prefersReduced;
    const mask = feather
        ? `linear-gradient(to right, #000 0, #000 calc(100% - ${STREAM_FADE}), transparent 100%)`
        : undefined;
    return (
        <motion.p
            initial={prefersReduced ? false : { width: 0 }}
            animate={prefersReduced ? false : { width: 'auto' }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setDone(true)}
            transition={{
                width: { duration: STREAM_MS(text) / 1000, ease: 'linear' },
                opacity: { duration: 0.3, ease: CHAT_EASE },
            }}
            style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maskImage: mask,
                WebkitMaskImage: mask,
            }}
            className="text-white text-sm leading-relaxed"
        >
            {text}
        </motion.p>
    );
};

/**
 * AgentActivity — the body of the second assistant turn. Rather than a single
 * line, it stages the agent "doing work": each step reveals in turn (a tool
 * step shows a spinner while it's the latest, then resolves to a check; an
 * insight step carries a lightbulb), and once the steps land an artifact card
 * materialises beneath them. Pure choreography — the timing is internal so the
 * sequence plays out on its own once mounted.
 *
 * Frost note: the items slide on opacity + y (transform), which is safe here
 * because they are CHILDREN of the frosted bubble, not ancestors — only an
 * ANCESTOR with transform/opacity/filter flattens a backdrop-filter. The
 * artifact card is solid (no backdrop-filter of its own), so its transform is
 * free too.
 */
const ACTIVITY_STEP_MS = 900;

// Maps an artifact card's `kind` to its glyph, so the grid reads at a glance as
// distinct deliverables (a cast, places, a script, a shot) rather than four
// identical cards.
const ARTIFACT_ICONS = {
    characters: Users,
    location: MapPin,
    story: BookOpen,
    scene: Film,
};

const AgentActivity = ({ steps, artifacts = [], prefersReduced }) => {
    // The artifact grid counts as a single phase (it cascades internally), so
    // total = working steps + 1 if there are any cards.
    const total = steps.length + (artifacts.length ? 1 : 0);
    // phase = how many items have been revealed. Start at 1 so the first step
    // is present the instant the block mounts — that keeps the bubble the same
    // height as the "thinking" dots it replaces (no empty frosted frame in
    // between). Reduced motion jumps straight to fully revealed.
    const [phase, setPhase] = useState(prefersReduced ? total : 1);

    useEffect(() => {
        if (prefersReduced || phase >= total) return undefined;
        const t = setTimeout(() => setPhase((p) => p + 1), ACTIVITY_STEP_MS);
        return () => clearTimeout(t);
    }, [phase, total, prefersReduced]);

    const reveal = {
        initial: prefersReduced ? false : { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: CHAT_EASE },
    };

    return (
        <div className="flex flex-col gap-2.5">
            {steps.map((step, i) => {
                if (i >= phase) return null;
                // The tool step spins while it's the most recent item AND more
                // is still to come; once anything lands after it (or the whole
                // sequence finishes) it resolves to a check.
                const running = step.type === 'tool' && i === phase - 1 && phase < total;
                return (
                    <motion.div key={i} {...reveal} className="flex items-center gap-2">
                        <span className="flex size-3.5 shrink-0 items-center justify-center">
                            {step.type === 'tool' ? (
                                running ? (
                                    <Loader2 className="size-3.5 animate-spin text-white/70" />
                                ) : (
                                    <Check className="size-3.5 text-white/90" />
                                )
                            ) : (
                                <Lightbulb className="size-3.5 text-white/70" />
                            )}
                        </span>
                        <span className="text-sm leading-relaxed text-white/90">{step.label}</span>
                    </motion.div>
                );
            })}

            {/* Deliverables — the world the agent just built. A 2×2 grid of
                solid cards that cascades in (staggerChildren) once the working
                steps have landed, so it reads as "characters + locations + story
                + scene", a whole kit rather than a single output. Transforms on
                these children of the frosted bubble are frost-safe; the cards are
                solid (no backdrop-filter of their own). */}
            {artifacts.length > 0 && phase > steps.length && (
                <motion.div
                    className="mt-0.5 grid grid-cols-2 gap-2"
                    initial={prefersReduced ? false : 'hidden'}
                    animate={prefersReduced ? false : 'show'}
                    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                >
                    {artifacts.map((a) => {
                        const Icon = ARTIFACT_ICONS[a.kind] || Film;
                        return (
                            <motion.div
                                key={a.kind}
                                variants={{
                                    hidden: { opacity: 0, y: 6 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.35, ease: CHAT_EASE }}
                                className="flex items-center gap-2 rounded-xl bg-white/95 px-2.5 py-2 shadow-lifted"
                            >
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#F0ECE2]">
                                    <Icon className="size-4 text-[#262220]" />
                                </span>
                                <span className="text-xs font-medium leading-tight text-[#262220]">
                                    {a.title}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
};

/**
 * ConceptConversation — a decorative, scripted chat that floats over the portal
 * image. The FIRST bubble is always the user's carried concept (or a sample if
 * they arrived without one); the rest is a generic back-and-forth. Messages
 * reveal one by one, the assistant "thinks" (pulsing dots) before each of its
 * replies, and the whole exchange loops after a pause. Pure framer-motion
 * choreography — no model call. Honours prefers-reduced-motion by rendering the
 * full exchange immediately with no motion.
 */
const ConceptConversation = ({ concept }) => {
    const prefersReduced = useReducedMotion();
    // First line = the prompt carried over from the previous page; fall back to
    // a sample so the demo still reads when there's no concept.
    const script = useMemo(
        () => [{ from: 'user', text: concept || SAMPLE_PROMPT }, ...FOLLOW_UPS],
        [concept],
    );

    // Two counters drive the timeline:
    //   visible = how many bubbles are mounted (an assistant bubble mounts first
    //             as a "thinking" dots bubble)
    //   spoken  = how many of those have had their text revealed
    // An assistant bubble appears as dots (visible ahead of spoken), then morphs
    // its own contents into text (spoken catches up) — the bubble itself never
    // unmounts. User lines have no thinking phase, so they reveal text at once.
    const [visible, setVisible] = useState(prefersReduced ? script.length : 1);
    const [spoken, setSpoken] = useState(prefersReduced ? script.length : 1);

    useEffect(() => {
        if (prefersReduced) return undefined;
        let timer;
        if (spoken < visible) {
            // A bubble is mid-"thinking" — let its dots morph into the text.
            timer = setTimeout(() => setSpoken(visible), 1300);
        } else if (visible < script.length) {
            // The line just revealed (index visible-1) may still be "typing":
            // assistant lines stream their text over STREAM_MS, user lines
            // appear at once. Wait for that stream to finish BEFORE bringing
            // in the next bubble, then add a short human beat — quick before
            // the assistant's reply, longer to mimic the user reading + typing.
            const current = script[visible - 1];
            // Only plain assistant lines "type"; the activity block (no text)
            // and user lines appear without a stream wait.
            const streamMs =
                current.from === 'assistant' && current.text ? STREAM_MS(current.text) : 0;
            const next = script[visible];
            const beat = next.from === 'assistant' ? 500 : 1200;
            timer = setTimeout(() => {
                setVisible((v) => v + 1);
                if (next.from === 'user') setSpoken((s) => s + 1);
            }, streamMs + beat);
        } else {
            // Whole exchange shown — hold, then loop back to the first line.
            // The final turn is the activity block, which now needs ~3.6s to
            // stage three working steps plus the cascading 2×2 artifact grid, so
            // we wait that out and then let the finished world-kit linger before
            // resetting.
            timer = setTimeout(() => {
                setVisible(1);
                setSpoken(1);
            }, 7500);
        }
        return () => clearTimeout(timer);
    }, [visible, spoken, prefersReduced, script]);

    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <AnimatePresence initial={false}>
                {script.slice(0, visible).map((msg, i) => {
                    const isUser = msg.from === 'user';
                    const said = i < spoken;
                    return (
                        // The wrapper never animates — not on entrance, not on
                        // exit. Both fades live on the bubbles themselves
                        // (self-opacity), so the wrapper is never an
                        // opacity/transform/filter backdrop root that would
                        // flatten the child's frost. On loop reset the bottom
                        // rows simply fade out IN PLACE — no height collapse, no
                        // upward shift: they're the last items in this
                        // top-aligned column, so fading them leaves everything
                        // above untouched, then they unmount once invisible.
                        <motion.div
                            key={i}
                            initial={false}
                            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {isUser ? (
                                <motion.div
                                    initial={prefersReduced ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: CHAT_EASE }}
                                    className="max-w-[85%] rounded-2xl bg-white/95 px-4 py-3 shadow-lifted"
                                >
                                    <p className="text-[#262220] text-sm leading-relaxed line-clamp-4">
                                        {msg.text}
                                    </p>
                                </motion.div>
                            ) : (
                                // Persistent frosted bubble. Both the entrance
                                // and exit fades are on the bubble ITSELF
                                // (self-opacity), never an ancestor — that
                                // composites the already-blurred result at a
                                // lower alpha, so the frost stays intact while it
                                // fades in AND out. Plain replies stream a single
                                // <p> (width 0 → auto), so the bubble hugs and
                                // grows; the activity turn fills the block width.
                                // Width/padding aren't backdrop-root triggers, so
                                // the frost stays live throughout.
                                <motion.div
                                    initial={prefersReduced ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: CHAT_EASE }}
                                    // All states share the same py-3 / px-4 so the
                                    // bubble height matches a one-line reply (width
                                    // and padding are frost-safe, blur stays live):
                                    //   thinking  → hugs the three dots in width,
                                    //               but a text-height line box keeps
                                    //               it as tall as a one-line reply
                                    //   activity  → full block width (the working
                                    //               surface of steps + artifact)
                                    //   plain reply → hugs its text and grows
                                    className={`rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md ${
                                        said && msg.kind === 'activity'
                                            ? 'w-full'
                                            : said
                                              ? 'max-w-[85%]'
                                              : ''
                                    }`}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {said ? (
                                            msg.kind === 'activity' ? (
                                                // Appears instantly (no whole-block
                                                // fade) so the bubble never shows as
                                                // an empty full-width bar; each
                                                // step/artifact still fades in on its
                                                // own inside AgentActivity.
                                                <motion.div
                                                    key="activity"
                                                    initial={false}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: CHAT_EASE }}
                                                >
                                                    <AgentActivity
                                                        steps={msg.steps}
                                                        artifacts={msg.artifacts}
                                                        prefersReduced={prefersReduced}
                                                    />
                                                </motion.div>
                                            ) : (
                                                <StreamingLine
                                                    key="text"
                                                    text={msg.text}
                                                    prefersReduced={prefersReduced}
                                                />
                                            )
                                        ) : (
                                            // The dots hug the three-dot cluster in
                                            // width, but sit inside a text-sized
                                            // line box (text-sm / leading-relaxed),
                                            // so the "thinking" bubble is as tall as
                                            // a one-line reply — never shorter.
                                            <motion.div
                                                key="dots"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                // Exit is instant: with mode="wait"
                                                // the reply/activity mounts only
                                                // after the dots finish exiting, so
                                                // a slow fade would leave the (now
                                                // wider) bubble looking empty. Pop
                                                // them out and the content takes
                                                // their place the same frame.
                                                exit={{ opacity: 0, transition: { duration: 0 } }}
                                                transition={{ duration: 0.2, ease: CHAT_EASE }}
                                                aria-label="Thinking"
                                            >
                                                <p className="text-sm leading-relaxed">
                                                    <span className="inline-flex items-center gap-1.5 align-middle">
                                                        {[0, 1, 2].map((d) => (
                                                            <motion.span
                                                                key={d}
                                                                className="h-1.5 w-1.5 rounded-full bg-white/80"
                                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                                transition={{
                                                                    duration: 1.1,
                                                                    repeat: Infinity,
                                                                    ease: 'easeInOut',
                                                                    delay: d * 0.18,
                                                                }}
                                                            />
                                                        ))}
                                                    </span>
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

/**
 * Login — full-bleed split-layout sign-in, modelled on the "Cofounder"
 * reference. Rendered chromeless (no global Navbar/Footer — see App.jsx
 * CHROMELESS_ROUTES) as a dedicated, distraction-free auth screen.
 *
 * LEFT: a cinematic image filling the entire half (reusing the footer image
 * for now) with a solid concept card that surfaces the film concept the user
 * typed in the hero composer. This is the payoff of the concept-handoff UX:
 * instead of the login feeling like a wall that threw their effort away, we
 * show "we kept it" right next to the form.
 *
 * RIGHT: the auth area — brand, tagline, Sign in / Sign up toggle, and SSO
 * buttons. The auth itself is an intentional placeholder (no real flow wired);
 * the buttons don't authenticate yet.
 */
const Login = () => {
    const location = useLocation();
    const prefersReduced = useReducedMotion();
    // Prefer fresh router state; fall back to the durable sessionStorage copy
    // (which survives a refresh — that's how we prove the concept was kept).
    const [concept] = useState(() => location.state?.concept || readPendingConcept());
    const [mode, setMode] = useState('signin'); // 'signin' | 'signup'

    // Soften the left portal's arrival. /login is an instant route swap, so the
    // image used to pop in ~0.2s late over a white panel. We hold a dark panel
    // underneath and fade the image in once it has decoded. The ref callback
    // covers the cached case, where onLoad doesn't refire after mount.
    const [bgLoaded, setBgLoaded] = useState(false);
    const handlePanelImg = useCallback((node) => {
        if (node && node.complete && node.naturalWidth > 0) setBgLoaded(true);
    }, []);

    const isSignup = mode === 'signup';

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            <SEO
                title="Sign in"
                description="Sign in to start generating your film with Fantazia."
                canonical="/login"
            />

            {/* LEFT — cinematic concept panel: image fills the entire half.
                Hidden on mobile (hidden lg:block): on small screens we drop the
                image so the login form is the priority — see the compact concept
                reminder in the right panel that keeps the handoff alive. */}
            <div className="relative isolate hidden lg:block lg:min-h-screen overflow-hidden bg-ink">
                {/* bg-ink on the panel is the placeholder: while the portal
                    decodes after the route swap, the half reads as a calm dark
                    panel instead of flashing white. */}
                <img
                    ref={handlePanelImg}
                    onLoad={() => setBgLoaded(true)}
                    src={panelBg}
                    srcSet={panelBgSrcSet}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    fetchPriority="high"
                    // Mirrored (scale-x-[-1]): brings the darker foliage to the
                    // top-left so the white wordmark sitting there stays legible.
                    // Fades in over the dark panel once decoded so it eases in
                    // instead of popping — instant for reduced-motion.
                    className={`absolute inset-0 -z-10 w-full h-full object-cover scale-x-[-1] transition-opacity duration-700 ease-out ${
                        bgLoaded || prefersReduced ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                {/* Overlays — the portal is the hero of this panel, so we keep
                    the centre almost clear and only darken top & bottom enough
                    to hold the accroche and wordmark legible. */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/5 to-ink/55" />

                <div className="relative flex h-full flex-col items-center px-6 pb-6 pt-[15vh] lg:px-12">
                    {/* Accroche — centered headline lowered to sit over the top
                        of the portal arch. The portal imagery is the hook; this
                        names the promise. */}
                    <h2
                        className="relative top-[6px] max-w-md text-center font-display text-3xl lg:text-4xl leading-tight text-white"
                        // Layered shadow: a tight grounded drop shadow for crisp
                        // contrast over the portal's bright glow, plus a soft halo
                        // to separate the white serif from light foliage.
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.65), 0 2px 16px rgba(0,0,0,0.45)' }}
                    >
                        Step into your story.
                    </h2>

                    {/* Simulated chat — floats just below the catchline, centered
                        over the portal. The first bubble is the user's carried
                        prompt; the rest is scripted motion (no LLM). */}
                    <div className="mt-10 w-full max-w-md">
                        <ConceptConversation concept={concept} />
                    </div>

                    {/* Brand mark — wordmark dropped to the very bottom-left. */}
                    <Link to="/" className="mt-auto self-start font-display text-2xl lowercase text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                        fantazia.ai
                    </Link>
                </div>
            </div>

            {/* RIGHT — auth area */}
            <div className="flex items-center justify-center p-8 sm:p-10 lg:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
                    className="w-full max-w-sm"
                >
                    {/* Mobile-only concept reminder — the full image/chat panel
                        is hidden on small screens to put the login first, but we
                        still surface the carried concept so the handoff isn't lost. */}
                    {concept && (
                        <div className="lg:hidden mb-6 rounded-2xl bg-paper border border-subtle px-4 py-3">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="w-4 h-4 rounded bg-gradient-to-br from-sky-300 to-blue-500 flex items-center justify-center">
                                    <Sparkles size={9} className="text-white" />
                                </span>
                                <span className="text-faint text-[11px] uppercase tracking-widest">Your concept</span>
                            </div>
                            <p className="text-strong text-sm leading-relaxed line-clamp-3">{concept}</p>
                        </div>
                    )}

                    <h1 className="text-2xl md:text-3xl font-medium text-strong tracking-tight mb-1">
                        {isSignup ? 'Create your account' : 'Welcome back'}
                    </h1>
                    <p className="text-muted text-sm mb-7">
                        {isSignup
                            ? 'Start turning concepts into films.'
                            : 'Sign in to generate your film.'}
                    </p>

                    {/* Sign in / Sign up toggle */}
                    <div className="flex p-1 rounded-full bg-paper border border-subtle mb-6">
                        <button
                            type="button"
                            onClick={() => setMode('signin')}
                            aria-pressed={!isSignup}
                            className={`flex-1 py-2 text-sm rounded-full transition-colors ${
                                !isSignup ? 'bg-white text-strong shadow-card' : 'text-muted hover:text-strong'
                            }`}
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('signup')}
                            aria-pressed={isSignup}
                            className={`flex-1 py-2 text-sm rounded-full transition-colors ${
                                isSignup ? 'bg-white text-strong shadow-card' : 'text-muted hover:text-strong'
                            }`}
                        >
                            Sign up
                        </button>
                    </div>

                    {/* Auth — Google only for now (GitHub / email removed until
                        those providers are wired up). Placeholder: no real auth. */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-default bg-white text-strong text-sm font-medium hover:border-strong transition-colors"
                    >
                        <GoogleIcon size={18} />
                        Continue with Google
                    </button>

                    {/* Terms */}
                    <p className="text-faint text-[11px] text-center mt-5 leading-relaxed">
                        By continuing you agree to our{' '}
                        <Link to="/privacy" className="underline hover:text-strong transition-colors">
                            Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link to="/terms" className="underline hover:text-strong transition-colors">
                            Terms of Service
                        </Link>
                        .
                    </p>

                    {/* Footer tagline */}
                    <p className="text-center text-muted text-sm mt-8">
                        New to Fantazia?{' '}
                        <Link to="/" className="text-strong underline hover:text-accent transition-colors">
                            Explore first
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
