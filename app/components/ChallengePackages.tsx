"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";

interface Package {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaHref: string;
  ctaLabel: string;
  badge?: string;
}

const packages: Package[] = [
  {
    name: "Starter",
    price: "৳3,999",
    priceNote: "per month",
    description: "Perfect for small businesses ready to grow their digital presence.",
    features: [
      "Course Add platform access",
      "WhatsApp Business integration",
      "Basic IT support (Mon–Fri)",
      "Monthly analytics report",
      "Payment integration (Bank, Nagad, bKash)",
      "Email support within 48 hrs",
    ],
    popular: false,
    ctaHref: "/#proposal",
    ctaLabel: "Get Started",
  },
  {
    name: "Professional",
    price: "৳9,999",
    priceNote: "per month",
    description: "Everything you need to scale — marketing, SMS, delivery, and priority support.",
    features: [
      "All Starter features included",
      "Full marketing suite (campaigns & strategy)",
      "Bulk SMS for customer campaigns",
      "WeSend delivery platform access",
      "Advanced IT support (24/7)",
      "Priority analytics & reporting",
      "Dedicated account manager",
    ],
    popular: true,
    ctaHref: "/#proposal",
    ctaLabel: "Start Professional",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: "talk to sales",
    description: "Full platform access with white-glove service and custom integrations.",
    features: [
      "All Professional features included",
      "Leadpilot CRM & lead management",
      "Custom integrations & API access",
      "Enterprise IT infrastructure",
      "Multi-channel campaign orchestration",
      "Custom contract & SLA",
      "On-site training & setup",
    ],
    popular: false,
    ctaHref: "/#proposal",
    ctaLabel: "Request a Quote",
  },
];

const bonuses = [
  { title: "Free Onboarding", desc: "Dedicated setup session with our team" },
  { title: "30-Day Support", desc: "Post-launch monitoring at no extra cost" },
  { title: "Monthly Reports", desc: "Performance analytics delivered to you" },
  { title: "Strategy Call", desc: "Quarterly growth review with your manager" },
];

export default function ChallengePackages() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#080B14] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#FBBF24] opacity-[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-1.5 text-sm font-medium text-[#FBBF24]">
            Simple, Transparent Pricing
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Transparent pricing with no hidden fees. Start small, scale up anytime — no long-term contracts required.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                pkg.popular
                  ? "border-[#FBBF24]/60 bg-[#0F1422] shadow-xl shadow-[#FBBF24]/10 scale-[1.02]"
                  : "border-[#1E2A3A] bg-[#0F1422] hover:border-[#FBBF24]/25"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBBF24] px-4 py-1.5 text-xs font-bold text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/30">
                    <Star className="h-3 w-3 fill-[#0A0A0A]" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#FBBF24]">
                  {pkg.name}
                </p>
                <p className="text-sm leading-relaxed text-[#8B9CB6]">{pkg.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 border-b border-[#1E2A3A] pb-8">
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-extrabold ${pkg.price === "Custom" ? "text-white" : "text-[#FBBF24]"}`}>
                    {pkg.price}
                  </span>
                  <span className="mb-1 text-sm text-[#8B9CB6]">/ {pkg.priceNote}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/10">
                      <Check className="h-3 w-3 text-[#FBBF24]" />
                    </span>
                    <span className="text-sm text-[#8B9CB6]">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={pkg.ctaHref}
                className={`flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                  pkg.popular
                    ? "bg-[#FBBF24] text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/25 hover:bg-[#F59E0B] hover:shadow-[#FBBF24]/40"
                    : "border border-[#1E2A3A] text-white hover:border-[#FBBF24]/40 hover:bg-[#141928]"
                }`}
              >
                {pkg.ctaLabel}
                <Zap className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bonus Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#FBBF24]/20 bg-gradient-to-br from-[#FBBF24]/5 to-transparent p-8"
        >
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 px-4 py-1.5 text-sm font-semibold text-[#FBBF24]">
              🎁 Included Free with Every Plan
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bonuses.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-[#1E2A3A] bg-[#0F1422] p-5 text-center"
              >
                <p className="mb-1 text-sm font-bold text-white">{b.title}</p>
                <p className="text-xs text-[#8B9CB6]">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-[#8B9CB6]"
        >
          All plans include VAT-compliant invoicing. Enterprise clients receive a dedicated SLA.{" "}
          <Link href="/#proposal" className="text-[#FBBF24] underline underline-offset-4 hover:text-[#F59E0B]">
            Talk to sales →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
