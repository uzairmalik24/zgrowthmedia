// src/components/layout/PublicNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../../store';
import { FaBars, FaTimes, FaSun, FaMoon, FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { useLoader } from '../../../context/LoaderContext';

const SERVICE_GROUPS = [
    {
        heading: 'Search Domination',
        href: '/services#search',
        items: [
            { name: 'On-Page SEO', href: '/services/on-page-seo' },
            { name: 'Off-Page SEO', href: '/services/off-page-seo' },
            { name: 'Technical SEO', href: '/services/technical-seo' },
            { name: 'AEO — Answer Engine', href: '/services/aeo' },
            { name: 'GEO — Generative Experience', href: '/services/geo' },
        ],
    },
    {
        heading: 'Social Authority',
        href: '/services#social',
        items: [
            { name: 'TikTok Growth', href: '/services/tiktok' },
            { name: 'Meta (FB / IG)', href: '/services/meta' },
            { name: 'YouTube Strategy', href: '/services/youtube' },
            { name: 'X (Twitter) Authority', href: '/services/x' },
            { name: 'Paid Social Ads', href: '/services/paid-social' },
        ],
    },
    {
        heading: 'Media Platform Mgmt',
        href: '/services#media',
        items: [
            { name: 'Third-Party Publications', href: '/services/publications' },
            { name: 'Digital Asset Oversight', href: '/services/assets' },
            { name: 'Brand Partnerships', href: '/services/partnerships' },
            { name: 'Media Placements', href: '/services/placements' },
        ],
    },
];

const PublicNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { navigateTo } = useLoader();
    const { current: theme } = useSelector((state) => state.theme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const navbarWrapperRef = useRef(null);
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const themeButtonRef = useRef(null);
    const ctaButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const megaMenuRef = useRef(null);

    const lastScrollY = useRef(0);
    const isVisible = useRef(true);
    const scrollAnimation = useRef(null);
    const hoverTimer = useRef(null);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services', hasMega: true },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about-us' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        setServicesOpen(false);
        navigateTo(href, navigate);
    };

    // ── Initial entrance animation ────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(navbarWrapperRef.current, { y: -80, opacity: 0 });
            gsap.set(logoRef.current, { opacity: 0, x: -10 });
            gsap.set(navLinksRef.current, { opacity: 0, y: -6 });
            gsap.set([themeButtonRef.current, ctaButtonRef.current], { opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to(navbarWrapperRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' })
                .to(logoRef.current, { opacity: 1, x: 0, duration: 0.4 }, '-=0.4')
                .to(navLinksRef.current, { opacity: 1, y: 0, stagger: 0.07, duration: 0.35 }, '-=0.25')
                .to([themeButtonRef.current, ctaButtonRef.current], { opacity: 1, duration: 0.3, stagger: 0.08 }, '-=0.2');
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
                { x: -16, opacity: 0, stagger: 0.05, duration: 0.25, delay: 0.1, ease: 'power2.out' }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0, opacity: 0, duration: 0.25, ease: 'power2.in',
            });
        }
    }, [isMenuOpen]);

    // ── Mega menu animation ───────────────────────────────────────────────────
    useEffect(() => {
        if (!megaMenuRef.current) return;
        if (servicesOpen) {
            gsap.fromTo(megaMenuRef.current,
                { opacity: 0, y: -10, pointerEvents: 'none' },
                { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.25, ease: 'power2.out' }
            );
        } else {
            gsap.to(megaMenuRef.current, {
                opacity: 0, y: -10, pointerEvents: 'none', duration: 0.2, ease: 'power2.in',
            });
        }
    }, [servicesOpen]);

    const openMega = () => {
        clearTimeout(hoverTimer.current);
        setServicesOpen(true);
    };
    const closeMegaSoon = () => {
        clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setServicesOpen(false), 150);
    };

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
                    w-full max-w-6xl
                    rounded-xl
                    border border-border/60
                    bg-background
                    shadow-md shadow-black/10
                    transition-colors duration-300
                    relative
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
                                src="/images/main-logo-light.png"
                                alt="Z Growth Media Logo"
                                className="h-full w-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                        <span className="font-semibold text-base tracking-tight text-foreground">
                            Z Growth Media
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link, index) => (
                            link.hasMega ? (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={openMega}
                                    onMouseLeave={closeMegaSoon}
                                >
                                    <a
                                        href={link.href}
                                        ref={(el) => (navLinksRef.current[index] = el)}
                                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                        <FaChevronDown className="h-2.5 w-2.5 opacity-60" />
                                    </a>
                                </div>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    ref={(el) => (navLinksRef.current[index] = el)}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <button
                            ref={themeButtonRef}
                            onClick={handleThemeToggle}
                            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
                        </button>

                        <a
                            ref={ctaButtonRef}
                            href="/contact"
                            onClick={(e) => handleNavClick(e, '/contact')}
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            Get a Quote
                            <span aria-hidden>→</span>
                        </a>

                        <button
                            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mega Menu */}
                <div
                    ref={megaMenuRef}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMegaSoon}
                    className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(900px,calc(100vw-2rem))] rounded-xl border border-border/60 bg-background shadow-xl shadow-black/10"
                    style={{ opacity: 0, pointerEvents: 'none' }}
                >
                    <div className="grid grid-cols-3 gap-6 p-6">
                        {SERVICE_GROUPS.map((group) => (
                            <div key={group.heading}>
                                <a
                                    href={group.href}
                                    onClick={(e) => handleNavClick(e, group.href)}
                                    className="block text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3"
                                >
                                    {group.heading}
                                </a>
                                <ul className="space-y-2">
                                    {group.items.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="lg:hidden border-t border-border/50 py-4 px-4 overflow-hidden rounded-b-xl"
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
                            <a
                                href="/contact"
                                onClick={(e) => handleNavClick(e, '/contact')}
                                className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                            >
                                Get a Quote →
                            </a>
                        </nav>
                    </div>
                )}
            </header>
        </div>
    );
};

export default PublicNavbar;
