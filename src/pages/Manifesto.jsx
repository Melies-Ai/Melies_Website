import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Import images from assets
import missionImg from '../assets/mission.png';
import simulationImg from '../assets/simulation.png';
import characterImg from '../assets/character.png';
import visionImg from '../assets/vision.png';
import filmmakingImg from '../assets/filmmaking.png';
import creatorsImg from '../assets/creators.png';
import meliesImg from '../assets/melies.png';
import leavesImg from '../assets/leaves.png';
import SEO from '../components/SEO';

// Reusable section component with scroll-triggered animation
const ManifestoSection = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.455, 0.19, 0, 0.985] }}
            className={`manifesto-section ${className}`}
        >
            {children}
        </motion.section>
    );
};

// Sub-block component
const SubBlock = ({ title, children }) => (
    <div className="manifesto-sub-block">
        <h2 className="manifesto-gradient-text">{title}</h2>
        <div className="manifesto-content">{children}</div>
    </div>
);

// Quote component
const Quote = ({ text }) => (
    <blockquote className="manifesto-quote">{text}</blockquote>
);

// Image container component
const ImageContainer = ({ src, alt, quote }) => (
    <div className="manifesto-image-container">
        <div className="manifesto-image-wrapper">
            <img src={src} alt={alt} />
        </div>
        {quote && <Quote text={quote} />}
    </div>
);

// Dappled light background effect
const DappledLight = ({ isDark }) => (
    <div className="manifesto-dappled-light">
        <div className="manifesto-glow" />
        <div className="manifesto-glow-bounce" />
        <div className={`manifesto-perspective ${isDark ? 'dark' : ''}`}>
            <div className="manifesto-leaves" style={{ backgroundImage: `url(${leavesImg})` }} />
            <div className="manifesto-blinds">
                <div className="manifesto-shutters">
                    {Array(24).fill(0).map((_, i) => (
                        <div key={i} className="manifesto-shutter" />
                    ))}
                </div>
            </div>
        </div>
        <div className="manifesto-progressive-blur">
            <div style={{ '--blur-amount': '6px', '--stop1': '0%', '--stop2': '0%' }} />
            <div style={{ '--blur-amount': '12px', '--stop1': '40%', '--stop2': '80%' }} />
            <div style={{ '--blur-amount': '48px', '--stop1': '40%', '--stop2': '70%' }} />
            <div style={{ '--blur-amount': '96px', '--stop1': '70%', '--stop2': '80%' }} />
        </div>
    </div>
);

// Stripe container decorative element
const StripeContainer = ({ isVisible }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="manifesto-stripe-container"
    />
);

