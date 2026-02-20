"use client";

import { useRef } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Origin Button — cursor-aware hover fill.
 * The overlay expands from the cursor entry point and collapses
 * back to where the cursor exits, using spring-like easing.
 */
export default function OriginButton({
  href,
  children,
  className = "",
  overlayClassName = "bg-white/20",
  onClick,
}: Props) {
  const overlayRef = useRef<HTMLSpanElement>(null);

  const pos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { x, y } = pos(e);
    const el = overlayRef.current;
    if (!el) return;
    // Snap to scale-0 at entry origin without transition, then animate in
    el.style.transition = "none";
    el.style.transformOrigin = `${x}px ${y}px`;
    el.style.transform = "scale(0)";
    el.getBoundingClientRect(); // force reflow
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "scale(1)";
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { x, y } = pos(e);
    const el = overlayRef.current;
    if (!el) return;
    // Collapse back to where the cursor exits
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transformOrigin = `${x}px ${y}px`;
    el.style.transform = "scale(0)";
  };

  return (
    <a
      href={href}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* origin overlay — sits above bg, below content */}
      <span
        ref={overlayRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${overlayClassName}`}
        style={{ transform: "scale(0)", willChange: "transform" }}
      />
      {/* content sits above the overlay */}
      <span className="relative z-10 flex items-center">{children}</span>
    </a>
  );
}
