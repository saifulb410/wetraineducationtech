"use client";

import {
  formatServiceCurrency,
  getServicePricing,
} from "@/app/utils/services/pricing";
import { createClient } from "@/app/utils/supabase/client";
import ServiceCard, {
  ServiceCardSkeleton,
} from "@/components/shared/ServiceCard";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string | null;
  priceNote: string;
  imageUrl?: string;
  features: string[];
}

export default function CoursesSection() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
          if (profile?.role === "admin") setIsAdmin(true);
        }

        const { data } = await supabase
          .from("services")
          .select("id, slug, title, details, key_features, featured_image_url, price, discount, currency")
          .eq("category", "course")
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const mapped: Course[] = data.map((service) => {
            const pricing = getServicePricing(
              service.price === null ? null : Number(service.price),
              service.discount === null ? null : Number(service.discount),
            );
            return {
              id: service.id as string,
              slug: service.slug as string,
              title: service.title ?? "",
              description: service.details ?? "",
              price: formatServiceCurrency(pricing.discountedPrice, service.currency ?? "BDT"),
              originalPrice: pricing.hasDiscount
                ? formatServiceCurrency(pricing.originalPrice, service.currency ?? "BDT")
                : null,
              priceNote: pricing.hasDiscount
                ? `Save ৳${pricing.savingsAmount} • ${pricing.savingsPercent}% off`
                : "",
              imageUrl: service.featured_image_url ?? undefined,
              features: Array.isArray(service.key_features) ? service.key_features : [],
            };
          });
          setCourses(mapped);
        }
      } catch {
        // Supabase unavailable (e.g. placeholder credentials) — show empty state
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section id="courses" className="relative overflow-hidden bg-[#0F1422] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#F97316] opacity-[0.05] blur-[120px]" />

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
            Our Courses
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Professional{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Training Courses
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Expert-led courses designed to boost your skills and advance your career
            with hands-on, real-world projects.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ServiceCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                className="h-full"
              >
                <ServiceCard
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  features={course.features}
                  imageUrl={course.imageUrl}
                  categoryLabel="Course"
                  categoryClassName="bg-amber-500/10 text-amber-400"
                  detailHref={`/courses/${course.slug}`}
                  ctaHref={isAdmin ? undefined : `/courses/${course.slug}`}
                  ctaLabel="Enroll Now"
                  ctaDisabled={isAdmin}
                  ctaTitle={isAdmin ? "Admins cannot purchase" : undefined}
                  priceLabel={course.price}
                  originalPriceLabel={course.originalPrice}
                  priceNote={course.priceNote}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">🚀</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Coming Soon</h3>
            <p className="text-[#8B9CB6]">
              Amazing training courses are on the way. Check back soon!
            </p>
          </div>
        )}

        {/* Bottom CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {courses.length > 3 && (
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-[#FBBF24] px-7 py-3 text-sm font-semibold text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/20 transition-all hover:bg-[#F59E0B]"
            >
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <Link
            href="/#proposal"
            className="inline-flex items-center gap-2 rounded-full border border-[#1E2A3A] bg-[#080B14] px-7 py-3 text-sm font-semibold text-white transition-all hover:border-[#FBBF24]/40"
          >
            Request Custom Training <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
