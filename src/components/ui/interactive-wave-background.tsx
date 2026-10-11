"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/theme-provider";

interface NodePoint {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  isNexus: boolean;
  nexusRadius: number;
  phase: number;
}

interface DustParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  phase: number;
}

export function InteractiveWaveBackground() {
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

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse tracking with smooth lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
      active: false,
      speed: 0,
      lastX: 0,
      lastY: 0,
    };

    // Mesh configuration
    const COLS = 32;
    const ROWS = 10;
    const grid: NodePoint[][] = [];
    const dustParticles: DustParticle[] = [];
    const DUST_COUNT = 38;

    // Animation time tracker
    let time = 0;

    // Resize handler
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

      initGrid();
    };

    // Initialize 3D mesh points
    const initGrid = () => {
      grid.length = 0;
      const xSpacing = (width * 1.3) / (COLS - 1);
      const startX = -width * 0.15;
      const centerY = height * 0.58;

      for (let r = 0; r < ROWS; r++) {
        const rowNodes: NodePoint[] = [];
        // Depth coordinate: rows fan out in depth (z from -120 to +180)
        const z = (r / (ROWS - 1) - 0.5) * 320;
        const rowBaseY = centerY + (r - ROWS / 2) * 26;

        for (let c = 0; c < COLS; c++) {
          const x = startX + c * xSpacing;
          // Pick selected vertices to be glowing nexus points
          const isNexus =
            (c % 6 === 2 && r % 3 === 1) ||
            (c % 7 === 4 && r % 4 === 2) ||
            (c === 14 && r === 4) ||
            (c === 20 && r === 6);

          rowNodes.push({
            baseX: x,
            baseY: rowBaseY,
            baseZ: z,
            x: x,
            y: rowBaseY,
            z: z,
            vx: 0,
            vy: 0,
            isNexus,
            nexusRadius: isNexus ? 3.5 + Math.random() * 2.5 : 1.5,
            phase: c * 0.22 + r * 0.35,
          });
        }
        grid.push(rowNodes);
      }

      // Initialize ambient dust particles
      dustParticles.length = 0;
      for (let i = 0; i < DUST_COUNT; i++) {
        const baseAlpha = 0.25 + Math.random() * 0.55;
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1 + Math.random() * 2.2,
          alpha: baseAlpha,
          baseAlpha,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.15 - Math.random() * 0.3,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Mouse movement event
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    // Main animation loop
    const render = () => {
      time += 0.016;

      // Smooth mouse position lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      mouse.speed *= 0.94; // Decay velocity

      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === "dark";

      // 1. Subtle deep cyber background glow (vignette at the bottom horizon)
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.72,
        40,
        width * 0.5,
        height * 0.7,
        width * 0.75
      );
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(6, 182, 212, 0.12)");
        bgGrad.addColorStop(0.45, "rgba(8, 70, 95, 0.06)");
        bgGrad.addColorStop(1, "rgba(7, 8, 13, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(6, 182, 212, 0.07)");
        bgGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
        bgGrad.addColorStop(1, "rgba(248, 250, 252, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Cursor dynamic ambient illumination
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        if (isDark) {
          mouseGlow.addColorStop(0, "rgba(6, 235, 255, 0.18)");
          mouseGlow.addColorStop(0.4, "rgba(14, 165, 233, 0.08)");
          mouseGlow.addColorStop(1, "rgba(6, 182, 212, 0)");
        } else {
          mouseGlow.addColorStop(0, "rgba(6, 182, 212, 0.12)");
          mouseGlow.addColorStop(0.45, "rgba(37, 99, 235, 0.05)");
          mouseGlow.addColorStop(1, "rgba(6, 182, 212, 0)");
        }
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Update grid vertex positions based on multi-frequency sine waves & cursor reaction
      const fov = 420;
      const cameraZ = 280;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const node = grid[r][c];

          // Compound sinusoidal undulating wave matching the reference topology
          const wave1 = Math.sin(node.phase + time * 1.3) * 36;
          const wave2 = Math.cos(c * 0.35 - time * 0.85) * 18;
          const wave3 = Math.sin(node.baseX * 0.0035 + r * 0.45 + time * 1.1) * 22;

          let targetY = node.baseY + wave1 + wave2 + wave3;
          let targetX = node.baseX + Math.sin(node.phase + time * 0.7) * 8;
          const targetZ = node.baseZ + Math.cos(node.phase + time * 0.9) * 24;

          // Cursor interactive displacement & elastic spring repulsion
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && mouse.active) {
            const force = (1 - dist / mouse.radius) * 45;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force * 1.25;
          }

          // Damped spring interpolation for smooth inertia
          node.x += (targetX - node.x) * 0.1;
          node.y += (targetY - node.y) * 0.1;
          node.z += (targetZ - node.z) * 0.1;
        }
      }

      // 4. Render interconnected plexus wireframe lines
      const lineColor1 = isDark
        ? "rgba(6, 182, 212," // Cyan
        : "rgba(8, 145, 178,";
      const lineColor2 = isDark
        ? "rgba(59, 130, 246," // Blue
        : "rgba(37, 99, 235,";

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const current = grid[r][c];

          // Connect horizontally along the wave ribbon
          if (c < COLS - 1) {
            const right = grid[r][c + 1];
            drawConnection(current, right, lineColor1, isDark);
          }

          // Connect vertically across depth layers
          if (r < ROWS - 1) {
            const down = grid[r + 1][c];
            drawConnection(current, down, lineColor2, isDark);
          }

          // Connect cross-diagonal web lines for rich triangular mesh topology
          if (r < ROWS - 1 && c < COLS - 1 && (r + c) % 2 === 0) {
            const diag = grid[r + 1][c + 1];
            drawConnection(current, diag, lineColor1, isDark, 0.65);
          }
        }
      }

      // 5. Render nodes and glowing nexus hubs
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const node = grid[r][c];

          // Proximity to mouse increases glow
          const distToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          const mouseBonus =
            mouse.active && distToMouse < 180
              ? (1 - distToMouse / 180) * 1.5
              : 0;

          if (node.isNexus) {
            // Radiant starburst nexus hub
            const radius = (node.nexusRadius + mouseBonus * 2.5);
            const haloRadius = radius * 4.5;

            const radial = ctx.createRadialGradient(
              node.x,
              node.y,
              0,
              node.x,
              node.y,
              haloRadius
            );

            if (isDark) {
              radial.addColorStop(0, "rgba(224, 253, 255, 0.95)");
              radial.addColorStop(0.25, "rgba(6, 235, 255, 0.65)");
              radial.addColorStop(0.6, "rgba(6, 182, 212, 0.2)");
              radial.addColorStop(1, "rgba(6, 182, 212, 0)");
            } else {
              radial.addColorStop(0, "rgba(6, 182, 212, 0.9)");
              radial.addColorStop(0.3, "rgba(14, 165, 233, 0.5)");
              radial.addColorStop(0.7, "rgba(37, 99, 235, 0.15)");
              radial.addColorStop(1, "rgba(37, 99, 235, 0)");
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
            ctx.fillStyle = radial;
            ctx.fill();

            // Bright core point
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? "#ffffff" : "#0284c7";
            ctx.shadowBlur = isDark ? 10 : 4;
            ctx.shadowColor = isDark ? "rgba(6, 235, 255, 0.9)" : "rgba(6, 182, 212, 0.6)";
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if ((r + c) % 3 === 0 || mouseBonus > 0.4) {
            // Minor intersection node point
            const nodeRadius = 1.2 + mouseBonus * 1.2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(6, 235, 255, ${0.45 + mouseBonus * 0.4})`
              : `rgba(8, 145, 178, ${0.4 + mouseBonus * 0.4})`;
            ctx.fill();
          }
        }
      }

      // 6. Render floating ambient stardust particles
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        // Wrap boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const pulse = 0.6 + Math.sin(p.phase) * 0.4;
        const alpha = p.baseAlpha * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(34, 211, 238, ${alpha.toFixed(3)})`
          : `rgba(8, 145, 178, ${(alpha * 0.75).toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Helper to draw connecting line with depth/proximity opacity
    const drawConnection = (
      p1: NodePoint,
      p2: NodePoint,
      baseColorPrefix: string,
      isDark: boolean,
      alphaMultiplier = 1.0
    ) => {
      const avgZ = (p1.z + p2.z) * 0.5;
      // Closer in depth = more opaque (depth from -160 to 160)
      const depthAlpha = Math.max(0.12, Math.min(0.65, (avgZ + 180) / 360));

      // Cursor proximity makes lines glow brighter
      const midX = (p1.x + p2.x) * 0.5;
      const midY = (p1.y + p2.y) * 0.5;
      const dist = Math.hypot(midX - mouse.x, midY - mouse.y);
      const mouseBoost =
        mouse.active && dist < 170 ? (1 - dist / 170) * 0.55 : 0;

      const finalAlpha = Math.min(
        0.95,
        (depthAlpha * (isDark ? 0.45 : 0.28) + mouseBoost) * alphaMultiplier
      );

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `${baseColorPrefix} ${finalAlpha.toFixed(3)})`;
      ctx.lineWidth = mouseBoost > 0.2 ? 1.4 : 0.85;
      ctx.stroke();
    };

    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Initial setup
    handleResize();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 block"
    />
  );
}

export default InteractiveWaveBackground;
