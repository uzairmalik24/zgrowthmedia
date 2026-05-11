import PageHero from "../../components/ui/PageHero";
import { useRevealFix } from "../../hooks/useRevealFix";

const PLACEHOLDER_POSTS = [
    { tag: "AEO", title: "What Is Answer Engine Optimization (and Why Your SEO Strategy Will Die Without It)", date: "Coming soon" },
    { tag: "GEO", title: "Google SGE and AI Overviews: A Practical Playbook for 2026", date: "Coming soon" },
    { tag: "SEO", title: "Technical SEO Audit Checklist for 2026 (Core Web Vitals + Schema)", date: "Coming soon" },
    { tag: "SMM", title: "TikTok's New Algorithm: What Actually Drives Reach in 2026", date: "Coming soon" },
    { tag: "Media", title: "The Underrated Distribution Channel: Earned Media in the AI Era", date: "Coming soon" },
    { tag: "Strategy", title: "Why SEO, AEO, and GEO Belong on One Team", date: "Coming soon" },
];

export default function Blog() {
    useRevealFix();

    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)" }}>
            <PageHero
                label="The Blog"
                title={"Field Notes\nFrom The Frontier."}
                subtitle="Practical SEO, AEO, GEO, social, and media-platform playbooks from the Z Growth Media team."
                tag="04"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
                useCurtainTitle
            />

            <section style={{ padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
                    {PLACEHOLDER_POSTS.map((p) => (
                        <article
                            key={p.title}
                            style={{
                                padding: "1.75rem",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius)",
                                background: "var(--card)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.9rem",
                                cursor: "not-allowed",
                                opacity: 0.92,
                            }}
                        >
                            <span style={{
                                alignSelf: "flex-start",
                                fontSize: "0.58rem",
                                fontWeight: 700,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "var(--primary)",
                            }}>
                                {p.tag}
                            </span>
                            <h3 style={{
                                margin: 0,
                                fontSize: "1.05rem",
                                fontWeight: 800,
                                lineHeight: 1.3,
                                color: "var(--foreground)",
                            }}>
                                {p.title}
                            </h3>
                            <p style={{
                                margin: "auto 0 0",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--muted-foreground)",
                            }}>
                                {p.date}
                            </p>
                        </article>
                    ))}
                </div>

                <p style={{
                    marginTop: "3rem",
                    fontSize: "0.85rem",
                    color: "var(--muted-foreground)",
                    textAlign: "center",
                }}>
                    Articles publish soon. For now, drop us a line and we'll send you the raw playbooks.
                </p>
            </section>
        </div>
    );
}
