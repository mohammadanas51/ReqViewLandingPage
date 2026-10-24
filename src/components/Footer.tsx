"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border-subtle bg-background-secondary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border-subtle/60">
          {/* Brand Wordmark & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-border-light flex items-center justify-center bg-background-card">
                <Image
                  src="/logo.png"
                  alt="ReqView Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-base tracking-tight text-text-primary">
                ReqView
              </span>
            </div>
            <p className="mt-2 text-xs text-text-muted max-w-sm">
              Requirement-aware AI code review. Helping engineering teams verify implementation against specifications.
            </p>
            <a
              href="mailto:reqview@zohomail.in"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-blue transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 text-accent-blue group-hover:scale-110 transition-transform" />
              <span>reqview@zohomail.in</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-secondary">
            <a href="#problem" className="hover:text-white transition-colors">
              The Problem
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#waitlist" className="hover:text-white transition-colors font-medium text-accent-blue">
              Join Waitlist
            </a>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-background-card text-xs text-text-secondary hover:text-white hover:border-border-light transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            &copy; {currentYear} ReqView. All rights reserved. Early development preview.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:reqview@zohomail.in"
              className="hover:text-text-secondary transition-colors"
            >
              reqview@zohomail.in
            </a>
            <span>&bull;</span>
            <span className="hover:text-text-secondary transition-colors cursor-default">
              Terms & Privacy
            </span>
            <span>&bull;</span>
            <span className="hover:text-text-secondary transition-colors cursor-default">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

