"use client";

import React from "react";
import { Reveal } from "./motion/Reveal";
import { StaggerContainer, StaggerItem } from "./motion/Stagger";
import { FileText, Cpu, AlertCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Define the requirements",
    subtitle: "Spec Ingestion",
    description:
      "Provide the original task description, specification document, issue acceptance criteria, or PR markdown context.",
    details: "Supports Markdown specs, JIRA/Linear acceptance criteria, and PR descriptions.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Review the implementation",
    subtitle: "Requirement Evaluation",
    description:
      "ReqView is designed to evaluate submitted code changes, AST modifications, and semantic control flow against the specified rules.",
    details: "Analyzes variable boundaries, business rule enforcement, and execution paths.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Identify mismatches",
    subtitle: "Actionable Insights",
    description:
      "Surface potential missing behavior, conflicting logic, and unmet requirements directly in your developer review workflow.",
    details: "Highlights the exact lines of code that conflict with specific numbered requirements.",
    icon: AlertCircle,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent-blue font-mono">
              The Intended Workflow
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Review code against what it was supposed to do.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-4 text-base sm:text-lg text-text-secondary">
              A developer-first process engineered to align implementation with intent before code hits production.
            </p>
          </Reveal>
        </div>

        {/* 3 Step Process with Connector on Desktop */}
        <div className="relative">
          {/* Subtle horizontal line connecting steps on desktop */}
          <div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent -translate-y-8 pointer-events-none" 
            aria-hidden="true"
          />

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number} className="h-full">
                  <div className="relative h-full flex flex-col justify-between rounded-xl border border-border-subtle bg-background-card/90 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-background-elevated group">
                    <div>
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-2xl font-bold text-accent-blue/80 group-hover:text-accent transition-colors">
                            {step.number}
                          </span>
                          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                            {step.subtitle}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-background-secondary border border-border-subtle flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent/30 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Step Content */}
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs text-text-muted">
                      <span>{step.details}</span>
                      {index < 2 && (
                        <ArrowRight className="hidden lg:block w-4 h-4 text-accent/50 -mr-2" />
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Intended workflow disclaimer pill */}
        <Reveal direction="up" delay={0.2} className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-xs text-text-muted bg-white/5 border border-border-subtle px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            Designed workflow currently in active development. Early testers will be onboarded in cohorts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

