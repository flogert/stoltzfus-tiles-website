"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function HeroGrid() {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGrid = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const size = 50; // Size of each grid item
      const cols = Math.ceil(clientWidth / size);
      const rowCount = Math.ceil(clientHeight / size);
      setColumns(cols);
      setRows(rowCount);
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  // Create an array for the grid cells
  const tiles = Array.from({ length: columns * rows }, (_, i) => i);

  return (
    <div 
        ref={containerRef} 
        className="absolute inset-0 -z-10 overflow-hidden bg-slate-50"
        aria-hidden="true"
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {tiles.map((id) => (
          <GridTile key={id} />
        ))}
      </div>
    </div>
  );
}

const GridTile = () => {
  const controls = useAnimation();

  // "Trail" effect logic:
  // When mouse enters: Snap to active state immediately.
  // When mouse leaves: Slowly fade back to base state.
  return (
    <motion.div
      onMouseEnter={() => {
        controls.start({
          backgroundColor: "#0d9488", // Teal-600
          opacity: 0.5,
          scale: 0.95,
          transition: { duration: 0 } // Instant
        });
      }}
      onMouseLeave={() => {
        controls.start({
          backgroundColor: "transparent",
          opacity: 0.1, // Keep a faint border or grid visible? Or fully transparent?
          scale: 1,
          transition: { duration: 1.5, ease: "easeOut" } // Slow fade out = trail
        });
      }}
      animate={controls}
      className="relative border-[0.5px] border-slate-200/60"
      initial={{ backgroundColor: "transparent", opacity: 0.1 }}
    />
  );
};
