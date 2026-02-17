"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const TileCanvas = dynamic(() => import("./HeroGrid"), { ssr: false });

// Simpler fade-in for hero text (removed dramatic rotateX)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              custom={i * 0.2 + j * 0.03}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100"
      aria-label="Introduction"
    >
      <TileCanvas />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-4 inline-block rounded-full bg-teal-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-700"
          >
            Lancaster County, PA
          </motion.span>

          <h1 className="mt-2 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <AnimatedText text="Stoltzfus Tiles" className="block" />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="mt-2 block bg-linear-to-r from-teal-600 to-slate-600 bg-clip-text text-transparent"
            >
              Professional Installation
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Expert bathroom remodels, kitchen backsplashes &amp; custom tilework.
            Precision craftsmanship you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex items-center rounded-xl bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-2xl hover:shadow-teal-600/30"
            >
              Get a Free Estimate
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center rounded-xl border-2 border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-600 hover:text-teal-600"
            >
              View Our Work
            </a>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-sm"
        >
          {[
            "Licensed & Insured",
            "15+ Years Exp.",
            "500+ Projects",
            "Free Estimates",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-teal-600"
                aria-hidden="true"
              />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
