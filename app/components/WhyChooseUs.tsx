"use client";

import { motion } from "framer-motion";
import {
  Award,
  BarChart2,
  Clock,
  CreditCard,
  MessageSquare,
  Repeat,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: ShieldCheck,
    title: "Professional Courses",
    desc: "Industry-leading training in web development, marketing, design, and business management.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Business",
    desc: "Direct customer engagement with WhatsApp API integration for messaging and support automation.",
  },
  {
    icon: Zap,
    title: "Enterprise Software",
    desc: "Custom solutions including school management, e-commerce, POS systems, and more.",
  },
  {
    icon: BarChart2,
    title: "Digital Marketing",
    desc: "Comprehensive campaigns — social media, SEO, paid ads, and content creation.",
  },
  {
    icon: Clock,
    title: "Bulk SMS Campaigns",
    desc: "High-volume SMS for marketing, notifications, and customer communication.",
  },
  {
    icon: Repeat,
    title: "WeSend Delivery",
    desc: "Complete delivery platform with GPS tracking, rider management, and notifications.",
  },
  {
    icon: Award,
    title: "Leadpilot CRM",
    desc: "Advanced lead management to capture, nurture, and convert prospects effectively.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    desc: "Multiple options including Bank Transfer, Nagad, and bKash for your convenience.",
  },
];

const stats = [
  { value: "2,000+", label: "Active Students" },
  { value: "500+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "24/7", label: "Support Available" },
];

export default function WhyChooseUs() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#080B14] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F8EF7] opacity-[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1E2A3A] bg-[#0F1422] px-4 py-1.5 text-sm font-medium text-[#4F8EF7]">
            Why choose us?
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Complete{" "}
            <span className="bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] bg-clip-text text-transparent">
              Digital Ecosystem
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Everything you need to succeed online — from learning new skills to building
            software, managing customers, and growing your business.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-[#1E2A3A] bg-[#0F1422] p-6 transition-all hover:border-[#4F8EF7]/40 hover:shadow-lg hover:shadow-[#4F8EF7]/5"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F8EF7]/10 text-[#4F8EF7] transition-colors group-hover:bg-[#4F8EF7]/20">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#8B9CB6]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-14 grid grid-cols-2 gap-4 rounded-2xl border border-[#1E2A3A] bg-[#0F1422] p-8 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="mb-1 bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] bg-clip-text text-4xl font-extrabold text-transparent">
                {s.value}
              </div>
              <div className="text-sm text-[#8B9CB6]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#proposal"
            className="inline-flex items-center gap-2 rounded-full bg-[#4F8EF7] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4F8EF7]/30 transition-all hover:bg-[#3B7AE8] hover:-translate-y-0.5"
          >
            Get a Proposal
          </Link>
        </div>
      </div>
    </section>
  );
}
