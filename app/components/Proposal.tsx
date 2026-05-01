"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Send,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const services = [
  "Professional Course",
  "IT / Software Development",
  "Digital Marketing",
  "WhatsApp Business",
  "Bulk SMS",
  "WeSend Delivery",
  "Leadpilot CRM",
  "Other / Custom",
];

const budgets = [
  "Under ৳10,000",
  "৳10,000 – ৳30,000",
  "৳30,000 – ৳75,000",
  "৳75,000 – ৳1,50,000",
  "৳1,50,000+",
  "Let's discuss",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@wetrainedu.com",
    href: "mailto:support@wetrainedu.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat with us",
    href: "#",
  },
];

const promises = [
  { icon: Clock, text: "Response within 24 hours" },
  { icon: CheckCircle, text: "Free consultation call" },
  { icon: CheckCircle, text: "No obligation quote" },
];

export default function Proposal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[${formData.service || "General"}] Proposal Request`,
          message: `Phone: ${formData.phone || "N/A"}\nBudget: ${formData.budget || "N/A"}\n\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
        setStatus("success");
        setStatusMsg("Your proposal request was sent! We'll be in touch within 24 hours.");
      } else {
        setStatus("error");
        setStatusMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Failed to send. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="proposal" className="relative overflow-hidden bg-[#0F1422] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#FBBF24] opacity-[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-1.5 text-sm font-medium text-[#FBBF24]">
            Let&apos;s Work Together
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Request a Free{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Proposal
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Tell us about your project and we&apos;ll send you a tailored proposal within 24 hours — no commitment required.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28 space-y-6">

              {/* What happens next */}
              <div className="rounded-2xl border border-[#1E2A3A] bg-[#080B14] p-7">
                <h3 className="mb-5 text-lg font-bold text-white">What happens next?</h3>
                <ol className="space-y-5">
                  {[
                    { n: "01", t: "We review your request", d: "Our team reads every submission carefully within a few hours." },
                    { n: "02", t: "We schedule a call", d: "A specialist reaches out to understand your goals in depth." },
                    { n: "03", t: "You receive a proposal", d: "A custom quote tailored exactly to your needs, no fluff." },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/10 text-xs font-extrabold text-[#FBBF24]">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{s.t}</p>
                        <p className="text-xs text-[#8B9CB6]">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Promises */}
              <div className="rounded-2xl border border-[#FBBF24]/15 bg-[#FBBF24]/5 p-6">
                <ul className="space-y-3">
                  {promises.map((p, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <p.icon className="h-4 w-4 shrink-0 text-[#FBBF24]" />
                      <span className="text-sm text-[#8B9CB6]">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                {contactInfo.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="flex items-center gap-4 rounded-xl border border-[#1E2A3A] bg-[#080B14] px-5 py-3.5 transition-colors hover:border-[#FBBF24]/30"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/10 text-[#FBBF24]">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8B9CB6]">{c.label}</p>
                      <p className="text-sm font-semibold text-white">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-[#1E2A3A] bg-[#080B14] p-8 md:p-10">

              {/* Status messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                    <p className="text-sm text-green-300">{statusMsg}</p>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                  >
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <p className="text-sm text-red-300">{statusMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">
                      Full Name <span className="text-[#FBBF24]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full rounded-xl border border-[#1E2A3A] bg-[#0F1422] px-4 py-3 text-sm text-white placeholder-[#4A5568] transition-colors focus:border-[#FBBF24]/40 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">
                      Email Address <span className="text-[#FBBF24]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#1E2A3A] bg-[#0F1422] px-4 py-3 text-sm text-white placeholder-[#4A5568] transition-colors focus:border-[#FBBF24]/40 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/20"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full rounded-xl border border-[#1E2A3A] bg-[#0F1422] px-4 py-3 text-sm text-white placeholder-[#4A5568] transition-colors focus:border-[#FBBF24]/40 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/20"
                  />
                </div>

                {/* Service + Budget */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">
                      Service Interested In <span className="text-[#FBBF24]">*</span>
                    </label>
                    <select
                      name="service"
                      id="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#1E2A3A] bg-[#0F1422] px-4 py-3 text-sm text-white transition-colors focus:border-[#FBBF24]/40 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/20 appearance-none"
                    >
                      <option value="" disabled className="text-[#4A5568]">Select a service…</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#0F1422]">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#1E2A3A] bg-[#0F1422] px-4 py-3 text-sm text-white transition-colors focus:border-[#FBBF24]/40 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/20 appearance-none"
                    >
                      <option value="" className="text-[#4A5568]">Select budget…</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-[#0F1422]">{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">
                    Project Details <span className="text-[#FBBF24]">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project, goals, and timeline. The more detail, the better our proposal."
                    className="w-full resize-none rounded-xl border border-[#1E2A3A] bg-[#0F1422] px-4 py-3 text-sm text-white placeholder-[#4A5568] transition-colors focus:border-[#FBBF24]/40 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/20"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01, y: isSubmitting ? 0 : -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#FBBF24] py-4 text-base font-bold text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/20 transition-all hover:bg-[#F59E0B] hover:shadow-[#FBBF24]/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-[#0A0A0A] border-t-transparent"
                      />
                      Sending your request…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Proposal Request
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-[#4A5568]">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="text-[#8B9CB6] underline underline-offset-2 hover:text-[#FBBF24]">Privacy Policy</a>.
                  {" "}We never share your data.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
