import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * WordReveal
 * Props:
 *  - text: string — split by spaces, each word reveals from below on scroll
 *  - className: extra classes on the outer container
 */
export default function WordReveal({ text = "", className = "" }) {
    const containerRef = useRef(null);
    const words = text.split(" ").filter(Boolean);

    useEffect(() => {
        const wordEls = containerRef.current.querySelectorAll(".word-inner");

        gsap.fromTo(
            wordEls,
            { y: "110%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [text]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 6vw",
            }}
        >
            <p
                style={{
                    fontSize: "clamp(2.2rem, 6vw, 6.5rem)",
                    lineHeight: 1.2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0 0.28em",
                    margin: 0,
                    color: "var(--foreground)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                {words.map((word, i) => (
                    <span
                        key={i}
                        style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.25 }}
                    >
                        <span className="word-inner" style={{ display: "inline-block" }}>
                            {word}
                        </span>
                    </span>
                ))}
            </p>
        </div>
    );
}