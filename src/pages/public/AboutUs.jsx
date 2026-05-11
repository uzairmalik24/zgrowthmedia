// src/pages/AboutPage.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero, { CurtainHeading } from "../../components/ui/PageHero";
import { useLoader } from "../../context/LoaderContext";
import { useRevealFix } from "../../hooks/useRevealFix";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
    { value: 350, prefix: "", suffix: "%", label: "Avg. organic growth" },
    { value: 120, prefix: "", suffix: "+", label: "Brands scaled" },
    { value: 8, prefix: "", suffix: "M+", label: "Monthly impressions" },
    { value: 4, prefix: "", suffix: "X", label: "Avg. ROI multiple" },
];

const SERVICES = [
    { num: "01", title: "Search Engine Optimization", desc: "Technical audits, on-page strategy, and high-DA link building that compounds month over month." },
    { num: "02", title: "Answer Engine Optimization", desc: "Citation-ready content engineered for ChatGPT, Gemini, Perplexity and Claude." },
    { num: "03", title: "Generative Experience Optimization", desc: "SGE-first content architecture and continuous AI-SERP monitoring." },
    { num: "04", title: "Social Media Marketing", desc: "Full-service organic and paid across TikTok, Meta, YouTube and X — native creative, daily optimization." },
    { num: "05", title: "Media Platform Management", desc: "Third-party publications, editorial placements, podcast tours, and brand partnerships at scale." },
    { num: "06", title: "Strategic Brand Partnerships", desc: "Co-marketing structures and earned media that turn distribution into a compounding moat." },
];

const WHY_US = [
    { num: "01", title: "AI-Era Specialists", desc: "We were doing AEO and GEO before they had acronyms — our team lives in the LLM SERP daily." },
    { num: "02", title: "Honest Reporting", desc: "Real attribution, real numbers, real recommendations. No vanity dashboards, no agency theater." },
    { num: "03", title: "Two-Continent Team", desc: "UK strategy leadership and Pakistan production depth — premium quality at a real ROI." },
    { num: "04", title: "Retainer-Grade Discipline", desc: "Weekly stand-ups, monthly performance reviews, and dedicated channels — no ghosting, no chaos." },
];

const TERMS = [
    { term: "Discovery call first — no obligation", sub: "We only take on engagements we believe we can win." },
    { term: "Fixed-fee retainers", sub: "Clear scope, clear pricing, no surprise invoices." },
    { term: "Monthly performance reports", sub: "Real KPIs and attribution against agreed targets." },
    { term: "NDA & full confidentiality", sub: "Your strategy and data stay completely protected." },
];

// ── Animated horizontal rule ──────────────────────────────────────────────────

function Rule() {
    const ref = useRef(null);
    useEffect(() => {
        gsap.fromTo(ref.current,
            { scaleX: 0, transformOrigin: "left center" },
            {
                scaleX: 1, duration: 1.2, ease: "expo.inOut",
                scrollTrigger: { trigger: ref.current, start: "top 95%", toggleActions: "play none none none" },
            }
        );
    }, []);
    return (
        <div ref={ref} style={{
            height: "1px",
            background: "linear-gradient(to right, var(--border), transparent)",
            margin: "0 clamp(1.5rem, 6vw, 5rem)",
            transformOrigin: "left",
        }} />
    );
}

// ── Origin story ──────────────────────────────────────────────────────────────

