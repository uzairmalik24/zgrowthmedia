// src/components/layout/PublicNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../../store';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import gsap from 'gsap';
import { useLoader } from '../../../context/LoaderContext';

const PublicNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();          // ✅ inside Router via layout
    const { navigateTo } = useLoader();
    const { current: theme } = useSelector((state) => state.theme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navbarWrapperRef = useRef(null);
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const themeButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const lastScrollY = useRef(0);
    const isVisible = useRef(true);
    const scrollAnimation = useRef(null);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
        // { name: 'Testimonials', href: '/testimonials' },
    ];

    // ── Click handler — loader transition then route change ───────────────────
    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        // Pass `navigate` here; LoaderProvider itself has no Router dependency.
        navigateTo(href, navigate);
    };

    // ── Initial entrance animation ────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(navbarWrapperRef.current, { y: -80, opacity: 0 });
            gsap.set(logoRef.current, { opacity: 0, x: -10 });
            gsap.set(navLinksRef.current, { opacity: 0, y: -6 });
            gsap.set(themeButtonRef.current, { opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to(navbarWrapperRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' })
                .to(logoRef.current, { opacity: 1, x: 0, duration: 0.4 }, '-=0.4')
                .to(navLinksRef.current, { opacity: 1, y: 0, stagger: 0.07, duration: 0.35 }, '-=0.25')
                .to(themeButtonRef.current, { opacity: 1, duration: 0.3 }, '-=0.2');
        });
        return () => ctx.revert();
    }, []);

    // ── Scroll hide / show ────────────────────────────────────────────────────
    useEffect(() => {
        const SCROLL_THRESHOLD = 80;
        const DELTA_THRESHOLD = 6;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;
            if (Math.abs(delta) < DELTA_THRESHOLD) return;

            const scrollingDown = delta > 0;

            if (scrollingDown && currentScrollY > SCROLL_THRESHOLD && isVisible.current) {
                isVisible.current = false;
                if (scrollAnimation.current) scrollAnimation.current.kill();
                scrollAnimation.current = gsap.to(navbarWrapperRef.current, {
                    y: -100, opacity: 0, duration: 0.35, ease: 'power3.in', overwrite: 'auto',
                });
            } else if (!scrollingDown && !isVisible.current) {
                isVisible.current = true;
                if (scrollAnimation.current) scrollAnimation.current.kill();
                scrollAnimation.current = gsap.fromTo(
                    navbarWrapperRef.current,
                    { y: -100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)', overwrite: 'auto' }
                );
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollAnimation.current) scrollAnimation.current.kill();
        };
    }, []);

    // ── Mobile menu animation ─────────────────────────────────────────────────
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isMenuOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
            );
            gsap.from(
                mobileMenuRef.current.querySelectorAll('a'),
                { x: -16, opacity: 0, stagger: 0.07, duration: 0.25, delay: 0.1, ease: 'power2.out' }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0, opacity: 0, duration: 0.25, ease: 'power2.in',
            });
        }
    }, [isMenuOpen]);

    const handleThemeToggle = () => {
        gsap.to(themeButtonRef.current, { rotation: '+=180', duration: 0.4, ease: 'power2.inOut' });
        dispatch(toggleTheme());
    };

    return (
        <div
            ref={navbarWrapperRef}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
        >
            <header
                ref={navbarRef}
                className="
                    pointer-events-auto
                    w-full max-w-5xl
                    rounded-xl
                    border border-border/60
                    bg-background
                    shadow-md shadow-black/10
                    transition-colors duration-300
                "
            >
                <div className="flex h-14 items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <a
                        href="/"
                        ref={logoRef}
                        className="flex items-center gap-2.5 shrink-0"
                        onClick={(e) => handleNavClick(e, '/')}
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base overflow-hidden">
                            <img
                                src="/images/pioneer-tech-image.avif"
                                alt="Pioneers Tech Logo"
                                className="h-full w-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                        <span className="font-semibold text-base tracking-tight text-foreground">
                            Pioneers Tech
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                ref={(el) => (navLinksRef.current[index] = el)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <button
                            ref={themeButtonRef}
                            onClick={handleThemeToggle}
                            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
                        </button>

                        <button
                            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="md:hidden border-t border-border/50 py-4 px-4 overflow-hidden rounded-b-xl"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
        </div>
    );
};

export default PublicNavbar;