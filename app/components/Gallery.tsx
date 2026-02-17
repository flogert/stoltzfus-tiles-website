"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionTile from "./MotionTile";
import GridRevealImage from "./GridRevealImage";
import AccordGallery from "./AccordGallery";

const categories = ["All", "Bathroom", "Kitchen", "Flooring", "Custom"] as const;
type Category = (typeof categories)[number];

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  gradient: string;
  pattern: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Carrara Master Bath",
    category: "Bathroom",
    description: "Classic white marble porcelain with custom niche and linear drain.",
    gradient: "from-slate-100 to-slate-300",
    pattern: "linear-gradient(135deg, #f1f5f9 25%, #cbd5e1 50%, #f1f5f9 75%)",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Herringbone Backsplash",
    category: "Kitchen",
    description: "Matte white subway tile in herringbone pattern with charcoal grout.",
    gradient: "from-slate-50 to-teal-50",
    pattern: "repeating-linear-gradient(45deg, #e2e8f0 0px, #e2e8f0 10px, #f8fafc 10px, #f8fafc 20px)",
    image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Slate Entryway",
    category: "Flooring",
    description: "Natural slate tile sealed for high-traffic durability.",
    gradient: "from-slate-400 to-slate-600",
    pattern: "repeating-conic-gradient(#64748b 0% 25%, #475569 0% 50%) 0 0 / 50px 50px",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Mosaic Shower Accent",
    category: "Custom",
    description: "Glass and stone mosaic feature wall.",
    gradient: "from-teal-100 to-cyan-100",
    pattern: "repeating-conic-gradient(#99f6e4 0% 25%, #ccfbf1 0% 50%) 0 0 / 24px 24px",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Tub Surround",
    category: "Bathroom",
    description: "Large format tiles with schluter trim finishing.",
    gradient: "from-gray-100 to-blue-50",
    pattern: "repeating-linear-gradient(0deg, #e2e8f0 0px, #e2e8f0 2px, #f8fafc 2px, #f8fafc 60px)",
    image: "https://images.unsplash.com/photo-1620626012053-93f2685048d6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Kitchen Floor",
    category: "Kitchen",
    description: "Wood-look porcelain plank flooring.",
    gradient: "from-amber-50 to-orange-50",
    pattern: "repeating-linear-gradient(90deg, #fff7ed 0px, #fff7ed 8px, #ffedd5 8px, #ffedd5 10px)",
    image: "https://images.unsplash.com/photo-1502005229766-3c8ef564ee11?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Commercial Lobby",
    category: "Flooring",
    description: "High-durability porcelain for commercial traffic.",
    gradient: "from-slate-200 to-slate-300",
    pattern: "repeating-conic-gradient(#cbd5e1 0% 25%, #e2e8f0 0% 50%) 0 0 / 40px 40px",
    image: "https://images.unsplash.com/photo-1596238699192-3c35d564177d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Geometric Feature Wall",
    category: "Custom",
    description: "Bold geometric cement tiles.",
    gradient: "from-teal-50 to-slate-100",
    pattern: "repeating-conic-gradient(#ccfbf1 0% 25%, #f1f5f9 0% 50%) 0 0 / 30px 30px",
    image: "https://images.unsplash.com/photo-1517646331032-9e8563c523a1?q=80&w=600&auto=format&fit=crop",
  },
    {
    id: 9,
    title: "Luxurious En-Suite",
    category: "Bathroom",
    description: "Hexagon floor tiles with floor-to-ceiling porcelain slabs.",
    gradient: "from-slate-50 to-slate-200",
    pattern: "repeating-linear-gradient(135deg, #e2e8f0 0px, #e2e8f0 5px, #f8fafc 5px, #f8fafc 10px)",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Outdoor Patio",
    category: "Flooring",
    description: "Weather-resistant stone pavers for elegant outdoor living.",
    gradient: "from-stone-200 to-stone-400",
    pattern: "repeating-conic-gradient(#d6d3d1 0% 25%, #e7e5e4 0% 50%) 0 0 / 50px 50px",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Modern Minimalist Kitchen",
    category: "Kitchen",
    description: "Large format backsplash with minimal grout lines.",
    gradient: "from-gray-50 to-gray-100",
    pattern: "linear-gradient(to right, #f3f4f6, #e5e7eb)",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Fireplace Surround",
    category: "Custom",
    description: "Hand-crafted ceramic tiles framing a cozy hearth.",
    gradient: "from-orange-50 to-red-50",
    pattern: "repeating-linear-gradient(45deg, #ffedd5 0px, #ffedd5 10px, #fff7ed 10px, #fff7ed 20px)",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="section-padding bg-slate-50" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Portfolio
          </span>
          <h2
            id="gallery-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Recent Projects
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Browse our completed tile installations.
          </p>
        </div>

        <div className="mt-12 mb-16">
          <MotionTile />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group relative aspect-4/3 overflow-hidden rounded-xl bg-slate-200 shadow-sm transition-all hover:shadow-lg"
              >
                {/* Reveal Effect */}
                <div className="absolute inset-0 z-0">
                  <GridRevealImage 
                    src={project.image} 
                    pattern={project.pattern}
                    alt={project.title} 
                    rows={6}
                    cols={6}
                  />
                </div>
                
                <div className="absolute inset-0 bg-slate-900/0 transition-colors group-hover:bg-slate-900/60 z-10" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity group-hover:opacity-100 z-20">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Collections Accordion */}
        <div className="mt-24 border-t border-slate-200 pt-16">
          <AccordGallery />
        </div>
      </div>
    </section>
  );
}
