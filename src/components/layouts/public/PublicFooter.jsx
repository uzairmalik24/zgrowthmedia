import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";
import { useLoader } from "../../../context/LoaderContext";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund & Cancellation", href: "/refund-policy" },
];

const SOCIAL_LINKS = [
    { Icon: FaLinkedin, href: "{{LINKEDIN_URL}}", label: "LinkedIn" },
    { Icon: FaInstagram, href: "{{INSTAGRAM_URL}}", label: "Instagram" },
    { Icon: FaXTwitter, href: "{{X_URL}}", label: "X" },
    { Icon: FaTiktok, href: "{{TIKTOK_URL}}", label: "TikTok" },
    { Icon: FaYoutube, href: "{{YOUTUBE_URL}}", label: "YouTube" },
];

// Replace with the real number once provided. Format: international, no '+' or spaces.
const WHATSAPP_NUMBER = "{{WHATSAPP_NUMBER}}";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;

export default function Footer() {
    const navigate = useNavigate();
    const { navigateTo } = useLoader();

    const footerRef = useRef(null);
    const bigTextRef = useRef(null);
    const lineRefs = useRef([]);
    const revealRefs = useRef([]);
    const marqueeRef = useRef(null);

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
        <>
            {/* Floating WhatsApp chat button — visible on all pages with the footer */}
            <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                style={{
                    position: "fixed",
                    bottom: "1.5rem",
                    right: "1.5rem",
                    zIndex: 60,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#25D366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: "0 8px 28px rgba(37,211,102,0.35)",
                    transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                <FaWhatsapp size={26} />
            </a>

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
                                <span>Z Growth Media</span>
                                <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                                <span>SEO · AEO · GEO</span>
                                <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                                <span>Scaling Brands Through AI-Era Search</span>
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
                            Ready to scale?
                        </p>
                        <h2 style={{
                            fontSize: "clamp(2rem, 7vw, 10rem)",
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: "-0.04em",
                            margin: "0 0 3rem 0",
                            color: "var(--foreground)",
                        }}>
                            Own the
                            <br />
                            <span style={{ color: "var(--primary)" }}>AI-Era</span>
                            <br />
                            <span style={{ WebkitTextStroke: "2px var(--foreground)", color: "transparent" }}>
                                Search.
                            </span>
                        </h2>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                            <a
                                href="/contact"
                                onClick={(e) => handleNavClick(e, "/contact")}
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
                                Get a Quote →
                            </a>
                            <a
                                href={WHATSAPP_HREF}
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
                                <FaWhatsapp /> WhatsApp Us →
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
                            alt="Z Growth Media"
                            style={{ height: "60px", width: "auto", marginBottom: "1.5rem", display: "block", objectFit: "contain" }}
                            className="dark:hidden"
                        />
                        <img
                            src="/images/main-logo-dark.png"
                            alt="Z Growth Media"
                            style={{ height: "60px", width: "auto", marginBottom: "1.5rem", display: "none", objectFit: "contain" }}
                            className="dark:block"
                        />
                        <p style={{
                            fontSize: "0.875rem",
                            lineHeight: 1.7,
                            color: "var(--muted-foreground)",
                            maxWidth: "320px",
                            marginBottom: "1.5rem",
                            marginTop: 0,
                        }}>
                            Scaling brands through traditional SEO and next-gen AI optimization (AEO/GEO). Full-service social media marketing and strategic media platform management.
                        </p>

                        {/* Socials */}
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        border: "1px solid var(--border)",
                                        color: "var(--muted-foreground)",
                                        textDecoration: "none",
                                        transition: "color 0.2s, border-color 0.2s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.borderColor = "var(--primary)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
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

                    {/* Legal */}
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
                            Legal
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {LEGAL_LINKS.map(({ label, href }) => (
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

                    {/* Offices */}
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
                            Offices
                        </p>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--primary)", margin: 0, marginBottom: "0.4rem", textTransform: "uppercase" }}>
                                United Kingdom
                            </p>
                            <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
                                {"{{UK_OFFICE_ADDRESS}}"}
                            </p>
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--primary)", margin: 0, marginBottom: "0.4rem", textTransform: "uppercase" }}>
                                Pakistan
                            </p>
                            <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
                                {"{{PK_OFFICE_ADDRESS}}"}
                            </p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            <a
                                href={WHATSAPP_HREF}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                                onMouseLeave={e => e.currentTarget.style.color = "var(--muted-foreground)"}
                            >
                                <FaWhatsapp /> {"{{WHATSAPP_NUMBER}}"}
                            </a>
                            <a
                                href="mailto:{{EMAIL_ADDRESS}}"
                                style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                                onMouseLeave={e => e.currentTarget.style.color = "var(--muted-foreground)"}
                            >
                                {"{{EMAIL_ADDRESS}}"}
                            </a>
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
                        © {new Date().getFullYear()} Z Growth Media. All rights reserved.
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", margin: 0, fontWeight: 500 }}>
                        Built for the AI-era of search.
                    </p>
                </div>
            </footer>
        </>
    );
}
