import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { cn } from '../lib/cn';

// CTASection — terminal section template for pages.
//
// Composition:
//   eyebrow (optional, mono uppercase) → title → description → primary CTA
//   (optional secondary action)
//
// All children are optional except `title` so callers can compose:
//   - title only:               minimal hero block
//   - title + cta:               most common, was the original CTASection
//   - eyebrow + title + cta:    structured launch / announcement section
//   - title + cta + secondary:  primary + alt path (e.g. waitlist + docs link)

const ALIGNMENTS = {
    center: 'text-center items-center',
    left: 'text-left items-start',
};

const SURFACES = {
    default: '',
    'paper-light': 'surface-section',
    paper: 'surface-page',
    card: 'surface-card',
};

// Render the action through Button's polymorphic Link/anchor support so the
// destination is a real, crawlable href in the rendered DOM (good for SEO,
// open-in-new-tab, middle-click, link-graph). External URLs go via `href`,
// internal routes via react-router `to`. Without a destination we fall back
// to a plain <button onClick> for non-navigation actions.
const SectionAction = ({ action, withArrow }) => {
    if (!action) return null;
    const isExternal = action.href?.startsWith('http');
    const linkProps = action.href
        ? isExternal
            ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
            : { to: action.href }
        : { onClick: action.onClick };
    return (
        <Button
            variant={action.variant ?? 'primary'}
            className="px-10 py-5 text-xl"
            {...linkProps}
        >
            {action.text}
            {withArrow && (
                <ArrowRight className="w-0 opacity-0 -translate-x-2 ml-0 group-hover:ml-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            )}
        </Button>
    );
};

const CTASection = ({
    // Content
    eyebrow,
    title,
    description,
    // Actions
    primaryAction,
    secondaryAction,
    // Layout
    align = 'center',
    surface = 'default',
    showArrow = true,
    className = '',
    // ─── Legacy props (kept for back-compat with existing callers) ───
    buttonText,
    buttonLink,
    buttonVariant = 'primary',
}) => {
    // Coerce legacy buttonText/buttonLink/buttonVariant into primaryAction
    const primary = primaryAction ?? (buttonText
        ? { text: buttonText, href: buttonLink, variant: buttonVariant }
        : null);

    const alignClasses = ALIGNMENTS[align] ?? ALIGNMENTS.center;
    const surfaceClass = SURFACES[surface] ?? '';

    return (
        <section className={cn('py-32 px-4', surfaceClass, className)}>
            <div className={cn('max-w-5xl mx-auto flex flex-col gap-8', alignClasses)}>
                {eyebrow && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-badge font-mono uppercase tracking-[0.3em] text-faint"
                    >
                        {eyebrow}
                    </motion.div>
                )}

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-medium tracking-tighter text-strong"
                >
                    {title}
                </motion.h2>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn('text-xl text-muted max-w-2xl font-light', align === 'center' && 'mx-auto')}
                    >
                        {description}
                    </motion.p>
                )}

                {(primary || secondaryAction) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={cn('flex flex-col md:flex-row gap-4 mt-4', align === 'center' && 'justify-center')}
                    >
                        <SectionAction action={primary} withArrow={showArrow} />
                        {secondaryAction && <SectionAction action={secondaryAction} withArrow={false} />}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default CTASection;
