"use client";

import React from "react";
import { Reveal } from "./motion/Reveal";
import { StaggerContainer, StaggerItem } from "./motion/Stagger";
import {
  FileSearch,
  SearchX,
  Scale,
  Lightbulb,
  Terminal,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Requirement-aware analysis",
    description:
      "Contextual parsing that links code diffs directly to user stories, RFC clauses, and acceptance criteria.",
    badge: "Core Engine",
  },
  {
    icon: SearchX,
    title: "Potential missing functionality detection",
    description:
      "Surfaces unhandled edge cases, omitted error branches, or skipped validation criteria that were explicitly requested in the spec.",
    badge: "Coverage",
  },
  {
    icon: Scale,
    title: "Specification mismatch identification",
    description:
      "Pinpoints inverted conditionals, boundary miscalculations (e.g. `<` vs `<=`), and discrepancies between intended outcome and implementation.",
    badge: "Accuracy",
  },
  {
    icon: Lightbulb,
    title: "Actionable findings with explanations",
    description:
      "Provides clear, reasoned explanations comparing requirement text with code logic, alongside suggested corrections.",
    badge: "Clarity",
  },
  {
    icon: Terminal,
    title: "Developer-focused review experience",
    description:
      "Minimalist inline insights designed to fit seamlessly into terminal or pull request workflows without noise or generic fluff.",
    badge: "DX",
  },
  {
    icon: Zap,
    title: "A workflow designed for fast-moving engineering teams",
    description:
      "Lightweight, asynchronous verification that speeds up peer reviews without bogging down release velocity.",
    badge: "Velocity",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative border-t border-border-subtle bg-background-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent-blue font-mono">
              Planned Capabilities
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              What we&apos;re building.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-4 text-base sm:text-lg text-text-secondary">
              Architected from the ground up for modern engineering teams who value correctness as much as code cleanliness.
            </p>
          </Reveal>
        </div>

        {/* Feature Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title} className="h-full">
                <div className="group h-full flex flex-col justify-between rounded-xl border border-border-subtle bg-background-card p-6 transition-all duration-300 hover:border-accent/40 hover:bg-background-elevated hover:shadow-card-hover">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-background-secondary border border-border-subtle flex items-center justify-center text-accent group-hover:text-accent-blue group-hover:scale-105 transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 border border-border-subtle text-text-muted">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-text-primary group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-subtle/60 flex items-center gap-1.5 text-[11px] text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span>Planned feature in development</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

