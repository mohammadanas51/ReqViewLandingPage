import { Variants } from "motion/react";

/**
 * Common easing curves for premium SaaS feel
 */
export const transitions = {
  springGentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  springSnappy: {
    type: "spring" as const,
    stiffness: 260,
    damping: 26,
  },
  easeOutCubic: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
  easeSmooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

/**
 * Hero section staggered entrance sequence variants
 */
export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: transitions.easeSmooth,
    },
  },
};

export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Scroll reveal variants for sections and cards
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: transitions.easeSmooth,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  initial: { y: 0, borderColor: "rgba(255, 255, 255, 0.07)" },
  hover: {
    y: -3,
    borderColor: "rgba(99, 102, 241, 0.35)",
    transition: { duration: 0.22, ease: "easeOut" },
  },
  tap: { y: -1, scale: 0.995 },
};

export const buttonMotion = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.18, ease: "easeOut" },
};

