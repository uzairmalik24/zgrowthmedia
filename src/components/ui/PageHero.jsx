import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRevealFix } from "../../hooks/useRevealFix";

gsap.registerPlugin(SplitText);

// ─────────────────────────────────────────────────────────────────────────────
// CurtainHeading
// Reads all colors from CSS variables — zero hardcoded values.
// Curtain wipe uses --primary; text inherits color from its container.
// ─────────────────────────────────────────────────────────────────────────────
export function CurtainHeading({
    text = "",
    as: Tag = "h2",
    className = "",
    style = {},
    delay = 0,
    repeat = false,
}) {
    const ref = useRef(null);
    const [triggered, setTriggered] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const timerRef = useRef(null);
    const hasPlayed = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const comingFromBelow = entry.boundingClientRect.top > 0;
                if (entry.isIntersecting && comingFromBelow) {
                    if (!repeat && hasPlayed.current) return;
                    hasPlayed.current = true;
                    setTriggered(true);
                    clearTimeout(timerRef.current);
                    timerRef.current = setTimeout(() => setTextVisible(true), delay + 350);
                } else if (!entry.isIntersecting && repeat && comingFromBelow) {
                    setTriggered(false);
                    setTextVisible(false);
                    clearTimeout(timerRef.current);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            clearTimeout(timerRef.current);
        };
    }, [delay, repeat]);

    return (
        <span
            ref={ref}
            style={{
                position: "relative",
                display: "inline-block",
                width: "fit-content",
                maxWidth: "100%",
                overflow: "hidden",
                padding: "0.1em 0",
                wordBreak: "break-word",
            }}
        >
            <Tag
                className={className}
                style={{
                    // color intentionally NOT set — inherits from parent (which uses --foreground)
                    opacity: textVisible ? 1 : 0,
                    transition: "opacity 0.15s ease",
                    display: "block",
                    margin: 0,
                    wordBreak: "break-word",
                    ...style,
                }}
            >
                {text}
            </Tag>

            <span
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--primary)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    animation: triggered
                        ? `curtainReveal 0.7s cubic-bezier(0.77,0,0.18,1) ${delay}ms both`
                        : "none",
                }}
            />

            <style>{`
                @keyframes curtainReveal {
                    0%     { transform: scaleX(0); transform-origin: left center; }
                    49.99% { transform: scaleX(1); transform-origin: left center; }
                    50%    { transform: scaleX(1); transform-origin: right center; }
                    100%   { transform: scaleX(0); transform-origin: right center; }
                }
            `}</style>
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageHero
//
// No `theme` prop needed. Toggling `.dark` on <html> (or any ancestor)
// is enough — every color is a CSS variable from your design system.
//
// Variable map:
//   --background        section bg
//   --foreground        heading & body text
//   --primary           accent line, eyebrow label, active breadcrumb, curtain
//   --muted-foreground  subtitle text, inactive breadcrumb links
//   --border            tag outline stroke, breadcrumb chevron, bottom rule
//
// Props:
//   label          {string}
//   title          {string}              supports \n line breaks
//   subtitle       {string}
//   breadcrumbs    {Array<{label,href}>}
//   align          {"left"|"center"}     default "left"
//   tag            {string}              decorative number e.g. "02"
//   bgImage        {string}              optional background image URL
//   useCurtainTitle {boolean}            swap GSAP split-lines for CurtainHeading
//   children       {ReactNode}
// ─────────────────────────────────────────────────────────────────────────────
export default function PageHero({
    label = "Page",
    title = "Untitled Page",
    subtitle = "",
    breadcrumbs = [],
    align = "left",
    tag = "00",
    bgImage = null,
    useCurtainTitle = false,
    children = null,
}) {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const lineRef = useRef(null);
    const tagRef = useRef(null);
    const breadRef = useRef(null);
    const childRef = useRef(null);
    const noiseRef = useRef(null);

    useRevealFix();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            if (noiseRef.current)
                tl.fromTo(noiseRef.current,
                    { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0);

            tl.fromTo(lineRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.1);

            tl.fromTo(tagRef.current,
                { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15);

            tl.fromTo(labelRef.current,
                { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, 0.2);

            let split;
            if (!useCurtainTitle && titleRef.current) {
                try {
                    split = new SplitText(titleRef.current, { type: "lines", linesClass: "hero-line" });
                    split.lines.forEach((line) => {
                        const wrapper = document.createElement("div");
                        wrapper.style.cssText = "overflow:hidden; display:block;";
                        line.parentNode.insertBefore(wrapper, line);
                        wrapper.appendChild(line);
                    });
                    tl.fromTo(split.lines,
                        { y: "110%", opacity: 0 },
                        { y: "0%", opacity: 1, stagger: 0.1, duration: 0.85, ease: "expo.out" },
                        0.3);
                } catch {
                    tl.fromTo(titleRef.current,
                        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
                }
            }

            if (subtitleRef.current)
                tl.fromTo(subtitleRef.current,
                    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.6);

            if (breadRef.current)
                tl.fromTo(breadRef.current,
                    { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7);

            if (childRef.current)
                tl.fromTo(childRef.current,
                    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75);

            return () => split?.revert();
        }, sectionRef);

        return () => ctx.revert();
    }, [title, useCurtainTitle]);

    const isCenter = align === "center";

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                minHeight: "clamp(380px, 55vh, 640px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingTop: "calc(var(--navbar-height, 64px) + clamp(60px, 8vh, 100px))",
                paddingBottom: "clamp(2.5rem, 5vh, 4.5rem)",
                paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
                paddingRight: "clamp(1.5rem, 6vw, 5rem)",
                overflow: "hidden",
                background: bgImage ? "transparent" : "var(--background)",
                color: "var(--foreground)",
                fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                isolation: "isolate",
            }}
        >
            {/* ── Background image ─────────────────────────────────────────── */}
            {bgImage && (
                <>
                    <div style={{
                        position: "absolute", inset: 0, zIndex: -3,
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                    }} />
                    {/*
                        color-mix() blends --background into transparent so the
                        gradient automatically uses the right base color in both themes.
                    */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: -2,
                        background: `linear-gradient(
                            to top,
                            var(--background) 0%,
                            color-mix(in oklch, var(--background) 75%, transparent) 50%,
                            color-mix(in oklch, var(--background) 40%, transparent) 100%
                        )`,
                    }} />
                </>
            )}

            {/* ── Noise grain — overlay blend works for both themes ─────────── */}
            <div
                ref={noiseRef}
                style={{
                    position: "absolute", inset: 0, zIndex: -1, opacity: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
                    backgroundSize: "180px 180px",
                    mixBlendMode: "overlay",
                    pointerEvents: "none",
                }}
            />

            {/* ── Decorative tag — top right ────────────────────────────────── */}
            <div ref={tagRef} style={{
                position: "absolute",
                top: "clamp(1.5rem, 4vh, 3rem)",
                right: "clamp(1.5rem, 6vw, 5rem)",
                opacity: 0,
                lineHeight: 1,
            }}>
                <span style={{
                    fontSize: "clamp(4rem, 10vw, 9rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.06em",
                    color: "transparent",
                    WebkitTextStroke: "1.5px var(--border)",  // --border adapts per theme
                    userSelect: "none",
                    fontVariantNumeric: "tabular-nums",
                }}>
                    {tag}
                </span>
            </div>

            {/* ── Accent line — top left ────────────────────────────────────── */}
            <div ref={lineRef} style={{
                position: "absolute",
                top: "clamp(1.5rem, 4vh, 3rem)",
                left: "clamp(1.5rem, 6vw, 5rem)",
                width: "clamp(36px, 5vw, 60px)",
                height: "2px",
                background: "var(--primary)",
                borderRadius: "2px",
                transformOrigin: "left center",
            }} />

            {/* ── Content ───────────────────────────────────────────────────── */}
            <div style={{
                position: "relative",
                maxWidth: isCenter ? "none" : "900px",
                textAlign: isCenter ? "center" : "left",
                ...(isCenter ? { margin: "0 auto", width: "100%" } : {}),
            }}>
                {/* Eyebrow label */}
                <p ref={labelRef} style={{
                    margin: 0,
                    marginBottom: "clamp(0.7rem, 1.5vh, 1.2rem)",
                    fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    opacity: 0,
                }}>
                    {label}
                </p>

                {/* Title */}
                {useCurtainTitle ? (
                    /*
                        Wrap in a styled div so font/size/weight are set here,
                        and CurtainHeading just inherits them — no duplication.
                    */
                    <div style={{
                        marginBottom: "clamp(1rem, 2.5vh, 1.8rem)",
                        fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.95,
                        color: "var(--foreground)",
                        textTransform: "uppercase",
                        whiteSpace: "pre-line",
                    }}>
                        <CurtainHeading text={title} as="h1" delay={300} />
                    </div>
                ) : (
                    <h1 ref={titleRef} style={{
                        margin: 0,
                        marginBottom: "clamp(1rem, 2.5vh, 1.8rem)",
                        fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.95,
                        color: "var(--foreground)",
                        textTransform: "uppercase",
                        whiteSpace: "pre-line",
                    }}>
                        {title}
                    </h1>
                )}

                {/* Subtitle */}
                {subtitle && (
                    <p ref={subtitleRef} style={{
                        margin: 0,
                        marginTop: "clamp(0.5rem, 1vh, 0.8rem)",
                        marginBottom: children ? "clamp(1.5rem, 3vh, 2.5rem)" : 0,
                        fontSize: "clamp(0.78rem, 1.1vw, 0.96rem)",
                        lineHeight: 1.7,
                        color: "var(--muted-foreground)",
                        maxWidth: isCenter ? "55ch" : "52ch",
                        ...(isCenter ? { margin: "0 auto", marginBottom: children ? "clamp(1.5rem,3vh,2.5rem)" : 0 } : {}),
                        opacity: 0,
                    }}>
                        {subtitle}
                    </p>
                )}

                {/* Children slot */}
                {children && (
                    <div ref={childRef} style={{ opacity: 0, marginTop: "clamp(1.2rem, 2.5vh, 2rem)" }}>
                        {children}
                    </div>
                )}
            </div>

            {/* ── Breadcrumbs — bottom right ────────────────────────────────── */}
            {breadcrumbs.length > 0 && (
                <div ref={breadRef} style={{
                    position: "absolute",
                    bottom: "clamp(1.2rem, 2.5vh, 2rem)",
                    right: "clamp(1.5rem, 6vw, 5rem)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    opacity: 0,
                }}>
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {i > 0 && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                    stroke="var(--border)" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            )}
                            {crumb.href && i < breadcrumbs.length - 1 ? (
                                <a href={crumb.href} style={{
                                    fontSize: "clamp(0.58rem, 0.8vw, 0.68rem)",
                                    fontWeight: 500,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--muted-foreground)",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                    onMouseEnter={e => e.currentTarget.style.color = "var(--foreground)"}
                                    onMouseLeave={e => e.currentTarget.style.color = "var(--muted-foreground)"}
                                >
                                    {crumb.label}
                                </a>
                            ) : (
                                <span style={{
                                    fontSize: "clamp(0.58rem, 0.8vw, 0.68rem)",
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--primary)",
                                }}>
                                    {crumb.label}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
            )}

            {/* ── Bottom border ─────────────────────────────────────────────── */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: "clamp(1.5rem, 6vw, 5rem)",
                right: "clamp(1.5rem, 6vw, 5rem)",
                height: "1px",
                background: "linear-gradient(to right, var(--border), transparent)",
            }} />

            <style>{`.hero-line { display: block; }`}</style>
        </section>
    );
}