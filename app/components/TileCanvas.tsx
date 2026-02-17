"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- Scroll-driven tile-placement shader ---------- */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    // Parallax shift
    vec2 uv = vUv;
    uv.y += uScroll * 0.2; // Move background up slowly as we scroll down

    float aspect = uResolution.x / uResolution.y;
    vec2 st = vec2(uv.x * aspect, uv.y);

    float tileSize = 0.07;
    float gap = 0.005;
    float cs = tileSize + gap;
    vec2 grid = st / cs;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;

    float cols = floor(aspect / cs);
    float rows = floor(1.0 / cs);
    float total = cols * rows;

    float rnd = hash(cell);
    float idx = cell.x + cell.y * cols;
    // Make tiles appear to be "placed" from top-left to bottom-right based on scroll
    // Invert Y so 0 is top
    float invertedY = 1.0 - cell.y / rows;
    float normalizedIdx = (cell.x / cols + invertedY) / 2.0;
    
    // Create a "wave" of placement that follows scroll
    // uScroll (0..1) maps to the normalized index range
    float scroll = clamp(uScroll, 0.0, 1.0);
    
    // Add some noise/randomness to the placement frontier
    float noise = hash(cell) * 0.15;
    
    // Calculate placement progress for this specific tile
    // When scroll is 0, only top-left might be visible. As scroll increases, more tiles appear.
    // Factor is 0 (not placed) to 1 (placed)
    float placeProgress = smoothstep(normalizedIdx - 0.1 + noise, normalizedIdx + noise, scroll * 1.2);

    float d = roundedBox(local, vec2(0.46), 0.05);

    // Scale effect: Tiles scale up from 0.5 to 1.0 as they are placed
    vec2 sl = local / mix(0.5, 1.0, placeProgress);
    float ds = roundedBox(sl, vec2(0.46), 0.05);
    
    // Tile visibility
    float tile = (1.0 - smoothstep(0.0, 0.015, ds)) * placeProgress;

    // ... Calculate Base Color ...
    float h = hash(cell + 0.5);
    float w = sin(cell.x * 0.3 + cell.y * 0.4 + uTime * 0.4) * 0.5 + 0.5;

    vec3 c1 = vec3(0.94, 0.94, 0.96); // Slate 50ish
    vec3 c2 = vec3(0.85, 0.88, 0.92); // Slate 200ish
    vec3 c3 = vec3(0.08, 0.60, 0.55); // Teal 600
    vec3 c4 = vec3(0.15, 0.25, 0.35); // Slate 700ish

    vec3 base = mix(c1, c2, h);
    base = mix(base, mix(c3, c4, w), h * 0.15 + 0.03);

    vec2 mu = vec2(uMouse.x * aspect, uMouse.y);
    float glow = smoothstep(0.4, 0.0, length(st - mu)) * 0.5;
    base = mix(base, c3, glow * 0.4);

    float bevel = smoothstep(0.02, 0.0, d) * 0.15;
    base += bevel * vec3(1.0, 0.95, 0.9);

    vec3 grout = vec3(0.72, 0.70, 0.67);
    vec3 col = mix(grout, base, tile);

    float vig = smoothstep(1.6, 0.3, length(uv - 0.5) * 1.8);
    col *= 0.85 + vig * 0.15;

    float alpha = tile * (0.25 + glow * 0.35) + 0.02;
    // Fade alpha based on placement too
    alpha *= placeProgress;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* -- Fullscreen quad -- */
function TilePlane({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const scrollRef = useRef(0);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  const handlePointerMove = useCallback(
    (e: { uv?: THREE.Vector2 }) => {
      if (e.uv) mouse.current.copy(e.uv);
    },
    []
  );

  useFrame(({ clock, size }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uScroll.value +=
      (scrollRef.current - uniforms.uScroll.value) * 0.06;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uMouse.value.lerp(mouse.current, 0.05);
  });

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove} scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* -- Exported component with scroll tracking -- */
export default function TileCanvas() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? window.scrollY / docH : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="three-canvas-container" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ pointerEvents: "auto" }}
      >
        <TilePlane scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
