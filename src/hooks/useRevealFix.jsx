// src/hooks/useRevealFix.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Call this once per page, AFTER all your GSAP ScrollTriggers are registered.
 *
 * What it does:
 *  - Waits one frame (so all ScrollTriggers have initialised)
 *  - Finds every ScrollTrigger whose trigger element is ABOVE or INSIDE
 *    the current viewport (i.e. would never fire because the user is already
 *    past it)
 *  - Forces that animation to its end state immediately so text / elements
 *    are always visible when arriving from the bottom or refreshing mid-page
 */
export function useRevealFix() {
    useEffect(() => {
        // Wait one rAF so GSAP has finished its first refresh
        const raf = requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            ScrollTrigger.getAll().forEach((st) => {
                if (!st.trigger) return;

                const rect = st.trigger.getBoundingClientRect();
                const alreadyPassed = rect.bottom < window.innerHeight;

                if (alreadyPassed) {
                    // Jump the tween / timeline to its completed state
                    if (st.animation) {
                        st.animation.progress(1, false);
                    }
                    // Kill the trigger so it doesn't interfere
                    st.kill(false); // false = don't revert the tween
                }
            });
        });

        return () => cancelAnimationFrame(raf);
    }, []);
}