// src/pages/ServicesPage.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero, { CurtainHeading } from "../../components/ui/PageHero";
import { useLoader } from "../../context/LoaderContext";
import { useRevealFix } from "../../hooks/useRevealFix";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
    {
        num: "01",
        title: "Web Development",
        tagline: "Pixel-perfect, blazing-fast web experiences.",
        desc: `We build fast, production-ready web applications from the ground up — React, Next.js, Node.js, REST APIs, databases, and everything in between. Whether you need a SaaS dashboard, an e-commerce platform, a booking system, or a custom web portal, we architect for performance and maintainability from day one.

Our process begins with understanding your users and business goals. We prototype fast, iterate in the open, and ship clean code your future team can maintain. No spaghetti, no black boxes, no unexplained dependencies.

Every project includes responsive design, accessibility best practices, SEO-ready markup, and deployment to your platform of choice — Vercel, AWS, DigitalOcean, or your own server.`,
        tools: ["React / Next.js", "Node.js & Express", "REST & GraphQL APIs", "PostgreSQL / MongoDB", "Tailwind CSS", "Vercel / AWS / DO"],
        deliverables: ["Source code + documentation", "Staging & production deployment", "Performance audit report", "30-day post-launch support"],
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&fit=crop",
        imageAlt: "Web development — code on screen",
        accentHex: "#3b82f6",
    },
    {
        num: "02",
        title: "App Development",
        tagline: "Native & cross-platform apps that users actually love.",
        desc: `We design and develop mobile applications for iOS and Android — from concept to App Store. Using React Native and Flutter we build truly cross-platform apps that feel native, perform fast, and look beautiful on every screen size.

From consumer lifestyle apps to enterprise tools and marketplace platforms, we handle the full product lifecycle: UX design, development, API integration, testing, and submission. We've shipped apps with offline support, real-time sync, push notifications, payment integration, and biometric authentication.

Need a standalone backend for your app? We build scalable REST and GraphQL APIs that grow with your user base without breaking your budget or your codebase.`,
        tools: ["React Native", "Flutter", "Expo", "Firebase / Supabase", "App Store & Play Store", "Push notifications & auth"],
        deliverables: ["iOS & Android builds", "App Store submission", "Backend API included", "QA test report"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&fit=crop",
        imageAlt: "Mobile app development on phone",
        accentHex: "#6366f1",
    },
    {
        num: "03",
        title: "Game Development",
        tagline: "Immersive gameplay engineered with precision and bold design.",
        desc: `We build games — from casual mobile titles to immersive 3D PC experiences. Using Unity and Unreal Engine, we engineer gameplay systems, physics, AI behaviors, UI, and audio integration that make players stay for one more round.

Our game development work includes full game design documentation, level design, asset pipeline setup, character controllers, multiplayer networking, monetization integration, and platform submission for Steam, iOS, Android, and console targets.

We also work with existing studios as specialist contractors — bringing specific expertise for systems design, shader work, performance optimization, or UI polish when your internal team needs reinforcement on a tight deadline.`,
        tools: ["Unity (C#)", "Unreal Engine (C++ / Blueprint)", "Blender (3D assets)", "Shader programming", "Multiplayer (Mirror / Photon)", "Steam / Mobile publishing"],
        deliverables: ["Playable build (.exe / APK)", "Source project files", "Asset library handoff", "Platform submission"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80&fit=crop",
        imageAlt: "Game development setup and gaming",
        accentHex: "#8b5cf6",
    },
    {
        num: "04",
        title: "Graphic Design",
        tagline: "Identities, print, and digital visuals that stop the scroll.",
        desc: `Great products need great design. We create purposeful, scalable design systems, brand identities, and visual assets that feel premium and communicate clearly at every scale — from a business card to a billboard.

Brand identity work includes logomarks, wordmarks, color palettes, typography systems, and a complete brand guide your team can use across every touchpoint. We also produce print-ready collateral, packaging design, presentation decks, social media templates, and advertising creatives.

Every design decision is intentional. We ask why before we ask how — understanding your audience, competitive landscape, and business goals before a single vector is drawn.`,
        tools: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "InDesign", "Brand systems", "Print & packaging"],
        deliverables: ["All source files (AI / Figma)", "Brand guidelines PDF", "Print-ready PDFs", "Social media kit"],
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80&fit=crop",
        imageAlt: "Graphic design and branding",
        accentHex: "#0ea5e9",
    },
    {
        num: "05",
        title: "Illustration",
        tagline: "Custom artworks that breathe character into brands and stories.",
        desc: `We create original illustrations — character design, editorial art, book illustrations, UI illustration sets, spot art, and infographics — crafted to match your brand voice with precision and personality.

Our illustration work spans hand-drawn digital art, flat vector systems, isometric scenes, icon sets, and fully rendered character sheets. Whether you need a single hero illustration for a landing page or a complete icon library for a product interface, we deliver consistent, on-brand artwork at scale.

We've illustrated for children's books, fintech dashboards, SaaS onboarding flows, marketing campaigns, and editorial publications. Each project starts with thorough style exploration so the final artwork feels unmistakably yours.`,
        tools: ["Procreate", "Adobe Illustrator", "Clip Studio Paint", "Character design", "Icon systems", "Infographic design"],
        deliverables: ["Layered source files", "PNG / SVG exports", "Style guide document", "Alternate color variants"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&fit=crop",
        imageAlt: "Digital illustration and artwork",
        accentHex: "#ec4899",
    },
    {
        num: "06",
        title: "SEO",
        tagline: "Algorithmic authority — rank higher, convert faster.",
        desc: `We build organic search presence that compounds over time. Our SEO work is built on data, not guesswork — every recommendation is backed by keyword research, competitive analysis, and measurable performance targets set upfront.

Technical SEO audits identify and fix the issues holding your site back: crawlability, site speed, Core Web Vitals, schema markup, and indexation problems. On-page optimization aligns your content with search intent at every stage of the buyer's journey. Off-page work builds the authority signals that actually move rankings.

We also produce SEO-optimized long-form content — thoroughly researched articles, landing pages, and product descriptions written to rank and convert simultaneously, not compete with each other.`,
        tools: ["Ahrefs / SEMrush", "Google Search Console", "Technical audits", "On-page optimization", "Link building outreach", "Content strategy & writing"],
        deliverables: ["Full technical audit report", "Keyword strategy document", "Monthly performance report", "Optimized content pieces"],
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80&fit=crop",
        imageAlt: "SEO analytics and search performance data",
        accentHex: "#10b981",
    },
    {
        num: "07",
        title: "Video Editing",
        tagline: "Cinematic cuts and color grades that demand attention.",
        desc: `We edit, color grade, and finish video content for brands, creators, agencies, and studios. From raw footage to broadcast-ready master — we handle everything in between: pacing, transitions, motion graphics, lower thirds, subtitles, color correction, and audio cleanup and mastering.

Our video work spans YouTube long-form content, social media short-form, corporate brand films, product demos, real estate walkthroughs, event recaps, and advertisement cuts. We match your brand's visual language and deliver in every format your distribution platform requires.

For clients producing regular content, we offer ongoing retainer-based editing packages with fast turnaround, consistent style, and a dedicated editor who understands your voice and audience.`,
        tools: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Motion graphics", "Color grading", "Audio mastering"],
        deliverables: ["Master video file", "Platform-optimized exports", "Motion graphics assets", "Subtitle / SRT file"],
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80&fit=crop",
        imageAlt: "Video editing and post-production studio",
        accentHex: "#f59e0b",
    },
    {
        num: "08",
        title: "Blockchain Development",
        tagline: "Smart contracts, DeFi & Web3 infrastructure built to last.",
        desc: `We build on-chain — EVM-compatible smart contracts, DeFi protocols, NFT platforms, DAOs, and full-stack Web3 applications. Every contract we write is tested thoroughly and reviewed for common vulnerabilities before any deployment to mainnet.

Our blockchain work includes ERC-20 and ERC-721 token contracts, staking and yield farming mechanisms, decentralized exchanges, multi-signature wallets, and custom protocol design. We integrate Web3 frontends using wagmi, ethers.js, and RainbowKit — delivering seamless user experiences on top of complex on-chain logic.

We work with Ethereum, Polygon, Binance Smart Chain, Solana, and EVM-compatible L2 networks. Whether you're building a new protocol from scratch or need a smart contract audited and deployed, we deliver code that is secure, gas-efficient, and readable.`,
        tools: ["Solidity / Rust", "Hardhat / Foundry", "ethers.js / wagmi", "IPFS / Filecoin", "OpenZeppelin", "Ethereum / Polygon / BSC"],
        deliverables: ["Audited smart contracts", "Deployment scripts", "Frontend Web3 integration", "Full technical documentation"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80&fit=crop",
        imageAlt: "Blockchain and cryptocurrency development",
        accentHex: "#f97316",
    },
    {
        num: "09",
        title: "Digital Marketing",
        tagline: "Data-driven campaigns that turn impressions into loyal customers.",
        desc: `We plan, run, and optimize digital marketing campaigns across paid and organic channels — Google Ads, Meta, LinkedIn, TikTok, and email — with a single focus: measurable return on your actual budget.

Every campaign starts with audience and competitor research. We define clear KPIs, build creative assets, write ad copy, set up tracking, launch, and then optimize continuously based on real performance data — not intuition. We A/B test aggressively, kill underperformers fast, and scale what's working.

Email marketing services include full list management, automated welcome and nurture sequences, product launch campaigns, newsletter production, and deliverability optimization. For growing brands, we offer full-funnel retainer packages covering paid acquisition, email nurture, and content under one coordinated strategy.`,
        tools: ["Google Ads", "Meta Ads (FB / IG)", "Klaviyo / Mailchimp", "Google Analytics 4", "UTM tracking & attribution", "A/B testing & CRO"],
        deliverables: ["Campaign setup & launch", "Monthly performance report", "Ad creative assets", "Email sequences & automations"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop",
        imageAlt: "Digital marketing analytics dashboard",
        accentHex: "#06b6d4",
    },
];

const PROCESS = [
    { num: "01", title: "Discovery Call", desc: "We understand your goals, timeline, and budget. No pressure, just clarity on both sides before any commitment." },
    { num: "02", title: "Proposal & Scope", desc: "A clear written proposal with milestones, deliverables, timeline, and fixed pricing. No vague estimates." },
    { num: "03", title: "First Milestone", desc: "50% upfront to begin. Subsequent milestones funded as we hit them — you stay in control throughout." },
    { num: "04", title: "Build & Review", desc: "Regular updates, staged reviews, and open communication throughout the entire build. Nothing ships blind." },
    { num: "05", title: "Delivery & Approval", desc: "Final delivery with revision rounds included. Remaining 50% only on your approval. No approval, no payment." },
    { num: "06", title: "Post-launch Support", desc: "30 days of included support after delivery. We stay until everything is running exactly right." },
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

// ── Service block ─────────────────────────────────────────────────────────────

function ServiceBlock({ service, index }) {
    const blockRef = useRef(null);
    const imgWrapRef = useRef(null);
    const isEven = index % 2 === 0;

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Meta strip
            gsap.fromTo(blockRef.current.querySelectorAll(".sb-meta"),
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08,
                    scrollTrigger: { trigger: blockRef.current, start: "top 84%", toggleActions: "play none none none" },
                }
            );

            // Accent line
            gsap.fromTo(blockRef.current.querySelector(".sb-accent"),
                { scaleX: 0, transformOrigin: "left" },
                {
                    scaleX: 1, duration: 1.0, ease: "expo.inOut",
                    scrollTrigger: { trigger: blockRef.current, start: "top 84%", toggleActions: "play none none none" },
                }
            );

            // Title
            gsap.fromTo(blockRef.current.querySelector(".sb-title"),
                { y: 55, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.95, ease: "power3.out", delay: 0.1,
                    scrollTrigger: { trigger: blockRef.current, start: "top 84%", toggleActions: "play none none none" },
                }
            );

            // Paragraphs
            gsap.fromTo(blockRef.current.querySelectorAll(".sb-para"),
                { y: 25, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.72, ease: "power3.out", stagger: 0.11, delay: 0.18,
                    scrollTrigger: { trigger: blockRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

            // Meta columns
            gsap.fromTo(blockRef.current.querySelectorAll(".sb-col"),
                { y: 28, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.12, delay: 0.28,
                    scrollTrigger: { trigger: blockRef.current, start: "top 76%", toggleActions: "play none none none" },
                }
            );

            // Image curtain reveal + inner scale
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

            // Parallax while scrolling
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
        <div ref={blockRef} style={{ padding: `clamp(4.5rem, 9vh, 8rem) ${px}` }}>

            {/* Meta strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.75rem", flexWrap: "wrap" }}>
                <span className="sb-meta" style={{
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.38em",
                    textTransform: "uppercase", color: "var(--primary)", opacity: 0, whiteSpace: "nowrap",
                }}>
                    {service.num} / {String(SERVICES.length).padStart(2, "0")}
                </span>
                <div className="sb-accent" style={{
                    flex: 1, height: "1px", minWidth: "2rem",
                    background: `linear-gradient(to right, ${service.accentHex}80, transparent)`,
                    transformOrigin: "left", transform: "scaleX(0)",
                }} />
                <span className="sb-meta" style={{
                    fontSize: "0.75rem", fontWeight: 500, color: "var(--muted-foreground)",
                    fontStyle: "italic", opacity: 0, textAlign: "right",
                }}>
                    {service.tagline}
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
                        {service.title}
                    </h2>

                    {service.desc.trim().split("\n\n").map((para, i) => (
                        <p key={i} className="sb-para" style={{
                            fontSize: "1rem", lineHeight: 1.9,
                            color: "var(--muted-foreground)",
                            margin: "0 0 1.35rem 0", opacity: 0,
                        }}>
                            {para.trim()}
                        </p>
                    ))}

                    {/* Tools + Deliverables */}
                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: "2.5rem", marginTop: "3rem",
                        paddingTop: "2.5rem",
                        borderTop: "1px solid var(--border)",
                    }} className="sb-meta-cols">

                        <div className="sb-col" style={{ opacity: 0 }}>
                            <p style={{
                                fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.32em",
                                textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.2rem 0",
                            }}>Tools & Stack</p>
                            {service.tools.map((t) => (
                                <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.6rem" }}>
                                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: service.accentHex, flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.83rem", color: "var(--foreground)", fontWeight: 500, lineHeight: 1.4 }}>{t}</span>
                                </div>
                            ))}
                        </div>

                        <div className="sb-col" style={{ opacity: 0 }}>
                            <p style={{
                                fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.32em",
                                textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.2rem 0",
                            }}>You Receive</p>
                            {service.deliverables.map((d) => (
                                <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", marginBottom: "0.7rem" }}>
                                    <span style={{ fontSize: "0.7rem", color: service.accentHex, flexShrink: 0, marginTop: "0.12rem", fontWeight: 800 }}>✓</span>
                                    <span style={{ fontSize: "0.83rem", color: "var(--foreground)", fontWeight: 500, lineHeight: 1.5 }}>{d}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Image */}
                <div ref={imgWrapRef} style={{
                    order: isEven ? 1 : 0,
                    borderRadius: "var(--radius)", overflow: "hidden",
                    aspectRatio: "4 / 3",
                    clipPath: "inset(100% 0 0 0)",
                    position: "relative", flexShrink: 0,
                }} className="svc-img-col">
                    <img
                        src={service.image}
                        alt={service.imageAlt}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.18)" }}
                        loading="lazy"
                    />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(135deg, ${service.accentHex}20 0%, transparent 55%)`,
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "1.25rem", right: "1.25rem",
                        fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em",
                        textTransform: "uppercase", color: "rgba(255,255,255,0.9)",
                        background: "rgba(0,0,0,0.42)", backdropFilter: "blur(10px)",
                        padding: "0.4rem 0.85rem", borderRadius: "2rem",
                        border: `1px solid ${service.accentHex}55`,
                    }}>
                        {service.title}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ── Process ───────────────────────────────────────────────────────────────────

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
                How It Works
            </p>
            <div className="ph" style={{ opacity: 0, marginBottom: "3.5rem" }}>
                <CurtainHeading
                    text="From First Message to Final Delivery"
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

// ── CTA ───────────────────────────────────────────────────────────────────────

function CtaBanner() {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(ref.current.querySelector(".cta-c"),
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );
            gsap.to(ref.current.querySelector(".cta-bg"), {
                y: -70, ease: "none",
                scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const px = "clamp(1.5rem, 6vw, 5rem)";

    return (
        <section ref={ref} style={{
            position: "relative",
            margin: `0 clamp(1rem, 3vw, 3rem)`,
            borderRadius: "var(--radius)",
            overflow: "hidden",
            minHeight: "420px",
            display: "flex", alignItems: "center",
        }}>
            <div className="cta-bg" style={{
                position: "absolute", inset: "-20% 0",
                backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&fit=crop)",
                backgroundSize: "cover", backgroundPosition: "center",
            }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
            <div className="cta-c" style={{ position: "relative", zIndex: 1, padding: `clamp(3rem, 7vh, 6rem) ${px}`, width: "100%", opacity: 0 }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem 0" }}>
                    Ready to start?
                </p>
                <h2 style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 0.95, margin: "0 0 1.5rem 0", maxWidth: "14ch" }}>
                    Let's Build Something Worth Building.
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 2.5rem 0", maxWidth: "48ch" }}>
                    Reach us on Guru.com or drop a message. We respond within 24 hours with a clear, honest proposal — no fluff, no retainer traps.
                </p>
                <a href="https://www.guru.com" target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.9rem 2.25rem",
                    background: "var(--primary)", color: "var(--primary-foreground)",
                    borderRadius: "var(--radius)",
                    fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em",
                    textDecoration: "none", transition: "opacity 0.2s",
                }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                    Hire Us on Guru.com →
                </a>
            </div>
        </section>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
    const { navigateTo } = useLoader();

    useRevealFix();

    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
            <style>{`
                @media (max-width: 960px) {
                    .svc-block-grid { grid-template-columns: 1fr !important; }
                    .svc-text-col   { order: 1 !important; }
                    .svc-img-col    { order: 0 !important; aspect-ratio: 16/9 !important; }
                    .sb-meta-cols   { grid-template-columns: 1fr 1fr !important; }
                    .proc-heads     { display: none !important; }
                    .proc-grid      { grid-template-columns: 3rem 1fr !important; }
                }
                @media (max-width: 560px) {
                    .sb-meta-cols   { grid-template-columns: 1fr !important; gap: 2rem !important; }
                }
            `}</style>

            <PageHero
                label="Our Services"
                title={"Everything Digital,\nUnder One Roof"}
                subtitle="Nine core service areas. One verified team. End-to-end digital work delivered with engineering precision and genuine creative depth."
                tag="02"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
                useCurtainTitle
            />

            {SERVICES.map((service, i) => (
                <div key={service.num}>
                    <Rule />
                    <ServiceBlock service={service} index={i} />
                </div>
            ))}

            <Rule />
            <ProcessSection />
            <Rule />

            {/* <div style={{ padding: "clamp(4rem, 8vh, 7rem) 0" }}>
                <CtaBanner />
            </div> */}
        </div>
    );
}