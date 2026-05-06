"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useContactInfo } from "../utils/contactInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { contactPhone, supportEmail } = useContactInfo();
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus("");
    setNewsletterLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("newsletterEmail") as HTMLInputElement)?.value;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus("Subscribed! Check your inbox for confirmation.");
        form.reset();
      } else {
        setNewsletterStatus(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setNewsletterStatus("Subscription failed. Please try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Courses", href: "/courses" },
    { name: "Projects", href: "/#projects" },
    { name: "Certificates", href: "/#certificates" },
    { name: "Contact", href: "/#proposal" },
  ];

  const legalLinks = [
    { name: "Terms of Use", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const services = [
    { name: "IT Services", href: "/software" },
    { name: "Marketing Services", href: "/marketing" },
    { name: "WhatsApp Business", href: "/marketing" },
    { name: "Bulk SMS", href: "/marketing" },
    { name: "WeSend Delivery", href: "/#services" },
    { name: "Leadpilot CRM", href: "/#services" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-[#1E2A3A] bg-[#080B14]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand — spans 2 cols on large screens */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5">
              <Image src="/favicon.png" alt="WeTrainEducation & Tech" width={36} height={36} className="h-9 w-9 rounded-lg" />
              <span className="text-lg font-bold text-white">
                WeTrain<span className="text-[#FBBF24]">Education</span>
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-[#8B9CB6]">
              A global education and IT company delivering courses, software, marketing, and growth solutions for businesses worldwide.
            </p>

            {/* Social */}
            <div className="mb-6 flex gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ y: -3 }}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E2A3A] bg-[#0F1422] text-[#8B9CB6] transition-colors hover:border-[#FBBF24]/30 hover:text-[#FBBF24]"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Payment badges */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8B9CB6]">Accepted Payments</p>
              <div className="flex flex-wrap gap-2">
                {/* bKash */}
                <div className="flex items-center gap-1.5 rounded-lg border border-[#1E2A3A] bg-[#0F1422] px-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="16" fill="#E2136E"/>
                    <text x="16" y="22" textAnchor="middle" fontSize="15" fontWeight="bold" fill="white" fontFamily="Arial">b</text>
                  </svg>
                  <span className="text-xs font-bold text-pink-400">bKash</span>
                </div>
                {/* Nagad */}
                <div className="flex items-center gap-1.5 rounded-lg border border-[#1E2A3A] bg-[#0F1422] px-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="16" fill="#F6A623"/>
                    <text x="16" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Arial">N</text>
                  </svg>
                  <span className="text-xs font-bold text-orange-400">Nagad</span>
                </div>
                {/* Visa */}
                <div className="flex items-center justify-center rounded-lg border border-[#1E2A3A] bg-[#1A1F71] px-3 py-2">
                  <svg width="30" height="10" viewBox="0 0 60 20" aria-label="Visa" fill="none">
                    <text x="0" y="17" fontSize="19" fontWeight="900" fill="white" fontFamily="Arial" letterSpacing="1">VISA</text>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="flex items-center gap-1.5 rounded-lg border border-[#1E2A3A] bg-[#0F1422] px-3 py-2">
                  <svg width="26" height="16" viewBox="0 0 46 30" aria-label="Mastercard" fill="none">
                    <circle cx="15" cy="15" r="15" fill="#EB001B"/>
                    <circle cx="31" cy="15" r="15" fill="#F79E1B"/>
                    <path d="M23 3.8 C19.5 6.5 17 10.5 17 15 C17 19.5 19.5 23.5 23 26.2 C26.5 23.5 29 19.5 29 15 C29 10.5 26.5 6.5 23 3.8Z" fill="#FF5F00"/>
                  </svg>
                  <span className="text-xs font-semibold text-[#8B9CB6]">Card</span>
                </div>
                {/* Bank Transfer */}
                <div className="flex items-center gap-1.5 rounded-lg border border-[#1E2A3A] bg-[#0F1422] px-3 py-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/>
                  </svg>
                  <span className="text-xs font-bold text-blue-400">Bank</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-[#8B9CB6] transition-colors hover:text-[#FBBF24]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-sm text-[#8B9CB6] transition-colors hover:text-[#FBBF24]">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
                <span className="text-sm text-[#8B9CB6]">{supportEmail}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
                <span className="text-sm text-[#8B9CB6]">{contactPhone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
                <span className="text-sm text-[#8B9CB6]">Usha-Tara Kunju, C&B Road, Barishal, Bangladesh</span>
              </li>
            </ul>

            {/* Newsletter */}
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Newsletter</h3>
            <p className="mb-3 text-xs text-[#8B9CB6]">Get insights and resources delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                name="newsletterEmail"
                required
                placeholder="Your email"
                className="w-full rounded-l-lg border border-[#1E2A3A] bg-[#0F1422] px-3 py-2 text-sm text-white placeholder-[#8B9CB6] focus:border-[#FBBF24]/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="rounded-r-lg bg-[#FBBF24] px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#F59E0B] disabled:opacity-60"
              >
                {newsletterLoading ? "..." : "Go"}
              </button>
            </form>
            {newsletterStatus && (
              <p className={`mt-2 text-xs ${newsletterStatus.startsWith("Subscribed") ? "text-green-400" : "text-red-400"}`}>
                {newsletterStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1E2A3A]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-[#8B9CB6]">
            &copy; {currentYear} WeTrainEducation & Tech. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legalLinks.map((l) => (
              <Link key={l.name} href={l.href} className="text-xs text-[#8B9CB6] transition-colors hover:text-[#FBBF24]">
                {l.name}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#8B9CB6]">
            Built by{" "}
            <span className="text-[#FBBF24]">WTE Tech Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
