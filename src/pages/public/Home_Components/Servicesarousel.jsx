import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    TbWorldWww,
    TbSeo,
    TbCoinBitcoin,
    TbSpeakerphone,
    TbDeviceMobile,
    TbDeviceGamepad2,
    TbVectorBezier2,
    TbPencil,
    TbVideoPlus,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: 1, title: "Web Development", tag: "01",
        desc: "Pixel-perfect, blazing-fast web experiences built with modern stacks.",
        Icon: TbWorldWww, accent: "oklch(60% 0.18 250)",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    },
    {
        id: 2, title: "App Development", tag: "02",
        desc: "Native & cross-platform apps that users actually love to open.",
        Icon: TbDeviceMobile, accent: "oklch(65% 0.20 260)",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    },
    {
        id: 3, title: "Game Development", tag: "03",
        desc: "Immersive gameplay engineered with precision physics and bold design.",
        Icon: TbDeviceGamepad2, accent: "oklch(55% 0.22 240)",
        img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    },
    {
        id: 4, title: "Graphic Design", tag: "04",
        desc: "Identities, print, and digital visuals that stop the scroll cold.",
        Icon: TbVectorBezier2, accent: "oklch(70% 0.15 245)",
        img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80",
    },
    {
        id: 5, title: "Illustration", tag: "05",
        desc: "Custom artworks that breathe character into brands and stories.",
        Icon: TbPencil, accent: "oklch(68% 0.17 255)",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    },
    {
        id: 6, title: "SEO", tag: "06",
        desc: "Algorithmic authority — rank higher, convert faster, dominate SERPs.",
        Icon: TbSeo, accent: "oklch(62% 0.19 245)",
        img: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80",
    },
    {
        id: 7, title: "Video Editing", tag: "07",
        desc: "Cinematic cuts, motion graphics, and color grades that demand attention.",
        Icon: TbVideoPlus, accent: "oklch(57% 0.21 250)",
        img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    },
    {
        id: 8, title: "Blockchain Dev", tag: "08",
        desc: "Smart contracts, DeFi protocols & Web3 infrastructure — built to last.",
        Icon: TbCoinBitcoin, accent: "oklch(63% 0.20 258)",
        img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
    },
    {
        id: 9, title: "Digital Marketing", tag: "09",
        desc: "Data-driven campaigns that turn impressions into loyal customers.",
        Icon: TbSpeakerphone, accent: "oklch(72% 0.16 240)",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    },
];

function getColumns() {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768) return 3;
    if (w >= 480) return 2;
    return 1;
}

// Card width matches clamp(210px, 22vw, 295px) — computed at runtime
function getCardWidth() {
    const vw = window.innerWidth;
    return Math.min(295, Math.max(210, vw * 0.22));
}

function getGap() {
    const vw = window.innerWidth;
    return Math.min(20, Math.max(12, vw * 0.015));
}

function getPaddingX() {
    const vw = window.innerWidth;
    return Math.min(64, Math.max(24, vw * 0.05));
}

