"use client";

import { useRef } from "react";

interface ReflexCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees (default 14) */
  maxTilt?: number;
  /** Scale on hover (default 1.03) */
  hoverScale?: number;
}

/**
 * ReflexCard — 3-D perspective tilt + prismatic light-glare effect.
 * Tracks the cursor and transforms the card with rotateX/Y + a moving
 * radial-gradient glare overlay, recreating the "Reflex Card" effect.
 */
export default function ReflexCard({
  children,
  className = "",
  maxTilt = 14,
  hoverScale = 1.03,
}: ReflexCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const shine = shineRef.current;
    if (!card || !glare || !shine) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Normalised -1..1
    const nx = (x - cx) / cx;
    const ny = (y - cy) / cy;

    const rotateY = nx * maxTilt;
    const rotateX = -ny * (maxTilt * 0.75);

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${hoverScale},${hoverScale},${hoverScale})`;

    // Glare — bright spot that follows cursor
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    glare.style.opacity = "1";
    glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)`;

    // Prismatic / iridescent shimmer that shifts with tilt angle
    const angle = Math.atan2(ny, nx) * (180 / Math.PI) + 90;
    shine.style.opacity = "1";
    shine.style.background = `linear-gradient(${angle}deg,
      rgba(255,0,128,0.04) 0%,
      rgba(255,165,0,0.06) 20%,
      rgba(0,255,200,0.07) 40%,
      rgba(100,120,255,0.06) 60%,
      rgba(255,0,200,0.04) 80%,
      transparent 100%)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const shine = shineRef.current;
    if (card)  card.style.transform  = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    if (glare) glare.style.opacity   = "0";
    if (shine) shine.style.opacity   = "0";
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
        style={{ opacity: 0, transition: "opacity 0.25s ease" }}
      />
      {/* Prismatic shimmer */}
      <div
        ref={shineRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-screen"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />
      {children}
    </div>
  );
}
