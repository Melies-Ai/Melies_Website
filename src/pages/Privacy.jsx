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
                <p className="text-ink/60 mb-16">Last Updated: 08/10/2025</p>

                <Section title="1. Introduction">
                    <p>MELIES TECHNOLOGIES ("we," "us," or "our"), operating Melies.ai, is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered video creation service.</p>
                    <p>This Privacy Policy complies with the General Data Protection Regulation (GDPR) (EU Regulation 2016/679) and the French Data Protection Act (Loi Informatique et Libertés).</p>
                    <div className="bg-black/5 p-6 rounded-lg mt-4 text-sm">
                        <p className="font-medium mb-2">Data Controller Information:</p>
                        <ul className="space-y-1 text-ink/70">
                            <li>Company Name: MELIES TECHNOLOGIES</li>
                            <li>Legal Form: société par actions simplifiée</li>
                            <li>Registration Number: 94113277100010</li>
                            <li>Registered Office: QUAI DE RIVE NEUVE, 13007 MARSEILLE</li>
                            <li>Contact Email: contact@melies.ai</li>
                            <li>Privacy Contact: privacy@melies.ai</li>
                        </ul>
                    </div>
                </Section>

                <Section title="2. Data We Collect">
                    <h3 className="font-medium text-ink mt-4 mb-2">2.1 Information You Provide Directly</h3>

                    <strong className="block text-ink mt-4">Account Information (via Google Sign-In):</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Google Account ID (unique identifier)</li>
                        <li>Email address</li>
                        <li>Name (as registered with Google)</li>
                        <li>Profile picture (optional, from Google)</li>
                        <li>Locale/language preferences</li>
                    </ul>

                    <strong className="block text-ink mt-4">Content You Create:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Text prompts submitted for video generation</li>
                        <li>Images uploaded for video creation</li>
                        <li>Generated video content</li>
                        <li>Metadata associated with your content (creation date, settings used)</li>
                    </ul>

                    <strong className="block text-ink mt-4">Communications:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Messages you send us (support requests, feedback, inquiries)</li>
                        <li>Your responses to surveys or questionnaires</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">2.2 Information We Collect Automatically</h3>

                    <strong className="block text-ink mt-4">Usage Data:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Pages visited and features used</li>
                        <li>Time and duration of your visits</li>
                        <li>Videos generated (number, frequency)</li>
                        <li>Error logs and diagnostic data</li>
                        <li>Referral source</li>
                    </ul>

                    <strong className="block text-ink mt-4">Device and Browser Information:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>Device type (mobile, desktop)</li>
                        <li>Screen resolution</li>
                        <li>Time zone setting</li>
                    </ul>

                    <strong className="block text-ink mt-4">Cookies and Similar Technologies:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Session cookies (for authentication)</li>
                        <li>Functional cookies (for service operation)</li>
                        <li>Analytics cookies (see Section 9 for details)</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">2.3 Information from Third Parties</h3>
                    <strong className="block text-ink mt-4">Google Sign-In Data:</strong>
                    <p>When you authenticate with Google, we receive the information you authorize Google to share with us in accordance with your Google account settings and Google's privacy policies. This typically includes your Google ID, email address, and basic profile information.</p>
                </Section>

                <Section title="3. Legal Basis for Processing (GDPR)">
                    <p>We process your personal data based on the following legal grounds:</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">3.1 Contractual Necessity (Article 6(1)(b) GDPR)</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Processing necessary to provide the video generation service</li>
                        <li>Account creation and management</li>
                        <li>Delivering generated content to you</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">3.2 Legitimate Interests (Article 6(1)(f) GDPR)</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Service improvement and development</li>
                        <li>Security and fraud prevention</li>
                        <li>Analytics and performance monitoring</li>
                        <li>Internal research and development</li>
                        <li>Marketing (where not requiring consent)</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">3.3 Consent (Article 6(1)(a) GDPR)</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Optional marketing communications (you can withdraw at any time)</li>
                        <li>Non-essential cookies</li>
                        <li>Use of your content for promotional purposes</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">3.4 Legal Obligation (Article 6(1)(c) GDPR)</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Compliance with legal requirements</li>
                        <li>Responding to legal requests</li>
                        <li>Tax and accounting obligations</li>
                    </ul>
                </Section>

                <Section title="4. How We Use Your Data">
                    <p>We use your personal data for the following purposes:</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">4.1 Service Provision</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Create and manage your account</li>
                        <li>Authenticate you via Google Sign-In</li>
                        <li>Process your video generation requests</li>
                        <li>Store and deliver your generated content</li>
                        <li>Provide customer support</li>
                        <li>Communicate service updates and important notices</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">4.2 AI Model Processing</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Process your prompts and images through our AI models</li>
                        <li>Generate video content based on your inputs</li>
                        <li>Improve our AI algorithms using anonymized data</li>
                        <li>Train and refine our machine learning models</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">4.3 Service Improvement</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Analyze usage patterns to enhance user experience</li>
                        <li>Identify and fix bugs or technical issues</li>
                        <li>Develop new features and functionality</li>
                        <li>Conduct research and development</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">4.4 Security and Fraud Prevention</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Monitor for suspicious activity</li>
                        <li>Prevent abuse of the service</li>
                        <li>Enforce our Terms and Conditions</li>
                        <li>Protect our rights and property</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">4.5 Legal Compliance</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Comply with applicable laws and regulations</li>
                        <li>Respond to legal requests and court orders</li>
                        <li>Protect against legal liability</li>
                        <li>Exercise or defend legal claims</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-4 mb-2">4.6 Marketing (with consent where required)</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Send promotional emails about new features</li>
                        <li>Provide information about similar services</li>
                        <li>Conduct surveys and market research</li>
                    </ul>
                </Section>

                <Section title="5. Data Sharing and Disclosure">
                    <p>We do not sell your personal data. We may share your data in the following circumstances:</p>

                    <h3 className="font-medium text-ink mt-4 mb-2">5.1 Service Providers</h3>
                    <p>We share data with third-party service providers who assist us in operating our service, including:</p>
                    <div className="space-y-4 mt-2">
                        <div>
                            <strong className="text-ink">Google (Authentication Services):</strong>
                            <p className="text-sm">Purpose: User authentication via Google Sign-In<br />Data shared: As authorized through Google OAuth<br />Location: Various (Global)</p>
                        </div>
                        <div>
                            <strong className="text-ink">Cloud Hosting Providers (OVH):</strong>
                            <p className="text-sm">Purpose: Data storage and processing<br />Data shared: All user data and content<br />Location: France</p>
                        </div>
                        <div>
                            <strong className="text-ink">AI Processing Services:</strong>
                            <p className="text-sm">Purpose: AI model processing<br />Data shared: Prompts, images, generated content<br />Location: Primarily EU-based services</p>
                        </div>
                        <div>
                            <strong className="text-ink">Analytics Providers:</strong>
                            <p className="text-sm">Purpose: Usage analytics<br />Data shared: Usage data, device info (anonymized)<br />Location: United States (Google), Global (Cloudflare)</p>
                        </div>
                    </div>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.2 Legal Requirements</h3>
                    <p>We may disclose your data when required by law or to comply with court orders, enforce terms, or protect rights/safety.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.3 Business Transfers</h3>
                    <p>In the event of a merger, acquisition, or sale, your data may be transferred to the successor entity. You will be notified of any such change.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.4 With Your Consent</h3>
                    <p>We may share your data with third parties when you explicitly consent to such sharing.</p>
                </Section>

                <Section title="6. International Data Transfers">
                    <p>Our servers are located in France (OVH). However, some service providers (like Google) may process data outside the EEA. We ensure appropriate safeguards (SCCs, Adequacy Decisions) are in place for such transfers.</p>
                </Section>

                <Section title="7. Data Retention">
                    <h3 className="font-medium text-ink mt-4 mb-2">7.1 Retention Periods</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li><strong>Account Data:</strong> Retained while active; deleted within 30 days of closure.</li>
                        <li><strong>Generated Content:</strong> Videos stored until deleted. Prompts/Images retained for 90 days.</li>
                        <li><strong>Usage Data:</strong> Retained for 24 months.</li>
                        <li><strong>Communication Records:</strong> Support (3 years), Marketing (until unsubscribe).</li>
                        <li><strong>Legal Records:</strong> As required by law (5-10 years).</li>
                    </ul>
                </Section>

                <Section title="8. Your Rights Under GDPR">
                    <p>As a data subject under GDPR, you have the following rights:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Right of Access:</strong> Obtain confirmation and copy of your data.</li>
                        <li><strong>Right to Rectification:</strong> Correct inaccurate data.</li>
                        <li><strong>Right to Erasure:</strong> Request deletion under certain conditions.</li>
                        <li><strong>Right to Restriction:</strong> Restrict processing in specific cases.</li>
                        <li><strong>Right to Data Portability:</strong> Receive data in a portable format.</li>
                        <li><strong>Right to Object:</strong> Object to processing (legitimate interests/marketing).</li>
                        <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time.</li>
                        <li><strong>Right Not to Be Subject to Automated Decision-Making.</strong></li>
                    </ul>

                    <div className="mt-6 bg-black/5 p-6 rounded-lg">
                        <h4 className="font-medium mb-2">Exercising Your Rights</h4>
                        <p className="mb-2">To exercise any of these rights, please contact us at:</p>
                        <p className="font-mono text-sm">Email: privacy@melies.ai</p>
                        <p className="font-mono text-sm">Post: QUAI DE RIVE NEUVE, 13007 MARSEILLE</p>
                        <p className="mt-2 text-sm text-ink/60">We aim to respond within 30 days.</p>
                    </div>

                    <div className="mt-4 text-sm text-ink/60">
                        <p>You also have the right to lodge a complaint with the CNIL (Commission Nationale de l'Informatique et des Libertés).</p>
                    </div>
                </Section>

                <Section title="9. Cookies and Tracking">
                    <p>We use strictly necessary, functional, and analytics cookies. You can manage your preferences through your browser settings or our consent banner.</p>
                </Section>

                <Section title="10. Data Security">
                    <p>We implement strong technical (encryption, firewalls) and organizational (training, access controls) measures to protect your data. However, no method is 100% secure.</p>
                </Section>

                <Section title="11. Children's Privacy">
                    <p>Our Service is not intended for individuals under 18. We do not knowingly collect data from children.</p>
                </Section>

                <Section title="12. AI-Specific Data Processing">
                    <p>We may use your inputs to train our AI models, with PII removed where possible. You can opt out by contacting privacy@melies.ai.</p>
                </Section>

                <Section title="13. Third-Party Links">
                    <p>We are not responsible for the privacy practices of third-party sites linked from our Service.</p>
                </Section>

                <Section title="14. Changes to This Policy">
                    <p>We may update this policy. We will notify you of material changes. Continued use implies acceptance.</p>
                </Section>

                <Section title="15. Contact Us">
                    <p>For questions about this Privacy Policy:</p>
                    <div className="mt-4 bg-black/5 p-4 rounded text-sm font-mono">
                        <p>Email: privacy@melies.ai</p>
                        <p>Postal Address: QUAI DE RIVE NEUVE, 13007 MARSEILLE</p>
                    </div>
                </Section>

                <Section title="16. Additional Information for French Users">
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li><strong>Legal Framework:</strong> Complies with GDPR and Loi Informatique et Libertés.</li>
                        <li><strong>Direct Marketing:</strong> B2B (opt-out), B2C (opt-in).</li>
                        <li><strong>Deceased Persons:</strong> You may provide instructions for post-mortem data handling.</li>
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
