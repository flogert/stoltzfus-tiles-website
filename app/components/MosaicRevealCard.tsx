"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface MosaicRevealCardProps {
  src: string;
  revealContent: React.ReactNode;
  revealTitle?: string; // Content title
  title?: string; // Cover title
  rows?: number;
  cols?: number;
  className?: string;
  enableHover?: boolean;
}

export default function MosaicRevealCard({
  src,
  revealContent,
  revealTitle,
  title,
  rows = 6,
  cols = 6,
  className = "",
  enableHover = true,
}: MosaicRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Create grid tiles
  const tiles = useMemo(() => {
    return Array.from({ length: rows * cols }, (_, i) => ({
      id: i,
      row: Math.floor(i / cols),
      col: i % cols,
    }));
  }, [rows, cols]);

  return (
    <div
      className={`relative overflow-hidden group rounded-xl shadow-lg ${className}`}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
      onClick={() => !enableHover && setIsHovered(!isHovered)}
    >
      {/* Content to Reveal (Background) */}
      <div className="absolute inset-0 z-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center text-slate-900 h-full w-full border border-slate-200">
        {revealTitle && <h3 className="text-xl font-bold mb-2 text-teal-600">{revealTitle}</h3>}
        <div className="text-sm md:text-base text-slate-600 leading-relaxed">
            {revealContent}
        </div>
      </div>

      {/* Mosaic Tiles (Foreground) */}
      {/* We use specific logic: when hovered, tiles animate out. When not hovered, they animate in. */}
      {/* To ensure "perfect cover", we render them always but change opacity/scale based on hover state */}
      
      <div
        className="absolute inset-0 z-10 grid pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.id}
            initial={false}
            animate={isHovered ? { 
                opacity: 0, 
                scale: 0.8, 
                filter: "blur(5px)",
                y: -20,
                transition: { 
                    duration: 0.3,
                    // Simple diagonal wave
                    delay: (tile.col + tile.row) * 0.02,
                    ease: "circIn"
                }
            } : { 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)", 
                y: 0,
                transition: { 
                    duration: 0.3, 
                    delay: (rows + cols - (tile.col + tile.row)) * 0.015, // Reverse wave on enter
                    ease: "circOut"
                }
            }}
            className="w-full h-full relative bg-slate-200 will-change-transform"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(tile.col / (cols - 1)) * 100}% ${(tile.row / (rows - 1)) * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Title Overlay on Cover */}
      <motion.div 
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/30 group-hover:bg-transparent transition-colors"
      >
        {title && (
            <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-widest text-center px-4 drop-shadow-lg">
                {title}
            </h3>
        )}
      </motion.div>
    </div>
  );
}
