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
    { value: 51, prefix: "$", suffix: "K", label: "All-time earnings" },
    { value: 100, prefix: "", suffix: "", label: "Projects completed" },
    { value: 35, prefix: "", suffix: "", label: "Happy clients" },
    { value: 31, prefix: "$", suffix: "K", label: "Largest single employer" },
];

const SERVICES = [
    { num: "01", title: "Web & Mobile Development", desc: "Full-stack web apps and mobile solutions built for speed, scale, and seamless UX." },
    { num: "02", title: "UI/UX & Brand Identity", desc: "Purposeful design systems, interfaces, and brand identities that convert and inspire." },
    { num: "03", title: "2D/3D Animation & Video", desc: "Character design, architectural visualization, animated videos, and motion graphics." },
    { num: "04", title: "CAD & Engineering", desc: "Mechanical CAD design, architectural drawings, and technical drafting for precise builds." },
    { num: "05", title: "DevOps & Linux Server Mgmt", desc: "Server setup, automation pipelines, and reliable infrastructure management." },
    { num: "06", title: "SEO, Marketing & VA Services", desc: "Data-backed digital marketing, SEO articles, and dedicated virtual assistance." },
];

const WHY_US = [
    { num: "01", title: "Verified & Trusted", desc: "Top-rated Guru.com team with a 100% satisfaction rate and $51K+ in completed work." },
    { num: "02", title: "Clear Communication", desc: "Transparent timelines, milestone-based delivery, and no ambiguity at any stage." },
    { num: "03", title: "Creative + Technical", desc: "Rare combination of deep engineering skills and genuine creative sensibility." },
    { num: "04", title: "Long-term Partnership", desc: "We think beyond the project — your growth is built into every decision we make." },
];

const TERMS = [
    { term: "50% milestone to start", sub: "Work begins once the first milestone is funded." },
    { term: "50% after delivery & approval", sub: "Final payment only after you're satisfied." },
    { term: "Minor revisions included", sub: "We refine until it's right — no nickel-and-diming." },
    { term: "NDA & full confidentiality", sub: "Your ideas and data stay completely protected." },
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
                    <CurtainHeading text="From Bhakkar to the World" as="h2"
                        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--foreground)", marginBottom: "1.75rem" }}
                        delay={0}
                    />
                </div>
                <p className="origin-el" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--muted-foreground)", marginBottom: "1.25rem", marginTop: 0, opacity: 0 }}>
                    Founded in December 2023 in Bhakkar, Punjab, Pioneers Tech started with a simple conviction — that world-class digital work doesn't require a world-class zip code.
                </p>
                <p className="origin-el" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--muted-foreground)", margin: 0, opacity: 0 }}>
                    In under two years, we grew into a verified Guru.com team with over $51,000 in completed projects, 100 transactions, and 35 clients across multiple continents.
                </p>
            </div>

            <div className="origin-card" style={{ position: "relative", padding: "3rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--card)", overflow: "hidden", opacity: 0 }}>
                <span ref={decorRef} style={{ position: "absolute", top: "-1rem", right: "-1rem", fontSize: "12rem", fontWeight: 900, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1px var(--border)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                    01
                </span>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1rem 0" }}>Since Dec 2023</p>
                <p ref={bigNumRef} style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--foreground)", margin: "0 0 0.25rem 0", lineHeight: 1 }}>0%</p>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "0 0 2rem 0" }}>Client satisfaction on Guru.com</p>
                <div style={{ height: "1px", background: "var(--border)", marginBottom: "2rem" }} />
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0 }}>
                    "Verified Guru team with proven results — clear communication, reliable delivery, creative + technical expertise, and a long-term partnership mindset."
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
                        <CurtainHeading text="End-to-End Digital Services" as="h2"
                            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--foreground)" }}
                            delay={0}
                        />
                    </div>
                </div>
                <p className="svc-head" style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: "38ch", margin: 0, opacity: 0 }}>
                    From concept to deployment — we handle the full stack so you don't stitch together multiple vendors.
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
            <p className="why-head" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.25rem 0", opacity: 0 }}>Why Pioneers Tech</p>
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
                title={"Built to Build\nThings That Last"}
                subtitle="Pioneers Tech is a verified, top-rated freelance team helping startups, agencies, and enterprises turn ideas into high-performing digital solutions."
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