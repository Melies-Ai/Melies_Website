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

const Terms = () => {
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
                <h1 className="text-4xl md:text-5xl font-medium mb-4 text-ink tracking-tight">Terms and Conditions</h1>
                <p className="text-sm text-ink/60 mb-16">Last Updated: December 2025</p>

                <Section title="1. Introduction and Acceptance">
                    <h3 className="font-medium text-ink mt-4 mb-2">1.1 Agreement</h3>
                    <p>These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and MELIES TECHNOLOGIES, a French simplified joint-stock company (société par actions simplifiée), registered under number 94113277100010, with its registered office at QUAI DE RIVE NEUVE, 13007 MARSEILLE ("Melies," "we," "us," or "our").</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">1.2 Acceptance</h3>
                    <p>By accessing or using the Melies.ai platform (the "Service"), you agree to be bound by these Terms, our Privacy Policy, and any additional terms that may apply. If you do not agree to these Terms, you must not use the Service.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">1.3 Capacity</h3>
                    <p>You must be at least 18 years old and have the legal capacity to enter into binding contracts to use this Service. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>
                </Section>

                <Section title="2. Description of Service">
                    <h3 className="font-medium text-ink mt-4 mb-2">2.1 Service Overview</h3>
                    <p>Melies.ai is an AI-powered video creation platform that enables users to generate video content using artificial intelligence technologies. Users can create videos through text prompts and image inputs, which are processed by our AI models to produce video outputs.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">2.2 Features</h3>
                    <p>The Service includes text-to-video generation from prompts, image-to-video generation, video editing and enhancement tools, content storage and management, and such additional features as may be introduced from time to time.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">2.3 Modifications</h3>
                    <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice. We will endeavor to provide reasonable notice of significant changes that may affect your use of the Service.</p>
                </Section>

                <Section title="3. Account Registration">
                    <h3 className="font-medium text-ink mt-4 mb-2">3.1 Account Creation</h3>
                    <p>To use the Service, you must create an account using Google Sign-In. By doing so, you authorize us to access certain information from your Google account as described in our Privacy Policy.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">3.2 Account Security</h3>
                    <p>You are responsible for maintaining the security of your Google account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">3.3 Account Termination</h3>
                    <p>We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent or illegal activity, use the Service in a manner that could harm Melies or other users, or fail to pay applicable fees.</p>
                </Section>

                <Section title="4. User Conduct and Acceptable Use">
                    <h3 className="font-medium text-ink mt-4 mb-2">4.1 Prohibited Content</h3>
                    <p>You agree not to use the Service to create, upload, or distribute content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable, that infringes any intellectual property rights, that contains sexually explicit material involving minors, that promotes violence or discrimination, that impersonates any person or entity, or that violates any applicable law or regulation.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">4.2 Prohibited Activities</h3>
                    <p>You agree not to attempt to circumvent any security measures, use automated tools to access the Service without authorization, reverse engineer any aspect of the Service, use the Service to develop competing products, or share your account credentials with third parties.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">4.3 Enforcement</h3>
                    <p>We reserve the right to review content created using our Service and to remove any content that violates these Terms. We may also report illegal content to appropriate authorities.</p>
                </Section>

                <Section title="5. Intellectual Property">
                    <h3 className="font-medium text-ink mt-4 mb-2">5.1 Melies Property</h3>
                    <p>The Service, including all software, AI models, algorithms, user interface, and underlying technology, is owned by Melies and protected by intellectual property laws. Nothing in these Terms grants you any right to use Melies trademarks, logos, or branding.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.2 Your Content</h3>
                    <p>You retain ownership of any content you upload to the Service (prompts, images, etc.). By uploading content, you grant Melies a worldwide, non-exclusive, royalty-free license to use, process, and store such content solely for the purpose of providing the Service to you.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.3 AI-Generated Content</h3>
                    <p><span className="font-medium">License Grant:</span> Upon payment of applicable fees, you are granted a perpetual, worldwide, royalty-free license to use, modify, reproduce, distribute, and publicly display the video content generated through the Service for any lawful purpose, including commercial use.</p>
                    <p><span className="font-medium">Melies Rights:</span> Melies does not claim ownership of your Generated Content. However, we retain the right to store technical copies as necessary for service delivery and to use anonymized, aggregated data derived from usage patterns for service improvement.</p>
                    <p><span className="font-medium">No Exclusivity:</span> Due to the nature of AI generation, similar prompts from different users may produce similar outputs. We do not guarantee exclusivity of any Generated Content.</p>
                    <p><span className="font-medium">Your Responsibility:</span> You are solely responsible for ensuring your use of Generated Content complies with applicable laws, including intellectual property rights, privacy rights, and publicity rights of third parties.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.4 Feedback</h3>
                    <p>If you provide feedback, suggestions, or ideas about the Service, you grant Melies an unlimited, irrevocable, perpetual license to use such feedback for any purpose without compensation to you.</p>
                </Section>

                <Section title="6. AI and Generated Content">
                    <h3 className="font-medium text-ink mt-4 mb-2">6.1 AI Limitations</h3>
                    <p>You acknowledge that AI-generated content may not always be accurate, appropriate, or suitable for your intended purpose, may contain errors, artifacts, or unexpected results, may be subject to ongoing improvements and changes, and is generated based on AI models that have inherent limitations.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">6.2 Content Review</h3>
                    <p>You are responsible for reviewing all generated content before use or distribution. Melies does not pre-screen AI-generated content and is not responsible for any issues arising from your use of such content.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">6.3 No Guarantees</h3>
                    <p>We do not guarantee that generated content will be free from third-party intellectual property claims, suitable for any particular purpose, or consistent in quality or style.</p>
                </Section>

                <Section title="7. Pricing, Payment, and Refunds">
                    <h3 className="font-medium text-ink mt-4 mb-2">7.1 Pricing</h3>
                    <p>The Service is offered through various subscription plans and credit packages. Current pricing is displayed on our website and may be changed at any time. We will provide notice of price changes to existing subscribers.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.2 Payment</h3>
                    <p>Payments are processed through Stripe, a third-party payment processor. By making a payment, you agree to Stripe's terms of service. All fees are stated in Euros and are exclusive of applicable taxes unless otherwise stated.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.3 Subscriptions</h3>
                    <p>Subscriptions automatically renew at the end of each billing period unless cancelled. You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of the current billing period.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.4 Refunds</h3>
                    <p>Except as provided in Section 7.5 (Right of Withdrawal) or as required by applicable law, fees paid for credits and subscriptions are generally non-refundable. However, refunds may be considered on a case-by-case basis in the event of technical issues that prevent use of the Service or billing errors on our part.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.5 Right of Withdrawal (EU Consumers)</h3>
                    <p>If you are a consumer residing in the European Union, you normally have the right to withdraw from a purchase within 14 days without giving any reason.</p>
                    <p><span className="font-medium">Waiver of Withdrawal Right:</span> However, by purchasing credits or a subscription and checking the box confirming your acknowledgment, you expressly request immediate access to the Service and acknowledge that you lose your right of withdrawal once video generation begins.</p>
                    <p><span className="font-medium">Required Acknowledgment:</span> Before completing your purchase, you must confirm the following statement:</p>
                    <div className="bg-black/5 p-4 rounded text-sm italic my-2">
                        "I acknowledge that by purchasing credits, I request immediate access to the Service and waive my 14-day right of withdrawal once video generation begins."
                    </div>
                    <p>This acknowledgment is recorded with a timestamp in our system. Credits not used for video generation may still be eligible for refund within the 14-day period.</p>
                </Section>

                <Section title="8. Privacy and Data Protection">
                    <p>Your privacy is important to us. Our collection and use of personal data is governed by our Privacy Policy, which forms part of these Terms. By using the Service, you consent to our data practices as described in the Privacy Policy.</p>
                </Section>

                <Section title="9. Disclaimers and Limitations of Liability">
                    <h3 className="font-medium text-ink mt-4 mb-2">9.1 Service Provided "As Is"</h3>
                    <p className="uppercase text-xs font-bold tracking-wider mb-2">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">9.2 No Guarantee of Availability</h3>
                    <p>We do not guarantee that the Service will be uninterrupted, error-free, or secure. We are not liable for any interruption or loss of access to the Service.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">9.3 Limitation of Liability</h3>
                    <p className="uppercase text-xs font-bold tracking-wider mb-2">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MELIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL.</p>
                    <p>Our total aggregate liability for any claims arising from or related to these Terms or the Service shall not exceed the amount paid by you in the three (3) months preceding the claim, with a minimum of €20.</p>
                    <p>This limitation applies regardless of the theory of liability and even if Melies has been advised of the possibility of such damages.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">9.4 Consumer Rights</h3>
                    <p>Nothing in these Terms affects your statutory rights as a consumer under applicable law, including rights under the French Consumer Code (Code de la consommation) that cannot be waived by contract.</p>
                </Section>

                <Section title="10. Indemnification">
                    <p>You agree to indemnify and hold harmless Melies and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your use of the Service, your violation of these Terms, your violation of any third-party rights, or content you create, upload, or distribute using the Service.</p>
                </Section>

                <Section title="11. Term and Termination">
                    <h3 className="font-medium text-ink mt-4 mb-2">11.1 Term</h3>
                    <p>These Terms remain in effect until terminated by either party.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">11.2 Termination by You</h3>
                    <p>You may terminate your account at any time by contacting us or using the account deletion feature in your settings.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">11.3 Termination by Melies</h3>
                    <p>We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">11.4 Effects of Termination</h3>
                    <p>Upon termination, your right to use the Service ceases immediately. Your content may be deleted in accordance with our Privacy Policy. Provisions that by their nature should survive termination shall survive, including intellectual property provisions, disclaimers, limitations of liability, and governing law.</p>
                </Section>

                <Section title="12. Governing Law and Disputes">
                    <h3 className="font-medium text-ink mt-4 mb-2">12.1 Governing Law</h3>
                    <p>These Terms are governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">12.2 Jurisdiction</h3>
                    <p>Subject to the mediation provisions below, any disputes arising from these Terms shall be submitted to the exclusive jurisdiction of the courts of Marseille, France.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">12.3 Consumer Mediation</h3>
                    <p>In accordance with Article L.612-1 of the French Consumer Code, if you are a consumer, you may submit any dispute to a consumer mediator. Information about consumer mediation is available at: <a href="https://www.economie.gouv.fr/mediation-conso" className="underline hover:text-ink">https://www.economie.gouv.fr/mediation-conso</a></p>

                    <h3 className="font-medium text-ink mt-6 mb-2">12.4 EU Online Dispute Resolution</h3>
                    <p>The European Commission provides an online dispute resolution platform at: <a href="https://ec.europa.eu/consumers/odr" className="underline hover:text-ink">https://ec.europa.eu/consumers/odr</a></p>
                </Section>

                <Section title="13. General Provisions">
                    <h3 className="font-medium text-ink mt-4 mb-2">13.1 Entire Agreement</h3>
                    <p>These Terms, together with the Privacy Policy and any additional terms you agree to, constitute the entire agreement between you and Melies regarding the Service.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.2 Severability</h3>
                    <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.3 Waiver</h3>
                    <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.4 Assignment</h3>
                    <p>You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.5 Modifications</h3>
                    <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.6 Language</h3>
                    <p>These Terms are drafted in English. If translated into another language, the English version shall prevail in case of any discrepancy.</p>
                </Section>

                <Section title="14. Contact Information">
                    <p>For any questions about these Terms, please contact us at:</p>
                    <div className="mt-4 bg-black/5 p-4 rounded text-sm font-mono text-ink/80">
                        <p>Email: contact@melies.ai</p>
                        <p>Address: QUAI DE RIVE NEUVE, 13007 MARSEILLE, France</p>
                        <p>SIRET: 94113277100010</p>
                    </div>
                </Section>

                <p className="text-sm text-ink/40 mt-16 pt-8 border-t border-black/10">
                    By using Melies.ai, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
            </div>
        </motion.div>
    );
};

export default Terms;
