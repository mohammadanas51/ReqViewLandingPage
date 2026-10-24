"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, Variants } from "motion/react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { ProductPreview } from "./ProductPreview";
import { transitions } from "./motion/motion-variants";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = document.getElementById("waitlist-email");
      if (input) {
        setTimeout(() => input.focus(), 400);
      }
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Staggered variants for hero elements
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.55,
        ease: transitions.easeSmooth,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient and subtle grid */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-radial-hero pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* 1. Eyebrow badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-background-card/80 backdrop-blur-sm shadow-sm hover:border-accent/40 transition-colors">
              <Image
                src="/logo.png"
                alt="ReqView"
                width={18}
                height={18}
                className="w-4 h-4 rounded object-cover"
              />
              <span className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                INTRODUCING REQVIEW
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs text-text-muted">Early Access</span>
            </div>
          </motion.div>

          {/* 2 & 3. Headline with accent highlight */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1] sm:leading-[1.12]">
              Traditional reviews check the code.{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent-blue via-accent to-accent-violet bg-clip-text text-transparent">
                ReqView checks the spec.
              </span>
            </h1>
          </motion.div>

          {/* 4. Supporting paragraph */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            Traditional code reviews focus on bugs, readability, and syntax. ReqView is being built to evaluate pull requests against original requirements and specifications—catching missed edge cases and conflicting logic before merge.
          </motion.p>

          {/* 5. CTAs with short stagger */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            <motion.button
              onClick={scrollToWaitlist}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent text-white font-medium text-sm shadow-glow hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={scrollToHowItWorks}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border-subtle bg-background-card text-text-primary font-medium text-sm hover:bg-background-elevated hover:border-border-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
            >
              <span>See How It Works</span>
            </motion.button>
          </motion.div>

          {/* 6. Reassurance line */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-text-muted"
          >
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-success" />
              Free during early access
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-success" />
              Zero spam policy
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-success" />
              Unsubscribe anytime
            </span>
          </motion.div>

          {/* 7. Product-preview mockup */}
          <ProductPreview />
        </motion.div>
      </div>
    </section>
  );
}
