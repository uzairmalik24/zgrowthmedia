import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "../../components/ui/PageHero";
import { useRevealFix } from "../../hooks/useRevealFix";
import { useLoader } from "../../context/LoaderContext";
import { SERVICES, PILLARS, getServiceBySlug, getServicesByPillar } from "../../data/services";

gsap.registerPlugin(ScrollTrigger);

// ── Tiny FAQ accordion ───────────────────────────────────────────────────────
function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: "1px solid var(--border)" }}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.4rem 0",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                }}
            >
                <span>{q}</span>
                <span style={{
                    flexShrink: 0,
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid var(--border)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "var(--primary)",
                    transition: "transform 0.25s ease",
                    transform: open ? "rotate(45deg)" : "rotate(0deg)",
                }}>
                    +
                </span>
            </button>
            <div style={{
                maxHeight: open ? "320px" : "0",
                opacity: open ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.35s ease, opacity 0.25s ease",
            }}>
                <p style={{
                    margin: 0,
                    paddingBottom: "1.4rem",
                    fontSize: "0.92rem",
                    lineHeight: 1.75,
                    color: "var(--muted-foreground)",
                    maxWidth: "62ch",
                }}>
                    {a}
                </p>
            </div>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { navigateTo } = useLoader();
    const service = getServiceBySlug(slug);

    useRevealFix();

    const pageRef = useRef(null);

    useEffect(() => {
        if (!service) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(pageRef.current.querySelectorAll(".reveal"),
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08,
                    scrollTrigger: { trigger: pageRef.current, start: "top 75%", toggleActions: "play none none none" },
                }
            );
        }, pageRef);
        return () => ctx.revert();
    }, [service]);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const pillar = PILLARS[service.pillar];
    const related = getServicesByPillar(service.pillar).filter((s) => s.slug !== service.slug).slice(0, 3);

    const handleLink = (e, href) => {
        e.preventDefault();
        navigateTo(href, navigate);
    };

    const px = "clamp(1.5rem, 6vw, 5rem)";

    return (
        <div ref={pageRef} style={{ background: "var(--background)", color: "var(--foreground)" }}>

            <PageHero
                label={`${pillar.name} · ${service.tag}`}
                title={service.title}
                subtitle={service.tagline}
                tag={service.num}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/services" },
                    { label: service.title },
                ]}
                useCurtainTitle
            />

            {/* ── Pitch + benefits + image ──────────────────────────────────── */}
            <section style={{
                padding: `clamp(4rem, 8vh, 7rem) ${px}`,
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "clamp(2.5rem, 6vw, 6rem)",
                alignItems: "start",
            }} className="sd-two-col">
                <style>{`@media(max-width:880px){.sd-two-col{grid-template-columns:1fr!important;}}`}</style>

                <div className="reveal">
                    <p style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: pillar.color,
                        margin: "0 0 1rem",
                    }}>
                        What you get
                    </p>
                    <p style={{
                        fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                        lineHeight: 1.8,
                        color: "var(--foreground)",
                        margin: "0 0 2rem",
                    }}>
                        {service.pitch}
                    </p>

                    <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gap: "0.85rem",
                    }}>
                        {service.benefits.map((b) => (
                            <li key={b} style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                fontSize: "0.95rem",
                                lineHeight: 1.55,
                                color: "var(--foreground)",
                            }}>
                                <span style={{
                                    flexShrink: 0,
                                    marginTop: "0.35rem",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: pillar.color,
                                }} />
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reveal" style={{
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    aspectRatio: "4 / 5",
                    position: "relative",
                    border: "1px solid var(--border)",
                }}>
                    <img
                        src={service.image}
                        alt={service.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        loading="lazy"
                    />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: `linear-gradient(135deg, ${pillar.color}25 0%, transparent 60%)`,
                    }} />
                </div>
            </section>

            <div style={{ height: "1px", background: "linear-gradient(to right, var(--border), transparent)", margin: `0 ${px}` }} />

            {/* ── Deliverables + tools ──────────────────────────────────────── */}
            <section style={{
                padding: `clamp(4rem, 8vh, 7rem) ${px}`,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(2.5rem, 6vw, 5rem)",
                alignItems: "start",
            }} className="sd-two-col">

                <div className="reveal">
                    <p style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: pillar.color,
                        margin: "0 0 1.25rem",
                    }}>
                        Deliverables
                    </p>
                    <h2 style={{
                        margin: "0 0 1.75rem",
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "var(--foreground)",
                    }}>
                        What you receive
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {service.deliverables.map((d) => (
                            <li key={d} style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "0.9rem 0",
                                borderBottom: "1px solid var(--border)",
                                fontSize: "0.95rem",
                                color: "var(--foreground)",
                                lineHeight: 1.55,
                            }}>
                                <span style={{ color: pillar.color, fontWeight: 900, fontSize: "0.85rem", marginTop: "0.15rem" }}>✓</span>
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reveal">
                    <p style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: pillar.color,
                        margin: "0 0 1.25rem",
                    }}>
                        Tools & Stack
                    </p>
                    <h2 style={{
                        margin: "0 0 1.75rem",
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "var(--foreground)",
                    }}>
                        What we work with
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                        {service.tools.map((t) => (
                            <span key={t} style={{
                                padding: "0.55rem 0.95rem",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                color: "var(--foreground)",
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "999px",
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <div style={{ height: "1px", background: "linear-gradient(to right, var(--border), transparent)", margin: `0 ${px}` }} />

            {/* ── FAQ ───────────────────────────────────────────────────────── */}
            <section style={{ padding: `clamp(4rem, 8vh, 7rem) ${px}` }}>
                <div className="reveal" style={{ maxWidth: "720px", marginBottom: "2.5rem" }}>
                    <p style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: pillar.color,
                        margin: "0 0 1.25rem",
                    }}>
                        FAQ
                    </p>
                    <h2 style={{
                        margin: 0,
                        fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        color: "var(--foreground)",
                        lineHeight: 1.1,
                    }}>
                        Quick answers.
                    </h2>
                </div>

                <div className="reveal" style={{ maxWidth: "880px" }}>
                    {service.faqs.map((f) => (
                        <FaqItem key={f.q} q={f.q} a={f.a} />
                    ))}
                </div>
            </section>

            <div style={{ height: "1px", background: "linear-gradient(to right, var(--border), transparent)", margin: `0 ${px}` }} />

            {/* ── CTA banner ─────────────────────────────────────────────────── */}
            <section style={{ padding: `clamp(4rem, 8vh, 7rem) ${px}` }}>
                <div className="reveal" style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    background: `linear-gradient(135deg, color-mix(in oklch, ${pillar.color} 8%, var(--card)) 0%, var(--card) 70%)`,
                    padding: "clamp(2.5rem, 6vw, 4rem)",
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr",
                    gap: "2rem",
                    alignItems: "center",
                }} className="sd-cta">
                    <style>{`@media(max-width:760px){.sd-cta{grid-template-columns:1fr!important;}}`}</style>

                    <div>
                        <p style={{
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: pillar.color,
                            margin: "0 0 0.75rem",
                        }}>
                            Ready to start
                        </p>
                        <h3 style={{
                            margin: 0,
                            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                            fontWeight: 900,
                            letterSpacing: "-0.03em",
                            color: "var(--foreground)",
                            lineHeight: 1.1,
                        }}>
                            Let's scope your {service.title.toLowerCase()} engagement.
                        </h3>
                        <p style={{
                            margin: "0.75rem 0 0",
                            fontSize: "0.95rem",
                            color: "var(--muted-foreground)",
                            lineHeight: 1.7,
                            maxWidth: "52ch",
                        }}>
                            30-minute discovery call. No deck, no pressure — just a clear conversation about fit, scope, and pricing.
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <a
                            href="/contact"
                            onClick={(e) => handleLink(e, "/contact")}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.6rem",
                                padding: "1rem 2rem",
                                background: pillar.color,
                                color: "#fff",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: "999px",
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            Get a Quote →
                        </a>
                        <a
                            href="/services"
                            onClick={(e) => handleLink(e, "/services")}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                padding: "1rem 2rem",
                                background: "transparent",
                                color: "var(--foreground)",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: "999px",
                                border: "1px solid var(--border)",
                                transition: "border-color 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = pillar.color; e.currentTarget.style.color = pillar.color; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--foreground)"; }}
                        >
                            ← All services
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Related services ──────────────────────────────────────────── */}
            {related.length > 0 && (
                <section style={{ padding: `0 ${px} clamp(4rem, 8vh, 7rem)` }}>
                    <div className="reveal" style={{ marginBottom: "2rem" }}>
                        <p style={{
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: pillar.color,
                            margin: "0 0 0.6rem",
                        }}>
                            Also in {pillar.name}
                        </p>
                        <h3 style={{
                            margin: 0,
                            fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--foreground)",
                        }}>
                            Related services
                        </h3>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "1rem",
                    }}>
                        {related.map((r) => (
                            <a
                                key={r.slug}
                                href={`/services/${r.slug}`}
                                onClick={(e) => handleLink(e, `/services/${r.slug}`)}
                                className="reveal"
                                style={{
                                    display: "block",
                                    padding: "1.5rem",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    background: "var(--card)",
                                    textDecoration: "none",
                                    transition: "transform 0.25s ease, border-color 0.25s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.borderColor = pillar.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                }}
                            >
                                <p style={{
                                    margin: "0 0 0.5rem",
                                    fontSize: "0.58rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.22em",
                                    textTransform: "uppercase",
                                    color: pillar.color,
                                }}>
                                    {r.tag} · {r.num}
                                </p>
                                <p style={{
                                    margin: "0 0 0.4rem",
                                    fontSize: "1.05rem",
                                    fontWeight: 800,
                                    color: "var(--foreground)",
                                    letterSpacing: "-0.01em",
                                }}>
                                    {r.title}
                                </p>
                                <p style={{
                                    margin: 0,
                                    fontSize: "0.82rem",
                                    color: "var(--muted-foreground)",
                                    lineHeight: 1.55,
                                }}>
                                    {r.tagline}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
