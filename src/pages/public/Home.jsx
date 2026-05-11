import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '../../context/LoaderContext';
import TextHeading from '../../components/ui/TextHeading';
import WordReveal from '../../components/ui/WordReveal';
import StatsReveal from './Home_Components/StatsReveal';
import ProjectShowcase from './Home_Components/Projects';
import CurtainTransition from './Home_Components/CurtainTransition';
import ServicesCarousel from './Home_Components/Servicesarousel';
import Testimonials from './Home_Components/Testimonial';
import HeroSection from './Home_Components/HeroSection';
import { Logos3Demo } from './Home_Components/ClientCompanyLogos';
// import Footer from './Home_Components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const { startLoader, endLoader } = useLoader();

    // useEffect(() => {
    //     setTimeout(() => {
    //         startLoader().then(() => {
    //             endLoader();
    //         });
    //     }, 10);
    // }, []);

    return (
        <div className="bg-background text-foreground overflow-hidden">

            <section id="home">
                <HeroSection />
            </section>

            <Logos3Demo />

            <WordReveal text="Empowering Success, Delivering Excellence" />

            <section id="services">
                <div className='text-center mt-20'>
                    <TextHeading text='Our Services' repeat={true} delay={300} className="text-5xl font-extrabold text-center mb-12" />
                    <p style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        textAlign: "center",
                        marginBottom: "2rem",
                    }}>
                        We offer a wide range of services to help you achieve your business goals.
                    </p>
                </div>
                <ServicesCarousel />
            </section>

            <section id="stats">
                <StatsReveal />
            </section>

            <section id="projects">
                <div className='text-center mt-20'>
                    <TextHeading text='Our Projects' repeat={true} delay={300} className="text-6xl font-extrabold text-center mb-12" />
                    <p style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        textAlign: "center",
                        marginBottom: "2rem",
                    }}>
                        Check out our latest projects and see how we've helped our clients succeed.
                    </p>
                </div>
                <ProjectShowcase />
            </section>

            <CurtainTransition text="We Don't Rest Until You Get Your Results" />

            <section id="testimonials">
                <Testimonials />
            </section>

            {/* <Footer /> */}

        </div>
    );
};

export default Home;