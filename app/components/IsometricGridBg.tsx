"use client";

import { useCallback, useRef } from "react";
import { playTileNote, PENTATONIC_FREQS } from "../lib/tileAudio";

const COLS = 42;
const ROWS = 45;
const TILE_W = 54;
const TILE_H = 72;
const GAP = 1;

const BASE_BG = "rgba(220, 235, 233, 0.06)";
const BASE_BORDER = "1px solid rgba(20, 184, 166, 0.14)";
const HOVER_BG = "rgba(45, 212, 191, 0.28)";
const HOVER_SHADOW = "0 0 22px rgba(20,184,166,0.38), inset 0 0 10px rgba(45,212,191,0.18)";
const CLICK_BG = "rgba(94, 234, 212, 0.55)";
const CLICK_SHADOW = "0 0 36px rgba(94,234,212,0.7), inset 0 0 16px rgba(45,212,191,0.4)";
const FADE_DELAY = 750;

/** Return per-row bg & border that fade out toward the bottom when fadeBottom is on */
function rowStyles(row: number, totalRows: number, fade: boolean) {
  if (!fade) return { bg: BASE_BG, border: BASE_BORDER };
  // progress: 0 at top → 1 at bottom
  const p = row / (totalRows - 1);
  // start fading at 40% — tiles simply become transparent against the dark bg
  const t = Math.max(0, (p - 0.4) / 0.6);            // 0→1 over bottom 60%
  const eased = t * t;                                // ease-in-quad — smooth
  const bgA  = 0.07 * (1 - eased);                    // opacity fades out
  const bdrA = 0.14 * (1 - eased);                    // border fades out
  return {
    bg: `rgba(20, 184, 166, ${bgA.toFixed(4)})`,
    border: `1px solid rgba(20, 184, 166, ${bdrA.toFixed(4)})`,
  };
}

function colFreq(col: number): number {
  return PENTATONIC_FREQS[col % PENTATONIC_FREQS.length];
}

export default function IsometricGridBg({
  className = "",
  onTileSound,
  decorative = false,
  fadeBottom = false,
}: {
  className?: string;
  onTileSound?: (freq: number) => void;
  /** If true, tiles are non-interactive (used as section backgrounds) */
  decorative?: boolean;
  /** If true, tiles fade out at the bottom via CSS mask */
  fadeBottom?: boolean;
}) {
  const tileRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const onEnter = useCallback((i: number) => {
    const t = hoverTimers.current.get(i);
    if (t) { clearTimeout(t); hoverTimers.current.delete(i); }
    const el = tileRefs.current[i];
    if (!el) return;
    el.style.backgroundColor = HOVER_BG;
    el.style.boxShadow = HOVER_SHADOW;
  }, []);

  const onLeave = useCallback((i: number) => {
    const id = setTimeout(() => {
      const el = tileRefs.current[i];
      if (el) { el.style.backgroundColor = BASE_BG; el.style.boxShadow = "none"; }
      hoverTimers.current.delete(i);
    }, FADE_DELAY);
    hoverTimers.current.set(i, id);
  }, []);

  const onClick = useCallback((i: number) => {
    const freq = colFreq(i % COLS);
    playTileNote(freq);
    onTileSound?.(freq);
    const el = tileRefs.current[i];
    if (!el) return;
    el.style.backgroundColor = CLICK_BG;
    el.style.boxShadow = CLICK_SHADOW;
    el.style.transform = "scale(0.96)";
    setTimeout(() => { const e = tileRefs.current[i]; if (e) e.style.transform = ""; }, 130);
  }, [onTileSound]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${decorative ? "pointer-events-none" : ""} ${className}`}
      aria-hidden="true"
      style={fadeBottom ? {
        maskImage: "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.06) 82%, transparent 92%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.06) 82%, transparent 92%)",
      } : undefined}
    >
      <div
        style={{
          position: "absolute",
          inset: "-32%",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${TILE_W}px)`,
          gap: `${GAP}px`,
          transform: "perspective(900px) rotateX(55deg) rotateZ(30deg) scale(2.2)",
          transformOrigin: "50% 40%",
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const row = Math.floor(i / COLS);
          const rs = rowStyles(row, ROWS, fadeBottom);
          return (
            <div
              key={i}
              ref={(el) => { tileRefs.current[i] = el; }}
              {...(!decorative && {
                onMouseEnter: () => onEnter(i),
                onMouseLeave: () => onLeave(i),
                onClick: () => onClick(i),
              })}
              style={{
                height: TILE_H,
                backgroundColor: rs.bg,
                border: rs.border,
                borderRadius: 3,
                cursor: decorative ? "default" : "pointer",
                transition: "background-color 0.12s ease, box-shadow 0.85s ease, transform 0.13s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
