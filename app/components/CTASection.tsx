"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Rocket, Shield, Zap } from "lucide-react";
import Link from "next/link";

const badges = [
  { icon: Clock, text: "48-hr onboarding" },
  { icon: Shield, text: "No long-term contract" },
  { icon: Zap, text: "500+ projects delivered" },
  { icon: Rocket, text: "24/7 support included" },
];

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#0F1422] py-28"
      aria-label="Call to action"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FBBF24] opacity-[0.05] blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#FBBF24 1px, transparent 1px), linear-gradient(90deg, #FBBF24 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-2 text-sm font-medium text-[#FBBF24]"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#FBBF24]" />
          Ready to grow your business?
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Let&apos;s Build Something{" "}
          <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
            Extraordinary
          </span>{" "}
          Together
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-lg text-[#8B9CB6]"
        >
          Join 2,000+ students and 50+ businesses already growing with WeTrainEducation & Tech.
          Start your journey today — no commitment required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/#proposal"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FBBF24] px-8 py-4 text-base font-bold text-[#0A0A0A] shadow-xl shadow-[#FBBF24]/20 transition-all hover:bg-[#F59E0B] hover:shadow-[#FBBF24]/30 hover:-translate-y-0.5"
          >
            Get a Free Proposal
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full border border-[#2A3447] bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:border-[#FBBF24]/40 hover:bg-[#141928] hover:-translate-y-0.5"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-[#1E2A3A] bg-[#080B14] px-4 py-3"
            >
              <b.icon className="h-4 w-4 shrink-0 text-[#FBBF24]" />
              <span className="text-sm font-medium text-[#8B9CB6]">{b.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