function OriginSection() {
    const sectionRef = useRef(null);
    const decorRef = useRef(null);
    const bigNumRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelectorAll(".origin-el"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.13,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(sectionRef.current.querySelector(".origin-card"),
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.25,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
                }
            );

            gsap.to(decorRef.current, {
                y: -60, ease: "none",
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
            });

            const obj = { val: 0 };
            gsap.to(obj, {
                val: 100, duration: 2, ease: "expo.out",
                scrollTrigger: { trigger: sectionRef.current.querySelector(".origin-card"), start: "top 82%", toggleActions: "play none none none" },
                onUpdate: () => { if (bigNumRef.current) bigNumRef.current.textContent = `${Math.round(obj.val)}%`; },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";
    const sectionPy = "clamp(4rem, 8vh, 7rem)";

    return (
        <section ref={sectionRef}
            style={{ padding: `${sectionPy} ${px}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
            className="about-two-col"
        >
            <div>
                <p className="origin-el" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.25rem 0", opacity: 0 }}>
                    Our Story
                </p>
                <div className="origin-el" style={{ opacity: 0 }}>
                    <CurtainHeading text="Built for the AI-Era of Search" as="h2"
                        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--foreground)", marginBottom: "1.75rem" }}
                        delay={0}
                    />
                </div>
                <p className="origin-el" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--muted-foreground)", marginBottom: "1.25rem", marginTop: 0, opacity: 0 }}>
                    Z Growth Media was founded by M. Zain on a single conviction — that the agency model needed an upgrade for a world where customers ask AI before they search.
                </p>
                <p className="origin-el" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--muted-foreground)", margin: 0, opacity: 0 }}>
                    With dual offices in the United Kingdom and Pakistan, we combine front-line strategic leadership with deep production capacity — running SEO, social, and media platform programs for brands that need both traditional search authority and AI-era visibility.
                </p>
            </div>

            <div className="origin-card" style={{ position: "relative", padding: "3rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--card)", overflow: "hidden", opacity: 0 }}>
                <span ref={decorRef} style={{ position: "absolute", top: "-1rem", right: "-1rem", fontSize: "12rem", fontWeight: 900, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1px var(--border)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                    01
                </span>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1rem 0" }}>SEO · AEO · GEO</p>
                <p ref={bigNumRef} style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--foreground)", margin: "0 0 0.25rem 0", lineHeight: 1 }}>0%</p>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "0 0 2rem 0" }}>Avg. client retention past year one</p>
                <div style={{ height: "1px", background: "var(--border)", marginBottom: "2rem" }} />
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0 }}>
                    "We don't chase rankings. We chase revenue. Our team runs SEO, AEO, GEO, SMM, and media platform management as a single coordinated growth engine."
                </p>
            </div>
        </section>
    );
}

// ── Stats — open layout with counting numbers ─────────────────────────────────

function StatsSection() {
    const sectionRef = useRef(null);
    const numRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelector(".stats-label"),
                { y: 24, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" },
                }
            );

            STATS.forEach((s, i) => {
                const el = sectionRef.current.querySelector(`[data-stat="${i}"]`);
                const numEl = numRefs.current[i];
                const lineEl = sectionRef.current.querySelector(`[data-stat-line="${i}"]`);
                if (!el || !numEl || !lineEl) return;

                const tl = gsap.timeline({
                    scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
                    delay: i * 0.09,
                });

                tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
                tl.fromTo(lineEl, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.8, ease: "expo.inOut" }, "-=0.3");

                const obj = { val: 0 };
                tl.to(obj, {
                    val: s.value, duration: 1.4, ease: "power2.out",
                    onUpdate: () => { numEl.textContent = `${s.prefix}${Math.round(obj.val)}${s.suffix}`; },
                }, "-=0.6");
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";
    const sectionPy = "clamp(4rem, 8vh, 7rem)";

    return (
        <section ref={sectionRef} style={{ padding: `${sectionPy} ${px}` }}>
            <p className="stats-label" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 3rem 0", opacity: 0 }}>
                By the Numbers
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {STATS.map((s, i) => (
                    <div key={s.label} data-stat={i} style={{
                        padding: "0",
                        paddingRight: i < STATS.length - 1 ? "2.5rem" : "0",
                        paddingLeft: i > 0 ? "2.5rem" : "0",
                        borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                        opacity: 0,
                    }}>
                        <div data-stat-line={i} style={{ width: "2rem", height: "2px", background: "var(--primary)", marginBottom: "1.5rem", transformOrigin: "left", transform: "scaleX(0)" }} />
                        <p ref={el => numRefs.current[i] = el} style={{
                            fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900,
                            letterSpacing: "-0.05em", color: "var(--foreground)",
                            margin: "0 0 0.5rem 0", lineHeight: 1, fontFamily: "'DM Sans', sans-serif",
                        }}>
                            {s.prefix}0{s.suffix}
                        </p>
                        <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: 0 }}>
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ── Services — editorial list rows ───────────────────────────────────────────

function ServicesSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelectorAll(".svc-head"),
                { y: 24, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" },
                }
            );

            sectionRef.current.querySelectorAll(".svc-row").forEach((row) => {
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
                });
                tl.fromTo(row.querySelector(".svc-num"), { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
                tl.fromTo(row.querySelectorAll(".svc-title, .svc-desc"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.07 }, "-=0.15");
                tl.fromTo(row.querySelector(".row-border"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, "-=0.5");
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";
    const sectionPy = "clamp(4rem, 8vh, 7rem)";

    return (
        <section ref={sectionRef} style={{ padding: `${sectionPy} ${px}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
                <div>
                    <p className="svc-head" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.25rem 0", opacity: 0 }}>What We Do</p>
                    <div className="svc-head" style={{ opacity: 0 }}>
                        <CurtainHeading text="One Stack, Every Surface" as="h2"
                            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--foreground)" }}
                            delay={0}
                        />
                    </div>
                </div>
                <p className="svc-head" style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: "38ch", margin: 0, opacity: 0 }}>
                    Search, social, and earned media — strategized, produced and optimized by a single coordinated team.
                </p>
            </div>

            <div>
                {SERVICES.map((s) => (
                    <div key={s.num} className="svc-row" style={{ position: "relative" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr 2fr", gap: "2rem", alignItems: "start", padding: "2rem 0" }} className="svc-row-grid">
                            <span className="svc-num" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", paddingTop: "0.15rem", opacity: 0 }}>{s.num}</span>
                            <p className="svc-title" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", margin: 0, opacity: 0 }}>{s.title}</p>
                            <p className="svc-desc" style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0, opacity: 0 }}>{s.desc}</p>
                        </div>
                        <div className="row-border" style={{ height: "1px", background: "var(--border)", transformOrigin: "left", transform: "scaleX(0)" }} />
                    </div>
                ))}
            </div>
        </section>
    );
}

// ── Why Us ────────────────────────────────────────────────────────────────────

function WhyUsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelectorAll(".why-head"),
                { y: 24, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" },
                }
            );

            sectionRef.current.querySelectorAll(".why-row").forEach((row) => {
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
                });
                tl.fromTo(row.querySelector(".why-num"), { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
                tl.fromTo(row.querySelectorAll(".why-title, .why-desc"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.07 }, "-=0.15");
                tl.fromTo(row.querySelector(".row-border"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, "-=0.5");
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";
    const sectionPy = "clamp(4rem, 8vh, 7rem)";

    return (
        <section ref={sectionRef} style={{ padding: `${sectionPy} ${px}` }}>
            <p className="why-head" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.25rem 0", opacity: 0 }}>Why Z Growth Media</p>
            <div className="why-head" style={{ opacity: 0 }}>
                <CurtainHeading text="What Sets Us Apart" as="h2"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--foreground)", marginBottom: "3rem" }}
                    delay={0}
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr 2fr", gap: "2rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }} className="why-col-heads">
                {["#", "Principle", "What it means for you"].map(h => (
                    <span key={h} style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{h}</span>
                ))}
            </div>

            {WHY_US.map((w) => (
                <div key={w.num} className="why-row" style={{ position: "relative" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr 2fr", gap: "2rem", alignItems: "start", padding: "2rem 0" }}>
                        <span className="why-num" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", paddingTop: "0.2rem", opacity: 0 }}>{w.num}</span>
                        <p className="why-title" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--foreground)", margin: 0, opacity: 0 }}>{w.title}</p>
                        <p className="why-desc" style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0, opacity: 0 }}>{w.desc}</p>
                    </div>
                    <div className="row-border" style={{ height: "1px", background: "var(--border)", transformOrigin: "left", transform: "scaleX(0)" }} />
                </div>
            ))}
        </section>
    );
}

