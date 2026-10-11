"use client";

import React, { useEffect, useState } from "react";
import { CursorSpotlight } from "./cursor-spotlight";
import { CursorGlow } from "./cursor-glow";

interface CustomCursorProps {
  enableSpotlight?: boolean;
  enableGlow?: boolean;
  enableTrail?: boolean;
}

export function CustomCursor({
  enableSpotlight = true,
  enableGlow = true,
  enableTrail = false,
}: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setMounted(true);

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsSupported(isFinePointer && !prefersReducedMotion);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsSupported(e.matches && !reduced);
    };

    const fineQuery = window.matchMedia("(pointer: fine)");
    fineQuery.addEventListener("change", handlePointerChange);

    return () => {
      fineQuery.removeEventListener("change", handlePointerChange);
    };
  }, []);

  if (!mounted || !isSupported) {
    return null;
  }

  return (
    <>
      {/* 1. Subtle wide ambient illumination layer */}
      {enableSpotlight && <CursorSpotlight size={650} />}

      {/* 2. Primary cursor effect: Soft circular purple & indigo glow */}
      {enableGlow && <CursorGlow size={300} />}
    </>
  );
}

export default CustomCursor;
