"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles, Mail } from "lucide-react";
import { waitlistSchema } from "@/lib/validation";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    // Client-side validation using Zod
    const validation = waitlistSchema.safeParse({ email });
    if (!validation.success) {
      const issue = validation.error.issues[0];
      setStatus("error");
      setMessage(issue?.message || "Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the waitlist! We'll be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Unable to join the waitlist. Please check your email and try again.");
      }
    } catch {
      setStatus("error");
      setMessage("A network error occurred. Please check your connection and try again.");
    }
  };

  return (
    <section id="waitlist" className="py-24 sm:py-32 relative scroll-mt-12">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl border border-border-light/80 bg-background-card/90 p-8 sm:p-12 backdrop-blur-xl shadow-glow text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-blue text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join the Private Alpha</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Be among the first to review code differently.
          </h2>

          {/* Supporting Copy */}
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Join the ReqView waitlist for early access updates and a chance to help shape requirement-aware code review.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 sm:mt-10 max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading" || status === "success"}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-background-secondary border border-border-subtle text-text-primary placeholder-text-muted text-sm transition-all duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                  aria-describedby="waitlist-feedback"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-medium text-sm shadow-glow hover:bg-accent/90 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Joined!</span>
                  </>
                ) : (
                  <>
                    <span>Join the Waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Accessible Live Feedback Region */}
            <div id="waitlist-feedback" aria-live="polite" className="min-h-[3rem] mt-3">
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm text-left"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>{message}</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm text-left"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                    <span>{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Privacy Note & Direct Contact */}
          <p className="mt-4 text-xs text-text-muted">
            We respect your inbox. No marketing spam, no sharing of data. You will only receive early access updates.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Questions? Contact us directly at{" "}
            <a
              href="mailto:reqview@zohomail.in"
              className="text-accent-blue hover:text-white transition-colors underline underline-offset-2"
            >
              reqview@zohomail.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

