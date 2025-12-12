import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-medium mb-4 text-ink">{title}</h2>
        <div className="text-ink/80 leading-relaxed space-y-4 text-sm md:text-base">
            {children}
        </div>
    </div>
);

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 px-6 bg-paper min-h-screen"
        >
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-medium mb-4 text-ink tracking-tight">Privacy Policy</h1>
                <p className="text-ink/60 mb-16">Last Updated: December 2025</p>

                <Section title="1. Introduction">
                    <p>MELIES TECHNOLOGIES ("we," "us," or "our"), operating Melies.ai, is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered video creation service.</p>
                    <p>This Privacy Policy complies with the General Data Protection Regulation (GDPR) (EU Regulation 2016/679) and the French Data Protection Act (Loi Informatique et Libertés).</p>
                    <div className="bg-black/5 p-6 rounded-lg mt-4 text-sm">
                        <p className="font-medium mb-2">Data Controller Information</p>
                        <ul className="space-y-1 text-ink/70">
                            <li>Company Name: MELIES TECHNOLOGIES</li>
                            <li>Legal Form: Société par actions simplifiée (SAS)</li>
                            <li>Registration Number: 94113277100010</li>
                            <li>Registered Office: QUAI DE RIVE NEUVE, 13007 MARSEILLE</li>
                            <li>Contact Email: contact@melies.ai</li>
                        </ul>
                    </div>
                </Section>

                <Section title="2. Data We Collect">
                    <h3 className="font-medium text-ink mt-4 mb-2">2.1 Information You Provide Directly</h3>

                    <strong className="block text-ink mt-4">Account Information (via Google Sign-In):</strong>
                    <p>Google Account ID, email address, name, profile picture (optional), and locale/language preferences.</p>

                    <strong className="block text-ink mt-4">Content You Create:</strong>
                    <p>Text prompts submitted for video generation, images uploaded for video creation, generated video content, and metadata associated with your content.</p>

                    <strong className="block text-ink mt-4">Communications:</strong>
                    <p>Messages you send us (support requests, feedback, inquiries) and your responses to surveys.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">2.2 Information We Collect Automatically</h3>

                    <strong className="block text-ink mt-4">Usage Data:</strong>
                    <p>Pages visited, features used, time and duration of visits, videos generated, error logs, and referral source.</p>

                    <strong className="block text-ink mt-4">Device and Browser Information:</strong>
                    <p>IP address, browser type and version, operating system, device type, screen resolution, and time zone.</p>

                    <strong className="block text-ink mt-4">Cookies:</strong>
                    <p>Session cookies for authentication and analytics cookies (see Section 9).</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">2.3 Information from Third Parties</h3>
                    <p>When you authenticate with Google, we receive the information you authorize Google to share with us, typically including your Google ID, email address, and basic profile information.</p>
                </Section>

                <Section title="3. Legal Basis for Processing (GDPR)">
                    <h3 className="font-medium text-ink mt-4 mb-2">Contractual Necessity (Article 6(1)(b)):</h3>
                    <p>Processing necessary to provide the video generation service, account management, and content delivery.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">Legitimate Interests (Article 6(1)(f)):</h3>
                    <p>Service improvement, security and fraud prevention, analytics, and internal research.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">Consent (Article 6(1)(a)):</h3>
                    <p>Optional marketing communications, non-essential cookies, and use of your content for promotional purposes.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">Legal Obligation (Article 6(1)(c)):</h3>
                    <p>Compliance with legal requirements and responding to legal requests.</p>
                </Section>

                <Section title="4. How We Use Your Data">
                    <h3 className="font-medium text-ink mt-4 mb-2">Service Provision:</h3>
                    <p>Create and manage your account, authenticate via Google Sign-In, process video generation requests, store and deliver content, provide customer support, and communicate service updates.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">AI Model Processing:</h3>
                    <p>Process your prompts and images through our AI models to generate video content.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">Service Improvement:</h3>
                    <p>Analyze usage patterns, identify and fix bugs, develop new features, and conduct research.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">Security:</h3>
                    <p>Monitor for suspicious activity, prevent abuse, and enforce our Terms and Conditions.</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">Legal Compliance:</h3>
                    <p>Comply with applicable laws, respond to legal requests, and exercise or defend legal claims.</p>
                </Section>

                <Section title="5. Data Sharing and Disclosure">
                    <p>We do not sell your personal data. We may share your data with service providers who assist us in operating our service, when required by law, in the event of a business transfer, or with your explicit consent.</p>
                </Section>

                <Section title="6. International Data Transfers">
                    <p>Our primary servers are located in the European Union (IONOS, Germany/France). Certain data may be processed by the following providers:</p>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs font-semibold text-ink bg-black/5 uppercase">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Provider</th>
                                    <th className="px-4 py-3">Purpose</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3 rounded-tr-lg">Safeguard</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/10">
                                <tr className="bg-transparent">
                                    <td className="px-4 py-3 font-medium">IONOS SE</td>
                                    <td className="px-4 py-3">Hosting</td>
                                    <td className="px-4 py-3">EU (Germany)</td>
                                    <td className="px-4 py-3">No transfer outside EU</td>
                                </tr>
                                <tr className="bg-transparent">
                                    <td className="px-4 py-3 font-medium">Google LLC</td>
                                    <td className="px-4 py-3">Authentication</td>
                                    <td className="px-4 py-3">USA</td>
                                    <td className="px-4 py-3">EU-US Data Privacy Framework</td>
                                </tr>
                                <tr className="bg-transparent">
                                    <td className="px-4 py-3 font-medium">Google LLC</td>
                                    <td className="px-4 py-3">Analytics</td>
                                    <td className="px-4 py-3">USA</td>
                                    <td className="px-4 py-3">EU-US Data Privacy Framework</td>
                                </tr>
                                <tr className="bg-transparent">
                                    <td className="px-4 py-3 font-medium">Stripe Inc</td>
                                    <td className="px-4 py-3">Payment</td>
                                    <td className="px-4 py-3">USA</td>
                                    <td className="px-4 py-3">EU-US DPF + SCCs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-ink/60">For details on safeguards or to request copies of applicable Standard Contractual Clauses, contact contact@melies.ai.</p>
                </Section>

                <Section title="7. Data Retention">
                    <ul className="list-disc pl-5 mt-1 space-y-2">
                        <li><strong>Account Data:</strong> Retained while your account is active; deleted within 30 days of account closure.</li>
                        <li><strong>Generated Content:</strong> Videos stored until you delete them. Prompts and uploaded images retained for 90 days.</li>
                        <li><strong>Usage Data:</strong> Retained for 24 months.</li>
                        <li><strong>Communication Records:</strong> Support requests retained for 3 years; marketing communications until unsubscribe.</li>
                        <li><strong>Legal Records:</strong> As required by law (typically 5-10 years).</li>
                    </ul>
                </Section>

                <Section title="8. Your Rights Under GDPR">
                    <p>As a data subject under GDPR, you have the following rights: Right of Access, Right to Rectification, Right to Erasure, Right to Restriction, Right to Data Portability, Right to Object, Right to Withdraw Consent, and Right Not to Be Subject to Automated Decision-Making.</p>

                    <div className="mt-6 bg-black/5 p-6 rounded-lg">
                        <p className="mb-2">To exercise any of these rights, please contact us at:</p>
                        <p className="font-mono text-sm font-medium">contact@melies.ai</p>
                        <p className="mt-4 text-sm text-ink/60">We aim to respond within 30 days. You also have the right to lodge a complaint with the CNIL (Commission Nationale de l'Informatique et des Libertés).</p>
                    </div>
                </Section>

                <Section title="9. Cookies and Tracking Technologies">
                    <p>We use a limited number of cookies:</p>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs font-semibold text-ink bg-black/5 uppercase">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Cookie</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Purpose</th>
                                    <th className="px-4 py-3 rounded-tr-lg">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/10">
                                <tr className="bg-transparent">
                                    <td className="px-4 py-3 font-medium">Session cookie</td>
                                    <td className="px-4 py-3">Strictly necessary</td>
                                    <td className="px-4 py-3">Maintain login</td>
                                    <td className="px-4 py-3">Session</td>
                                </tr>
                                <tr className="bg-transparent">
                                    <td className="px-4 py-3 font-medium">Google Analytics</td>
                                    <td className="px-4 py-3">Analytics</td>
                                    <td className="px-4 py-3">Site usage</td>
                                    <td className="px-4 py-3">Up to 2 years</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4">Strictly necessary cookies cannot be disabled as they are essential for the Service to function.</p>
                    <p className="mt-2">Analytics cookies require your consent. You can manage your preferences through your browser settings. Refusing analytics cookies will not affect your access to the Service.</p>
                    <p className="mt-2">For more information about Google Analytics, visit: <a href="https://policies.google.com/privacy" className="underline hover:text-ink">https://policies.google.com/privacy</a></p>
                </Section>

                <Section title="10. Data Security">
                    <p>We implement strong technical measures (encryption, firewalls) and organizational measures (training, access controls) to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
                </Section>

                <Section title="11. Children's Privacy">
                    <p>Our Service is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children.</p>
                </Section>

                <Section title="12. Use of Your Data for Service Improvement">
                    <p><span className="font-medium">What we use:</span> We may use the text prompts you submit to improve our AI systems and service quality.</p>
                    <p className="mt-2"><span className="font-medium">What we do NOT use:</span> We do not use your uploaded images or generated videos for AI training purposes.</p>
                    <p className="mt-2"><span className="font-medium">How we protect you:</span> Prompts used for improvement are stripped of any personal identifiers. This processing is based on our legitimate interest in improving the Service. You may opt out at any time by contacting contact@melies.ai.</p>
                    <p className="mt-2 text-sm text-ink/60">Note: Opting out will not affect prompts already processed but will apply to future submissions.</p>
                </Section>

                <Section title="13. Third-Party Links">
                    <p>Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these sites.</p>
                </Section>

                <Section title="14. Changes to This Policy">
                    <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes acceptance of the updated policy.</p>
                </Section>

                <Section title="15. Contact Us">
                    <p>For questions about this Privacy Policy, please contact us at:</p>
                    <div className="mt-4 bg-black/5 p-4 rounded text-sm font-mono text-ink/80">
                        <p>Email: contact@melies.ai</p>
                        <p>Postal Address: QUAI DE RIVE NEUVE, 13007 MARSEILLE</p>
                    </div>
                </Section>

                <Section title="16. Additional Information for French Users">
                    <ul className="list-disc pl-5 mt-1 space-y-2">
                        <li><strong>Legal Framework:</strong> This policy complies with GDPR and the French Loi Informatique et Libertés.</li>
                        <li><strong>Direct Marketing:</strong> B2B communications operate on opt-out basis; B2C communications require opt-in consent.</li>
                        <li><strong>Deceased Persons:</strong> You may provide instructions for post-mortem handling of your data.</li>
                    </ul>
                </Section>

                <p className="text-sm text-ink/40 mt-16 pt-8 border-t border-black/10">
                    By using Melies.ai, you acknowledge that you have read, understood, and agree to the collection and use of your information as described in this Privacy Policy.
                </p>
            </div>
        </motion.div>
    );
};

export default Privacy;
