"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
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

  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-slate-200/50"
    : "bg-transparent";

  // Slate-blue/Teal burger colors
  const tileColors = [
    mobileOpen ? "bg-teal-500 rotate-45 translate-x-[3px] translate-y-[3px]" : "bg-slate-700",
    mobileOpen ? "bg-slate-300 -rotate-45 -translate-x-[3px] translate-y-[3px]" : "bg-slate-500",
    mobileOpen ? "bg-slate-300 rotate-45 translate-x-[3px] -translate-y-[3px]" : "bg-slate-500",
    mobileOpen ? "bg-teal-500 -rotate-45 -translate-x-[3px] -translate-y-[3px]" : "bg-slate-700",
  ];

  return (
    <header
      role="banner"
      className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + headerBg}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight"
          aria-label="Stoltzfus Tiles - Home"
        >
          <img src="/stoltzfus.png" alt="Stoltzfus Tiles Logo" className="h-24 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-teal-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg"
              >
                Free Estimate
              </a>
            </li>
          </ul>
        </nav>

        {/* Tile-themed burger button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <div className="grid grid-cols-2 gap-0.75 transition-all duration-300">
            {tileColors.map((cls, i) => (
              <span
                key={i}
                className={"block h-2.25 w-2.25 rounded-xs transition-all duration-300 " + cls}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu - Dark Slate Background */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/98 backdrop-blur-lg md:hidden"
          >
            {/* Tile pattern bg */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              aria-hidden="true"
              style={{
                background:
                  "repeating-conic-gradient(#14b8a6 0% 25%, transparent 0% 50%) 0 0 / 48px 48px",
              }}
            />

            <nav aria-label="Mobile navigation" className="relative z-10">
              <ul className="flex flex-col items-center gap-6" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3 text-2xl font-semibold text-slate-100 transition-colors hover:text-teal-400"
                    >
                      <span
                        className="inline-block h-3 w-3 rounded-xs bg-teal-500/20"
                        aria-hidden="true"
                      />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.35 }}
                >
                  <a
                    href="#contact"
                    onClick={closeMobile}
                    className="mt-6 inline-flex items-center rounded-xl bg-teal-500 px-8 py-3.5 text-lg font-semibold text-slate-900 shadow-lg transition hover:bg-teal-400"
                  >
                    Free Estimate
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
