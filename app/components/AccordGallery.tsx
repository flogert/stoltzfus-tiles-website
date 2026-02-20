"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IsometricGridBg from "./IsometricGridBg";

interface AccordionItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: 1,
    image: "/kitchen.jpg",
    title: "Kitchen Backsplash",
    description: "Transform your kitchen with stunning tile backsplashes that combine beauty and durability.",
  },
  {
    id: 2,
    image: "/showers.jpg",
    title: "Shower Surrounds",
    description: "Custom waterproofed shower installations with premium tile work.",
  },
  {
    id: 3,
    image: "/flooring.jpg",
    title: "Tile Flooring",
    description: "Precision-laid flooring that stands the test of time.",
  },
  {
    id: 4,
    image: "/custom.jpg",
    title: "Custom Designs",
    description: "Unique patterns and intricate tile work for distinctive spaces.",
  },
  {
    id: 5,
    image: "/commercial.jpg",
    title: "Commercial Projects",
    description: "Professional tile solutions for businesses and contractors.",
  },
];

export default function AccordGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const slide = el.children[index] as HTMLElement;
    if (slide) {
      el.scrollTo({ left: slide.offsetLeft - (el.offsetWidth - slide.offsetWidth) / 2, behavior: "smooth" });
    }
    setActiveIndex(index);
  }, []);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  return (
    <section
      id="gallery"
      className="section-padding relative overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <IsometricGridBg decorative className="opacity-[0.18] z-0" />

      {/* Heading */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 mb-10 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
          Our Work
        </span>
        <h2
          id="gallery-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Featured Collections
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600">
          Explore our highlighted project series — swipe to discover more.
        </p>
      </div>

      {/* ── Mobile (< md): snap carousel ── */}
      <div className="relative z-10 md:hidden" role="region" aria-label="Project gallery carousel" aria-roledescription="carousel">
        {/* Left/right edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="snap-center shrink-0 w-[78vw] max-w-xs"
              style={{ scrollSnapAlign: "center" }}
            >
              <button
                onClick={() => scrollToSlide(index)}
                className="relative w-full overflow-hidden rounded-2xl shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                style={{ aspectRatio: "3/4" }}
                aria-pressed={activeIndex === index}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
                  style={{ transform: activeIndex === index ? "scale(1.06)" : "scale(1)" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                {activeIndex === index && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-teal-400/60 ring-inset" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                  {activeIndex === index && (
                    <span className="mb-2 inline-block rounded-full bg-teal-900/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-300 backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                  <h3 className="text-base font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }}
                        className="mt-1.5 overflow-hidden text-xs leading-relaxed text-slate-300"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-7 bg-teal-600" : "w-2 bg-slate-300 hover:bg-teal-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Tablet (md → lg): vertical stack accordion ── */}
      <div className="relative z-10 mx-auto hidden max-w-3xl px-4 md:block lg:hidden">
        <div className="flex flex-col gap-3">
          {items.map((item, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className="relative w-full overflow-hidden rounded-2xl text-left shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-pressed={active}
              >
                <motion.div
                  animate={{ height: active ? 260 : 72 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="relative w-full overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-slate-900/20" />
                  {active && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-teal-400/50 ring-inset" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          key="badge"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mb-2 inline-block rounded-full bg-teal-900/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-300 backdrop-blur-sm"
                        >
                          Featured
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-bold text-white sm:text-lg">
                        {item.title}
                      </h3>
                      <svg
                        className={`h-5 w-5 shrink-0 text-teal-300 transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <AnimatePresence>
                      {active && (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="mt-1.5 text-sm leading-relaxed text-slate-300"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop (lg+): horizontal accordion ── */}
      <div className="relative z-10 mx-auto hidden max-w-7xl px-4 lg:flex gap-3 h-[600px] w-full" role="tablist" aria-label="Project gallery">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            role="tab"
            tabIndex={0}
            aria-selected={activeIndex === index}
            aria-label={item.title}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIndex(index); }
              if (e.key === 'ArrowRight') { e.preventDefault(); setActiveIndex((index + 1) % items.length); }
              if (e.key === 'ArrowLeft') { e.preventDefault(); setActiveIndex((index - 1 + items.length) % items.length); }
            }}
            className={`relative h-full rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${activeIndex === index ? "shadow-2xl" : "shadow-md"}`}
            initial={{ flex: 1 }}
            animate={{ flex: activeIndex === index ? 4 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className={`absolute inset-0 ring-inset transition-all duration-300 rounded-2xl ${activeIndex === index ? "ring-4 ring-teal-500/30" : "ring-0"}`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/90 transition-opacity duration-300 ${activeIndex === index ? "opacity-100" : "opacity-70"}`}
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-900/50 rounded-full backdrop-blur-sm">
                      Featured
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-200 text-sm md:text-base max-w-md leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {activeIndex !== index && (
                <div className="flex items-end justify-center h-full pb-4">
                  <span className="text-white/80 text-xs font-medium [writing-mode:vertical-lr] rotate-180 tracking-wider uppercase">
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


