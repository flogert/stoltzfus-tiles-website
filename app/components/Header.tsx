"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const wasOpen = mobileOpen;
      setMobileOpen(false);
      // Allow menu close animation to finish before scrolling
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          const headerHeight = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, wasOpen ? 350 : 100);
    },
    [mobileOpen]
  );

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? "bg-transparent"
          : scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        {/* Logo — key forces re-mount when logo file updates */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight"
          aria-label="Stoltzfus Custom Tile - Home"
        >
          <Image
            key="stoltzfus-logo"
            src="/stoltzfus-logo.png"
            alt="Stoltzfus Custom Tile Logo"
            width={800}
            height={260}
            priority
            unoptimized
            className="h-24 w-auto sm:h-32"
            style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.8)) drop-shadow(0 0 0.5px rgba(0,0,0,0.6))" }}
          />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link-hover text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-slate-700 hover:text-teal-600"
                      : "text-white/90 hover:text-teal-300"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <div className="relative rounded-lg p-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-[-80%]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "conic-gradient(from 0deg, #0d9488, #14b8a6, #2dd4bf, #99f6e4, #ffffff, #99f6e4, #2dd4bf, #14b8a6, #0d9488)",
                  }}
                />
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="relative z-10 inline-flex items-center rounded-[6px] bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-teal-700"
                >
                  Free Estimate
                </a>
              </div>
            </li>
          </ul>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-xl md:hidden transition-all duration-200 ${
            mobileOpen
              ? "bg-teal-800 text-white shadow-lg shadow-teal-900/30"
              : scrolled
                ? "bg-white shadow-md border border-slate-200"
                : "bg-white/80 backdrop-blur-sm shadow-sm"
          }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >            {mobileOpen ? (
              <svg className="h-5 w-5 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#0d9488" />
                <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#0d9488" opacity="0.7" />
                <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#0d9488" opacity="0.7" />
                <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#0d9488" opacity="0.5" />
              </svg>
            )}
          </button>
      </div>

      {/* Mobile slide-in sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={closeMobile}
            />

              {/* Mobile side panel — dark teal theme matching hero */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 320 }}
              className="fixed top-0 right-0 z-[55] flex h-dvh w-80 max-w-[86vw] flex-col border-l border-teal-800/40 shadow-2xl md:hidden"
              style={{ background: "radial-gradient(ellipse at top right, #0f4c46 0%, #0d2d39 50%, #0b1e2d 100%)" }}
            >
              {/* Header */}
              <div className="border-b border-teal-700/30 px-6 py-5">
                <p className="text-sm font-semibold tracking-wide text-white">Menu</p>
                <p className="mt-1 text-xs text-teal-300/60">Stoltzfus Custom Tile</p>
              </div>

              {/* Nav links */}
              <nav aria-label="Mobile navigation" className="flex-1 px-5 pt-6">
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-teal-100/90 transition-colors hover:bg-teal-500/15 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-6 px-2"
                >
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="flex w-full items-center justify-center rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition-all hover:bg-teal-500"
                  >
                    Get Free Estimate
                  </a>
                </motion.div>
              </nav>

              {/* Footer info */}
              <div className="border-t border-teal-700/30 px-6 py-5">
                <p className="text-xs font-medium text-teal-200/70">Stoltzfus Custom Tile</p>
                <p className="mt-1 text-[11px] text-teal-400/40">Lancaster County, PA</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
