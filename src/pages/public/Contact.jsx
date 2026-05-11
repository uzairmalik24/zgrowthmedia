import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/ui/PageHero";
import { useLoader } from "@/context/LoaderContext";
import { useRevealFix } from "@/hooks/useRevealFix";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

gsap.registerPlugin(ScrollTrigger);

/* ── Constants ──────────────────────────────────────────────────── */
const SERVICES = [
    { value: "seo", label: "Search Engine Optimization (SEO)" },
    { value: "aeo", label: "Answer Engine Optimization (AEO)" },
    { value: "geo", label: "Generative Experience Optimization (GEO)" },
    { value: "smm", label: "Social Media Marketing (SMM)" },
    { value: "media", label: "Media Platform Management" },
    { value: "full-stack", label: "Full-Stack Growth (Retainer)" },
    { value: "audit", label: "Audit Only" },
    { value: "other", label: "Other / Discuss" },
];

const BUDGETS = [
    { value: "under-2k", label: "Under $2,000 / month" },
    { value: "2k-5k", label: "$2,000 – $5,000 / month" },
    { value: "5k-10k", label: "$5,000 – $10,000 / month" },
    { value: "10k-25k", label: "$10,000 – $25,000 / month" },
    { value: "25k-plus", label: "$25,000+ / month" },
    { value: "discuss", label: "Let's discuss" },
];

const INFO_ITEMS = [
    { num: "01", label: "United Kingdom", value: "{{UK_OFFICE_ADDRESS}}" },
    { num: "02", label: "Pakistan", value: "{{PK_OFFICE_ADDRESS}}" },
    { num: "03", label: "Email", value: "{{EMAIL_ADDRESS}}", href: "mailto:{{EMAIL_ADDRESS}}" },
    { num: "04", label: "Response Time", value: "Within 1 business day" },
];

/* ── Email sender ────────────────────────────────────────────────── */
async function sendEmail({ name, email, service, budget, message }) {
    const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, budget, message }),
    });

    if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || 'Failed to send');
    }
}

/* ── Field label wrapper ─────────────────────────────────────────── */
function FloatField({ label, error, children }) {
    return (
        <div>
            <p style={{
                margin: "0 0 8px",
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: error ? "var(--destructive)" : "var(--muted-foreground)",
            }}>{label}</p>
            {children}
            {error && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--destructive)" }}>{error}</p>}
        </div>
    );
}

/* ── Underline text input ────────────────────────────────────────── */
function RawInput({ type = "text", placeholder, value, onChange, error }) {
    const [focused, setFocused] = useState(false);
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
                width: "100%", boxSizing: "border-box",
                background: "transparent", border: "none",
                borderBottom: `1.5px solid ${error ? "var(--destructive)" : focused ? "var(--primary)" : "var(--border)"}`,
                padding: "10px 0", fontSize: "16px", fontWeight: 500,
                fontFamily: "inherit", color: "var(--foreground)",
                outline: "none", transition: "border-color 0.2s",
            }}
        />
    );
}

