"use client";

import React, { useEffect, useRef } from "react";

interface CursorGlowProps {
  size?: number; // 250 - 350px
  className?: string;
}

export function CursorGlow({ size = 300, className = "" }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    currentX: -1000,
    currentY: -1000,
    targetX: -1000,
    targetY: -1000,
  });
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch device or reduced motion
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const glowEl = glowRef.current;
    if (!glowEl) return;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const updatePosition = () => {
      const pos = posRef.current;
      // Smooth linear interpolation for liquid-like delayed tracking
      pos.currentX = lerp(pos.currentX, pos.targetX, 0.12);
      pos.currentY = lerp(pos.currentY, pos.targetY, 0.12);

      if (glowEl) {
        const x = pos.currentX - size / 2;
        const y = pos.currentY - size / 2;
        glowEl.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

        if (isVisibleRef.current && glowEl.style.opacity !== "1") {
          glowEl.style.opacity = "1";
        }
      }

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        posRef.current.currentX = e.clientX;
        posRef.current.currentY = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (glowEl) {
        glowEl.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (glowEl) {
        glowEl.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    rafIdRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [size]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-10 will-change-transform opacity-0 transition-opacity duration-300 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at center, rgba(139, 92, 246, 0.28) 0%, rgba(99, 102, 241, 0.18) 45%, rgba(139, 92, 246, 0.05) 70%, transparent 100%)",
        filter: "blur(40px)",
      }}
    />
  );
}

export default CursorGlow;
