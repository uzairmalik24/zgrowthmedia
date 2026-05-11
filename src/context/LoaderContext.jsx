// src/context/LoaderContext.jsx
import { React, createContext, useContext, useRef } from "react";
import { gsap } from "gsap";

const LoaderContext = createContext(null);

const BrandLogo = () => (
    <img src="/images/main-logo-light.png" alt="Logo" style={{ width: 250, height: 250, objectFit: "contain" }} />
);

export function LoaderProvider({ children }) {
    const overlayRef = useRef(null);
    const circleRef = useRef(null);
    const logoRef = useRef(null);

    // ── startLoader ───────────────────────────────────────────────────────────
    // Returns a Promise that resolves once the curtain fully covers the screen.
    const startLoader = () =>
        new Promise((resolve) => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const maxR = Math.sqrt(vw * vw + vh * vh);

            gsap.set(overlayRef.current, { display: "flex" });
            gsap.set(circleRef.current, { attr: { r: 0, cx: 0, cy: 0 } });
            gsap.set(logoRef.current, { opacity: 0, scale: 0.75 });

            gsap.to(circleRef.current, {
                attr: { r: maxR },
                duration: 0.45,
                ease: "power3.inOut",
                onComplete: resolve,
            });

            gsap.to(logoRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                delay: 0.2,
                ease: "back.out(1.4)",
            });
        });

    // ── endLoader ─────────────────────────────────────────────────────────────
    const endLoader = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        gsap.to(logoRef.current, {
            opacity: 0, scale: 0.75, duration: 0.15, ease: "power2.in",
        });

        gsap.to(circleRef.current, {
            attr: { r: 0, cx: vw, cy: vh },
            duration: 0.45,
            delay: 0.05,
            ease: "power3.inOut",
            onComplete: () => {
                gsap.set(overlayRef.current, { display: "none" });
                gsap.set(circleRef.current, { attr: { r: 0, cx: 0, cy: 0 } });
            },
        });
    };

    // ── navigateTo ────────────────────────────────────────────────────────────
    // `navigate` is passed in from the calling component, which lives inside
    // the Router tree — this keeps LoaderProvider safely outside the Router.
    //
    // Usage (inside any routed component):
    //   const navigate = useNavigate();
    //   const { navigateTo } = useLoader();
    //   navigateTo('/services', navigate);
    const navigateTo = (href, navigate) => {
        startLoader().then(() => {
            navigate(href);
            // Two rAF ticks: let React render the new page before uncovering.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => endLoader());
            });
        });
    };

    return (
        <LoaderContext.Provider value={{ startLoader, endLoader, navigateTo }}>
            {children}

            {/* Overlay — always mounted, hidden until startLoader() */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9999] items-center justify-center pointer-events-none"
                style={{ display: "none" }}
            >
                <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ overflow: "visible" }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="page-curtain-clip">
                            <circle ref={circleRef} cx="0" cy="0" r="0" />
                        </clipPath>
                    </defs>
                    <rect
                        x="0" y="0" width="100%" height="100%"
                        fill="#008FEA"
                        clipPath="url(#page-curtain-clip)"
                    />
                </svg>

                <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
                    <BrandLogo />
                </div>
            </div>
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    return useContext(LoaderContext);
}