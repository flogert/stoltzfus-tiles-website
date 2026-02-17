"use client";

import { motion, type Variants } from "framer-motion";
import MosaicRevealCard from "./MosaicRevealCard";

const services = [
  {
    title: "Bathroom",
    fullTitle: "Bathroom Remodeling",
    description: "Complete bathroom tile transformations — floors, shower surrounds, tub decks, and custom niches.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Kitchen",
    fullTitle: "Kitchen Backsplash",
    description: "Subway tiles, mosaics, herringbone — elevate your kitchen with a durable, stylish backsplash.",
    image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Flooring",
    fullTitle: "Tile Flooring",
    description: "Porcelain, ceramic, natural stone — precision flooring built to last for decades.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Showers",
    fullTitle: "Shower Surrounds",
    description: "Leak-proof showers and tubs with industry-best waterproofing systems.",
    image: "https://images.unsplash.com/photo-1620626012053-93f2685048d6?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Custom",
    fullTitle: "Custom Patterns",
    description: "Complex layouts, mosaic medallions, and precise cuts for unique spaces.",
    image: "https://images.unsplash.com/photo-1517646331032-9e8563c523a1?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Commercial",
    fullTitle: "Commercial Work",
    description: "Reliable tile subcontracting for offices, restaurants, and retail spaces.",
    image: "https://images.unsplash.com/photo-1596238699192-3c35d564177d?q=80&w=600&auto=format&fit=crop",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Tile 'pop-in' effect (reduced rotation, more slide/fade)
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

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding bg-white"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Expert Tile Services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Precision craftsmanship for homeowners and contractors.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants} className="h-[300px] w-full">
              <MosaicRevealCard
                src={service.image}
                title={service.title}
                revealTitle={service.fullTitle}
                revealContent={service.description}
                className="h-full w-full rounded-2xl shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
