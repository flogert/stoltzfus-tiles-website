"use client";

import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620626012053-93f2685048d6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517646331032-9e8563c523a1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596238699192-3c35d564177d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502005229766-3c8ef564ee11?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588854337421-29a8521f37b6?q=80&w=600&auto=format&fit=crop",
];

export default function ImageFlow() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Visual Excellence
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Hover to pause and explore our portfolio of precision tile work.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden select-none group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...images, ...images].map((src, idx) => (
            <ContentItem key={idx} src={src} />
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-50 to-transparent z-10" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}

function ContentItem({ src }: { src: string }) {
  return (
    <motion.div
      className="relative h-75 w-62.5 sm:w-87.5 shrink-0 overflow-hidden rounded-xl grayscale-30 mr-6 bg-slate-200"
      whileHover={{ 
        scale: 1.05,
        filter: "grayscale(0%)",
        transition: { duration: 0.3 }
      }}
    >
      <img
        src={src}
        alt="Project"
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <span className="text-white font-medium bg-teal-600/90 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          View Details
        </span>
      </div>
    </motion.div>
  );
}
