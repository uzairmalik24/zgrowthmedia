import React from 'react';
import PublicLayout from '../components/layouts/public/PublicLayout';
import Home from '../pages/public/Home';
import NotFound from '../components/NotFound';
import AboutPage from '../pages/public/AboutUs';
import ServicesPage from '../pages/public/Services';
import ServiceDetail from '../pages/public/ServiceDetail';
import ContactPage from '../pages/public/Contact';
import CaseStudies from '../pages/public/CaseStudies';
import Blog from '../pages/public/Blog';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import Terms from '../pages/public/Terms';
import RefundPolicy from '../pages/public/RefundPolicy';

export const publicRoutes = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about-us', element: <AboutPage /> },
            { path: 'services', element: <ServicesPage /> },
            { path: 'services/:slug', element: <ServiceDetail /> },
            { path: 'case-studies', element: <CaseStudies /> },
            { path: 'blog', element: <Blog /> },
            { path: 'contact', element: <ContactPage /> },

            // Legal & compliance
            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'terms', element: <Terms /> },
            { path: 'refund-policy', element: <RefundPolicy /> },

            { path: '*', element: <NotFound /> },
        ],
    },
];
