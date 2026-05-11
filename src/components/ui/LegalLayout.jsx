import PageHero from "./PageHero";
import { useRevealFix } from "../../hooks/useRevealFix";

/**
 * LegalLayout
 *
 * Renders a legal page: PageHero, last-updated date, and a structured body
 * of { heading, body } sections. Body strings support double newlines for
 * paragraph breaks and lines starting with "• " or "- " for bullets.
 */
export default function LegalLayout({ title, label, tag, lastUpdated, intro, sections = [] }) {
    useRevealFix();

    const renderBody = (body) => {
        const paras = body.trim().split(/\n\n+/);
        return paras.map((para, i) => {
            const lines = para.split("\n");
            const isList = lines.every((l) => /^\s*[•\-]\s+/.test(l));
            if (isList) {
                return (
                    <ul key={i} style={{
                        margin: "0 0 1.2rem",
                        paddingLeft: "1.2rem",
                        color: "var(--muted-foreground)",
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                    }}>
                        {lines.map((l, j) => (
                            <li key={j} style={{ marginBottom: "0.4rem" }}>
                                {l.replace(/^\s*[•\-]\s+/, "")}
                            </li>
                        ))}
                    </ul>
                );
            }
            return (
                <p key={i} style={{
                    margin: "0 0 1.2rem",
                    fontSize: "0.95rem",
                    lineHeight: 1.85,
                    color: "var(--muted-foreground)",
                }}>
                    {para}
                </p>
            );
        });
    };

    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)" }}>
            <PageHero
                label={label}
                title={title}
                subtitle={intro}
                tag={tag}
                breadcrumbs={[{ label: "Home", href: "/" }, { label }]}
                useCurtainTitle
            />

            <section style={{
                maxWidth: "880px",
                margin: "0 auto",
                padding: "clamp(3rem, 7vh, 6rem) clamp(1.5rem, 6vw, 3rem)",
            }}>
                {lastUpdated && (
                    <p style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--primary)",
                        margin: "0 0 2.5rem",
                    }}>
                        Last updated: {lastUpdated}
                    </p>
                )}

                {sections.map((s, i) => (
                    <article key={i} style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{
                            margin: "0 0 1rem",
                            fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                            fontWeight: 800,
                            color: "var(--foreground)",
                            letterSpacing: "-0.01em",
                        }}>
                            {s.heading}
                        </h2>
                        {renderBody(s.body)}
                    </article>
                ))}

                <div style={{
                    marginTop: "3rem",
                    padding: "1.5rem",
                    borderRadius: "var(--radius)",
                    border: "1px dashed var(--border)",
                    background: "color-mix(in oklch, var(--muted) 30%, transparent)",
                }}>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                        <strong style={{ color: "var(--foreground)" }}>Draft notice — review before publishing.</strong>
                        {" "}
                        This document is a template prepared for Z Growth Media. Please review with qualified legal counsel
                        before going live, particularly to confirm jurisdiction-specific requirements for the UK (GDPR / UK-GDPR)
                        and Pakistan (PECA / SBP), and to fill in all <code>{"{{...}}"}</code> placeholders.
                    </p>
                </div>
            </section>
        </div>
    );
}
