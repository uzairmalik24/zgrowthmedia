import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbSeo, TbSparkles, TbBrain } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
    {
        num: "01",
        title: "Search Engine Optimization",
        tag: "SEO",
        Icon: TbSeo,
        blurb: "Traditional search authority — built to compound.",
        points: [
            "High-DA white-hat link building",
            "Deep technical audits & Core Web Vitals",
            "On-page + content strategy",
            "Schema markup & internal linking",
        ],
        accent: "oklch(60% 0.18 250)",
    },
    {
        num: "02",
        title: "Answer Engine Optimization",
        tag: "AEO",
        Icon: TbSparkles,
        blurb: "Be the answer ChatGPT, Gemini & Perplexity cite.",
        points: [
            "LLM-citation-ready content",
            "Entity & knowledge graph signals",
            "Structured FAQs & passage SEO",
            "AI-assistant visibility tracking",
        ],
        accent: "oklch(65% 0.20 260)",
        featured: true,
    },
    {
        num: "03",
        title: "Generative Experience Optimization",
        tag: "GEO",
        Icon: TbBrain,
        blurb: "Future-proof for Google SGE & AI overviews.",
        points: [
            "SGE-first content architecture",
            "Multi-modal & vector-friendly assets",
            "Conversational search optimization",
            "Continuous AI-SERP monitoring",
        ],
        accent: "oklch(55% 0.22 240)",
    },
];

export default function TriplePillar() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(cardsRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.12,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
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
            }}
        >
            <div ref={headingRef} style={{ maxWidth: "780px", marginBottom: "clamp(3rem, 6vh, 5rem)", opacity: 0 }}>
                <p style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    margin: "0 0 1rem",
                }}>
                    Three Pillars · One Stack
                </p>
                <h2 style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    color: "var(--foreground)",
                }}>
                    Rank on Google today. <br />
                    <span style={{ color: "var(--primary)" }}>Get cited by AI tomorrow.</span>
                </h2>
                <p style={{
                    marginTop: "1.5rem",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "var(--muted-foreground)",
                    maxWidth: "55ch",
                }}>
                    Search is splitting into three surfaces. We build authority across all of them — so your brand
                    shows up whether your customer types, asks, or generates.
                </p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
            }}>
                {PILLARS.map((p, i) => {
                    const { Icon } = p;
                    return (
                        <article
                            key={p.num}
                            ref={(el) => (cardsRef.current[i] = el)}
                            style={{
                                position: "relative",
                                padding: "2.25rem 2rem 2rem",
                                borderRadius: "var(--radius)",
                                border: "1px solid var(--border)",
                                background: p.featured
                                    ? "color-mix(in oklch, var(--primary) 5%, var(--card))"
                                    : "var(--card)",
                                opacity: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.25rem",
                                overflow: "hidden",
                                transition: "transform 0.3s ease, border-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = p.accent;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "var(--border)";
                            }}
                        >
                            {/* Top row */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{
                                    fontSize: "0.6rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.22em",
                                    textTransform: "uppercase",
                                    color: "var(--muted-foreground)",
                                }}>
                                    Pillar {p.num}
                                </span>
                                <div style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "50%",
                                    background: `color-mix(in oklch, ${p.accent} 14%, transparent)`,
                                    border: `1px solid ${p.accent}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: p.accent,
                                }}>
                                    <Icon size={22} />
                                </div>
                            </div>

                            <div>
                                <p style={{
                                    margin: 0,
                                    marginBottom: "0.4rem",
                                    fontSize: "0.65rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.25em",
                                    color: p.accent,
                                }}>
                                    {p.tag}
                                </p>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em",
                                    color: "var(--foreground)",
                                    lineHeight: 1.2,
                                }}>
                                    {p.title}
                                </h3>
                                <p style={{
                                    margin: "0.6rem 0 0",
                                    fontSize: "0.92rem",
                                    color: "var(--muted-foreground)",
                                    lineHeight: 1.55,
                                }}>
                                    {p.blurb}
                                </p>
                            </div>

                            <ul style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.55rem",
                                borderTop: "1px solid var(--border)",
                                paddingTop: "1rem",
                            }}>
                                {p.points.map((point) => (
                                    <li key={point} style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "0.6rem",
                                        fontSize: "0.875rem",
                                        color: "var(--foreground)",
                                        lineHeight: 1.5,
                                    }}>
                                        <span style={{ color: p.accent, marginTop: "0.1rem", fontWeight: 800 }}>›</span>
                                        {point}
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
