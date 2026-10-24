"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      const input = document.getElementById("waitlist-email");
      if (input) {
        setTimeout(() => input.focus(), 400);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border-subtle py-3.5 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
            aria-label="ReqView Home"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border-light flex items-center justify-center shadow-sm group-hover:border-accent/50 transition-colors bg-background-card">
              <Image
                src="/logo.png"
                alt="ReqView Logo"
                width={32}
                height={32}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base tracking-tight text-text-primary group-hover:text-white transition-colors">
                ReqView
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Main Navigation">
            <a
              href="#problem"
              className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-1.5 py-1"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-primary rounded px-1.5 py-1"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-1.5 py-1"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-1.5 py-1"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={scrollToWaitlist}
              whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg bg-accent text-white shadow-sm hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-background-card border border-transparent hover:border-border-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-b border-border-subtle bg-background-secondary/95 backdrop-blur-xl px-4 pt-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              <a
                href="#problem"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-background-card rounded-md transition-colors"
              >
                The Problem
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-background-card rounded-md transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-background-card rounded-md transition-colors"
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-background-card rounded-md transition-colors"
              >
                FAQ
              </a>
              <div className="pt-2">
                <button
                  onClick={scrollToWaitlist}
                  className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-lg bg-accent text-white shadow-sm"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

