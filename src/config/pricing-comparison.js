// Plan-comparison tables used by the comparison section on /pricing.
//
// Four tabs (Credits & Output, Speed, Quality, Rights). Each tab has a
// label, a list of rows, and the same 6 columns in the same order as the
// main PLANS registry. Values are either:
//   - boolean true  → rendered as a checkmark
//   - boolean false → rendered as an em dash
//   - string        → rendered verbatim (left-padded for alignment)
//
// All copy from brief v2 §8. Values are provisional; confirm with the
// product team before publication.

export const COMPARISON_COLUMNS = [
    { id: 'explore', label: 'Explore' },
    { id: 'creator', label: 'Creator' },
    { id: 'director', label: 'Director' },
    { id: 'studio', label: 'Studio' },
    { id: 'production', label: 'Production' },
    { id: 'atelier', label: 'Atelier' },
];

export const COMPARISON_TABS = [
    {
        id: 'credits',
        label: 'Credits & Output',
        rows: [
            { label: 'Monthly credits', values: ['80', '1,000', '3,000', '6,000', '18,000', '50,000'] },
            {
                label: 'Equivalent monthly output',
                values: [
                    'First scene',
                    '~20 clips or 1 short film',
                    '~60 clips or 3 short films',
                    '~120 clips or 6 short films',
                    '~360 clips or 18 short films',
                    '~1,000 clips or 50 short films',
                ],
            },
            { label: 'Cost per extra clip', values: ['N/A', '~$0.80', '~$0.65', '~$0.55', '~$0.45', '~$0.35'] },
            { label: 'Credit rollover', values: ['No', 'No', '1 month', '2 months', '3 months', '6 months'] },
            { label: 'Top-up credits available', values: [false, true, true, true, true, true] },
        ],
    },
    {
        id: 'speed',
        label: 'Speed & Performance',
        rows: [
            { label: 'Parallel generations', values: ['1', '3', '5', '10', '20', '30'] },
            { label: 'Queue priority', values: ['Standard', 'Priority', 'Fast', 'Fastest', 'Dedicated', 'Dedicated max'] },
            { label: 'Project history retention', values: ['7 days', '30 days', '1 year', 'Unlimited', 'Unlimited', 'Unlimited'] },
        ],
    },
    {
        id: 'quality',
        label: 'Quality & Models',
        rows: [
            { label: 'Standard models', values: [true, true, true, true, true, true] },
            { label: 'Premium models', values: [false, true, true, true, true, true] },
            { label: 'Cinematic models', values: [false, false, true, true, true, true] },
            { label: 'Early access to new models', values: [false, false, false, true, true, 'All betas'] },
            { label: 'Brand-locked LoRAs', values: [false, false, false, false, false, true] },
            { label: 'Export resolution', values: ['SD', 'HD', 'HD', '4K', '4K + ProRes', '4K + ProRes + masters'] },
        ],
    },
    {
        id: 'rights',
        label: 'Rights & Support',
        rows: [
            { label: 'Watermark', values: [true, false, false, false, false, false] },
            { label: 'Commercial license', values: [false, true, true, true, true, true] },
            { label: 'Team seats', values: ['1', '1', '1', '1', '3', '10'] },
            {
                label: 'Early access to Fable, Citizen, Oasis',
                values: ['No', 'No', 'Yes', 'Yes, priority', 'Yes, priority', 'Yes, highest priority'],
            },
            {
                label: 'Support',
                values: ['Community', 'Community', 'Email', 'Priority email', 'Priority chat + email', 'Dedicated success manager'],
            },
        ],
    },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
    {
        id: 'what-is-a-credit',
        q: 'What is a credit, exactly?',
        a: 'A credit is the unit Fantazia uses to generate visual content. Different actions consume different amounts of credits depending on model and output quality. Most short cinematic clips cost between 30 and 60 credits.',
    },
    {
        id: 'rollover',
        q: 'Do unused credits roll over?',
        a: 'On Creator, credits reset every month. On Director, unused credits roll over for one month. On Studio, two months. On Production, three months. On Atelier, six months. Top-up credits never expire.',
    },
    {
        id: 'extra-credits',
        q: 'Can I buy extra credits without upgrading?',
        a: 'Yes. Once you have a paid plan, you can purchase credit top-ups anytime from the Billing section of your dashboard. Top-up credits never expire.',
    },
    {
        id: 'out-of-credits',
        q: 'What happens when I run out of credits mid-month?',
        a: 'You can either wait for the next monthly reset, buy a top-up from your dashboard, or upgrade to a higher plan. Your projects and history remain accessible at all times.',
    },
    {
        id: 'studio-vs-production-vs-atelier',
        q: 'What is the difference between Studio, Production and Atelier?',
        a: 'Studio is built for solo creators or small agencies running sustained output. Production adds team seats, dedicated processing, and higher volume for production houses running multiple projects. Atelier is for studios producing series, franchises, and IP at scale, with brand-locked LoRAs, 10 team seats, and the highest priority on the platform.',
    },
    {
        id: 'commercial-use',
        q: 'Can I use what I generate commercially? Do I own my outputs?',
        a: 'Yes. All paid plans include a commercial license. You own the outputs you generate, with full rights to use them in client work, products, films, and campaigns.',
    },
    {
        id: 'watermarks',
        q: 'Are generations watermarked?',
        a: 'Only on the Explore plan. Creator, Director, Studio, Production, and Atelier exports are watermark free.',
    },
    {
        id: 'cancel',
        q: 'Can I cancel, downgrade or pause anytime?',
        a: 'Yes. There are no commitments. You can change your plan, pause your subscription, or cancel at any time from your account settings. All billing is managed securely through Stripe.',
    },
    {
        id: 'refund',
        q: 'Is there a refund policy?',
        a: 'Yes. We offer a 7-day refund window on your first paid month. After that, plans renew monthly or yearly depending on your choice.',
    },
    {
        id: 'models',
        q: 'What is the difference between Standard, Premium and Cinematic models?',
        a: 'Standard models are fast and great for exploration. Premium models deliver higher fidelity and finer artistic control. Cinematic models are tuned for film-grade output, with stronger consistency across characters, lighting, and shots.',
    },
    {
        id: 'priority-queue',
        q: 'What does Priority queue actually mean?',
        a: 'On Creator your generations are routed through a priority lane. Director gets a faster lane on top of that. Studio gets the fastest available queue. Production and Atelier get dedicated processing lanes, reducing wait time even during high traffic.',
    },
    {
        id: 'which-plan',
        q: 'Which plan should I choose?',
        a: 'Choose Explore to try the engine. Choose Creator if you produce a short project once a month. Choose Director if you produce consistently every week. Choose Studio if you produce at scale or need 4K masters. Choose Production for production houses with team needs. Choose Atelier if you produce series, franchises, or IP at scale with custom style training.',
    },
    {
        id: 'price-increase',
        q: 'Will prices increase later?',
        a: 'Yes. As we add Fable, Citizen, and Oasis to the platform in 2026, our pricing will evolve. If you subscribe today, you lock in Founding Creator pricing for life on your current plan.',
    },
    {
        id: 'payment-methods',
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards, Apple Pay and Google Pay through secure Stripe checkout. Subscriptions are billed monthly or yearly from the day you subscribe, and you can update your payment method anytime from your dashboard.',
    },
];

/**
 * Build a schema.org FAQPage object from FAQ_ITEMS, ready to pass to
 * the SEO component's `structuredData` prop.
 */
export const faqJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
        },
    })),
});
