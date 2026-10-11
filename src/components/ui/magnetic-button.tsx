"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0.1 to 0.5 (default 0.3)
  active?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  active = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based spring animation
  const springConfig = { damping: 18, stiffness: 160, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setCanAnimate(isFine && !reducedMotion && active);
  }, [active]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimate || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    if (!canAnimate) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!canAnimate) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
