"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, Mail } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is ReqView?",
    answer:
      "ReqView is an upcoming requirement-aware AI code review platform. Rather than only inspecting syntax, formatting, and standard bug patterns, ReqView is designed to evaluate your code changes against the original task specifications and acceptance criteria to ensure the implementation actually fulfills the intended business logic.",
  },
  {
    id: "faq-2",
    question: "How is requirement-aware code review different from traditional code review?",
    answer:
      "Traditional linters and code review bots verify code health—such as test coverage, formatting, cyclomatic complexity, and known security vulnerabilities. However, code can be completely bug-free and still implement the wrong requirements. ReqView bridges this gap by checking whether the written logic matches the specifications, acceptance criteria, and edge cases defined in your tickets.",
  },
  {
    id: "faq-3",
    question: "Who is ReqView being built for?",
    answer:
      "ReqView is designed for small startup engineering teams, software developers, technical founders, and engineering leads who want to reduce review turnaround times while catching specification oversights early in the development lifecycle.",
  },
  {
    id: "faq-4",
    question: "Is ReqView available yet?",
    answer:
      "ReqView is currently under active development and not yet available for public self-serve use. We are testing core verification models and building integrations with developer workflows. By joining the waitlist, you get early access updates and the opportunity to participate in our upcoming private alpha.",
  },
  {
    id: "faq-5",
    question: "How can I get early access?",
    answer:
      "Enter your work email in the waitlist form above. We are rolling out private alpha access in small, curated cohorts to engineering teams who want to provide early feedback and help shape our product roadmap.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative border-t border-border-subtle bg-background-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Reveal direction="up">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent-blue font-mono">
              Got Questions?
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Frequently asked questions.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-4 text-base text-text-secondary">
              Everything you need to know about ReqView and the early access program.
            </p>
          </Reveal>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            const headingId = `faq-header-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <Reveal key={faq.id} delay={index * 0.06} direction="up">
                <div className="rounded-xl border border-border-subtle bg-background-card transition-all duration-200 hover:border-border-light overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-medium text-text-primary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span className="text-sm sm:text-base font-semibold pr-4">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0.01 : 0.25,
                          ease: "easeInOut",
                        }}
                        className="flex-shrink-0 text-text-muted"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={headingId}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0.01 : 0.28,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-text-secondary leading-relaxed border-t border-border-subtle/60 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Direct Contact Callout */}
        <Reveal direction="up" delay={0.25} className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-4 px-6 rounded-xl border border-border-subtle bg-background-card/90 text-xs text-text-secondary">
            <span>Have a specific question or want to discuss early access?</span>
            <a
              href="mailto:reqview@zohomail.in"
              className="inline-flex items-center gap-1.5 font-medium text-accent-blue hover:text-white transition-colors underline underline-offset-4"
            >
              <Mail className="w-3.5 h-3.5 text-accent-blue" />
              <span>reqview@zohomail.in</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

