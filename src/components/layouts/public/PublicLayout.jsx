// src/layouts/PublicLayout.jsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

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