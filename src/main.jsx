import React from 'react';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store, initTheme } from './store';
import { ToastProvider } from 'toasticom';
import { ReactLenis, useLenis } from 'lenis/react';   // ← add useLenis
import { useRef } from 'react';
import App from './App.jsx';
import './index.css';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { LoaderProvider } from './context/LoaderContext.jsx';
gsap.registerPlugin(useGSAP);

function ThemeInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initTheme());
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => dispatch(initTheme());
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);
  return null;
}

const InitializeLenis = () => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  // ── Expose lenis instance on window so ScrollToTop can reach it ──────────
  // ReactLenis sets lenisRef.current.lenis once mounted
  useEffect(() => {
    const interval = setInterval(() => {
      if (lenisRef.current?.lenis) {
        window.lenis = lenisRef.current.lenis;
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />;
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <InitializeLenis />
    <ToastProvider
      config={{
        duration: 4000,
        position: 'top-right',
        showCloseButton: true,
        toastStyle: { fontSize: '0.95rem', fontWeight: 500 },
      }}
    >
      <ThemeInitializer />
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </ToastProvider>
  </Provider>
);