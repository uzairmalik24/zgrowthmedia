// src/pages/ServicesPage.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero, { CurtainHeading } from "../../components/ui/PageHero";
import { useLoader } from "../../context/LoaderContext";
import { useRevealFix } from "../../hooks/useRevealFix";

gsap.registerPlugin(ScrollTrigger);

// ── Three top-level service sections per the brief ───────────────────────────

const SECTIONS = [
    {
        id: "search",
        num: "A",
        kicker: "Section A",
        title: "Search Domination",
        tagline: "Win the SERP — and the AI answer above it.",
        accentHex: "#3b82f6",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80&fit=crop",
        imageAlt: "Search engine optimization analytics",
        intro: `We build organic authority across the three layers of modern search — Google, AI assistants, and generative experiences. Every recommendation is backed by data, every deliverable is measured against ranking and revenue targets agreed up front.

Technical audits identify what's holding your site back: crawlability, site speed, Core Web Vitals, schema markup, indexation. On-page work aligns content with search intent. Off-page work earns the authority signals that actually move rankings. AEO and GEO work make sure your brand is the answer when users ask AI instead of typing.`,
        services: [
            {
                anchor: "on-page-seo",
                heading: "On-Page SEO",
                desc: "Content optimization, meta strategy, internal linking architecture, and topical clustering aligned with search intent at every funnel stage.",
            },
            {
                anchor: "off-page-seo",
                heading: "Off-Page SEO",
                desc: "White-hat link building from high-DA domains, digital PR, guest posting, and authority acquisition campaigns.",
            },
            {
                anchor: "technical-seo",
                heading: "Technical SEO",
                desc: "Full-stack audits, Core Web Vitals optimization, schema markup, crawlability, indexation, and JavaScript SEO for modern sites.",
            },
            {
                anchor: "aeo",
                heading: "Answer Engine Optimization (AEO)",
                desc: "Citation-ready content engineered for ChatGPT, Gemini, Perplexity, and Claude — entity signals, structured FAQs, passage SEO.",
            },
            {
                anchor: "geo",
                heading: "Generative Experience Optimization (GEO)",
                desc: "Future-proofing for Google SGE, AI overviews, and conversational search — multi-modal assets, vector-friendly content, continuous SERP monitoring.",
            },
        ],
    },
    {
        id: "social",
        num: "B",
        kicker: "Section B",
        title: "Social Authority",
        tagline: "Cultural relevance, engineered.",
        accentHex: "#8b5cf6",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&fit=crop",
        imageAlt: "Social media marketing strategy session",
        intro: `Social isn't a content calendar — it's a distribution system. We engineer organic growth and run paid acquisition across every major platform with a single coordinated strategy, native-first creative, and platform-specific KPIs.

From short-form viral content to community-led growth and high-ROI paid campaigns, our SMM team treats every platform as its own discipline — TikTok, Meta, YouTube, and X each get specialist attention while sharing one strategic backbone.`,
        services: [
            {
                anchor: "content",
                heading: "Content Creation",
                desc: "Platform-native viral strategy, hook-first scripting, native editing, and creator partnerships engineered for the algorithm.",
            },
            {
                anchor: "paid-social",
                heading: "Paid Advertising",
                desc: "Full-funnel ad management across Meta, TikTok, YouTube, X, and LinkedIn — creative production, audience design, daily optimization.",
            },
            {
                anchor: "community",
                heading: "Community Management",
                desc: "Inbound DMs, comment moderation, engagement workflows, and brand-voice consistency at scale across every channel.",
            },
            {
                anchor: "tiktok",
                heading: "TikTok Growth",
                desc: "Trend-led content, Spark Ads, sound-led editing, and creator collaborations engineered for short-form virality.",
            },
            {
                anchor: "meta",
                heading: "Meta (Facebook + Instagram)",
                desc: "Reels, feed content, Advantage+ campaigns, catalog & dynamic product ads, and full retargeting funnels.",
            },
            {
                anchor: "youtube",
                heading: "YouTube Strategy",
                desc: "Channel SEO, thumbnail testing, TrueView and Shorts ads, long-form authority content with compounding distribution.",
            },
            {
                anchor: "x",
                heading: "X (Twitter) Authority",
                desc: "Founder-led content, thread architecture, X Ads, and cultural relevance plays for B2B and consumer brands.",
            },
        ],
    },
    {
        id: "media",
        num: "C",
        kicker: "Section C",
        title: "Media Platform Management",
        tagline: "Authority through third-party distribution.",
        accentHex: "#0ea5e9",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&fit=crop",
        imageAlt: "Editorial newsroom and digital publishing",
        intro: `Owning your own channels is table stakes. Real brand authority gets built in the publications, podcasts, and platforms your audience already trusts. We manage your media presence across third-party outlets, negotiate placements, and turn earned media into a repeatable distribution channel.

From digital publications and editorial placements to podcast tours and strategic brand partnerships, we run the entire workflow — pitching, negotiation, asset production, and performance reporting.`,
        services: [
            {
                anchor: "publications",
                heading: "Third-Party Publications",
                desc: "Pitching, placement, and ongoing management of relationships with digital publications and editorial outlets in your niche.",
            },
            {
                anchor: "assets",
                heading: "Digital Asset Oversight",
                desc: "Performance optimization of every external digital asset representing your brand — listings, profiles, syndicated content.",
            },
            {
                anchor: "partnerships",
                heading: "Strategic Brand Partnerships",
                desc: "Identifying, structuring, and managing co-marketing partnerships and brand collaborations that compound distribution.",
            },
            {
                anchor: "placements",
                heading: "Media Placements",
                desc: "Podcast tours, expert commentary, founder profiles, and earned-media campaigns built around your authority positioning.",
            },
        ],
    },
];

