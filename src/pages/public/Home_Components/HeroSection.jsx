// src/components/sections/Hero.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const cardRef = useRef(null);
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    // const ctaRef = useRef(null);
    const blob1 = useRef(null);
    const blob2 = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(card,
            { opacity: 0, scale: 0.97 },
            { opacity: 1, scale: 1, duration: 0.8 }
        )
            .fromTo(headlineRef.current,
                { opacity: 0, y: 36 },
                { opacity: 1, y: 0, duration: 0.8 }, '-=0.45'
            )
            .fromTo(subRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.65 }, '-=0.45'
            )
            // .fromTo([...ctaRef.current.children],
            //     { opacity: 0, y: 14 },
            //     { opacity: 1, y: 0, duration: 0.5, stagger: 0.11 }, '-=0.38'
            // );

        // Blobs
        gsap.to(blob1.current, { x: 50, y: 35, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(blob2.current, { x: -40, y: -30, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });

        return () => {
            tl.kill();
            gsap.killTweensOf([blob1.current, blob2.current]);
        };
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
                *, *::before, *::after { font-family: 'Syne', sans-serif; }

                /* KEY CHANGE: no wrapper, no side padding, min-height not fixed height */
                .hero-card {
                    position: relative;
                    width: 100%;
                    min-height: 100svh;
                    overflow: hidden;
                    background: var(--background);
                    // border-bottom: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 120px 24px 80px; /* top clears navbar, no side bleeding */
                    box-sizing: border-box;
                }

                .hero-grid {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
                    background-size: 32px 32px;
                    opacity: 0.6;
                    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent);
                    pointer-events: none;
                }

                .blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    will-change: transform;
                }
                .blob-1 {
                    width: 520px; height: 520px;
                    background: oklch(60% 0.18 250 / 0.09);
                    filter: blur(110px);
                    top: -140px; left: -80px;
                }
                .blob-2 {
                    width: 400px; height: 400px;
                    background: oklch(70% 0.15 240 / 0.08);
                    filter: blur(100px);
                    bottom: -80px; right: -60px;
                }

                .hero-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    max-width: 780px;
                    width: 100%;
                }

                .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--accent);
                    border: 1px solid var(--border);
                    border-radius: 999px;
                    padding: 5px 14px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--muted-foreground);
                    margin-bottom: 32px;
                }
                .eyebrow-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: var(--primary);
                    box-shadow: 0 0 6px oklch(60% 0.18 250 / 0.6);
                    animation: blink 2.4s ease-in-out infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.25; }
                }

                .hero-headline {
                    font-size: clamp(2.6rem, 6.5vw, 5.5rem);
                    font-weight: 800;
                    line-height: 1.06;
                    letter-spacing: -0.03em;
                    color: var(--foreground);
                    margin: 0 0 20px;
                }
                .hero-headline .accent {
                    background: linear-gradient(135deg, oklch(60% 0.18 250), oklch(70% 0.15 240));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-sub {
                    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
                    color: var(--muted-foreground);
                    line-height: 1.75;
                    max-width: 480px;
                    margin: 0 auto 40px;
                }

                .cta-group {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 13px 28px;
                    border-radius: 999px;
                    background: var(--primary);
                    color: var(--primary-foreground);
                    font-size: 14px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 28px oklch(60% 0.18 250 / 0.32);
                }
                .btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 13px 28px;
                    border-radius: 999px;
                    background: var(--card);
                    border: 1px solid var(--border);
                    color: var(--foreground);
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
                }
                .btn-secondary:hover {
                    transform: translateY(-2px);
                    border-color: var(--primary);
                    background: var(--accent);
                }

                .trust-line {
                    margin-top: 36px;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.09em;
                    color: var(--muted-foreground);
                    opacity: 0.5;
                    text-transform: uppercase;
                }

                /* Stats strip — pulled from Home.jsx old hero, now lives here */
                .hero-stats {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-top: 56px;
                    border-top: 1px solid var(--border);
                    padding-top: 24px;
                    gap: 0;
                }
                .hero-stat {
                    flex: 1 1 110px;
                    text-align: center;
                    padding: 0 20px;
                    border-right: 1px solid var(--border);
                }
                .hero-stat:last-child { border-right: none; }
                .hero-stat-value {
                    font-size: 1.55rem;
                    font-weight: 800;
                    color: var(--foreground);
                    letter-spacing: -0.02em;
                    line-height: 1;
                    margin-bottom: 5px;
                }
                .hero-stat-label {
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: 0.09em;
                    text-transform: uppercase;
                    color: var(--muted-foreground);
                    opacity: 0.65;
                }

                .scroll-hint {
                    position: absolute;
                    bottom: 28px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    opacity: 0.28;
                    z-index: 10;
                    pointer-events: none;
                }
                .scroll-hint span {
                    font-size: 9px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--muted-foreground);
                }
                .scroll-line {
                    width: 1px; height: 32px;
                    background: linear-gradient(to bottom, var(--primary), transparent);
                    animation: scrollDown 2.2s ease-in-out infinite;
                }
                @keyframes scrollDown {
                    0%   { transform: scaleY(0); transform-origin: top; }
                    50%  { transform: scaleY(1); transform-origin: top; }
                    51%  { transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
            `}</style>

            {/* No wrapper div — card IS the section, edge to edge */}
            <div ref={cardRef} className="hero-card">
                <div className="hero-grid" />
                <div ref={blob1} className="blob blob-1" />
                <div ref={blob2} className="blob blob-2" />

                <div className="hero-content">

                    <div className='mt-5'></div>
                    <h1 ref={headlineRef} className="hero-headline">
                        Transform Your <br />
                        <span className="accent">Digital Presence</span>
                    </h1>

                    <p ref={subRef} className="hero-sub">
                        Expert SEO, digital marketing, software development, AI solutions, and graphic design — 
                        everything you need to dominate your market.
                    </p>

                    {/* <div ref={ctaRef} className="cta-group">
                        <Link to="/signup" className="btn-primary">
                            Get Started Today
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/demo" className="btn-secondary">
                            View Our Work
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
                            </svg>
                        </Link>
                    </div> */}

                    <p className="trust-line">Free Consultation · Trusted by 100+ Businesses</p>

                    {/* Stats — moved from old Home.jsx hero section */}
                    {/* <div className="hero-stats">
                        {[
                            { value: '100+', label: 'Projects Done' },
                            { value: '50+', label: 'Happy Clients' },
                            { value: '5+', label: 'Years Experience' },
                            { value: '24/7', label: 'Support' },
                        ].map((s) => (
                            <div key={s.label} className="hero-stat">
                                <div className="hero-stat-value">{s.value}</div>
                                <div className="hero-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div> */}
                </div>

               
            </div>
        </>
    );
}