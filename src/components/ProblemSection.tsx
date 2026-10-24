"use client";

import React from "react";
import { Reveal } from "./motion/Reveal";
import { StaggerContainer, StaggerItem } from "./motion/Stagger";
import { Code2, Target, SplitSquareVertical } from "lucide-react";

const problems = [
  {
    icon: SplitSquareVertical,
    tag: "Logic vs Intent",
    title: "Logic can be correct, requirements can be wrong",
    description:
      "Code can compile cleanly, pass 100% of unit tests, and execute without runtime errors—while silently implementing the completely wrong business behavior.",
    example: "Example: The function filters odd integers when the ticket explicitly requested only evens.",
  },
  {
    icon: Target,
    tag: "Spec Drift",
    title: "Important details get missed",
    description:
      "Subtle edge cases, non-functional requirements, boundary constraints, and acceptance criteria routinely slip through the cracks between product specification and PR review.",
    example: "Example: Pagination offset boundaries or rate limit headers specified in the task description get overlooked.",
  },
  {
    icon: Code2,
    tag: "Review Blindspot",
    title: "Traditional reviews focus on the code",
    description:
      "Standard code reviews optimize for style guidelines, performance bottlenecks, and syntax conventions. But verifying implementation against the original product requirements is left to guesswork.",
    example: "Example: Reviewers ask for variable renaming, but miss that acceptance criterion #3 was never coded.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 sm:py-32 relative border-t border-border-subtle bg-background-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent-blue font-mono">
              The Fundamental Blindspot
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Passing a code review isn&apos;t the same as meeting the spec.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-4 text-base sm:text-lg text-text-secondary">
              Reviewers are great at checking whether code is written well. But who is checking whether it does what was actually asked for?
            </p>
          </Reveal>
        </div>

        {/* 3 Staggered Problem Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <StaggerItem key={problem.title} className="h-full">
                <div className="group h-full flex flex-col justify-between rounded-xl border border-border-subtle bg-background-card p-6 sm:p-7 transition-all duration-300 hover:border-accent/40 hover:bg-background-elevated hover:shadow-card-hover">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-lg bg-background-secondary border border-border-subtle flex items-center justify-center text-accent group-hover:text-accent-blue group-hover:border-accent/30 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-white/5 border border-border-subtle text-text-muted">
                        {problem.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                      {problem.title}
                    </h3>

                    <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-subtle/80 text-xs text-text-muted font-mono bg-background-secondary/50 -mx-2 px-3 py-2.5 rounded">
                    {problem.example}
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

