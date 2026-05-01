"use client";

import { motion } from "framer-motion";
import { ClipboardList, Rocket, Users } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell Us Your Goal",
    desc: "Share your business objectives, learning goals, or project requirements. We listen first, then build a tailored plan — no templates, no guesswork.",
  },
  {
    number: "02",
    icon: Users,
    title: "We Build Your Solution",
    desc: "Our experts design, develop, or deliver your course, software, or campaign with full transparency. You stay in the loop at every milestone.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Grow",
    desc: "Go live with confidence. We provide ongoing support, performance tracking, and iteration so your results keep improving after launch.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#080B14] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FBBF24] opacity-[0.04] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-1.5 text-sm font-medium text-[#FBBF24]">
            How it works
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Simple.{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Proven. Fast.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            From first conversation to live results — our process is built around your timeline and goals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Connector line (desktop only) */}
          <div className="absolute top-12 left-1/6 right-1/6 hidden h-px bg-gradient-to-r from-transparent via-[#FBBF24]/20 to-transparent md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5" />
                <div className="absolute inset-3 rounded-full border border-[#FBBF24]/30 bg-[#0F1422]" />
                <step.icon className="relative z-10 h-8 w-8 text-[#FBBF24]" />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#FBBF24] text-xs font-extrabold text-[#0A0A0A]">
                  {i + 1}
                </span>
              </div>

              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FBBF24]/60">
                Step {step.number}
              </span>
              <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#8B9CB6]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/#proposal"
            className="inline-flex items-center gap-2 rounded-full bg-[#FBBF24] px-8 py-3.5 text-base font-semibold text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/20 transition-all hover:bg-[#F59E0B] hover:-translate-y-0.5"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
