"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/theme-provider";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Tetrahedron {
  baseX: number; // Normalized -1 to 1 across screen width
  offsetY: number; // Vertical offset from ribbon center
  offsetZ: number; // Depth offset
  size: number;
  phase: number;
  driftSpeed: number;
  rot: Vec3;
  rotSpeed: Vec3;
  colorBase: [number, number, number];
  isShard: boolean;
}

interface RenderFace {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  depth: number;
  color: string;
  strokeColor: string;
}

export function LiveGeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    // Fixed directional light source in 3D space (coming from top-left-front)
    const lightDir: Vec3 = normalize({ x: -0.45, y: -0.65, z: -0.6 });

    // Tetrahedral geometry definition
    const localVerts: Vec3[] = [
      { x: 0, y: -1.15, z: 0 }, // Apex
      { x: 1.0, y: 0.65, z: 0.8 }, // Base 1
      { x: -1.0, y: 0.65, z: 0.8 }, // Base 2
      { x: 0, y: 0.65, z: -1.1 }, // Base 3
    ];

    const faceDefs: [number, number, number][] = [
      [0, 1, 2], // Front face
      [0, 2, 3], // Left face
      [0, 3, 1], // Right face
      [1, 3, 2], // Base face
    ];

    // Array of crystals
    const crystals: Tetrahedron[] = [];
    const CRYSTAL_COUNT = 95;

    // Palette shades matching Image 1: vibrant cobalt, cyan, sapphire, ice blue
    const colorPalettes: [number, number, number][] = [
      [24, 119, 212], // Classic bright cerulean
      [0, 162, 237],  // Sky cyan blue
      [14, 88, 168],  // Deep royal blue
      [56, 182, 255], // Electric cyan
      [10, 60, 130],  // Dark sapphire
      [70, 150, 230], // Steel ice blue
      [100, 205, 255] // Pale highlight blue
    ];

    const initCrystals = () => {
      crystals.length = 0;

      for (let i = 0; i < CRYSTAL_COUNT; i++) {
        // Distribute crystals along the horizontal ribbon
        // Higher density in the middle
        const u = (i / (CRYSTAL_COUNT - 1)) * 2 - 1; // -1 to 1
        const spread = (Math.random() - 0.5) * 0.25;
        const normX = Math.max(-1.15, Math.min(1.15, u + spread));

        // Gaussian-like cluster dispersion from ribbon center
        const radSpread = Math.pow(Math.random(), 1.6);
        const angleSpread = Math.random() * Math.PI * 2;
        const distY = Math.sin(angleSpread) * radSpread * 140;
        const distZ = Math.cos(angleSpread) * radSpread * 160;

        // Size distribution: majority medium/small shards with prominent hero crystals
        let size = 10 + Math.random() * 18;
        if (Math.random() < 0.2) size = 26 + Math.random() * 22; // Hero crystals
        if (Math.random() < 0.3) size = 5 + Math.random() * 7;   // Small shards

        const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

        crystals.push({
          baseX: normX,
          offsetY: distY,
          offsetZ: distZ,
          size,
          phase: Math.random() * Math.PI * 2,
          driftSpeed: 0.0003 + Math.random() * 0.0004,
          rot: {
            x: Math.random() * Math.PI * 2,
            y: Math.random() * Math.PI * 2,
            z: Math.random() * Math.PI * 2,
          },
          rotSpeed: {
            x: (Math.random() - 0.5) * 0.012,
            y: (Math.random() - 0.5) * 0.015,
            z: (Math.random() - 0.5) * 0.01,
          },
          colorBase: palette,
          isShard: size < 10,
        });
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    // Vector helper functions
    function normalize(v: Vec3): Vec3 {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    }

    function dot(a: Vec3, b: Vec3): number {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    function cross(a: Vec3, b: Vec3): Vec3 {
      return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
      };
    }

    // 3D rotation transform
    function rotatePoint(p: Vec3, rot: Vec3): Vec3 {
      // Rotation around X
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.y * sinX + p.z * cosX;

      // Rotation around Y
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);
      const x2 = p.x * cosY + z1 * sinY;
      const z2 = -p.x * sinY + z1 * cosY;

      // Rotation around Z
      const cosZ = Math.cos(rot.z);
      const sinZ = Math.sin(rot.z);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { x: x3, y: y3, z: z2 };
    }

    // Main render loop
    const render = () => {
      time += 0.014;

      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === "dark";

      // 1. Soft atmospheric background wash
      // Subtle ice-blue ambient mist echoing reference image
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        50,
        width * 0.5,
        height * 0.48,
        width * 0.85
      );
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(14, 76, 130, 0.18)");
        bgGrad.addColorStop(0.5, "rgba(7, 30, 56, 0.08)");
        bgGrad.addColorStop(1, "rgba(5, 8, 15, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(180, 215, 240, 0.35)");
        bgGrad.addColorStop(0.5, "rgba(200, 225, 245, 0.15)");
        bgGrad.addColorStop(1, "rgba(240, 246, 252, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Camera parameters
      const fov = 480;
      const cameraZ = 340;
      const centerY = height * 0.46;

      const renderQueue: RenderFace[] = [];

      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];

        // Autonomous rotation (no cursor interaction)
        c.rot.x += c.rotSpeed.x;
        c.rot.y += c.rotSpeed.y;
        c.rot.z += c.rotSpeed.z;

        // Autonomous subtle horizontal drift along ribbon
        c.baseX += c.driftSpeed;
        if (c.baseX > 1.25) c.baseX = -1.25;

        // Calculate world 3D position based on sweeping wave curve
        const worldX = c.baseX * (width * 0.62);

        // Sinusoidal ribbon wave equations
        const wave1 = Math.sin(c.baseX * 2.8 + time * 0.6) * 75;
        const wave2 = Math.cos(c.baseX * 1.5 - time * 0.4) * 35;
        const waveBob = Math.sin(c.phase + time * 0.9) * 14;

        const worldY = centerY + c.offsetY + wave1 + wave2 + waveBob;
        const worldZ = c.offsetZ + Math.cos(c.baseX * 2.2 + time * 0.5) * 45;

        // Distance / perspective factor
        const depth = cameraZ + worldZ;
        if (depth <= 20) continue;
        const scale = fov / depth;

        // Project and rotate all vertices of this tetrahedron
        const transformedVerts: Vec3[] = [];
        const projectedVerts: { x: number; y: number }[] = [];

        for (let v = 0; v < localVerts.length; v++) {
          const lv = localVerts[v];
          // Scale by crystal size
          const scaled: Vec3 = {
            x: lv.x * c.size,
            y: lv.y * c.size,
            z: lv.z * c.size,
          };
          // Rotate in 3D
          const rotated = rotatePoint(scaled, c.rot);
          // Translate to world space
          const world: Vec3 = {
            x: worldX + rotated.x,
            y: worldY + rotated.y,
            z: worldZ + rotated.z,
          };
          transformedVerts.push(world);

          // Project to 2D screen
          projectedVerts.push({
            x: width * 0.5 + world.x * scale,
            y: world.y, // Keep smooth vertical placement
          });
        }

        // Process each triangular face
        for (let f = 0; f < faceDefs.length; f++) {
          const [i0, i1, i2] = faceDefs[f];
          const v0 = transformedVerts[i0];
          const v1 = transformedVerts[i1];
          const v2 = transformedVerts[i2];

          // Face normal in 3D
          const edgeA = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
          const edgeB = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z };
          const norm = normalize(cross(edgeA, edgeB));

          // Facing towards camera check (back-face culling)
          // Camera vector from face center to camera at (0, centerY, -cameraZ)
          const faceCenterX = (v0.x + v1.x + v2.x) / 3;
          const faceCenterY = (v0.y + v1.y + v2.y) / 3;
          const faceCenterZ = (v0.z + v1.z + v2.z) / 3;

          const viewVec = normalize({
            x: -faceCenterX,
            y: centerY - faceCenterY,
            z: -(cameraZ + faceCenterZ),
          });

          // Only draw faces angled towards view
          if (dot(norm, viewVec) > 0.15) {
            continue;
          }

          // Shading calculation with light source
          const lightIntensity = Math.max(0, -dot(norm, lightDir)); // 0 to 1
          const specular = Math.pow(Math.max(0, -dot(norm, lightDir)), 8) * 0.45;

          // Compute color based on facet orientation & lighting
          const [rBase, gBase, bBase] = c.colorBase;

          // Shadow / ambient term
          const ambient = isDark ? 0.25 : 0.42;
          const totalLight = Math.min(1.0, ambient + lightIntensity * 0.75 + specular);

          // Mix into final color
          let r = Math.round(rBase * totalLight + specular * 180);
          let g = Math.round(gBase * totalLight + specular * 220);
          let b = Math.round(bBase * totalLight + specular * 255);

          r = Math.min(255, Math.max(0, r));
          g = Math.min(255, Math.max(0, g));
          b = Math.min(255, Math.max(0, b));

          // Depth fog / transparency
          const depthAlpha = Math.min(
            0.92,
            Math.max(0.35, 1.0 - (faceCenterZ + 120) / 450)
          );
          const alpha = isDark ? depthAlpha * 0.88 : depthAlpha * 0.82;

          const fillColor = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          // Crisp facet border
          const strokeAlpha = (alpha * 0.55).toFixed(3);
          const strokeColor = isDark
            ? `rgba(160, 230, 255, ${strokeAlpha})`
            : `rgba(255, 255, 255, ${strokeAlpha})`;

          renderQueue.push({
            p0: projectedVerts[i0],
            p1: projectedVerts[i1],
            p2: projectedVerts[i2],
            depth: faceCenterZ,
            color: fillColor,
            strokeColor,
          });
        }
      }

      // Sort faces by depth (back to front painter's algorithm)
      renderQueue.sort((a, b) => b.depth - a.depth);

      // Draw all shaded faces
      for (let j = 0; j < renderQueue.length; j++) {
        const f = renderQueue[j];

        ctx.beginPath();
        ctx.moveTo(f.p0.x, f.p0.y);
        ctx.lineTo(f.p1.x, f.p1.y);
        ctx.lineTo(f.p2.x, f.p2.y);
        ctx.closePath();

        ctx.fillStyle = f.color;
        ctx.fill();

        ctx.strokeStyle = f.strokeColor;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    initCrystals();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* 
        Underlying atmospheric reference wallpaper layer:
        Blends with the live 3D geometric crystals for ultra-rich depth.
      */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/background-geometric.jpg')",
          filter: "blur(4px)",
          transform: "scale(1.04)",
        }}
      />
      {/* Soft gradient wash overlay ensuring perfect legibility of text content */}
      <div className="absolute inset-0 bg-background/70 dark:bg-background/80 transition-colors duration-500" />
      {/* Live 3D tetrahedral crystal wave canvas (strictly autonomous, no cursor reaction) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default LiveGeometricBackground;
