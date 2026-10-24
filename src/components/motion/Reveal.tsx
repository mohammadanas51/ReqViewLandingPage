"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "motion/react";
import { transitions } from "./motion-variants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 20,
  duration = 0.5,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = { opacity: 0, ...getInitialPosition() };

  const variants: Variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: transitions.easeSmooth,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