const PROCESS = [
    { num: "01", title: "Discovery Call", desc: "We understand your goals, audience, and competitive landscape. No pressure, just clarity on scope, fit, and outcomes." },
    { num: "02", title: "Audit & Proposal", desc: "Technical audit of your current presence and a written proposal with milestones, deliverables, KPIs, and fixed pricing." },
    { num: "03", title: "Strategy & Kickoff", desc: "Roadmap signed, retainer activated, dedicated channels set up. You meet the team that will actually do the work." },
    { num: "04", title: "Build & Launch", desc: "Technical fixes, content production, and campaign launch — with weekly progress updates and transparent dashboards." },
    { num: "05", title: "Optimize & Scale", desc: "Continuous A/B testing, ranking monitoring, and creative iteration. We kill what doesn't work and double down on what does." },
    { num: "06", title: "Monthly Reporting", desc: "Honest, data-backed performance reports. Real numbers, real attribution, real recommendations." },
];

// ── Animated divider ──────────────────────────────────────────────────────────

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

// ── Section Block ─────────────────────────────────────────────────────────────

function SectionBlock({ section, index }) {
    const blockRef = useRef(null);
    const imgWrapRef = useRef(null);
    const isEven = index % 2 === 0;
    const navigate = useNavigate();
    const { navigateTo } = useLoader();

    const handleRowClick = (e, slug) => {
        e.preventDefault();
        navigateTo(`/services/${slug}`, navigate);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(blockRef.current.querySelectorAll(".sb-meta"),
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08,
                    scrollTrigger: { trigger: blockRef.current, start: "top 84%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(blockRef.current.querySelector(".sb-accent"),
                { scaleX: 0, transformOrigin: "left" },
                {
                    scaleX: 1, duration: 1.0, ease: "expo.inOut",
                    scrollTrigger: { trigger: blockRef.current, start: "top 84%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(blockRef.current.querySelector(".sb-title"),
                { y: 55, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.95, ease: "power3.out", delay: 0.1,
                    scrollTrigger: { trigger: blockRef.current, start: "top 84%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(blockRef.current.querySelectorAll(".sb-para"),
                { y: 25, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.72, ease: "power3.out", stagger: 0.11, delay: 0.18,
                    scrollTrigger: { trigger: blockRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(blockRef.current.querySelectorAll(".sb-row"),
                { y: 18, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.07, delay: 0.28,
                    scrollTrigger: { trigger: blockRef.current, start: "top 76%", toggleActions: "play none none none" },
                }
            );

            gsap.fromTo(imgWrapRef.current,
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)", duration: 1.15, ease: "power4.inOut", delay: 0.12,
                    scrollTrigger: { trigger: blockRef.current, start: "top 82%", toggleActions: "play none none none" },
                }
            );
            gsap.fromTo(imgWrapRef.current.querySelector("img"),
                { scale: 1.18 },
                {
                    scale: 1, duration: 1.15, ease: "power4.inOut", delay: 0.12,
                    scrollTrigger: { trigger: blockRef.current, start: "top 82%", toggleActions: "play none none none" },
                }
            );

            gsap.to(imgWrapRef.current.querySelector("img"), {
                y: -45, ease: "none",
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top bottom", end: "bottom top", scrub: 1.2,
                },
            });

        }, blockRef);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";

    return (
        <div id={section.id} ref={blockRef} style={{ padding: `clamp(4.5rem, 9vh, 8rem) ${px}` }}>

            {/* Meta strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.75rem", flexWrap: "wrap" }}>
                <span className="sb-meta" style={{
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.38em",
                    textTransform: "uppercase", color: "var(--primary)", opacity: 0, whiteSpace: "nowrap",
                }}>
                    {section.kicker} · {section.num}
                </span>
                <div className="sb-accent" style={{
                    flex: 1, height: "1px", minWidth: "2rem",
                    background: `linear-gradient(to right, ${section.accentHex}80, transparent)`,
                    transformOrigin: "left", transform: "scaleX(0)",
                }} />
                <span className="sb-meta" style={{
                    fontSize: "0.75rem", fontWeight: 500, color: "var(--muted-foreground)",
                    fontStyle: "italic", opacity: 0, textAlign: "right",
                }}>
                    {section.tagline}
                </span>
            </div>

            {/* Two-column grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(3rem, 7vw, 8rem)",
                alignItems: "start",
            }} className="svc-block-grid">

                {/* Text */}
                <div style={{ order: isEven ? 0 : 1 }} className="svc-text-col">
                    <h2 className="sb-title" style={{
                        fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                        fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95,
                        color: "var(--foreground)", margin: "0 0 2.75rem 0", opacity: 0,
                    }}>
                        {section.title}
                    </h2>

                    {section.intro.trim().split("\n\n").map((para, i) => (
                        <p key={i} className="sb-para" style={{
                            fontSize: "1rem", lineHeight: 1.9,
                            color: "var(--muted-foreground)",
                            margin: "0 0 1.35rem 0", opacity: 0,
                        }}>
                            {para.trim()}
                        </p>
                    ))}

                    {/* Service list rows */}
                    <div style={{
                        marginTop: "2.5rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {section.services.map((svc) => (
                            <a
                                key={svc.anchor}
                                id={svc.anchor}
                                href={`/services/${svc.anchor}`}
                                onClick={(e) => handleRowClick(e, svc.anchor)}
                                className="sb-row"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr auto",
                                    gap: "1rem",
                                    padding: "1.1rem 0",
                                    borderBottom: "1px solid var(--border)",
                                    opacity: 0,
                                    textDecoration: "none",
                                    color: "inherit",
                                    transition: "padding-left 0.25s ease",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "0.5rem"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
                            >
                                <span style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: section.accentHex,
                                    marginTop: "0.6rem",
                                    flexShrink: 0,
                                }} />
                                <div>
                                    <p style={{
                                        margin: 0,
                                        marginBottom: "0.3rem",
                                        fontSize: "0.95rem",
                                        fontWeight: 700,
                                        color: "var(--foreground)",
                                    }}>
                                        {svc.heading}
                                    </p>
                                    <p style={{
                                        margin: 0,
                                        fontSize: "0.85rem",
                                        lineHeight: 1.65,
                                        color: "var(--muted-foreground)",
                                    }}>
                                        {svc.desc}
                                    </p>
                                </div>
                                <span aria-hidden style={{
                                    alignSelf: "center",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: section.accentHex,
                                    whiteSpace: "nowrap",
                                }}>
                                    Learn more →
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div ref={imgWrapRef} style={{
                    order: isEven ? 1 : 0,
                    borderRadius: "var(--radius)", overflow: "hidden",
                    aspectRatio: "4 / 3",
                    clipPath: "inset(100% 0 0 0)",
                    flexShrink: 0,
                    position: "sticky",
                    top: "8rem",
                }} className="svc-img-col">
                    <img
                        src={section.image}
                        alt={section.imageAlt}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.18)" }}
                        loading="lazy"
                    />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(135deg, ${section.accentHex}20 0%, transparent 55%)`,
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "1.25rem", right: "1.25rem",
                        fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em",
                        textTransform: "uppercase", color: "rgba(255,255,255,0.9)",
                        background: "rgba(0,0,0,0.42)", backdropFilter: "blur(10px)",
                        padding: "0.4rem 0.85rem", borderRadius: "2rem",
                        border: `1px solid ${section.accentHex}55`,
                    }}>
                        {section.title}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ── Process Section ───────────────────────────────────────────────────────────

function ProcessSection() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(ref.current.querySelectorAll(".ph"),
                { y: 28, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none none" },
                }
            );
            ref.current.querySelectorAll(".proc-row").forEach((row) => {
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" },
                });
                tl.fromTo(row.querySelector(".pnum"), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
                tl.fromTo(row.querySelectorAll(".ptitle, .pdesc"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.52, ease: "power3.out", stagger: 0.07 }, "-=0.15");
                tl.fromTo(row.querySelector(".pline"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, "-=0.5");
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";
    const py = "clamp(4rem, 8vh, 7rem)";

    return (
        <section ref={ref} style={{ padding: `${py} ${px}` }}>
            <p className="ph" style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.25rem 0", opacity: 0 }}>
                How We Engage
            </p>
            <div className="ph" style={{ opacity: 0, marginBottom: "3.5rem" }}>
                <CurtainHeading
                    text="From Audit to Compounding Growth"
                    as="h2"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--foreground)", lineHeight: 1.05 }}
                    delay={0}
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr 2fr", gap: "2rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }} className="proc-heads">
                {["Step", "Stage", "What happens"].map(h => (
                    <span key={h} style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{h}</span>
                ))}
            </div>

            {PROCESS.map((step) => (
                <div key={step.num} className="proc-row" style={{ position: "relative" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr 2fr", gap: "2rem", alignItems: "start", padding: "2rem 0" }} className="proc-grid">
                        <span className="pnum" style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", paddingTop: "0.15rem", opacity: 0 }}>{step.num}</span>
                        <p className="ptitle" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", margin: 0, opacity: 0 }}>{step.title}</p>
                        <p className="pdesc" style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted-foreground)", margin: 0, opacity: 0 }}>{step.desc}</p>
                    </div>
                    <div className="pline" style={{ height: "1px", background: "var(--border)", transformOrigin: "left", transform: "scaleX(0)" }} />
                </div>
            ))}
        </section>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
    useRevealFix();

    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
            <style>{`
                @media (max-width: 960px) {
                    .svc-block-grid { grid-template-columns: 1fr !important; }
                    .svc-text-col   { order: 1 !important; }
                    .svc-img-col    { order: 0 !important; aspect-ratio: 16/9 !important; position: relative !important; top: auto !important; }
                    .proc-heads     { display: none !important; }
                    .proc-grid      { grid-template-columns: 3rem 1fr !important; }
                    .proc-grid .pdesc { display: none; }
                }
            `}</style>

            <PageHero
                label="Our Services"
                title={"Three Pillars.\nOne Growth Engine."}
                subtitle="Search Domination, Social Authority, and Media Platform Management — a single coordinated agency stack built for the AI-era of search."
                tag="02"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
                useCurtainTitle
            />

            {SECTIONS.map((section, i) => (
                <div key={section.id}>
                    <Rule />
                    <SectionBlock section={section} index={i} />
                </div>
            ))}

            <Rule />
            <ProcessSection />
            <Rule />
        </div>
    );
}
