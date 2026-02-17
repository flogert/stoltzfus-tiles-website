"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to transform your space?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Professional tile installation for kitchens, bathrooms, and living spaces. 
          Contact us today for a free consultation.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="#contact"
            className="rounded-full bg-teal-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-500 hover:scale-105"
          >
            Get a Quote
          </Link>
          <Link
            href="#gallery"
            className="rounded-full border border-slate-600 bg-transparent px-8 py-3 text-base font-semibold text-white transition-all hover:bg-slate-800 hover:border-slate-500"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
