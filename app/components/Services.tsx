"use client";

import { motion, type Variants } from "framer-motion";
import MosaicRevealCard from "./MosaicRevealCard";
import ReflexCard from "./ReflexCard";
import IsometricGridBg from "./IsometricGridBg";

const services = [
  {
    title: "Kitchen",
    fullTitle: "Kitchen Backsplash",
    description: "Subway tiles, mosaics, herringbone — elevate your kitchen with a durable, stylish backsplash.",
    image: "/kitchen.jpg",
  },
  {
    title: "Showers",
    fullTitle: "Shower Surrounds",
    description: "Leak-proof showers and tubs with industry-best waterproofing systems.",
    image: "/showers.jpg",
  },
  {
    title: "Flooring",
    fullTitle: "Tile Flooring",
    description: "Porcelain, ceramic, natural stone — precision flooring built to last for decades.",
    image: "/flooring.jpg",
  },
  {
    title: "Custom",
    fullTitle: "Custom Patterns",
    description: "Complex layouts, mosaic medallions, and precise cuts for unique spaces.",
    image: "/custom.jpg",
  },
  {
    title: "Commercial",
    fullTitle: "Commercial Work",
    description: "Reliable tile subcontracting for offices, restaurants, and retail spaces.",
    image: "/commercial.jpg",
  },
  {
    title: "Accent",
    fullTitle: "Accent Walls",
    description: "Feature walls with cozy tones, balanced grout lines, and clean geometric tile patterns.",
    image: "/accent-tile.svg",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <IsometricGridBg decorative className="opacity-[0.18] z-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            Expert Tile Services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
            Precision craftsmanship for homeowners and contractors.
          </p>
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={cardVariants} className="h-[300px] w-full">
                <ReflexCard className="h-full w-full rounded-2xl">
                  <MosaicRevealCard
                    src={service.image}
                    title={service.title}
                    revealTitle={service.fullTitle}
                    revealContent={service.description}
                    className="h-full w-full rounded-2xl shadow-lg"
                  />
                </ReflexCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-[var(--muted)] select-none">
          Hover or tap to explore our services
        </p>
      </div>
    </section>
  );
}
