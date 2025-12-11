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
                <h1 className="text-4xl md:text-5xl font-medium mb-16 text-ink tracking-tight">Terms and Conditions</h1>

                <Section title="1. Introduction">
                    <p>These Terms and Conditions ("Terms") govern your access to and use of MELIES TECHNOLOGIES ("we," "us," or "our") website and services accessible at Melies.ai (the "Service").</p>
                    <p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.</p>
                    <div className="bg-black/5 p-6 rounded-lg mt-4 text-sm">
                        <p className="font-medium mb-2">Company Information:</p>
                        <ul className="space-y-1 text-ink/70">
                            <li>Company Name: MELIES TECHNOLOGIES</li>
                            <li>Legal Form: société par actions simplifiée</li>
                            <li>Registration Number: 94113277100010</li>
                            <li>Registered Office: QUAI DE RIVE NEUVE, 13007 MARSEILLE</li>
                            <li>Contact Email: contact@melies.ai</li>
                        </ul>
                    </div>
                </Section>

                <Section title="2. Description of Service">
                    <p>Melies.ai is an AI-powered video creation platform that allows users to generate short videos from text prompts and images. The Service uses artificial intelligence and machine learning technologies to process user inputs and create video content.</p>
                </Section>

                <Section title="3. Eligibility and Account Registration">
                    <h3 className="font-medium text-ink mt-4 mb-2">3.1 Age Requirement</h3>
                    <p>You must be at least 18 years old to use this Service. By using the Service, you represent and warrant that you meet this age requirement.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">3.2 Account Creation</h3>
                    <p>To use the Service, you must create an account using Google Sign-In. By creating an account, you:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Agree to provide accurate and complete information</li>
                        <li>Agree to maintain the security of your account credentials</li>
                        <li>Accept responsibility for all activities that occur under your account</li>
                        <li>Agree to notify us immediately of any unauthorized use of your account</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">3.3 Account Termination</h3>
                    <p>We reserve the right to suspend or terminate your account at any time, with or without notice, for any violation of these Terms or for any other reason at our sole discretion.</p>
                </Section>

                <Section title="4. Acceptable Use Policy">
                    <h3 className="font-medium text-ink mt-4 mb-2">4.1 Permitted Use</h3>
                    <p>You may use the Service only for lawful purposes and in accordance with these Terms. You agree to use the Service in a manner consistent with all applicable laws and regulations.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">4.2 Prohibited Content</h3>
                    <p>You agree not to create, upload, or share content that:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable</li>
                        <li>Infringes any patent, trademark, trade secret, copyright, or other intellectual property rights of any party</li>
                        <li>Contains software viruses or any other computer code designed to interrupt, destroy, or limit functionality</li>
                        <li>Depicts or promotes violence, self-harm, or dangerous activities</li>
                        <li>Contains child sexual abuse material or exploits minors in any way</li>
                        <li>Promotes terrorism, extremism, or hate speech</li>
                        <li>Violates any person's rights, including rights of publicity, privacy, or confidentiality</li>
                        <li>Contains deepfakes or misleading synthetic media of real individuals without their consent</li>
                        <li>Is intended to deceive, defraud, or manipulate others</li>
                        <li>Violates any applicable laws or regulations</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">4.3 Prohibited Activities</h3>
                    <p>You agree not to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Use the Service to spam, phish, or send unsolicited communications</li>
                        <li>Attempt to gain unauthorized access to the Service or related systems</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Use automated means to access the Service except as explicitly permitted</li>
                        <li>Reverse engineer, decompile, or attempt to extract source code from the Service</li>
                        <li>Remove, obscure, or alter any proprietary notices on the Service</li>
                        <li>Use the Service to compete with us or create a similar service</li>
                        <li>Sell, rent, lease, or sublicense access to the Service</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">4.4 Content Monitoring</h3>
                    <p>We reserve the right, but have no obligation, to monitor, review, or remove any content at our sole discretion. We may use automated and manual methods to enforce our content policies.</p>
                </Section>

                <Section title="5. Intellectual Property Rights">
                    <h3 className="font-medium text-ink mt-4 mb-2">5.1 Your Content</h3>
                    <p>You retain all ownership rights to the content you input into the Service (including prompts and images). However, the AI-generated video output is created through our proprietary AI systems and involves transformation of your inputs.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.2 License to Us</h3>
                    <p>By using the Service, you grant us a worldwide, non-exclusive, royalty-free license to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Process, store, and display your inputs and generated content as necessary to provide the Service</li>
                        <li>Use anonymized and aggregated data derived from your use to improve our AI models and Service</li>
                        <li>Display your generated content as examples or in marketing materials (only with your explicit consent)</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.3 AI-Generated Content</h3>
                    <p>The videos generated by our Service are created using AI technology. You acknowledge that:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>AI-generated content may not be fully predictable or controllable</li>
                        <li>Similar outputs may be generated for different users with similar prompts</li>
                        <li>The legal status of AI-generated content ownership may vary by jurisdiction</li>
                        <li>You are responsible for ensuring your use of generated content complies with applicable laws</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.4 Our Intellectual Property</h3>
                    <p>The Service, including its software, algorithms, AI models, design, structure, and all related intellectual property rights, remain the exclusive property of MELIES TECHNOLOGIES. You are granted a limited, non-exclusive, non-transferable license to use the Service in accordance with these Terms.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">5.5 Feedback</h3>
                    <p>If you provide us with feedback, suggestions, or ideas about the Service, you grant us the right to use such feedback without any obligation to compensate you.</p>
                </Section>

                <Section title="6. Third-Party Services">
                    <h3 className="font-medium text-ink mt-4 mb-2">6.1 Google Sign-In</h3>
                    <p>Our Service uses Google Sign-In for authentication. By using this feature, you agree to Google's Terms of Service and Privacy Policy. We are not responsible for Google's practices or any issues arising from your use of Google services.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">6.2 Other Third-Party Services</h3>
                    <p>The Service may integrate with or link to third-party services. We are not responsible for the content, practices, or policies of these third-party services. Your use of third-party services is at your own risk.</p>
                </Section>

                <Section title="7. Payment Terms">
                    <h3 className="font-medium text-ink mt-4 mb-2">7.1 Pricing</h3>
                    <p>Current pricing for the Service is available on our website. We reserve the right to change our pricing at any time with notice.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.2 Payment Processing</h3>
                    <p>All payments are processed through Stripe. You agree to provide accurate payment information and authorize us to charge your selected payment method.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.3 Refunds</h3>
                    <p>Due to the nature of AI-generated digital content, all sales are final once a video has been successfully generated and delivered to you. We do not offer refunds for completed video generations.</p>
                    <p className="mt-2">However, we may provide refunds or credits at our sole discretion in the following circumstances:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Technical failures that prevent video generation</li>
                        <li>Service outages that significantly impact your ability to use purchased credits</li>
                        <li>Billing errors or duplicate charges</li>
                    </ul>
                    <p className="mt-2">To request a refund, contact us at contact@melies.ai within 14 days of the transaction with details of the issue. All refund requests will be reviewed on a case-by-case basis.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">7.4 Taxes</h3>
                    <p>All prices are exclusive of applicable taxes unless otherwise stated. You are responsible for all taxes associated with your use of the Service.</p>
                </Section>

                <Section title="8. Data Processing and Privacy">
                    <p>Your use of the Service is also governed by our Privacy Policy. We process your personal data in accordance with the General Data Protection Regulation (GDPR) and French data protection laws. For detailed information about how we collect, use, and protect your data, please review our Privacy Policy.</p>
                </Section>

                <Section title="9. Disclaimers and Limitations of Liability">
                    <h3 className="font-medium text-ink mt-4 mb-2">9.1 Service Availability</h3>
                    <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
                    <p className="mt-2">We do not guarantee that:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                        <li>The results obtained from using the Service will be accurate or reliable</li>
                        <li>The quality of any products, services, information, or other material obtained through the Service will meet your expectations</li>
                        <li>Any errors in the Service will be corrected</li>
                    </ul>

                    <h3 className="font-medium text-ink mt-6 mb-2">9.2 AI-Generated Content Disclaimer</h3>
                    <p>AI-generated content may contain inaccuracies, errors, or biases. We do not warrant the accuracy, completeness, or reliability of AI-generated content. You are solely responsible for verifying and evaluating the content before use.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">9.3 Limitation of Liability</h3>
                    <p>To the maximum extent permitted by applicable law, MELIES TECHNOLOGIES shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Your use or inability to use the Service</li>
                        <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                        <li>Any interruption or cessation of transmission to or from the Service</li>
                        <li>Any bugs, viruses, or other harmful code that may be transmitted to or through the Service</li>
                        <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the Service</li>
                    </ul>
                    <p className="mt-2">Our total liability for any claims under these Terms shall not exceed the greater of €100 or the amount you paid us in the 12 months preceding the claim.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">9.4 Mandatory Liability Under French Law</h3>
                    <p>Nothing in these Terms shall exclude or limit our liability for:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Death or personal injury caused by our negligence</li>
                        <li>Fraud or fraudulent misrepresentation</li>
                        <li>Any liability that cannot be excluded or limited under French law</li>
                    </ul>
                </Section>

                <Section title="10. Indemnification">
                    <p>You agree to indemnify, defend, and hold harmless MELIES TECHNOLOGIES, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Your use of the Service</li>
                        <li>Your violation of these Terms</li>
                        <li>Your violation of any rights of another party</li>
                        <li>Content you create or share using the Service</li>
                    </ul>
                </Section>

                <Section title="11. Data Retention and Account Deletion">
                    <h3 className="font-medium text-ink mt-4 mb-2">11.1 Data Retention</h3>
                    <p>We retain your personal data and content for as long as necessary to provide the Service and as required by law. Specific retention periods are detailed in our Privacy Policy.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">11.2 Account Deletion</h3>
                    <p>You may request deletion of your account at any time by contacting contact@melies.ai. Upon deletion:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Your personal data will be deleted within 30 days, except where retention is required by law</li>
                        <li>Your generated content may be retained in anonymized form for service improvement</li>
                        <li>Some information may be retained in backup systems for up to 90 days</li>
                    </ul>
                </Section>

                <Section title="12. Modifications to the Service and Terms">
                    <h3 className="font-medium text-ink mt-4 mb-2">12.1 Service Modifications</h3>
                    <p>We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">12.2 Terms Modifications</h3>
                    <p>We may modify these Terms at any time. If we make material changes, we will notify you by:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Posting a notice on the Service</li>
                        <li>Sending an email to the address associated with your account</li>
                        <li>Other appropriate means</li>
                    </ul>
                    <p className="mt-2">Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms. If you do not agree to the modified Terms, you must stop using the Service.</p>
                </Section>

                <Section title="13. Governing Law and Dispute Resolution">
                    <h3 className="font-medium text-ink mt-4 mb-2">13.1 Governing Law</h3>
                    <p>These Terms shall be governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.2 Jurisdiction</h3>
                    <p>Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Marseille.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.3 Mediation</h3>
                    <p>Before initiating any legal proceedings, the parties agree to attempt to resolve disputes through mediation in accordance with French mediation procedures.</p>

                    <h3 className="font-medium text-ink mt-6 mb-2">13.4 European ODR Platform</h3>
                    <p>In accordance with EU Regulation 524/2013, we inform you of the existence of the European Online Dispute Resolution platform accessible at: <a href="https://ec.europa.eu/consumers/odr" className="underline hover:text-ink">https://ec.europa.eu/consumers/odr</a></p>
                </Section>

                <Section title="14. Severability">
                    <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.</p>
                </Section>

                <Section title="15. Entire Agreement">
                    <p>These Terms, together with our Privacy Policy and any other legal notices published by us on the Service, constitute the entire agreement between you and MELIES TECHNOLOGIES regarding your use of the Service.</p>
                </Section>

                <Section title="16. Assignment">
                    <p>You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.</p>
                </Section>

                <Section title="17. Waiver">
                    <p>No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
                </Section>

                <Section title="18. Contact Information">
                    <p>For questions about these Terms, please contact us at:</p>
                    <div className="mt-4 bg-black/5 p-4 rounded text-sm font-mono">
                        <p>Email: contact@melies.ai</p>
                        <p>Postal Address: QUAI DE RIVE NEUVE, 13007 MARSEILLE</p>
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
