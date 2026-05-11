import PageHero from "../../components/ui/PageHero";

// ─── About Us ────────────────────────────────────────────────────────────────
export function AboutHero() {
    return (
        <PageHero
            tag="01"
            label="Who We Are"
            title={"We Build\nDigital Futures"}
            subtitle="A collective of designers, engineers and strategists obsessed with crafting experiences that actually matter."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />
    );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export function ContactHero() {
    return (
        <PageHero
            tag="02"
            label="Get In Touch"
            title={"Let's Build\nSomething Great"}
            subtitle="Whether you have a brief, a question, or just an idea — we're all ears. Drop us a line."
            align="center"
            accentColor="oklch(65% 0.20 260)"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        >
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact#form" style={btnStyle("#1a1aff")}>Start a Project</a>
                <a href="mailto:hello@agency.com" style={btnStyle("transparent", true)}>Email Us Directly</a>
            </div>
        </PageHero>
    );
}

// ─── Services ────────────────────────────────────────────────────────────────
export function ServicesHero() {
    return (
        <PageHero
            tag="03"
            label="What We Do"
            title={"Every Service\nYou Need"}
            subtitle="From concept to code, branding to blockchain — one team, end-to-end."
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />
    );
}

// ─── Projects / Work ─────────────────────────────────────────────────────────
export function ProjectsHero() {
    return (
        <PageHero
            tag="04"
            label="Our Work"
            title={"Ideas That\nShip"}
            subtitle="A curated selection of projects that pushed the boundaries of what's possible."
            bgImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />
    );
}

// ─── Blog ────────────────────────────────────────────────────────────────────
export function BlogHero() {
    return (
        <PageHero
            tag="05"
            label="Insights"
            title={"Thoughts,\nTakes & Tutorials"}
            subtitle="Industry perspectives, deep-dives, and the occasional hot take — straight from the team."
            align="center"
            accentColor="oklch(60% 0.18 250)"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />
    );
}

// ─── Careers ─────────────────────────────────────────────────────────────────
export function CareersHero() {
    return (
        <PageHero
            tag="06"
            label="Join The Team"
            title={"Shape What's\nNext"}
            subtitle="We're always looking for extraordinary people who care deeply about craft, culture, and impact."
            accentColor="oklch(72% 0.16 240)"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        >
            <a href="/careers#openings" style={btnStyle("oklch(72% 0.16 240)")}>View Open Roles</a>
        </PageHero>
    );
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function btnStyle(bg, outline = false) {
    return {
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "11px 26px", borderRadius: "999px",
        background: outline ? "transparent" : bg,
        color: "#fff",
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", textDecoration: "none",
        border: outline ? "1px solid rgba(255,255,255,0.2)" : "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, opacity 0.2s ease",
    };
}