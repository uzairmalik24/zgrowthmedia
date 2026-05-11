// src/components/ui/CurtainHeading.jsx
import { useEffect, useRef, useState } from "react";

/**
 * CurtainHeading
 * Props:
 *  - text: string (required)
 *  - as: heading tag — "h1" | "h2" | "h3" | "h4" (default "h2")
 *  - className: extra classes for the heading tag
 *  - style: style object passed to the heading tag
 *  - delay: ms before animation starts after entering view (default 0)
 *  - repeat: replay animation each time element enters from below (default false)
 */
export default function CurtainHeading({
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

        // ── Immediate check on mount ──────────────────────────────────────────
        // If the element is already in or above the viewport when the component
        // mounts (e.g. user refreshed at bottom, navigated from bottom of another
        // page, or this heading is above the fold), show it right away with no
        // curtain animation. No observer needed for those elements.
        const mountRect = el.getBoundingClientRect();
        const alreadyVisible = mountRect.top < window.innerHeight;

        if (alreadyVisible) {
            hasPlayed.current = true;
            setTextVisible(true);
            // Don't set triggered — no curtain animation needed
            return; // skip observer entirely for this element
        }

        // ── Observer for elements below the fold ─────────────────────────────
        const observer = new IntersectionObserver(
            ([entry]) => {
                const rect = entry.boundingClientRect;

                if (entry.isIntersecting) {
                    // Only animate when genuinely scrolling up into view from below
                    if (!repeat && hasPlayed.current) return;
                    hasPlayed.current = true;
                    setTriggered(true);
                    clearTimeout(timerRef.current);
                    timerRef.current = setTimeout(
                        () => setTextVisible(true),
                        delay + 350
                    );
                } else if (!entry.isIntersecting && repeat) {
                    // Reset only when element exits below viewport (user scrolled back up)
                    const exitedBelow = rect.top > window.innerHeight;
                    if (exitedBelow) {
                        setTriggered(false);
                        setTextVisible(false);
                        hasPlayed.current = false;
                        clearTimeout(timerRef.current);
                    }
                }
            },
            { threshold: 0.1 }
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
                    ...style,
                    opacity: textVisible ? 1 : 0,
                    display: "block",
                    margin: 0,
                    wordBreak: "break-word",
                }}
            >
                {text}
            </Tag>

            {/* Curtain overlay — only rendered when animation is playing */}
            <span
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--primary)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    pointerEvents: "none",
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