import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurtainTransition({
    text = "We Build Digital Excellence",
}) {
    const sectionRef = useRef(null);
    const curtain1Ref = useRef(null); // opens the scene — starts full, exits LEFT
    const curtain3Ref = useRef(null); // final sweep     — enters LEFT, exits RIGHT
    const wordsRef = useRef([]);

    const words = text.split(" ");

    useEffect(() => {
        // ─── Timing constants ────────────────────────────────────────────────
        const CURTAIN_DUR = 2.0;   // curtain sweep duration
        const WORD_DUR = 0.6;   // each word pop-in duration
        const WORD_STAGGER = 0.28;  // delay between words

        // derived timeline markers — no idle holds, curtain3 starts right after words finish
        const wordsStart = CURTAIN_DUR;
        const lastWordEnd = wordsStart + (words.length - 1) * WORD_STAGGER + WORD_DUR;
        const finalStart = lastWordEnd;          // curtain3 starts immediately after last word
        const timelineEnd = finalStart + CURTAIN_DUR * 1.4;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${timelineEnd * 340}`,
                pin: true,
                pinSpacing: true,
                scrub: 2,
                invalidateOnRefresh: true,
            },
        });

        // ① Opening curtain exits LEFT — reveals blue panel
        tl.to(
            curtain1Ref.current,
            { xPercent: -100, duration: CURTAIN_DUR, ease: "power3.inOut" },
            0
        );

        // ② Words stagger IN from scale(0.3) → scale(1)
        words.forEach((_, i) => {
            tl.to(
                wordsRef.current[i],
                { opacity: 1, scale: 1, duration: WORD_DUR, ease: "back.out(2)" },
                wordsStart + i * WORD_STAGGER
            );
        });

        // ③ Final sweep: curtain3 travels LEFT → RIGHT immediately after words appear
        tl.fromTo(
            curtain3Ref.current,
            { x: "-100%" },
            {
                x: "0%",  // ← stops when fully covering, doesn't exit right
                duration: CURTAIN_DUR * 1.4,
                ease: "power3.inOut"
            },
            finalStart
        );


        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <div
            ref={sectionRef}
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                background: "var(--background, #0a0a0a)",
                borderBottom: "none",
            }}
        >
            {/* Blue text panel */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    background: "var(--primary, #1a1aff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 8vw",
                    borderBottom: "none",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: "clamp(2rem, 4.5vw, 5.5rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.15,
                        color: "oklch(99% 0.01 80)",
                        textAlign: "center",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.35em",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {words.map((word, i) => (
                        <span
                            key={i}
                            ref={(el) => (wordsRef.current[i] = el)}
                            style={{
                                display: "inline-block",
                                willChange: "transform, opacity",
                                opacity: 0,
                                transform: "scale(0.3)",
                                transformOrigin: "center center",
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </h2>
            </div>

            {/* Curtain 1 — starts full-screen, exits LEFT */}
            <div
                ref={curtain1Ref}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 3,
                    background: "var(--background, #0a0a0a)",
                    transform: "translateX(0%)",
                    border: "none",
                }}
            />

            {/* Curtain 3 — final sweep LEFT → RIGHT, fully clears everything */}
            <div
                ref={curtain3Ref}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10,
                    background: "var(--background, #0a0a0a)",
                    transform: "translateX(-100%)",
                    border: "none",
                }}
            />
        </div>
    );
}