import React from 'react';
import PublicLayout from '../components/layouts/public/PublicLayout';
import Home from '../pages/public/Home';
import NotFound from '../components/NotFound';
import AdminLogin from '../pages/auth/AdminLogin';
import AboutPage from '../pages/public/AboutUs';
import ServicesPage from '../pages/public/Services';
import ContactPage from '../pages/public/Contact';

export const publicRoutes = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '/about-us',
                element: <AboutPage />,
            },
            {
                path: '/services',
                element: <ServicesPage />,
            },
            {
                path: '/contact',
                element: <ContactPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];