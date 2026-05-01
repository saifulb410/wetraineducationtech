"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#080B14]"
      aria-label="WeTrainEducation & Tech — Home"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#FBBF24 1px, transparent 1px), linear-gradient(90deg, #FBBF24 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#FBBF24] opacity-[0.07] blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#F97316] opacity-[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[250px] w-[250px] rounded-full bg-[#FBBF24] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-2 text-sm"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
            ))}
          </div>
          <span className="font-semibold text-white">4.9</span>
          <span className="text-[#8B9CB6]">— Trusted by 2,000+ students & businesses</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Your Complete{" "}
          <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
            Digital Solutions
          </span>{" "}
          for Business Success
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-[#8B9CB6] md:text-xl"
        >
          From professional courses to enterprise software, marketing automation
          to CRM — WeTrainEducation & Tech delivers integrated solutions that drive
          real growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#services"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FBBF24] px-7 py-3.5 text-base font-semibold text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/20 transition-all hover:bg-[#F59E0B] hover:shadow-[#FBBF24]/30 hover:-translate-y-0.5"
          >
            Explore Services
            <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
          <Link
            href="#proposal"
            className="group inline-flex items-center gap-2 rounded-full border border-[#2A3447] bg-[#0F1422] px-7 py-3.5 text-base font-semibold text-white transition-all hover:border-[#FBBF24]/40 hover:bg-[#141928] hover:-translate-y-0.5"
          >
            Get a Proposal
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {[
            { value: "2,000+", label: "Active Students" },
            { value: "500+", label: "Projects Delivered" },
            { value: "50+", label: "Enterprise Clients" },
            { value: "24/7", label: "Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#1E2A3A] bg-[#0F1422]/80 px-6 py-5 text-center backdrop-blur-sm"
            >
              <div className="mb-1 text-2xl font-extrabold text-[#FBBF24]">{item.value}</div>
              <div className="text-sm text-[#8B9CB6]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080B14] to-transparent pointer-events-none" />
    </section>
  );
}
