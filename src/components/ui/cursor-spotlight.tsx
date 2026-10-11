"use client";

import React, { useEffect, useRef } from "react";

interface CursorSpotlightProps {
  size?: number;
  className?: string;
}

export function CursorSpotlight({
  size = 650,
  className = "",
}: CursorSpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    currentX: -1000,
    currentY: -1000,
    targetX: -1000,
    targetY: -1000,
  });
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const spotlightEl = spotlightRef.current;
    if (!spotlightEl) return;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const updatePosition = () => {
      const pos = posRef.current;
      // Ultra-gentle ambient lag
      pos.currentX = lerp(pos.currentX, pos.targetX, 0.08);
      pos.currentY = lerp(pos.currentY, pos.targetY, 0.08);

      if (spotlightEl) {
        const x = pos.currentX - size / 2;
        const y = pos.currentY - size / 2;
        spotlightEl.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

        if (isVisibleRef.current && spotlightEl.style.opacity !== "1") {
          spotlightEl.style.opacity = "1";
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
      if (spotlightEl) {
        spotlightEl.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (spotlightEl) {
        spotlightEl.style.opacity = "1";
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
      ref={spotlightRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-0 will-change-transform opacity-0 transition-opacity duration-500 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at center, rgba(59, 130, 246, 0.09) 0%, rgba(139, 92, 246, 0.05) 45%, transparent 75%)",
      }}
    />
  );
}

export default CursorSpotlight;