/* ── Underline select ────────────────────────────────────────────── */
function RawSelect({ placeholder, value, onValueChange, options, error }) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger style={{
                width: "100%", background: "transparent", border: "none",
                borderBottom: `1.5px solid ${error ? "var(--destructive)" : "var(--border)"}`,
                borderRadius: 0, padding: "10px 0",
                fontSize: "16px", fontWeight: 500, fontFamily: "inherit",
                color: value ? "var(--foreground)" : "var(--muted-foreground)",
                outline: "none", boxShadow: "none", cursor: "pointer",
            }}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(o => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function ContactPage() {
    const { navigateTo } = useLoader();
    useRevealFix();

    /* form */
    const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [errMsg, setErrMsg] = useState("");
    const textareaRef = useRef(null);

    /* gsap */
    const pageRef = useRef(null);
    const marqueeRef = useRef(null);
    const bigRef = useRef(null);
    const infoRefs = useRef([]);
    const formRef = useRef(null);
    const lineRefs = useRef([]);

    const addInfoRef = el => { if (el && !infoRefs.current.includes(el)) infoRefs.current.push(el); };
    const addLineRef = el => { if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el); };

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Marquee */
            gsap.to(marqueeRef.current, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });

            /* Big heading */
            gsap.fromTo(bigRef.current,
                { yPercent: 25, opacity: 0 },
                {
                    yPercent: 0, opacity: 1, duration: 1.4, ease: "power4.out",
                    scrollTrigger: { trigger: bigRef.current, start: "top 88%", toggleActions: "play none none none" }
                }
            );

            /* Divider lines */
            lineRefs.current.forEach((line, i) => {
                gsap.fromTo(line, { scaleX: 0 }, {
                    scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: i * 0.08,
                    scrollTrigger: { trigger: line, start: "top 90%", toggleActions: "play none none none" },
                });
            });

            /* Info items */
            gsap.fromTo(infoRefs.current,
                { y: 36, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: infoRefs.current[0], start: "top 85%", toggleActions: "play none none none" }
                }
            );

            /* Form */
            gsap.fromTo(formRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: formRef.current, start: "top 82%", toggleActions: "play none none none" }
                }
            );
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const handleTextarea = e => {
        setForm(f => ({ ...f, message: e.target.value }));
        const el = textareaRef.current;
        if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Required";
        if (!form.email.trim()) e.email = "Required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
        if (!form.service) e.service = "Required";
        if (!form.budget) e.budget = "Required";
        if (!form.message.trim()) e.message = "Required";
        return e;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setStatus("sending");
        try {
            await sendEmail(form);
            setStatus("success");
            setForm({ name: "", email: "", service: "", budget: "", message: "" });
        } catch (err) {
            setErrMsg(err.message);
            setStatus("error");
        }
    };

    return (
        <>

            <div ref={pageRef} style={{ background: "var(--background)", color: "var(--foreground)" }}>

                {/* ── Hero ────────────────────────────────────────────── */}
                {/* <PageHero
                    label="Get In Touch"
                    title={"Let's Build\nSomething Great"}
                    subtitle="Whether you have a brief, a question, or just an idea — we're all ears."
                    tag="03"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
                    useCurtainTitle
                /> */}

                {/* ── Marquee strip ───────────────────────────────────── */}
                {/* <div style={{
                    overflow: "hidden",
                    borderTop: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    padding: "1rem 0",
                }}>
                    <div ref={marqueeRef} style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", width: "max-content" }}>
                        {[...Array(8)].map((_, i) => (
                            <span key={i} style={{
                                display: "flex", alignItems: "center", gap: "4rem",
                                fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em",
                                textTransform: "uppercase", color: "var(--muted-foreground)",
                            }}>
                                <span>Let's Collaborate</span>
                                <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                                <span>Tell Us Your Vision</span>
                                <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                                <span>We Build. You Grow.</span>
                                <span style={{ color: "var(--primary)", fontSize: "1.2rem" }}>✦</span>
                            </span>
                        ))}
                    </div>
                </div> */}

                {/* ── Big statement ────────────────────────────────────── */}
                <section style={{ padding: "7rem 6vw 5rem" }}>
                    <div ref={bigRef} style={{ opacity: 0 }}>
                        <p style={{
                            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em",
                            textTransform: "uppercase", color: "var(--primary)",
                            margin: "0 0 1.5rem",
                        }}>Drop Us a Line</p>
                        <h2 style={{
                            fontSize: "clamp(2.2rem, 7vw, 9rem)",
                            fontWeight: 900, lineHeight: 0.9,
                            letterSpacing: "-0.04em", margin: "0 0 4rem",
                        }}>
                            Start a<br />
                            <span style={{ color: "var(--primary)" }}>Conversation</span>
                            <br />
                            <span style={{ WebkitTextStroke: "2px var(--foreground)", color: "transparent" }}>Today.</span>
                        </h2>
                    </div>

                    {/* Info grid */}
                    {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderTop: "1px solid var(--border)" }}>
                        {INFO_ITEMS.map(({ num, label, value, href }) => (
                            <div key={num} ref={addInfoRef} style={{ padding: "2rem 2rem 2rem 0", borderRight: "1px solid var(--border)" }}>
                                <span style={{
                                    display: "block", fontSize: "0.65rem", fontWeight: 700,
                                    letterSpacing: "0.18em", textTransform: "uppercase",
                                    color: "var(--primary)", marginBottom: "0.6rem"
                                }}>{num}</span>
                                <p style={{
                                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
                                    textTransform: "uppercase", color: "var(--muted-foreground)", margin: "0 0 0.5rem"
                                }}>{label}</p>
                                {href ? (
                                    <a href={href} style={{
                                        fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                                        fontWeight: 700, color: "var(--foreground)", textDecoration: "none", transition: "color 0.2s"
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                                        onMouseLeave={e => e.currentTarget.style.color = "var(--foreground)"}>{value}</a>
                                ) : (
                                    <p style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{value}</p>
                                )}
                            </div>
                        ))}
                    </div> */}
                </section>

                {/* ── Divider ─────────────────────────────────────────── */}
                <div ref={addLineRef} style={{ height: "1px", background: "var(--border)", margin: "0 6vw", transformOrigin: "left" }} />

                {/* ── Form section ─────────────────────────────────────── */}
                <section style={{ padding: "6rem 6vw 8rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "8vw", alignItems: "start" }}
                        className="contact-cols">
                        <style>{`@media(max-width:860px){.contact-cols{grid-template-columns:1fr!important;gap:4rem!important;}}`}</style>

                        {/* Left */}
                        <div style={{ position: "sticky", top: "7rem" }}>
                            <p style={{
                                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em",
                                textTransform: "uppercase", color: "var(--primary)", margin: "0 0 1.5rem"
                            }}>The Brief</p>
                            <h3 style={{
                                fontSize: "clamp(1.6rem, 2.5vw, 2.6rem)",
                                fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 2rem",
                            }}>
                                Tell us what<br />you're building.
                            </h3>
                            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--muted-foreground)", margin: "0 0 3rem" }}>
                                Fill in the form and we'll put together a tailored response. No spam, no automated sequences — just a real conversation.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {[
                                    { label: "Chat on WhatsApp →", href: "https://wa.me/{{WHATSAPP_NUMBER}}", ext: true },
                                    { label: "Email us directly →", href: "mailto:{{EMAIL_ADDRESS}}", ext: false },
                                ].map(({ label, href, ext }) => (
                                    <a key={label} href={href}
                                        target={ext ? "_blank" : undefined}
                                        rel={ext ? "noopener noreferrer" : undefined}
                                        style={{
                                            fontSize: "0.85rem", fontWeight: 700, color: "var(--muted-foreground)",
                                            textDecoration: "none", transition: "color 0.2s"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                                        onMouseLeave={e => e.currentTarget.style.color = "var(--muted-foreground)"}
                                    >{label}</a>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div ref={formRef} style={{ opacity: 0 }}>
                            {status === "success" ? (
                                <div style={{ paddingTop: "2rem" }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: "50%",
                                        background: "color-mix(in oklch, var(--primary) 12%, transparent)",
                                        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem",
                                    }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                            stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <h3 style={{
                                        fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 900,
                                        letterSpacing: "-0.04em", lineHeight: 0.95, margin: "0 0 1.5rem"
                                    }}>
                                        Message<br />
                                        <span style={{ color: "var(--primary)" }}>Received.</span>
                                    </h3>
                                    <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: "380px", margin: "0 0 2.5rem" }}>
                                        We'll review your project brief and get back to you within 1–2 business days.
                                    </p>
                                    <button onClick={() => setStatus("idle")} style={{
                                        display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                        padding: "1rem 2.5rem",
                                        background: "var(--primary)", color: "var(--primary-foreground)",
                                        border: "none", borderRadius: "999px",
                                        fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em",
                                        textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.2s",
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                                        Send Another →
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

                                    {/* Name + Email */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="form-two-col">
                                        <style>{`@media(max-width:560px){.form-two-col{grid-template-columns:1fr!important;gap:2.5rem!important;}}`}</style>
                                        <FloatField label="Full Name" error={errors.name}>
                                            <RawInput placeholder="Jane Smith" value={form.name} error={errors.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                        </FloatField>
                                        <FloatField label="Email Address" error={errors.email}>
                                            <RawInput type="email" placeholder="jane@company.com" value={form.email} error={errors.email}
                                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                        </FloatField>
                                    </div>

                                    {/* Service + Budget */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="form-two-col">
                                        <FloatField label="Service" error={errors.service}>
                                            <RawSelect placeholder="Choose a service…" value={form.service}
                                                onValueChange={v => setForm(f => ({ ...f, service: v }))}
                                                options={SERVICES} error={errors.service} />
                                        </FloatField>
                                        <FloatField label="Budget" error={errors.budget}>
                                            <RawSelect placeholder="Your budget range" value={form.budget}
                                                onValueChange={v => setForm(f => ({ ...f, budget: v }))}
                                                options={BUDGETS} error={errors.budget} />
                                        </FloatField>
                                    </div>

                                    {/* Message */}
                                    <FloatField label="Project Summary" error={errors.message}>
                                        <textarea ref={textareaRef} value={form.message} onChange={handleTextarea} rows={4}
                                            placeholder="Give us a quick overview — what are you building, what problem does it solve, any references or inspirations?"
                                            style={{
                                                width: "100%", boxSizing: "border-box",
                                                background: "transparent", border: "none",
                                                borderBottom: `1.5px solid ${errors.message ? "var(--destructive)" : "var(--border)"}`,
                                                padding: "10px 0", fontSize: "16px", fontWeight: 500,
                                                fontFamily: "inherit", color: "var(--foreground)",
                                                outline: "none", resize: "none",
                                                lineHeight: 1.65, minHeight: "100px", overflow: "hidden", transition: "border-color 0.2s",
                                            }}
                                            onFocus={e => e.target.style.borderBottomColor = "var(--primary)"}
                                            onBlur={e => e.target.style.borderBottomColor = errors.message ? "var(--destructive)" : "var(--border)"}
                                        />
                                    </FloatField>

                                    {status === "error" && (
                                        <p style={{
                                            fontSize: "13px", color: "var(--destructive)", margin: 0,
                                            padding: "12px 16px", borderRadius: "4px",
                                            background: "color-mix(in oklch, var(--destructive) 8%, transparent)"
                                        }}>
                                            {errMsg || "Something went wrong. Please try again."}
                                        </p>
                                    )}

                                    {/* Submit row */}
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        flexWrap: "wrap", gap: "1.5rem", paddingTop: "0.5rem"
                                    }}>
                                        <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", margin: 0, maxWidth: "260px", lineHeight: 1.6 }}>
                                            We reply personally — no bots, no auto-responders.
                                        </p>
                                        <button type="submit" disabled={status === "sending"} style={{
                                            display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                            padding: "1rem 2.5rem",
                                            background: status === "sending"
                                                ? "color-mix(in oklch, var(--primary) 55%, transparent)"
                                                : "var(--primary)",
                                            color: "var(--primary-foreground)",
                                            border: "none", borderRadius: "999px",
                                            fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            cursor: status === "sending" ? "not-allowed" : "pointer",
                                            transition: "opacity 0.2s",
                                        }}
                                            onMouseEnter={e => { if (status !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                                            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                                            {status === "sending" ? (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                        style={{ animation: "spin 0.8s linear infinite" }}>
                                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                    </svg>
                                                    Sending…
                                                </>
                                            ) : "Send Message →"}
                                        </button>
                                    </div>

                                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Bottom divider ──────────────────────────────────── */}
                <div ref={addLineRef} style={{ height: "1px", background: "var(--border)", margin: "0 6vw", transformOrigin: "left" }} />

            </div>
        </>
    );
}