"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, AlertTriangle, FileCode2, BookOpen, Sparkles, Terminal } from "lucide-react";

export function ProductPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16"
    >
      {/* Ambient background glow behind mockup */}
      <div 
        className="absolute -inset-1.5 bg-gradient-to-r from-accent/25 via-accent-violet/20 to-accent-blue/20 rounded-2xl blur-xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Mockup Card Container */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-xl border border-border-light/60 bg-background-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Top Window Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border-subtle bg-background-secondary/70">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-border-subtle mx-1.5" />
            <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
              <Terminal className="w-3.5 h-3.5 text-accent-blue" />
              <span>pr-418/even-numbers-filter.ts</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Illustrative Preview Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Illustrative preview
            </span>
            <span className="hidden sm:inline-flex text-[11px] font-mono text-text-muted">
              v0.1.0-preview
            </span>
          </div>
        </div>

        {/* Mockup Workspace Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Original Requirement (Spec) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="rounded-lg border border-border-subtle bg-background-secondary/80 p-4 transition-all duration-200 hover:border-border-light hover:bg-background-secondary">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
                  <BookOpen className="w-4 h-4 text-accent-blue" />
                  <span>Original Requirement</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-accent-blue border border-blue-500/20">
                  SPEC-104
                </span>
              </div>

              <div className="bg-background-card/90 rounded-md p-3 border border-border-subtle text-xs space-y-2">
                <p className="font-medium text-text-primary">
                  &ldquo;Return only even numbers between 1 and 100.&rdquo;
                </p>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Scope: Function must strictly filter integers and exclude any odd values or values outside the range [2, 100].
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-text-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span>Extracted from PR issue link</span>
              </div>
            </div>

            {/* AI Review Summary metadata card */}
            <div className="hidden sm:block rounded-lg border border-border-subtle bg-background-secondary/50 p-4">
              <div className="text-xs font-medium text-text-secondary mb-2 flex items-center justify-between">
                <span>Verification Engine</span>
                <span className="text-[10px] font-mono text-accent">ReqView Core</span>
              </div>
              <div className="text-[11px] text-text-muted space-y-1">
                <div className="flex justify-between">
                  <span>Syntax & Style:</span>
                  <span className="text-success font-medium">Valid (0 linter errors)</span>
                </div>
                <div className="flex justify-between">
                  <span>Requirement Match:</span>
                  <span className="text-amber-400 font-medium">Mismatch (1 issue)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Implementation Code Block */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="h-full rounded-lg border border-border-subtle bg-[#0B0D11] p-4 font-mono text-xs overflow-hidden flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2 text-text-secondary">
                  <FileCode2 className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px]">filter.ts</span>
                </div>
                <span className="text-[10px] text-text-muted">TypeScript</span>
              </div>

              <div className="flex-1 space-y-1.5 leading-relaxed text-[11px] sm:text-xs">
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">1</span>
                  <span><span className="text-purple-400">export function</span> <span className="text-blue-400">getNumbers</span>() &#123;</span>
                </div>
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">2</span>
                  <span className="pl-3"><span className="text-purple-400">const</span> list: <span className="text-yellow-400">number</span>[] = [];</span>
                </div>
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">3</span>
                  <span className="pl-3"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = 1; i &lt;= 100; i++) &#123;</span>
                </div>
                {/* Line with logic mismatch highlighted */}
                <div className="bg-red-500/10 -mx-4 px-4 py-0.5 border-l-2 border-red-500 text-red-200 flex">
                  <span className="w-5 text-red-400 select-none">4</span>
                  <span className="pl-3">
                    <span className="text-purple-400">if</span> (i % 2 !== 0) &#123; <span className="text-red-400/80 font-sans text-[10px] italic">{"// Bug"}</span>
                  </span>
                </div>
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">5</span>
                  <span className="pl-6">list.<span className="text-blue-300">push</span>(i);</span>
                </div>
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">6</span>
                  <span className="pl-3">&#125;</span>
                </div>
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">7</span>
                  <span className="pl-3"><span className="text-purple-400">return</span> list;</span>
                </div>
                <div className="text-text-muted flex">
                  <span className="w-5 text-gray-600 select-none">8</span>
                  <span>&#125;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: ReqView Finding & Review */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="h-full rounded-lg border border-amber-500/30 bg-amber-950/15 p-4 flex flex-col justify-between transition-all duration-200 hover:border-amber-500/50">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>ReqView Finding</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Spec Conflict
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-text-primary mb-1">
                      Behavior contradicts requirement
                    </h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Code passes linting and typecheck, but logic collects <span className="font-mono text-amber-300">[1, 3, 5, ...]</span> odd numbers instead of even numbers.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-background-card/90 border border-border-subtle text-[11px]">
                    <div className="text-text-muted text-[10px] uppercase font-mono tracking-wider mb-1">
                      Expected vs Actual
                    </div>
                    <div className="space-y-0.5 text-xs font-mono">
                      <div className="text-text-secondary">Expected: <span className="text-emerald-400">[2, 4, 6, 8, ...]</span></div>
                      <div className="text-text-secondary">Produces: <span className="text-red-400">[1, 3, 5, 7, ...]</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-accent-blue">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-medium">Identified before review</span>
                </div>
                <span className="text-[10px] text-text-muted font-mono">SPEC-104</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
