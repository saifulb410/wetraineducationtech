"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How do I get started with WeTrainEducation & Tech?",
    a: "Simply fill out our proposal form or contact us via WhatsApp. We'll schedule a free consultation to understand your goals and recommend the right services — whether that's a course, software project, or marketing campaign.",
  },
  {
    q: "Are your courses suitable for beginners?",
    a: "Yes. Our courses are designed for all levels — from complete beginners to professionals looking to upgrade their skills. Each course page clearly states the prerequisites so you can choose the right fit.",
  },
  {
    q: "How long does it take to deliver a software project?",
    a: "Project timelines depend on scope and complexity. A simple web application typically takes 2–4 weeks, while enterprise systems can take 2–4 months. We provide a detailed timeline after the initial requirements discussion.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Bank Transfer, Nagad, and bKash for local clients. International clients can pay via wire transfer or other arrangements made during onboarding.",
  },
  {
    q: "Do you offer ongoing support after project delivery?",
    a: "Yes. All software projects include a 30-day post-launch support period. Extended support packages are also available for clients who need long-term maintenance, hosting management, or performance monitoring.",
  },
  {
    q: "Can I get a certificate after completing a course?",
    a: "Absolutely. Upon successful completion of any course, you receive a verified digital certificate from WeTrainEducation & Tech that you can share on LinkedIn or include in your portfolio.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#080B14] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#FBBF24] opacity-[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-1.5 text-sm font-medium text-[#FBBF24]">
            FAQ
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Common{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-[#8B9CB6]">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-20px" }}
              className={`rounded-2xl border transition-colors ${
                open === i
                  ? "border-[#FBBF24]/30 bg-[#0F1422]"
                  : "border-[#1E2A3A] bg-[#0F1422] hover:border-[#FBBF24]/20"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#FBBF24] transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#8B9CB6]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
