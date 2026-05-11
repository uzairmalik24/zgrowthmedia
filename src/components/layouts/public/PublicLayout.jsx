// src/layouts/PublicLayout.jsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = 96; // navbar pill (~64px) + breathing room

// Wait for the target element to actually exist before scrolling.
// New routes mount asynchronously and ScrollToTop fires the instant
// the URL changes, so the anchor element may not be in the DOM yet.
function waitForElement(selector, timeoutMs = 2500) {
    return new Promise((resolve) => {
        const found = document.querySelector(selector);
        if (found) return resolve(found);

        const start = Date.now();
        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                resolve(el);
            } else if (Date.now() - start > timeoutMs) {
                observer.disconnect();
                resolve(null);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

function ScrollToTop() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            // ── Hash navigation: scroll to the anchor target ─────────────
            if (hash) {
                const el = await waitForElement(hash);
                if (cancelled || !el) return;

                // ScrollTrigger pins shift element positions — refresh first
                // so getBoundingClientRect returns the correct value.
                ScrollTrigger.refresh();

                const rect = el.getBoundingClientRect();
                const targetY = Math.max(0, rect.top + window.scrollY - NAV_OFFSET);

                if (window.lenis) {
                    window.lenis.scrollTo(targetY, { duration: 1.0 });
                } else {
                    window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
                return;
            }

            // ── No hash: jump straight to top ────────────────────────────
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
        };

        run();
        return () => { cancelled = true; };
        // `key` changes even when navigating to the same path+hash, so
        // clicking the same dropdown item twice still triggers a scroll.
    }, [pathname, hash, key]);

    return null;
}

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <ScrollToTop />
            <PublicNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
