import PageHero from "../../components/ui/PageHero";
import { useRevealFix } from "../../hooks/useRevealFix";

const PLACEHOLDERS = [
    { tag: "SEO · AEO", title: "How TwinSpires 3x'd Organic Traffic in 90 Days", brief: "Full technical SEO rebuild plus AEO content engineering — case study in production." },
    { tag: "Full-Stack SMM", title: "Stellar Commerce: From 0 to 8M Monthly Impressions", brief: "Coordinated TikTok / Meta / YouTube strategy for an emerging DTC brand." },
    { tag: "Media Placement", title: "PR Bytes: 14 Tier-1 Publications in One Quarter", brief: "Earned media program turning founder authority into compounding distribution." },
];

export default function CaseStudies() {
    useRevealFix();

    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)" }}>
            <PageHero
                label="Case Studies"
                title={"Receipts,\nNot Promises."}
                subtitle="Real numbers from real engagements. Full case studies coming soon — get in touch for the unredacted versions."
                tag="03"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
                useCurtainTitle
            />

            <section style={{ padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                }}>
                    {PLACEHOLDERS.map((c) => (
                        <article
                            key={c.title}
                            style={{
                                padding: "2rem 1.75rem",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius)",
                                background: "var(--card)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                minHeight: "240px",
                                transition: "transform 0.3s ease, border-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = "var(--primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "var(--border)";
                            }}
                        >
                            <span style={{
                                alignSelf: "flex-start",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "var(--primary)",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "999px",
                                border: "1px solid color-mix(in oklch, var(--primary) 30%, transparent)",
                                background: "color-mix(in oklch, var(--primary) 8%, transparent)",
                            }}>
                                {c.tag}
                            </span>
                            <h3 style={{
                                margin: 0,
                                fontSize: "1.2rem",
                                fontWeight: 800,
                                lineHeight: 1.25,
                                color: "var(--foreground)",
                            }}>
                                {c.title}
                            </h3>
                            <p style={{
                                margin: 0,
                                fontSize: "0.875rem",
                                color: "var(--muted-foreground)",
                                lineHeight: 1.65,
                            }}>
                                {c.brief}
                            </p>
                            <p style={{
                                marginTop: "auto",
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--muted-foreground)",
                            }}>
                                Case study — coming soon
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
