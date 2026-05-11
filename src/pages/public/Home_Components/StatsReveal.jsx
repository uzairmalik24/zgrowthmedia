import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_STATS = [
    { value: 51, prefix: "$", suffix: "K+", label: "All-time Earnings", desc: "Verified on Guru.com" },
    { value: 100, prefix: "", suffix: "+", label: "Projects Completed", desc: "Across all service areas" },
    { value: 35, prefix: "", suffix: "+", label: "Happy Clients", desc: "Across multiple continents" },
    { value: 100, prefix: "", suffix: "%", label: "Satisfaction Rate", desc: "Top-rated Guru.com team" },
];

function StatItem({ value, prefix = "", suffix, label, desc, index }) {
    const wrapRef = useRef(null);
    const numRef = useRef(null);
    const suffixRef = useRef(null);
    const lineRef = useRef(null);
    const labelRef = useRef(null);
    const descRef = useRef(null);
    const indexRef = useRef(null);

    useEffect(() => {
        const counter = { val: 0 };

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapRef.current,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                    onLeaveBack: () => {
                        counter.val = 0;
                        if (numRef.current) numRef.current.textContent = `${prefix}0`;
                    },
                },
            });

            tl.fromTo(indexRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" },
                0
            );

            tl.fromTo(lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.6, ease: "power3.inOut", transformOrigin: "left" },
                0.1
            );

            tl.fromTo([numRef.current, suffixRef.current],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.04 },
                0.25
            );

            tl.to(counter, {
                val: value,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                    if (numRef.current)
                        numRef.current.textContent = `${prefix}${Math.round(counter.val)}`;
                },
            }, 0.3);

            tl.fromTo(labelRef.current,
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
                0.55
            );

            tl.fromTo(descRef.current,
                { y: 8, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
                0.68
            );
        }, wrapRef);

        return () => ctx.revert();
    }, [value, prefix]);

    return (
        <div
            ref={wrapRef}
            style={{
                flex: "1 1 180px",
                minWidth: 0,
                padding: "2.8rem 2.2rem 2.4rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                position: "relative",
            }}
        >
            <span
                ref={indexRef}
                style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.14em",
                    opacity: 0,
                    marginBottom: "0.8rem",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <div style={{ position: "absolute", top: 0, left: "2.2rem", right: "2.2rem", height: "2px", background: "var(--border)", borderRadius: "1px" }}>
                <div
                    ref={lineRef}
                    style={{
                        position: "absolute", inset: 0,
                        background: "var(--primary)", borderRadius: "1px",
                        transformOrigin: "left", transform: "scaleX(0)",
                    }}
                />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", lineHeight: 1, overflow: "hidden" }}>
                <span
                    ref={numRef}
                    style={{
                        fontSize: "clamp(3.5rem, 6.5vw, 6rem)",
                        fontWeight: 800,
                        color: "var(--foreground)",
                        letterSpacing: "-0.04em",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: "'Georgia', serif",
                        opacity: 0,
                    }}
                >
                    {prefix}0
                </span>
                <span
                    ref={suffixRef}
                    style={{
                        fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                        fontWeight: 800,
                        color: "var(--primary)",
                        fontFamily: "'Georgia', serif",
                        marginTop: "0.5em",
                        letterSpacing: "-0.02em",
                        opacity: 0,
                    }}
                >
                    {suffix}
                </span>
            </div>

            <p
                ref={labelRef}
                style={{
                    margin: "0.3rem 0 0",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    letterSpacing: "0.01em",
                    opacity: 0,
                }}
            >
                {label}
            </p>

            <p
                ref={descRef}
                style={{
                    margin: 0,
                    fontSize: "0.78rem",
                    fontWeight: 400,
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.02em",
                    opacity: 0,
                }}
            >
                {desc}
            </p>
        </div>
    );
}

export default function StatsReveal({ stats = DEFAULT_STATS, className = "" }) {
    const sectionRef = useRef(null);
    const tagRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(tagRef.current,
                { y: 16, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={className}
            style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "6rem 5vw",
                boxSizing: "border-box",
            }}
        >
            <p
                ref={tagRef}
                style={{
                    margin: "0 0 3rem",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    opacity: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                }}
            >
                <span style={{
                    display: "inline-block",
                    width: "1.8rem",
                    height: "1.5px",
                    background: "var(--primary)",
                    flexShrink: 0,
                }} />
                By the numbers
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    borderTop: "1px solid var(--border)",
                    borderLeft: "1px solid var(--border)",
                }}
            >
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        style={{
                            borderRight: "1px solid var(--border)",
                            borderBottom: "1px solid var(--border)",
                        }}
                    >
                        <StatItem {...stat} index={i} />
                    </div>
                ))}
            </div>
        </section>
    );
}