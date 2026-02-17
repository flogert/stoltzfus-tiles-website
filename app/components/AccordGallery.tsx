"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop",
    title: "Master Ensuite",
    description: "Luxurious marble finishes with custom vanity integration."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    title: "Modern Kitchen",
    description: "Geometric backsplash patterns meeting sleek cabinetry."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    title: "Herringbone Floor",
    description: "Precision-laid wood-look tile for warmth and durability."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1595558455323-4530084a44b3?q=80&w=800&auto=format&fit=crop",
    title: "Walk-in Shower",
    description: "Seamless glass enclosure with rain shower drainage."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1620626012053-93f2685048d6?q=80&w=800&auto=format&fit=crop",
    title: "Spa Retreat",
    description: "Calming stone textures and neutral palette."
  }
];

export default function AccordGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Featured Collections
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Explore our highlighted project series in detail.
        </p>
      </div>

      <div className="mx-auto max-w-350 px-4 h-125 flex gap-2 md:gap-4 w-full">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            onClick={() => setActiveIndex(index)}
            onHoverStart={() => setActiveIndex(index)}
            className={`relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out`}
            initial={{ flex: 1 }}
            animate={{ flex: activeIndex === index ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {/* Background Image */}
            <motion.img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-60'}`} />

            {/* Content Container */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <AnimatePresence mode="wait">
                    {activeIndex === index && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                             <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                             <p className="text-slate-200 text-sm md:text-base max-w-md hidden md:block">{item.description}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
