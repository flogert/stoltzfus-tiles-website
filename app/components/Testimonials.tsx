"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Lititz, PA",
    text: "Stoltzfus Tiles completely transformed our master bathroom. The tile work is flawless — every line is straight, every corner is perfect. Finished on time with a clean, respectful crew. Highly recommend!",
    rating: 5,
    project: "Master Bathroom Remodel",
  },
  {
    name: "Mike D.",
    location: "Ephrata, PA",
    text: "As a GC, I need tile subs I can count on. Stoltzfus shows up on time, communicates clearly, and delivers quality every single time. They're my go-to for every project.",
    rating: 5,
    project: "Commercial Projects",
  },
  {
    name: "Jennifer K.",
    location: "Lancaster, PA",
    text: "Our kitchen backsplash turned out even better than we imagined. The herringbone pattern is stunning and they helped us pick the perfect grout color. Stress-free process!",
    rating: 5,
    project: "Kitchen Backsplash",
  },
  {
    name: "Robert L.",
    location: "Manheim, PA",
    text: "Tricky shower install with multiple niches and a bench seat — Stoltzfus handled the waterproofing and tilework expertly. Two years later, not a single issue. Worth every penny.",
    rating: 5,
    project: "Walk-In Shower",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding bg-linear-to-br from-slate-50 via-white to-slate-100"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Client Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            What Our Clients Say
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Hear from homeowners and contractors across Lancaster County.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-base leading-relaxed text-slate-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600/10 text-sm font-bold text-teal-700">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.project}</div>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
