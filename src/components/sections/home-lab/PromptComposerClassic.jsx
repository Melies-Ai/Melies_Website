import React, { useState, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { savePendingConcept } from '../../../lib/pendingConcept';

// PromptComposerClassic — the ORIGINAL hero composer (Variant A as it was before
// we reworked it to mirror the platform chat input). Kept verbatim so the two
// looks can be compared side-by-side in the lab: a bright frosted-cream panel
// with a fixed 2-row textarea and an accent (taupe) right-arrow send button.
//
// Identical behaviour to the live composer: on submit the typed concept is
// carried across to /login (sessionStorage + router state) so the login screen
// can show "we kept it".
//
// NOTE: uses a generated id (useId) rather than the original hard-coded
// "film-concept" so it can coexist on the same lab page as the new composer
// without duplicate-id collisions.
const PromptComposerClassic = ({ placeholder = 'Describe your film concept…', className = '' }) => {
    const [value, setValue] = useState('');
    const inputId = useId();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const concept = value.trim();
        if (concept) savePendingConcept(concept);
        navigate('/login', { state: concept ? { concept } : undefined });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full rounded-[28px] bg-white/85 backdrop-blur-2xl border border-white/50 shadow-heavy p-4 md:p-5 text-left ${className}`}
        >
            <label htmlFor={inputId} className="sr-only">
                Film concept
            </label>
            <textarea
                id={inputId}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                rows={2}
                className="w-full resize-none bg-transparent px-2 pt-1 pb-4 text-lg leading-relaxed text-strong placeholder:text-faint outline-none"
            />

            <div className="flex items-center justify-end">
                <button
                    type="submit"
                    aria-label="Generate"
                    className="shrink-0 w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                    <ArrowRight size={18} />
                </button>
            </div>
        </form>
    );
};

export default PromptComposerClassic;