export default function ServicesCarousel() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const counterRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const cols = getColumns();
        const total = SERVICES.length + 1; // +1 for CTA card

        const cardWidth = getCardWidth();
        const gap = getGap();
        const paddingX = getPaddingX();
        const viewportWidth = window.innerWidth;

        // Full track content width (includes CTA card)
        const trackContentWidth = total * cardWidth + (total - 1) * gap + paddingX * 2;

        // How many px the track needs to shift so last card is fully visible
        const maxScroll = Math.max(0, trackContentWidth - viewportWidth);

        if (maxScroll <= 0) return;

        const ctx = gsap.context(() => {
            const st = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                // end is pinned section height (100vh) + scroll distance needed
                end: `+=${maxScroll}`,
                pin: true,
                pinSpacing: true,  // GSAP adds a spacer equal to `end` value automatically
                scrub: 1.2,
                animation: gsap.to(trackRef.current, {
                    x: -maxScroll,
                    ease: "none",
                }),
                onUpdate: (self) => {
                    if (progressRef.current)
                        progressRef.current.style.width = `${self.progress * 100}%`;
                    if (counterRef.current) {
                        const shown = Math.min(total, Math.round(self.progress * total) + cols);
                        counterRef.current.textContent = `${String(Math.min(shown, total)).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
                    }
                },
            });

            gsap.from(".service-card", {
                opacity: 0, y: 60, stagger: 0.08, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
            });

            return () => st.kill();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative", height: "100vh", overflow: "hidden",
                background: "var(--background, #0a0a0a)",
                fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
            }}
        >
            {/* Header */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
                padding: "clamp(1.2rem, 3vw, 2.2rem) clamp(1.5rem, 5vw, 4rem)",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                background: "linear-gradient(to bottom, var(--background, #0a0a0a) 65%, transparent)",
            }}>
                <div>
                    <p style={{
                        margin: 0, marginBottom: "0.4rem",
                        fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                        fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
                        color: "var(--primary, #1a1aff)",
                    }}>
                        What We Do
                    </p>
                </div>

                <div style={{ textAlign: "right" }}>
                    <div ref={counterRef} style={{
                        fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
                        fontWeight: 800, letterSpacing: "0.06em",
                        color: "var(--muted-foreground, #888)",
                        fontVariantNumeric: "tabular-nums", marginBottom: "0.7rem",
                    }}>
                        01 / 10
                    </div>
                    <div style={{
                        width: "clamp(80px, 12vw, 160px)", height: "2px",
                        background: "var(--border, #222)", borderRadius: "999px", overflow: "hidden",
                    }}>
                        <div ref={progressRef} style={{
                            height: "100%", width: "0%",
                            background: "var(--primary, #1a1aff)",
                            borderRadius: "999px", transition: "width 0.05s linear",
                        }} />
                    </div>
                </div>
            </div>

            {/* Track */}
            <div ref={trackRef} style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                display: "flex", alignItems: "center", willChange: "transform",
            }}>
                <div style={{
                    display: "flex", flexDirection: "row",
                    gap: "clamp(12px, 1.5vw, 20px)",
                    padding: "clamp(95px, 16vh, 125px) clamp(1.5rem, 5vw, 4rem) clamp(1.5rem, 4vh, 2.5rem)",
                    alignItems: "stretch",
                }}>
                    {SERVICES.map((svc) => <ServiceCard key={svc.id} svc={svc} />)}
                    <CTACard />
                </div>
            </div>

            <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .service-card:hover .card-img { transform: scale(1.07); }
        .service-card:hover .card-overlay { opacity: 0.48; }
        .service-card:hover .icon-ring {
          transform: scale(1.1) rotate(-6deg);
          background: rgba(255,255,255,0.14);
        }
      `}</style>
        </section>
    );
}

function ServiceCard({ svc }) {
    const { Icon } = svc;
    return (
        <div className="service-card" style={{
            position: "relative",
            width: "clamp(210px, 22vw, 295px)",
            height: "clamp(290px, 54vh, 430px)",
            flexShrink: 0,
            borderRadius: "clamp(10px, 1.2vw, 16px)",
            overflow: "hidden",
            border: "1px solid var(--border, rgba(255,255,255,0.07))",
            boxShadow: "0 12px 50px rgba(0,0,0,0.45)",
            background: "var(--card, #111)",
        }}>
            {/* Image */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <img className="card-img" src={svc.img} alt={svc.title} loading="lazy" style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.05) 100%)",
                }} />
                <div className="card-overlay" style={{
                    position: "absolute", inset: 0,
                    background: svc.accent, opacity: 0, mixBlendMode: "color",
                    transition: "opacity 0.45s ease",
                }} />
            </div>

            {/* Number tag */}
            <div style={{
                position: "absolute", top: "clamp(12px,1.8vh,18px)", left: "clamp(12px,1.8vw,18px)", zIndex: 2,
            }}>
                <span style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: "999px",
                    background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    fontSize: "clamp(0.5rem,0.75vw,0.62rem)",
                    fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)",
                }}>
                    {svc.tag}
                </span>
            </div>

            {/* Icon ring */}
            <div className="icon-ring" style={{
                position: "absolute", top: "clamp(12px,1.8vh,18px)", right: "clamp(12px,1.8vw,18px)", zIndex: 2,
                width: "clamp(36px,4.5vw,50px)", height: "clamp(36px,4.5vw,50px)",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)",
                border: `1.5px solid ${svc.accent}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.35s ease, background 0.35s ease",
                color: svc.accent,
            }}>
                <Icon style={{ width: "50%", height: "50%" }} />
            </div>

            {/* Bottom content */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
                padding: "clamp(14px,2.2vw,22px)",
            }}>
                <div style={{
                    width: "30px", height: "2.5px",
                    background: svc.accent, borderRadius: "2px",
                    marginBottom: "clamp(8px,1.2vh,12px)",
                }} />
                <h3 style={{
                    margin: 0, marginBottom: "clamp(5px,0.8vh,8px)",
                    fontSize: "clamp(1.15rem,2vw,1.6rem)",
                    fontWeight: 900, letterSpacing: "-0.03em",
                    lineHeight: 1.08, color: "#fff", textTransform: "uppercase",
                }}>
                    {svc.title}
                </h3>
                <p style={{
                    margin: 0,
                    fontSize: "clamp(0.65rem,0.85vw,0.76rem)",
                    lineHeight: 1.55, color: "rgba(255,255,255,0.52)",
                    maxWidth: "24ch",
                }}>
                    {svc.desc}
                </p>
            </div>
        </div>
    );
}

function CTACard() {
    return (
        <div className="service-card" style={{
            position: "relative",
            width: "clamp(210px, 22vw, 295px)",
            height: "clamp(290px, 54vh, 430px)",
            flexShrink: 0,
            borderRadius: "clamp(10px, 1.2vw, 16px)",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 12px 50px rgba(0,0,0,0.45)",
            background: "linear-gradient(135deg, #0d0d1a 0%, #0a0a14 60%, #0d0d20 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 3vw, 32px)",
            textAlign: "center",
            cursor: "pointer",
        }}>
            {/* Glow orb background */}
            <div style={{
                position: "absolute",
                width: "180px", height: "180px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(26,26,255,0.18) 0%, transparent 70%)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
            }} />

            {/* Decorative ring */}
            <div style={{
                width: "clamp(56px, 7vw, 76px)",
                height: "clamp(56px, 7vw, 76px)",
                borderRadius: "50%",
                border: "1.5px solid rgba(26,26,255,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "clamp(16px, 2.5vh, 24px)",
                position: "relative", zIndex: 1,
                background: "rgba(26,26,255,0.08)",
                backdropFilter: "blur(8px)",
            }}>
                <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="var(--primary, #1a1aff)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>

            {/* Text */}
            <p style={{
                margin: 0, marginBottom: "clamp(6px, 1vh, 10px)",
                fontSize: "clamp(0.55rem, 0.7vw, 0.62rem)",
                fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--primary, #1a1aff)",
                position: "relative", zIndex: 1,
            }}>
                And More
            </p>
            <h3 style={{
                margin: 0, marginBottom: "clamp(10px, 1.5vh, 16px)",
                fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                fontWeight: 900, letterSpacing: "-0.03em",
                lineHeight: 1.1, color: "#fff", textTransform: "uppercase",
                position: "relative", zIndex: 1,
            }}>
                See All Services
            </h3>
            <p style={{
                margin: 0, marginBottom: "clamp(16px, 2.5vh, 24px)",
                fontSize: "clamp(0.62rem, 0.8vw, 0.72rem)",
                lineHeight: 1.6, color: "rgba(255,255,255,0.45)",
                maxWidth: "20ch",
                position: "relative", zIndex: 1,
            }}>
                Explore everything we offer and find your perfect fit.
            </p>

            {/* Button */}
            <a
                href="/services"
                className="cta-btn"
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "clamp(8px, 1.2vh, 12px) clamp(16px, 2vw, 24px)",
                    borderRadius: "999px",
                    background: "var(--primary, #1a1aff)",
                    color: "#fff",
                    fontSize: "clamp(0.6rem, 0.8vw, 0.72rem)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    border: "2px solid transparent",           // ← important
                    cursor: "pointer",
                    transition: "border-color 0.25s ease",
                    boxShadow: "0 4px 20px rgba(26,26,255,0.4)",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#4a4aff"; // lighter blue or any you prefer
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "transparent";
                }}
            >
                View All Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    );
}