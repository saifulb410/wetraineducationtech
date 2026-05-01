"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useImageError } from "@/hooks/useImageError";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { motion, useScroll } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { handleImageError, hasError } = useImageError();
  const supabase = createClient();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 20));
  }, [scrollY]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription?.unsubscribe();
  }, [supabase]);

  const navItems = [
    { id: "home", name: "Home", href: "/", type: "link" },
    { id: "about", name: "About", href: "/about", type: "link" },
    { id: "services", name: "Services", href: "/services", type: "dropdown" },
    { id: "projects", name: "Projects", href: "/#projects", type: "link" },
    { id: "certificates", name: "Certificates", href: "/#certificates", type: "link" },
    { id: "contact", name: "Contact", href: "/#proposal", type: "link" },
  ];

  const servicesSubmenu = [
    { name: "Courses", href: "/courses" },
    { name: "IT Services", href: "/software" },
    { name: "Marketing Services", href: "/marketing" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080B14]/90 backdrop-blur-xl border-b border-[#1E2A3A] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="WeTrainEducation & Tech — Home">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5"
          >
            {!hasError("logo") ? (
              <Image
                src="/favicon.png"
                alt="WeTrainEducation & Tech"
                width={38}
                height={38}
                className="h-9 w-9 rounded-lg"
                priority
                onError={() => handleImageError("logo")}
              />
            ) : (
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#4F8EF7] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm">
                W
              </div>
            )}
            <span className="hidden sm:inline font-bold text-white text-lg tracking-tight">
              WeTrain<span className="text-[#4F8EF7]">Education</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => item.type === "dropdown" && setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              {item.type === "dropdown" ? (
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#8B9CB6] hover:text-white transition-colors rounded-lg">
                  {item.name}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${hovered === item.id ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-[#8B9CB6] hover:text-white transition-colors rounded-lg block"
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown */}
              {item.type === "dropdown" && hovered === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-xl bg-[#0F1422] border border-[#1E2A3A] shadow-xl shadow-black/40 py-2 z-50"
                >
                  {servicesSubmenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#8B9CB6] hover:text-white hover:bg-[#1E2A3A] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4F8EF7]" />
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          {/* CTA */}
          {!loading && (
            <div className="ml-3">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-[#4F8EF7] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4F8EF7]/25 transition-all hover:bg-[#3B7AE8] hover:shadow-[#4F8EF7]/40"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-[#4F8EF7] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4F8EF7]/25 transition-all hover:bg-[#3B7AE8] hover:shadow-[#4F8EF7]/40"
                >
                  Get Started
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-lg p-2 text-[#8B9CB6] hover:text-white hover:bg-[#1E2A3A] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-[#1E2A3A] bg-[#0F1422]"
        >
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.type === "dropdown" ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#8B9CB6] hover:text-white rounded-lg hover:bg-[#1E2A3A] transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="ml-3 mt-1 space-y-1">
                        {servicesSubmenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#8B9CB6] hover:text-white rounded-lg hover:bg-[#1E2A3A] transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4F8EF7]" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-medium text-[#8B9CB6] hover:text-white rounded-lg hover:bg-[#1E2A3A] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            {!loading && (
              <div className="pt-2">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="block w-full text-center rounded-full bg-[#4F8EF7] px-4 py-2.5 text-sm font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full text-center rounded-full bg-[#4F8EF7] px-4 py-2.5 text-sm font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
