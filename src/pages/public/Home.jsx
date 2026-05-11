import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '../../context/LoaderContext';
import WordReveal from '../../components/ui/WordReveal';
import StatsReveal from './Home_Components/StatsReveal';
import CurtainTransition from './Home_Components/CurtainTransition';
import Testimonials from './Home_Components/Testimonial';
import HeroSection from './Home_Components/HeroSection';
import { Logos3Demo } from './Home_Components/ClientCompanyLogos';
import TriplePillar from './Home_Components/TriplePillar';
import SMMSuiteGrid from './Home_Components/SMMSuiteGrid';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const { startLoader, endLoader } = useLoader();

    return (
        <div className="bg-background text-foreground overflow-hidden">

            <section id="home">
                <HeroSection />
            </section>

            {/* Trust Bar — infinite logo slider */}
            <Logos3Demo />

            <WordReveal text="Scaling Brands Through The AI-Era Of Search" />

            {/* Triple Pillar — SEO / AEO / GEO */}
            <section id="pillars">
                <TriplePillar />
            </section>

            {/* SMM Suite Grid */}
            <section id="smm">
                <SMMSuiteGrid />
            </section>

            <section id="stats">
                <StatsReveal />
            </section>

            <CurtainTransition text="We Don't Just Rank You. We Make You The Answer." />

            <section id="testimonials">
                <Testimonials />
            </section>

        </div>
    );
};

export default Home;
