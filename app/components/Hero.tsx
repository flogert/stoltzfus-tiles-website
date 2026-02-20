"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import IsometricGridBg from "./IsometricGridBg";
import OriginButton from "./OriginButton";
import { playTileNote } from "../lib/tileAudio";

// Simpler fade-in for hero text (removed dramatic rotateX)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              custom={i * 0.2 + j * 0.03}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  // ── Tile piano player ────────────────────────────────────────────────────
  type UIState = "idle" | "recording" | "playing";
  const [uiState, setUiState]   = useState<UIState>("idle");
  const [noteCount, setNoteCount] = useState(0);
  const notesRef        = useRef<{ freq: number; at: number }[]>([]);
  const recStartRef     = useRef(0);
  const isRecordingRef  = useRef(false);
  const playTimersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleTileSound = useCallback((freq: number) => {
    if (!isRecordingRef.current) return;
    notesRef.current.push({ freq, at: Date.now() - recStartRef.current });
    setNoteCount((n) => n + 1);
  }, []);

  const startRecording = useCallback(() => {
    notesRef.current = []; setNoteCount(0);
    recStartRef.current = Date.now();
    isRecordingRef.current = true;
    setUiState("recording");
  }, []);

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    setUiState("idle");
  }, []);

  const stopPlayback = useCallback(() => {
    playTimersRef.current.forEach(clearTimeout);
    playTimersRef.current = [];
    setUiState("idle");
  }, []);

  const playBack = useCallback(() => {
    const notes = notesRef.current;
    if (!notes.length) return;
    setUiState("playing");
    const ts: ReturnType<typeof setTimeout>[] = [];
    notes.forEach(({ freq, at }) => ts.push(setTimeout(() => playTileNote(freq), at)));
    const last = notes[notes.length - 1].at;
    ts.push(setTimeout(() => setUiState("idle"), last + 600));
    playTimersRef.current = ts;
  }, []);

  const clearNotes = useCallback(() => {
    playTimersRef.current.forEach(clearTimeout);
    isRecordingRef.current = false;
    notesRef.current = []; setNoteCount(0);
    setUiState("idle");
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#0f4c46_0%,#0d2d39_40%,#0b1e2d_100%)]"
      aria-label="Introduction"
    >
      {/* Isometric 3D tile grid — hover-reactive, fades at bottom */}
      <IsometricGridBg className="z-[1]" onTileSound={handleTileSound} fadeBottom />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,rgba(10,20,28,0.50)_100%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >

          <h1 className="mt-2 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <AnimatedText text="Stoltzfus Custom Tile" className="block" />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="mt-3 block bg-linear-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent text-xl sm:text-2xl font-semibold tracking-normal"
            >
              Tilework That Feels Like Home
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Beautiful tile for kitchens, showers, and floors — crafted clean and built to last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <OriginButton
              href="#contact"
              className="group inline-flex items-center rounded-xl bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-teal-600/20"
              overlayClassName="bg-teal-500"
            >
              Get a Free Estimate
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </OriginButton>
            <OriginButton
              href="#services"
              className="inline-flex items-center rounded-xl border-2 border-teal-400/50 bg-white/10 px-7 py-3.5 text-sm font-semibold text-teal-200 backdrop-blur-sm"
              overlayClassName="bg-teal-400/20"
            >
              View Our Services
            </OriginButton>
          </motion.div>

        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 sm:text-sm"
        >
          {[
            "Design-Forward Finishes",
            "Precision Installations",
            "Family-Friendly Durability",
            "Free Estimates",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-teal-600"
                aria-hidden="true"
              />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Tile Piano Player — hidden on mobile, slim on desktop */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 top-24 z-20 hidden sm:block sm:left-7"
      >
        <div className="rounded-xl border border-teal-500/20 bg-slate-900/80 px-2 py-1.5 backdrop-blur-md">
          {/* controls row — icons only */}
          <div className="flex items-center gap-1">
            {/* record / stop recording */}
            <button
              onClick={uiState === "recording" ? stopRecording : startRecording}
              disabled={uiState === "playing"}
              title={uiState === "recording" ? "Stop recording" : "Record"}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-colors hover:bg-white/10 disabled:opacity-25"
            >
              {uiState === "recording"
                ? <span className="inline-block h-2 w-2 animate-pulse rounded-sm bg-red-400" />
                : <span className="inline-block h-2 w-2 rounded-full border-2 border-red-400" />}
            </button>

            {/* play / stop playback */}
            <button
              onClick={uiState === "playing" ? stopPlayback : playBack}
              disabled={noteCount === 0 || uiState === "recording"}
              title={uiState === "playing" ? "Stop" : "Play back"}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-colors hover:bg-white/10 disabled:opacity-25"
            >
              {uiState === "playing"
                ? (<svg className="h-2.5 w-2.5 text-teal-300" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="4" height="10" rx="1"/><rect x="9" y="3" width="4" height="10" rx="1"/></svg>)
                : (<svg className="h-2.5 w-2.5 text-teal-300" viewBox="0 0 16 16" fill="currentColor"><path d="M4 3l10 5-10 5V3z"/></svg>)}
            </button>

            {/* clear */}
            <button
              onClick={clearNotes}
              disabled={noteCount === 0}
              title="Clear"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-colors hover:bg-white/10 disabled:opacity-25"
            >
              <svg className="h-2.5 w-2.5 text-slate-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