// ── Work Terms ────────────────────────────────────────────────────────────────

function WorkTermsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelectorAll(".terms-left-el"),
                { x: -30, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.12,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

            sectionRef.current.querySelectorAll(".term-row").forEach((row, i) => {
                gsap.fromTo(row,
                    { x: 40, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: i * 0.1,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";
    const sectionPy = "clamp(4rem, 8vh, 7rem)";

    return (
        <section ref={sectionRef}
            style={{ padding: `${sectionPy} ${px}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
            className="about-two-col"
        >
            <div>
                <p className="terms-left-el" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.25rem 0", opacity: 0 }}>How We Work</p>
                <div className="terms-left-el" style={{ opacity: 0 }}>
                    <CurtainHeading text="Simple, Fair, Transparent" as="h2"
                        style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--foreground)", marginBottom: "1.5rem" }}
                        delay={0}
                    />
                </div>
                <p className="terms-left-el" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--muted-foreground)", margin: 0, opacity: 0 }}>
                    We keep our engagement model straightforward so you always know what to expect — no hidden charges, no scope creep surprises.
                </p>
            </div>

            <div>
                {TERMS.map(({ term, sub }, i) => (
                    <div key={term} className="term-row" style={{
                        opacity: 0,
                        paddingTop: i === 0 ? 0 : "1.5rem",
                        paddingBottom: "1.5rem",
                        borderBottom: "1px solid var(--border)",
                    }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.35rem" }}>
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")}</span>
                            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{term}</p>
                        </div>
                        <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--muted-foreground)", margin: "0 0 0 1.75rem" }}>{sub}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    const { navigateTo } = useLoader();

    useRevealFix();

    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

            <style>{`
                @media (max-width: 768px) {
                    .about-two-col  { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
                    .svc-row-grid   { grid-template-columns: 3rem 1fr !important; }
                    .why-row > div  { grid-template-columns: 3rem 1fr !important; }
                    .why-col-heads  { grid-template-columns: 3rem 1fr !important; }
                    .svc-desc, .why-desc { display: none; }
                }
            `}</style>

            <PageHero
                label="Who We Are"
                title={"The Growth Agency\nFor The AI-Era."}
                subtitle="Z Growth Media is a UK + Pakistan digital marketing agency scaling brands through traditional SEO, AI-era search optimization (AEO/GEO), full-service social, and media platform management."
                tag="01"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
                useCurtainTitle
            />

            <Rule />
            <OriginSection />
            <Rule />
            <StatsSection />
            <Rule />
            <ServicesSection />
            <Rule />
            <WhyUsSection />
            <Rule />
            <WorkTermsSection />
            <Rule />

        </div>
    );
}