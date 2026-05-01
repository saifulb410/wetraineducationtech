"use client";

import { motion } from "framer-motion";

const partners = [
  "Google", "Meta", "Microsoft", "Shopify", "Stripe",
  "Vercel", "Figma", "Notion", "Slack", "HubSpot",
  "Salesforce", "Zoom", "Canva", "Webflow", "Semrush",
];

export default function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-[#1E2A3A] bg-[#0F1422] py-10">
      <div className="mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-[#8B9CB6]">
          Trusted by students & businesses worldwide
        </p>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#0F1422] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#0F1422] to-transparent" />

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-12 items-center"
        >
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="flex h-10 shrink-0 items-center justify-center rounded-lg border border-[#1E2A3A] bg-[#141928] px-6 py-2"
            >
              <span className="whitespace-nowrap text-sm font-semibold text-[#8B9CB6]">
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
