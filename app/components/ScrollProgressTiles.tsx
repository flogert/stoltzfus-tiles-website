"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgressTiles() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Vertical stack of tiles on the right edge
  return (
    <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1.5 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <Tile key={i} index={i} total={20} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function Tile({ index, total, scrollYProgress }: { index: number, total: number, scrollYProgress: any }) {
  // Each tile activates over a small range of the scroll
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.8, 1.2]); // Pop a bit larger on active
  const rotate = useTransform(scrollYProgress, [start, end], [0, 90]); // Rotate 90deg when active
  const backgroundColor = useTransform(scrollYProgress, [start, end], ["#cbd5e1", "#0d9488"]); // Slate-300 to Teal-600
  const borderRadius = useTransform(scrollYProgress, [start, end], ["1px", "4px"]); // Rounder when active

  return (
    <motion.div
      style={{ opacity, scale, rotate, backgroundColor, borderRadius }}
      className="w-2.5 h-2.5 shadow-sm transition-shadow duration-200"
    />
  );
}
