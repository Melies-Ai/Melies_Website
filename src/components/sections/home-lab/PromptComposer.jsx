import React, { useState, useRef, useCallback } from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { savePendingConcept } from '../../../lib/pendingConcept';

// PromptComposer — a film-concept prompt box that mirrors the REAL Fantazia
// chat input from the platform (app/components/chat/chat-input.tsx): a solid
// white card with a hairline gray-200 border, an auto-growing textarea, and a
// dark up-arrow send button. Reusing the product's actual composer makes the
// hero feel like a direct step into the app rather than a marketing mock.
//
// Lab-local: it's the centerpiece of the alternative-hero experiments, so it
// lives in /home-lab and is shared across hero variants rather than extracted
// to the global component set.
//
// On submit, the typed concept is carried across to /login (sessionStorage +
// router state) so the login screen can show "we kept it" — the effort never
// gets thrown away. Empty submits are allowed: the arrow still steps the user
// into the login/create flow.
// `arrow` picks the send-button glyph ('up' = platform-style, 'right' = classic
// send). `surfaceClassName` swaps the card's background/border so variants can
// reuse this exact composer behaviour under a different skin (e.g. Variant C's
// frosted-cream surface) — default keeps the solid-white platform look.
const PromptComposer = ({
    placeholder = 'Describe your film concept…',
    className = '',
    arrow = 'up',
    surfaceClassName = 'border border-gray-200 bg-white shadow-heavy',
}) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);
    const navigate = useNavigate();
    const ArrowIcon = arrow === 'right' ? ArrowRight : ArrowUp;

    const handleSubmit = useCallback(() => {
        const concept = value.trim();
        if (concept) savePendingConcept(concept);
        navigate('/login', { state: concept ? { concept } : undefined });
    }, [value, navigate]);

    // Enter submits; Shift+Enter inserts a newline — same convention as the
    // platform chat input.
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    // Auto-grow the textarea up to a cap as the user types — same behaviour as
    // the platform composer (which caps at 150px; a touch taller here since the
    // hero has the room).
    const handleInput = useCallback(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
        }
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            // Clicking anywhere on the card focuses the textarea (cursor-text +
            // onClick), exactly like the platform input.
            onClick={() => textareaRef.current?.focus()}
            className={`w-full cursor-text rounded-2xl ${surfaceClassName} p-3 text-left ${className}`}
        >
            <label htmlFor="film-concept" className="sr-only">
                Film concept
            </label>
            <textarea
                id="film-concept"
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                placeholder={placeholder}
                rows={1}
                className="w-full resize-none bg-transparent px-1 py-1 text-base leading-relaxed text-gray-900 placeholder-gray-400 outline-none"
            />

            <div className="mt-2 flex items-center justify-end">
                <button
                    type="submit"
                    aria-label="Generate"
                    className="shrink-0 w-9 h-9 rounded-lg bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                    <ArrowIcon size={18} />
                </button>
            </div>
        </form>
    );
};

export default PromptComposer;
