"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface GridRevealImageProps {
  src?: string;
  pattern?: string;
  alt: string;
  rows?: number;
  cols?: number;
  className?: string;
}

export default function GridRevealImage({ 
  src, 
  pattern,
  alt, 
  rows = 8, 
  cols = 8,
  className = "" 
}: GridRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Create an array of tile indices
  const tiles = Array.from({ length: rows * cols }, (_, i) => ({
    id: i,
    row: Math.floor(i / cols),
    col: i % cols,
  }));

  const bgStyle = src ? `url(${src})` : pattern;
  
  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full overflow-hidden not-prose ${className}`}
      aria-label={alt}
      role="img"
    >
      {/* 
        We render a grid of divs. Each div has the same background image,
        but positioned differently to show only its segment.
      */}
      <div 
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={isInView ? { opacity: 1, scale: 1.05, y: 0 } : {}}
            transition={{ 
              duration: 0.5, 
              ease: "circOut",
              delay: (tile.col + tile.row) * 0.04 
            }}
            className="w-full h-full relative"
            style={{
              background: bgStyle,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(tile.col / (cols - 1)) * 100}% ${(tile.row / (rows - 1)) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
