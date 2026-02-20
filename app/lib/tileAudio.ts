// C major pentatonic across 3 octaves — column 0 = lowest, column 29 = highest
export const PENTATONIC_FREQS = [
  130.81, 146.83, 164.81, 196.00, 220.00, // C3 D3 E3 G3 A3
  261.63, 293.66, 329.63, 392.00, 440.00, // C4 D4 E4 G4 A4
  523.25, 587.33, 659.25, 784.00, 880.00, // C5 D5 E5 G5 A5
];

let sharedCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
  }
  if (sharedCtx.state === "suspended") sharedCtx.resume();
  return sharedCtx;
}

/** Plays a layered tile tap at the given frequency (Hz). */
export function playTileNote(freq: number) {
  if (typeof window === "undefined") return;
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    // Fundamental — main note sustain
    const o1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    o1.type = "sine";
    o1.frequency.value = freq;
    g1.gain.setValueAtTime(0.042, now);
    g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    o1.connect(g1); g1.connect(ctx.destination);
    o1.start(now); o1.stop(now + 0.46);

    // Octave harmonic — warmth
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "sine";
    o2.frequency.value = freq * 2;
    g2.gain.setValueAtTime(0.014, now);
    g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    o2.connect(g2); g2.connect(ctx.destination);
    o2.start(now); o2.stop(now + 0.21);

    // Transient click — ceramic tap character
    const o3 = ctx.createOscillator();
    const g3 = ctx.createGain();
    o3.type = "sine";
    o3.frequency.setValueAtTime(freq * 7, now);
    o3.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.045);
    g3.gain.setValueAtTime(0.022, now);
    g3.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
    o3.connect(g3); g3.connect(ctx.destination);
    o3.start(now); o3.stop(now + 0.07);
  } catch {
    // AudioContext unavailable — silently ignore
  }
}
