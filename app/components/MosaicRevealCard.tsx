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
      onFocus={() => enableHover && setIsHovered(true)}
      onBlur={() => enableHover && setIsHovered(false)}
      onClick={() => !enableHover && setIsHovered(!isHovered)}
      tabIndex={0}
      role="button"
      aria-expanded={isHovered}
      aria-label={title ? `${title} — hover or focus to reveal details` : "Reveal details"}
    >
      {/* Content to Reveal (Background) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--card-bg-reveal)] to-[var(--surface-subtle)] flex flex-col items-center justify-center p-6 text-center h-full w-full">
        {revealTitle && (
          <div className="mb-3">
            <span className="inline-block w-8 h-0.5 bg-teal-500 mb-2"></span>
            <h3 className="text-xl font-bold text-[var(--foreground)]">{revealTitle}</h3>
          </div>
        )}
        <div className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-[90%]">
            {revealContent}
        </div>
        <span className="mt-4 inline-flex items-center text-xs font-medium text-teal-600 uppercase tracking-wider">
          Learn more
          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
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
            scale: 0.88, 
            filter: "blur(4px)",
            y: -14,
                transition: { 
              duration: 0.55,
                    // Simple diagonal wave
              delay: (tile.col + tile.row) * 0.03,
              ease: "easeInOut"
                }
            } : { 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)", 
                y: 0,
                transition: { 
              duration: 0.55, 
              delay: (rows + cols - (tile.col + tile.row)) * 0.02,
              ease: "easeInOut"
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
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="absolute inset-0 z-20 flex items-end justify-start pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        {title && (
          <div className="relative p-4">
            <span className="inline-block w-6 h-0.5 bg-teal-400 mb-2"></span>
            <h3 className="text-white text-lg md:text-xl font-bold tracking-wide drop-shadow-lg">
                {title}
            </h3>
          </div>
        )}
      </motion.div>
    </div>
  );
}
