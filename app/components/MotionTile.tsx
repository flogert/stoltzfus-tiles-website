"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const items = [
  { id: 1, title: "Bathroom Remodels", color: "bg-blue-500", pattern: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)" },
  { id: 2, title: "Kitchen Backsplashes", color: "bg-green-500", pattern: "linear-gradient(135deg, #ccfbf1 0%, #14b8a6 100%)" },
  { id: 3, title: "Heated Flooring", color: "bg-yellow-500", pattern: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)" },
  { id: 4, title: "Custom Showers", color: "bg-pink-500", pattern: "linear-gradient(135deg, #99f6e4 0%, #0d9488 100%)" },
  { id: 5, title: "Commercial Installations", color: "bg-purple-500", pattern: "linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)" },
  { id: 6, title: "Natural Stone Work", color: "bg-orange-500", pattern: "linear-gradient(135deg, #fdba74 0%, #ea580c 100%)" },
  { id: 7, title: "And more.", color: "bg-slate-500", pattern: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)" },
];

export default function MotionTile() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[400px]">
          {/* Left Column: Text & List */}
          <div className="flex flex-col gap-8 order-2 md:order-1">
            <motion.h2 layout className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Expert tile services including:
            </motion.h2>
            
            <div className="flex flex-col gap-3 pl-2">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.div
                    key={item.id}
                    layout="position"
                    onClick={() => setActiveIndex(index)}
                    className="relative cursor-pointer group flex items-center"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute -left-6 top-0 bottom-0 w-1 bg-teal-500 rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span 
                      className={`text-lg transition-all duration-300 ${
                        isActive 
                          ? "text-slate-900 font-bold translate-x-1" 
                          : "text-slate-400 font-medium group-hover:text-slate-600"
                      }`}
                    >
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual/Card */}
          <div className="relative h-[400px] w-full flex items-center justify-center order-1 md:order-2" style={{ perspective: "1000px" }}>
             <AnimatePresence mode="wait">
                <motion.div 
                    key={items[activeIndex].id}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -20, x: 50 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotateY: 20, x: -50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative z-10 w-full h-full max-w-sm aspect-[4/5] rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white overflow-hidden"
                    style={{ background: items[activeIndex].pattern }}
                >
                    <div className="absolute inset-0 bg-black/10" />
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative z-20 text-center p-8"
                    >
                      <h3 className="text-3xl font-bold mb-2">{items[activeIndex].title}</h3>
                      <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Example Project</p>
                    </motion.div>
                    
                    {/* Decorative abstract shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl transform -translate-x-10 translate-y-10" />
                </motion.div>
             </AnimatePresence>
             
             {/* Background decorative cards reacting to state */}
             <motion.div 
                className="absolute z-0 top-1/2 left-1/2 w-64 h-80 bg-slate-100 rounded-2xl border border-slate-200" 
                animate={{ 
                  rotate: -6 + Math.sin(activeIndex) * 2, 
                  x: "-60%", 
                  y: "-50%",
                  scale: 0.9
                }}
             />
             <motion.div 
                className="absolute z-0 top-1/2 left-1/2 w-64 h-80 bg-slate-50 rounded-2xl border border-slate-200" 
                animate={{ 
                  rotate: 6 + Math.cos(activeIndex) * 2, 
                  x: "-40%", 
                  y: "-50%",
                  scale: 0.9
                }}
             />
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}
