"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface RadiusScrollSectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: "teal" | "beige" | "white" | "slate";
  /** Starting border radius in pixels (when section enters viewport) */
  startRadius?: number;
  /** Ending border radius in pixels (when section is centered) */
  endRadius?: number;
  /** Add horizontal margin/padding for the tile effect */
  withMargin?: boolean;
}

const bgColorMap = {
  teal:  "bg-teal-50",
  beige: "bg-amber-50/80",
  white: "bg-white",
  slate: "bg-slate-800",
};

export default function RadiusScrollSection({
  children,
  className = "",
  bgColor = "white",
  startRadius = 48,
  endRadius = 0,
  withMargin = true,
}: RadiusScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Trigger animation from when section enters bottom to when it reaches center
    offset: ["start end", "start 0.3"],
  });

  // Animate border radius from startRadius to endRadius
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [startRadius, endRadius]
  );

  // Animate horizontal margin for "tile floating in" effect
  const marginX = useTransform(
    scrollYProgress,
    [0, 1],
    withMargin ? [32, 0] : [0, 0]
  );

  // Subtle scale animation
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.96, 1]
  );

  // Shadow opacity for depth effect
  const shadowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.15, 0.08, 0]
  );

  const boxShadow = useTransform(
    shadowOpacity,
    (opacity) => `0 25px 50px -12px rgba(0, 0, 0, ${opacity})`
  );

  return (
    <div ref={containerRef} className="relative py-4">
      <motion.div
        style={{
          borderRadius,
          marginLeft: marginX,
          marginRight: marginX,
          scale,
          boxShadow,
        }}
        className={`overflow-hidden ${bgColorMap[bgColor]} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
