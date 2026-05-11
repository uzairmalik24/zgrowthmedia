import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PROJECTS = [
    { name: "Lumina Store", niche: "E-Commerce", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
    { name: "HealthSync", niche: "Healthcare SaaS", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
    { name: "Arcadia Finance", niche: "Fintech", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" },
    { name: "Orbit CMS", niche: "Productivity", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80" },
    { name: "Verdant Co.", niche: "Sustainability", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" },
];

export default function ProjectShowcase({ projects = DEFAULT_PROJECTS }) {
    const [active, setActive] = useState(0);
    const activeRef = useRef(0);
    const mainImgRef = useRef(null);
    const nameRef = useRef(null);
    const nicheRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        activeRef.current = active;
        const tl = gsap.timeline();
        tl.to([mainImgRef.current, nameRef.current, nicheRef.current], {
            opacity: 0, y: -10, duration: 0.18, ease: "power2.in",
        });
        tl.fromTo(mainImgRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }
        );
        tl.fromTo([nameRef.current, nicheRef.current],
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", stagger: 0.06 },
            "-=0.28"
        );
    }, [active]);

    useEffect(() => {
        const steps = projects.length - 1;
        const el = containerRef.current;

        const st = ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: `+=${steps * 600}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 0,
            // Force the pinned element to stay above everything while pinned
            onEnter: () => {
                el.style.zIndex = "1";
            },
            onLeave: () => {
                // Once we've scrolled past, let next section take over naturally
                el.style.zIndex = "0";
            },
            onUpdate: (self) => {
                const idx = Math.min(
                    Math.round(self.progress * steps),
                    projects.length - 1
                );
                if (idx !== activeRef.current) setActive(idx);
            },
        });

        return () => st.kill();
    }, [projects.length]);

    return (
        <div
            ref={containerRef}
            style={{
                height: "100vh",
                display: "flex",
                overflow: "hidden",
                // Solid background prevents any bleed-through from sections below
                background: "var(--background)",
                position: "relative",
                zIndex: 1,
            }}
        >
            {/* ── SIDEBAR ── */}
            <div style={{
                width: "clamp(100px, 15vw, 170px)",
                flexShrink: 0,
                borderRight: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                padding: "2rem 0",
                overflowY: "auto",
                scrollbarWidth: "none",
            }}>
                <p style={{
                    fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "var(--muted-foreground)",
                    margin: "0 0 1.2rem 1rem",
                }}>
                    Projects
                </p>

                {projects.map((p, i) => (
                    <div key={i} style={{ padding: "0.5rem 0.8rem", position: "relative", cursor: "pointer" }}>
                        <div style={{
                            position: "absolute", left: 0, top: "0.5rem", bottom: "0.5rem",
                            width: "2px",
                            background: i === active ? "var(--primary)" : "transparent",
                            transition: "background 0.3s", borderRadius: "1px",
                        }} />
                        <div style={{ width: "100%", aspectRatio: "3/2", borderRadius: "5px", overflow: "hidden" }}>
                            <img src={p.image} alt={p.name} style={{
                                width: "100%", height: "100%", objectFit: "cover",
                                opacity: i === active ? 1 : 0.3,
                                filter: i === active ? "none" : "grayscale(70%)",
                                transition: "opacity 0.35s, filter 0.35s",
                            }} />
                        </div>
                        <p style={{
                            margin: "0.3rem 0 0", fontSize: "0.65rem",
                            fontWeight: i === active ? 700 : 400,
                            color: i === active ? "var(--foreground)" : "var(--muted-foreground)",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            transition: "all 0.3s",
                        }}>
                            {p.name}
                        </p>
                    </div>
                ))}
            </div>

            {/* ── MAIN ── */}
            <div style={{
                flex: 1, minWidth: 0, display: "flex", flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(2rem, 4vh, 4rem) clamp(1.5rem, 5vw, 5rem)",
                gap: "1.4rem", overflow: "hidden",
            }}>
                <p style={{
                    margin: 0, fontSize: "0.65rem", fontWeight: 600,
                    color: "var(--muted-foreground)", letterSpacing: "0.16em", textTransform: "uppercase",
                }}>
                    {String(active + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}
                </p>

                <div style={{
                    width: "100%", height: "clamp(180px, 44vh, 480px)",
                    borderRadius: "8px", overflow: "hidden", flexShrink: 0,
                }}>
                    <img ref={mainImgRef} src={projects[active].image} alt={projects[active].name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <h2 ref={nameRef} style={{
                        margin: 0, fontSize: "clamp(1.4rem, 3vw, 2.8rem)", fontWeight: 800,
                        color: "var(--foreground)", letterSpacing: "-0.03em",
                        fontFamily: "'Georgia', serif", lineHeight: 1.1,
                    }}>
                        {projects[active].name}
                    </h2>
                    <span ref={nicheRef} style={{
                        fontSize: "0.7rem", fontWeight: 600, color: "var(--primary)",
                        letterSpacing: "0.16em", textTransform: "uppercase",
                    }}>
                        {projects[active].niche}
                    </span>
                </div>

                <div style={{ display: "flex", gap: "0.35rem" }}>
                    {projects.map((_, i) => (
                        <div key={i} style={{
                            height: "3px", borderRadius: "2px",
                            background: i === active ? "var(--primary)" : "var(--border)",
                            width: i === active ? "2rem" : "0.4rem",
                            transition: "all 0.35s ease",
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}