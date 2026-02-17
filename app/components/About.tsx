"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "50mi", label: "Service Radius" },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-slate-50"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Decorative Slate/Teal Tile Pattern */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:pl-10"
            aria-hidden="true"
          >
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 rotate-3">
              {Array.from({ length: 9 }).map((_, i) => {
                const colors = [
                  "bg-slate-800",
                  "bg-teal-600/90",
                  "bg-slate-300",
                  "bg-teal-500/80",
                  "bg-slate-100",
                  "bg-slate-700",
                  "bg-slate-200",
                  "bg-teal-700",
                  "bg-slate-900",
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`aspect-square rounded-lg ${colors[i]} shadow-sm`}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              About Us
            </span>
            <h2
              id="about-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Craftsmanship Rooted in Lancaster County
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Stoltzfus Tiles was founded on a simple principle: do exceptional work, treat
                people right, and let the results speak for themselves. We bring the Lancaster
                County work ethic to every project we touch.
              </p>
              <p>
                Certified by the National Tile Contractors Association, we use industry-best
                waterproofing systems from Schluter and Laticrete. From your first call to the final
                grout line, you&rsquo;ll verify clean job sites and tile work that lasts for decades.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
