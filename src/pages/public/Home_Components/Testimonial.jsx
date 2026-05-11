import { useState, useEffect, useRef } from "react";
import { TbStar, TbChevronLeft, TbChevronRight, TbQuote } from "react-icons/tb";
import TextHeading from "../../../components/ui/TextHeading";

const TESTIMONIALS = [
    {
        id: 1,
        handle: "TwinSpires",
        date: "Mar 18, 2026",
        service: "Technical SEO",
        text: "Z Growth Media rebuilt our entire technical SEO stack — Core Web Vitals, schema, internal linking. Organic traffic doubled inside two quarters.",
    },
    {
        id: 2,
        handle: "PR_Bytes",
        date: "Feb 04, 2026",
        service: "AEO + Content",
        text: "They were the first agency we worked with that actually understood Answer Engine Optimization. Our brand is now consistently cited in ChatGPT and Perplexity for our category keywords.",
    },
    {
        id: 3,
        handle: "Stellar_Commerce",
        date: "Jan 22, 2026",
        service: "Full-Stack SMM",
        text: "From day one, they leaned in as true partners. TikTok, Meta, YouTube — all on one strategy, one team, one report. Best agency relationship we've had.",
    },
    {
        id: 4,
        handle: "FintechFounder",
        date: "Dec 12, 2025",
        service: "GEO Strategy",
        text: "Z Growth Media was prepping us for Google SGE before our competitors even knew what it was. We're now ranked in AI overviews for our top three terms.",
    },
    {
        id: 5,
        handle: "GrowthVC",
        date: "Nov 03, 2025",
        service: "Media Platform Mgmt",
        text: "Their media platform team got our portfolio companies featured in publications we'd been chasing for two years. Strategic, professional, and they actually deliver.",
    },
    {
        id: 6,
        handle: "SaaS_Op",
        date: "Sep 27, 2025",
        service: "Paid Social + SEO",
        text: "Real ROI on real numbers. Monthly reporting is honest, the team is fast, and the strategy compounds. We've doubled our retainer twice.",
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [animKey, setAnimKey] = useState(0);
    const [dir, setDir] = useState(1);
    const intervalRef = useRef(null);

    const startInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDir(1);
            setActive(c => (c + 1) % TESTIMONIALS.length);
            setAnimKey(k => k + 1);
        }, 6000);
    };

    const go = (next, direction = 1) => {
        setDir(direction);
        setActive(next);
        setAnimKey(k => k + 1);
        startInterval();
    };

    const prev = () => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1);
    const next = () => go((active + 1) % TESTIMONIALS.length, 1);

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    const t = TESTIMONIALS[active];

    return (
        <section style={{
            position: "relative",
            background: "var(--background)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(1.5rem, 5vw, 4rem)",
            zIndex: 1,
            overflow: "hidden",
        }}>


            {/* Glow — visible in both modes */}
            <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "700px", height: "500px",
                background: "var(--primary)",
                opacity: 0.04,
                borderRadius: "50%",
                filter: "blur(120px)",
                pointerEvents: "none",
            }} />

            {/* Light mode: subtle dot grid */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                opacity: 0.5,
                pointerEvents: "none",
            }} />

            <div style={{ position: "relative", maxWidth: "860px", margin: "0 auto", width: "100%" }}>

                {/* Header */}
                <div style={{ marginBottom: "clamp(1.5rem, 4vh, 3rem)" }}>
                    <p style={{
                        margin: 0, marginBottom: "0.4rem",
                        fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                        fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
                        color: "var(--primary)",
                    }}>
                        Social Proof
                    </p>
                    <TextHeading text='Client Voices' repeat={true} delay={300} className="text-6xl font-extrabold text-center mb-12" />
                </div>

                {/* Card */}
                <div style={{
                    position: "relative",
                    background: "var(--card)",
                    // Light mode gets a real shadow + slightly tinted border
                    border: "1px solid var(--border)",
                    borderRadius: "clamp(12px, 2vw, 20px)",
                    padding: "clamp(1.4rem, 3vw, 2.5rem)",
                    marginBottom: "clamp(1rem, 2.5vh, 1.8rem)",
                    height: "clamp(200px, 32vh, 280px)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    // Layered shadow: crisp border shadow + soft lift — visible in light mode
                    boxShadow: `
                        0 0 0 1px var(--border),
                        0 4px 6px -1px rgba(0,0,0,0.06),
                        0 12px 32px -4px rgba(0,0,0,0.10),
                        0 32px 64px -8px rgba(0,0,0,0.07)
                    `,
                }}>


                    {/* Large decorative quote icon — gives visual weight in light mode */}
                    <div style={{
                        position: "absolute",
                        bottom: "clamp(10px, 2vh, 18px)",
                        right: "clamp(14px, 2.5vw, 24px)",
                        opacity: 0.06,
                        pointerEvents: "none",
                    }}>
                        <TbQuote style={{ width: "clamp(60px, 10vw, 100px)", height: "clamp(60px, 10vw, 100px)", color: "var(--primary)" }} />
                    </div>

                    {/* Stars */}
                    <div style={{ display: "flex", gap: "3px", marginBottom: "clamp(0.8rem, 2vh, 1.2rem)", flexShrink: 0 }}>
                        {[...Array(5)].map((_, i) => (
                            <TbStar key={i} style={{
                                width: 14, height: 14,
                                fill: "oklch(75% 0.18 80)",
                                color: "oklch(75% 0.18 80)",
                            }} />
                        ))}
                    </div>

                    {/* Quote */}
                    <div
                        key={animKey}
                        style={{
                            flex: 1,
                            overflow: "hidden",
                            animation: `slideIn${dir > 0 ? "Right" : "Left"} 0.45s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
                        }}
                    >
                        <blockquote style={{
                            margin: 0,
                            fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)",
                            fontStyle: "italic",
                            lineHeight: 1.65,
                            color: "var(--foreground)",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            letterSpacing: "-0.01em",
                            fontWeight: 400,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4,
                            overflow: "hidden",
                        }}>
                            "{t.text}"
                        </blockquote>
                    </div>

                    {/* Author row */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: "1rem",
                        flexShrink: 0,
                        paddingTop: "clamp(0.8rem, 2vh, 1.2rem)",
                        borderTop: "1px solid var(--border)",
                    }}>
                        <div style={{
                            width: "clamp(34px, 4.5vw, 42px)",
                            height: "clamp(34px, 4.5vw, 42px)",
                            borderRadius: "50%",
                            background: "color-mix(in oklch, var(--primary) 15%, transparent)",
                            border: "1.5px solid var(--primary)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                            fontWeight: 800,
                            color: "var(--primary)",
                            flexShrink: 0,
                        }}>
                            {t.handle[0].toUpperCase()}
                        </div>
                        <div>
                            <p style={{
                                margin: 0,
                                fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                                fontWeight: 700,
                                color: "var(--foreground)",
                            }}>
                                @{t.handle}
                            </p>
                            <p style={{
                                margin: 0, marginTop: "2px",
                                fontSize: "clamp(0.58rem, 0.8vw, 0.68rem)",
                                color: "var(--muted-foreground)",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}>
                                {t.service} · {t.date}
                            </p>
                        </div>

                        {/* Service badge — extra visual element for light mode */}
                        <div style={{
                            marginLeft: "auto",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                            border: "1px solid color-mix(in oklch, var(--primary) 30%, transparent)",
                            fontSize: "clamp(0.5rem, 0.75vw, 0.62rem)",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--primary)",
                            whiteSpace: "nowrap",
                        }}>
                            {t.service}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => go(i, i > active ? 1 : -1)}
                                style={{
                                    width: i === active ? "28px" : "8px",
                                    height: "8px",
                                    borderRadius: "999px",
                                    background: i === active ? "var(--primary)" : "var(--border)",
                                    border: "none", cursor: "pointer", padding: 0,
                                    transition: "all 0.35s ease",
                                }}
                            />
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        {[{ fn: prev, icon: TbChevronLeft }, { fn: next, icon: TbChevronRight }].map(({ fn, icon: Icon }, i) => (
                            <button
                                key={i}
                                onClick={fn}
                                style={{
                                    width: "clamp(36px, 4.5vw, 44px)",
                                    height: "clamp(36px, 4.5vw, 44px)",
                                    borderRadius: "50%",
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer",
                                    color: "var(--foreground)",
                                    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                    e.currentTarget.style.background = "color-mix(in oklch, var(--primary) 10%, var(--card))";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "var(--border)";
                                    e.currentTarget.style.background = "var(--card)";
                                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                                }}
                            >
                                <Icon style={{ width: "45%", height: "45%" }} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </section>
    );
}