const Manifesto = () => {
    const [isDark, setIsDark] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showStripe, setShowStripe] = useState(false);

    // Animation sequence on mount
    useEffect(() => {
        const sequence = async () => {
            // Start dark mode transition
            setTimeout(() => setIsDark(true), 700);
            // Show stripe
            setTimeout(() => setShowStripe(true), 1200);
            // Show main structure
            setTimeout(() => setShowContent(true), 2200);
        };
        sequence();
    }, []);

    // Toggle dark/light mode on click
    const handleToggle = () => {
        setIsDark(!isDark);
    };

    return (
        <div
            className={`manifesto-page ${isDark ? 'dark' : ''}`}
            onClick={handleToggle}
        >
            <SEO
                title="Manifesto - The Future of Cinema"
                description="Melies.ai is shaping the future of cinema. We believe AI-assisted filmmaking will enrich human creativity and open a new era of the 7th art."
                canonical="/manifesto"
            />

            <DappledLight isDark={isDark} />

            <div className="manifesto-content-wrapper">
                <StripeContainer isVisible={showStripe} />

                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="manifesto-main"
                >
                    {/* Hero Section */}
                    <ManifestoSection className="manifesto-hero">
                        <div className="flex items-center justify-between">
                            <div className="manifesto-logo">
                                <img src={`${import.meta.env.BASE_URL}${isDark ? 'logo_white.svg' : 'logo_black.svg'}`} alt="Melies.ai Logo" width="28" height="20" className="mr-2" />
                                <h1 className={`pt-[1px] normal-case ${isDark ? 'text-white' : 'text-black'}`}>Melies.ai</h1>
                            </div>
                            <span className="italic">imagine your movie</span>
                        </div>
                        <h2 className="manifesto-hero-title manifesto-gradient-text">
                            Melies.ai is shaping the future of cinema, placing generative AI<br />
                            at the heart of innovation.
                        </h2>
                        <h2 className="manifesto-hero-title manifesto-gradient-text">
                            A new era is upon us!
                        </h2>
                    </ManifestoSection>

                    {/* Technological Convergence */}
                    <ManifestoSection>
                        <SubBlock title="Script, Image, Music, Sound Effects, Voice, Video">
                            <p>
                                Today, we are at a unique technological inflection point. The generation of scripts, images, music, sound effects, voices, and videos by AI has reached an unprecedented level of sophistication. The time has come to bring these fundamental building blocks together to create a new form of the 7th art.
                            </p>
                            <p>
                                At Melies.ai, we orchestrate these cutting-edge technologies into a creative symphony, paving the way for a new era of film production. Our platform integrates and harmonizes these elements to offer a complete cinematic creation experience.
                            </p>
                        </SubBlock>

                        <ImageContainer
                            src={missionImg}
                            alt="Abstract human silhouette composed of horizontal lines on a black background"
                            quote="Bringing to life voices and visions that would have remained in the shadows is the very essence of cinematic innovation."
                        />

                        <SubBlock title="Our Vision">
                            <p>
                                We aspire to support a new generation of digital filmmakers who collaborate with AI to create and innovate. We believe that AI-assisted cinema will enrich human creativity without replacing it. As AI integrates into the film industry, it will become a source of inspiration, efficiency, and artistic exploration on a large scale.
                            </p>
                            <p>
                                Imagine a world where every story worth telling can come to life on screen. This technology transforms the way humanity shares its experiences and perspectives.
                            </p>
                        </SubBlock>
                    </ManifestoSection>

                    {/* Technology Section */}
                    <ManifestoSection>
                        <SubBlock title="Cinematic Production Simulation">
                            <p>
                                At the heart of Melies.ai's innovation is our unique approach to AI-assisted filmmaking. For each project, we create a custom simulation that assembles and deploys a dedicated team of specialized agents, each responsible for specific aspects of the production process.
                            </p>
                            <p>
                                This virtual production team collaborates, exchanges ideas, and plans each step of the filmmaking process, from script development to post-production. Our approach aims to offer optimal performance and flexibility while preserving the creator's unique authenticity and vision.
                            </p>
                        </SubBlock>

                        <SubBlock title="Specialized AI Agents">
                            <p>
                                We pay particular attention to creating specialized AI agents in the field of film production. Each agent is designed to excel in a specific aspect of the creative process, whether it be scriptwriting, artistic direction, or post-production. They are designed to have a deep understanding of their role and optimal performance in the production process.
                            </p>
                        </SubBlock>

                        <SubBlock title="Chain of Thought (CoT)">
                            <p>
                                We are exploring the use of Chain of Thought (CoT), a technique that allows our models to follow a logical chain of reasoning. This approach aims to improve the accuracy and consistency of results, particularly in complex tasks of storytelling and film planning.
                            </p>
                        </SubBlock>

                        <SubBlock title="Advanced Planning and Execution">
                            <p>
                                We are developing advanced planning and execution capabilities for our system. The goal is to break down complex tasks into manageable sub-tasks, establish priorities, and dynamically adapt the plan based on intermediate results. This approach aims to facilitate smoother project management and better adaptation to the creative challenges inherent in the film production process.
                            </p>
                        </SubBlock>

                        <ImageContainer
                            src={simulationImg}
                            alt="Stylized human silhouette in a rectangular frame, created by contrasting horizontal lines"
                            quote="AI as a creative assistant: amplifying filmmakers' vision, not replacing it."
                        />
                    </ManifestoSection>

                    {/* Features Section */}
                    <ManifestoSection>
                        <SubBlock title="Creative Freedom and Flexibility">
                            <p>
                                Our model is extremely flexible and can adapt to a variety of genres and styles. It is capable of responding to specific user requests, adjusting stories and narrative elements to perfectly match the desired creative vision.
                            </p>
                        </SubBlock>

                        <SubBlock title="Script Consistency">
                            <p>
                                Creating consistent scripts over several minutes is a challenge with current language models. Our model ensures narrative consistency throughout the story, ensuring that events, actions, and dialogues flow smoothly and logically, providing an immersive and captivating experience.
                            </p>
                        </SubBlock>

                        <SubBlock title="Character Development and World Building">
                            <p>
                                One of the most complex aspects of storytelling is creating believable characters and immersive worlds. Our model excels in developing well-rounded characters with deep backstories, coherent motivations, and authentic dialogues. It also generates rich and detailed universes for these characters to inhabit, ensuring a coherent and engaging narrative experience.
                            </p>
                        </SubBlock>

                        <ImageContainer
                            src={characterImg}
                            alt="Abstract portrait composed of horizontal lines on a black background"
                            quote="Yesterday's tools are not obsolete; they are the springboard to tomorrow's innovations."
                        />
                    </ManifestoSection>

                    {/* Ambition Section */}
                    <ManifestoSection>
                        <SubBlock title="Our Ambition">
                            <p>
                                We are on the brink of a new era of entertainment, where technology and creativity merge. Just as the arrival of sound transformed silent cinema and color revolutionized black and white, generative AI will redefine visual creativity.
                            </p>
                            <p>
                                Our goal is to make high-quality film production accessible, giving every creator tools worthy of major studios, regardless of their budget or technical expertise.
                            </p>
                        </SubBlock>

                        <ImageContainer
                            src={visionImg}
                            alt="Abstract human face formed by horizontal lines on a black background"
                            quote="The magic of tomorrow's cinema will be born from the synergy between the human soul and artificial intelligence."
                        />
                    </ManifestoSection>

                    {/* Beyond Traditional Section */}
                    <ManifestoSection>
                        <SubBlock title="Beyond Traditional Cinema">
                            <p>
                                As the film industry evolves, new challenges and opportunities emerge. We believe that technological innovation can play a crucial role in addressing these issues, making film production more accessible and inclusive.
                            </p>
                            <p>
                                We strive to contribute to this transformation by exploring ways to make interactive storytelling, personalized content creation, and immersive experiences more accessible to all. Our goal is to enable every creator to tell stories in a more engaging and immersive way.
                            </p>
                            <p>
                                Advances in understanding and generating visual narratives can have significant implications in various fields, such as education, marketing, and social communication. We hope that our work can help open new perspectives and enrich the way stories are shared and experienced.
                            </p>
                        </SubBlock>

                        <ImageContainer
                            src={filmmakingImg}
                            alt="Silhouettes of galloping horses created by horizontal lines on a black background"
                        />
                    </ManifestoSection>

                    {/* Empower Creators Section */}
                    <ManifestoSection>
                        <SubBlock title="Unleashing Creative Potential">
                            <p>
                                We believe that the future of visual storytelling lies in democratizing creation, rather than mastering complex production techniques. Our mission is to empower creators to bring their visions to life, whether it's a feature film, a music video, or an innovative advertisement.
                            </p>
                            <p>
                                Our model intuitively understands the language of cinema and visual media, allowing creators to express their ideas naturally and fluently. With Melies.ai, we shift the focus from technical obstacles to pure creative expression. Thus, filmmakers and content creators can fully concentrate on their artistic vision, while our model efficiently handles the complexities of production.
                            </p>
                        </SubBlock>

                        <ImageContainer
                            src={creatorsImg}
                            alt="Minimalist circular architecture with a human silhouette at the center, formed by horizontal lines"
                            quote="AI is not a replacement; it is a creativity amplifier for the storytellers of the future."
                        />
                    </ManifestoSection>

                    {/* Future Vision Section */}
                    <ManifestoSection>
                        <SubBlock title="Our Iterative Approach">
                            <p>At Melies.ai, we have chosen to start our journey by focusing on short films. This approach allows us to:</p>
                            <ul>
                                <li>Experiment and innovate quickly on small-scale projects</li>
                                <li>Build a solid knowledge base on the creative and technical processes of filmmaking</li>
                                <li>Continuously refine our models in an environment conducive to artistic exploration</li>
                            </ul>
                            <p>
                                Our current tools are designed as AI collaborators, assisting human creators in all stages of production, from conceptualization to storyboard, to realization.
                            </p>
                        </SubBlock>

                        <SubBlock title="Future Perspectives">
                            <p>Our vision for the future focuses on continuously improving the cinematic experience. Our main objectives are:</p>
                            <ul>
                                <li>Perfecting the transmission of emotions</li>
                                <li>Improving the quality and depth of generated scripts</li>
                                <li>Offering increased customization to better meet the unique visions of creators</li>
                                <li>Refining narrative consistency over longer durations</li>
                            </ul>
                            <p>
                                By focusing on these essential aspects, we aim to push the boundaries of what AI can bring to the cinematic art, while staying true to the very essence of visual storytelling.
                            </p>
                        </SubBlock>

                        <SubBlock title="Our Vision for the Future of Creation">
                            <p>
                                By continuing to develop and refine our AI technologies, we open up new possibilities for creators from all walks of life. Whether you are an experienced filmmaker or a passionate novice, Melies.ai aims to provide tools that amplify your creativity and bring your unique vision to life.
                            </p>
                            <p>
                                Our ultimate goal is to democratize high-quality film production, making studio-grade capabilities available to everyone, regardless of budget or technical constraints.
                            </p>
                        </SubBlock>
                    </ManifestoSection>

                    {/* Footer Section */}
                    <ManifestoSection className="manifesto-footer-section">
                        <div className="manifesto-footer">
                            <div className="manifesto-footer-content">
                                <p className="manifesto-gradient-text">
                                    Join us in transforming the world of cinema. With Melies.ai, the only limit is your imagination.
                                </p>
                            </div>
                            <div className="manifesto-footer-image">
                                <img src={meliesImg} alt="Melies logo formed by horizontal lines on a black background" />
                            </div>
                        </div>
                    </ManifestoSection>
                </motion.main>
            </div>
        </div>
    );
};

export default Manifesto;
