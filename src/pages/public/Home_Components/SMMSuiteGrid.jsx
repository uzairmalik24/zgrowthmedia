import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTiktok, FaMeta, FaYoutube, FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const PLATFORMS = [
    {
        name: "TikTok",
        Icon: FaTiktok,
        tagline: "Short-form virality engineered.",
        desc: "Trend-led content strategy, native editing, and creator partnerships that move the algorithm in your favor.",
        bullets: ["Hook-first scripting", "Sound-led editing", "Spark Ads management"],
        gradient: "linear-gradient(135deg, #ff0050 0%, #00f2ea 100%)",
    },
    {
        name: "Meta",
        Icon: FaMeta,
        tagline: "Facebook & Instagram — full stack.",
        desc: "Organic content, paid acquisition, retargeting, and community management across the Meta ecosystem.",
        bullets: ["Reels & feed content", "Advantage+ campaigns", "Catalog & DPA ads"],
        gradient: "linear-gradient(135deg, #0064E0 0%, #C13584 50%, #F77737 100%)",
    },
    {
        name: "YouTube",
        Icon: FaYoutube,
        tagline: "Long-form authority that compounds.",
        desc: "Channel strategy, SEO-optimized titles and thumbnails, ad management, and Shorts distribution.",
        bullets: ["Channel SEO", "Thumbnail testing", "TrueView & Shorts ads"],
        gradient: "linear-gradient(135deg, #FF0000 0%, #282828 100%)",
    },
    {
        name: "X (Twitter)",
        Icon: FaXTwitter,
        tagline: "Distribution & cultural relevance.",
        desc: "Thought leadership content, community building, and high-velocity engagement strategies for X.",
        bullets: ["Founder-led content", "Thread architecture", "X Ads management"],
        gradient: "linear-gradient(135deg, #000000 0%, #1d1d1d 50%, #444444 100%)",
    },
];

export default function SMMSuiteGrid() {
    const sectionRef = useRef(null);
    const headRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(cardsRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none" },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 5rem)",
                background: "var(--background)",
                position: "relative",
            }}
        >
            {/* Heading */}
            <div ref={headRef} style={{ maxWidth: "780px", marginBottom: "clamp(3rem, 6vh, 5rem)", opacity: 0 }}>
                <p style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    margin: "0 0 1rem",
                }}>
                    The SMM Suite
                </p>
                <h2 style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    color: "var(--foreground)",
                }}>
                    Full-service social, <br />
                    <span style={{ color: "var(--primary)" }}>every platform that matters.</span>
                </h2>
                <p style={{
                    marginTop: "1.5rem",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "var(--muted-foreground)",
                    maxWidth: "55ch",
                }}>
                    Organic content, paid acquisition, and community growth — strategized, produced, and optimized
                    against platform-native KPIs. One team, every channel.
                </p>
            </div>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
            }}>
                {PLATFORMS.map((p, i) => {
                    const { Icon } = p;
                    return (
                        <article
                            key={p.name}
                            ref={(el) => (cardsRef.current[i] = el)}
                            style={{
                                position: "relative",
                                padding: "2rem 1.75rem",
                                borderRadius: "var(--radius)",
                                border: "1px solid var(--border)",
                                background: "var(--card)",
                                overflow: "hidden",
                                opacity: 0,
                                transition: "transform 0.3s ease, border-color 0.3s ease",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                minHeight: "320px",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = "var(--primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "var(--border)";
                            }}
                        >
                            {/* Decorative gradient blob */}
                            <div
                                aria-hidden
                                style={{
                                    position: "absolute",
                                    top: "-40px",
                                    right: "-40px",
                                    width: "160px",
                                    height: "160px",
                                    borderRadius: "50%",
                                    background: p.gradient,
                                    opacity: 0.12,
                                    filter: "blur(30px)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Icon */}
                            <div style={{
                                position: "relative",
                                zIndex: 1,
                                width: "52px",
                                height: "52px",
                                borderRadius: "12px",
                                background: p.gradient,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                            }}>
                                <Icon size={24} />
                            </div>

                            {/* Body */}
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: "1.35rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em",
                                    color: "var(--foreground)",
                                }}>
                                    {p.name}
                                </h3>
                                <p style={{
                                    margin: "0.35rem 0 0",
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    color: "var(--primary)",
                                    letterSpacing: "0.01em",
                                }}>
                                    {p.tagline}
                                </p>
                                <p style={{
                                    margin: "0.8rem 0 0",
                                    fontSize: "0.875rem",
                                    color: "var(--muted-foreground)",
                                    lineHeight: 1.55,
                                }}>
                                    {p.desc}
                                </p>
                            </div>

                            <ul style={{
                                marginTop: "auto",
                                listStyle: "none",
                                padding: 0,
                                paddingTop: "0.9rem",
                                borderTop: "1px solid var(--border)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.4rem",
                                position: "relative",
                                zIndex: 1,
                            }}>
                                {p.bullets.map((b) => (
                                    <li key={b} style={{
                                        fontSize: "0.78rem",
                                        color: "var(--foreground)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}>
                                        <span style={{
                                            width: "5px",
                                            height: "5px",
                                            borderRadius: "50%",
                                            background: "var(--primary)",
                                        }} />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
