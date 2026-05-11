import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "../../../context/LoaderContext"; // adjust path as needed

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    // { label: "Testimonials", href: "/testimonials" },
];

export default function Footer() {
    const navigate = useNavigate();
    const { navigateTo } = useLoader();

    const footerRef = useRef(null);
    const bigTextRef = useRef(null);
    const lineRefs = useRef([]);
    const revealRefs = useRef([]);
    const marqueeRef = useRef(null);

    // ── Loader-aware internal link handler ────────────────────────────────────
    const handleNavClick = (e, href) => {
        e.preventDefault();
        navigateTo(href, navigate);
    };

    useEffect(() => {
        lineRefs.current = [];
        revealRefs.current = [];

        const ctx = gsap.context(() => {
            gsap.fromTo(
                bigTextRef.current,
                { yPercent: 30, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: bigTextRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );

            lineRefs.current.forEach((line, i) => {
                gsap.fromTo(line, { scaleX: 0 }, {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                });
            });

            gsap.fromTo(
                revealRefs.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 18,
                ease: "none",
                repeat: -1,
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const addLineRef = (el) => { if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el); };
    const addRevealRef = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

    const navHoverIn = (e) => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.gap = "0.7rem"; };
    const navHoverOut = (e) => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.gap = "0.4rem"; };

    return (
        <footer
            ref={footerRef}
            style={{
                position: "relative",
                background: "var(--background)",
                color: "var(--foreground)",
                overflow: "hidden",
                paddingTop: "6rem",
            }}
        >
            {/* ── Marquee strip ─────────────────────────────────── */}
            <div style={{
                overflow: "hidden",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                padding: "1rem 0",
                marginBottom: "5rem",
            }}>
                <div
                    ref={marqueeRef}
                    style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", width: "max-content" }}
                >
                    {[...Array(8)].map((_, i) => (
                        <span key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4rem",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--muted-foreground)",
                        }}>
                            <span>Pioneers Tech</span>
                            <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                            <span>Digital Excellence</span>
                            <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                            <span>We Build. You Grow.</span>
                            <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Big CTA ───────────────────────────────────────── */}
            <div style={{ padding: "0 6vw", marginBottom: "5rem" }}>
                <div ref={bigTextRef} style={{ opacity: 0 }}>
                    <p style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "var(--primary)",
                        marginBottom: "1.5rem",
                        marginTop: 0,
                    }}>
                        Ready to start?
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2rem, 7vw, 10rem)",
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: "-0.04em",
                        margin: "0 0 3rem 0",
                        color: "var(--foreground)",
                    }}>
                        Let's Build
                        <br />
                        <span style={{ color: "var(--primary)" }}>Something</span>
                        <br />
                        <span style={{ WebkitTextStroke: "2px var(--foreground)", color: "transparent" }}>
                            Great.
                        </span>
                    </h2>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                        {/* External links — no loader needed */}
                        <a
                            href="https://www.guru.com/freelancers/pioneers-tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "1rem 2.5rem",
                                background: "var(--primary)",
                                color: "var(--primary-foreground)",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: "999px",
                                transition: "opacity 0.2s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                        >
                            Hire Us on Guru →
                        </a>
                        <a
                            href="https://wa.me/923464963514"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "1rem 2.5rem",
                                background: "transparent",
                                color: "var(--foreground)",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: "999px",
                                border: "2px solid var(--border)",
                                transition: "border-color 0.2s ease, color 0.2s ease",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--foreground)"; }}
                        >
                            WhatsApp Us →
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Divider ───────────────────────────────────────── */}
            <div ref={addLineRef} style={{ height: "1px", background: "var(--border)", margin: "0 6vw", transformOrigin: "left" }} />

            {/* ── Main grid ─────────────────────────────────────── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "3rem",
                padding: "4rem 6vw",
            }}>
                {/* Brand */}
                <div ref={addRevealRef}>
                    <img
                        src="/images/main-logo-light.png"
                        alt="Pioneers Tech"
                        style={{ height: "60px", width: "auto", marginBottom: "1.5rem", display: "block", objectFit: "contain" }}
                        className="dark:hidden"
                    />
                    <img
                        src="/images/main-logo-dark.png"
                        alt="Pioneers Tech"
                        style={{ height: "60px", width: "auto", marginBottom: "1.5rem", display: "none", objectFit: "contain" }}
                        className="dark:block"
                    />
                    <p style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "var(--muted-foreground)",
                        maxWidth: "300px",
                        marginBottom: "1.5rem",
                        marginTop: 0,
                    }}>
                        We craft digital experiences that are fast, beautiful, and built to grow your business. Based in Bhakkar, serving clients worldwide.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <a
                            href="tel:+923464963514"
                            style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--muted-foreground)"}
                        >
                            +92 346 4963514
                        </a>
                        <a
                            href="mailto:pioneerstechofficial@gmail.com"
                            style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--muted-foreground)"}
                        >
                            pioneerstechofficial@gmail.com
                        </a>
                        <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", margin: "0.25rem 0 0 0", lineHeight: 1.6 }}>
                            Official Colony, Street No. 8,<br />
                            Near Police Line, District Bhakkar
                        </p>
                    </div>
                </div>

                {/* Navigate */}
                <div ref={addRevealRef}>
                    <p style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        marginBottom: "1.5rem",
                        marginTop: 0,
                    }}>
                        Navigate
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    onClick={(e) => handleNavClick(e, href)}
                                    style={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "var(--foreground)",
                                        textDecoration: "none",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.4rem",
                                        transition: "color 0.2s, gap 0.2s",
                                    }}
                                    onMouseEnter={navHoverIn}
                                    onMouseLeave={navHoverOut}
                                >
                                    <span style={{ fontSize: "0.6rem", color: "var(--primary)" }}>▶</span>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Work With Us */}
                <div ref={addRevealRef}>
                    <p style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        marginBottom: "1.5rem",
                        marginTop: 0,
                    }}>
                        Work With Us
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {[
                            { label: "Hire on Guru.com", href: "https://www.guru.com/freelancers/pioneers-tech/", external: true },
                            { label: "Chat on WhatsApp", href: "https://wa.me/923464963514", external: true },
                            { label: "Send an Email", href: "mailto:pioneerstechofficial@gmail.com", external: false },
                        ].map(({ label, href, external }) => (
                            <a
                                key={label}
                                href={href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    color: "var(--foreground)",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    transition: "color 0.2s, gap 0.2s",
                                }}
                                onMouseEnter={navHoverIn}
                                onMouseLeave={navHoverOut}
                            >
                                <span style={{ fontSize: "0.6rem", color: "var(--primary)" }}>▶</span>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Divider ───────────────────────────────────────── */}
            <div ref={addLineRef} style={{ height: "1px", background: "var(--border)", margin: "0 6vw", transformOrigin: "left" }} />

            {/* ── Bottom bar ────────────────────────────────────── */}
            <div
                ref={addRevealRef}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    padding: "1.75rem 6vw",
                }}
            >
                <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", margin: 0, fontWeight: 500 }}>
                    © {new Date().getFullYear()} Pioneers Tech. All rights reserved.
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", margin: 0, fontWeight: 500 }}>
                    Crafted with precision in Bhakkar, Pakistan
                </p>
            </div>
        </footer>
    );
}