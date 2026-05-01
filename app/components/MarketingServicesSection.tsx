"use client";

import { createClient } from "@/app/utils/supabase/client";
import { formatServiceCurrency, getServicePricing } from "@/app/utils/services/pricing";
import ServiceCard, { ServiceCardSkeleton } from "@/components/shared/ServiceCard";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MarketingService {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  features: string[];
  price: string;
  originalPrice: string | null;
  priceNote: string;
}

export default function MarketingServicesSection() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [services, setServices] = useState<MarketingService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
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
        .eq("category", "marketing")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setServices(data.map((service) => {
          const pricing = getServicePricing(
            service.price === null ? null : Number(service.price),
            service.discount === null ? null : Number(service.discount),
          );
          return {
            id: service.id as string,
            slug: service.slug as string,
            title: service.title ?? "",
            description: service.details ?? "",
            features: Array.isArray(service.key_features) ? service.key_features : [],
            price: formatServiceCurrency(pricing.discountedPrice, service.currency ?? "BDT"),
            originalPrice: pricing.hasDiscount
              ? formatServiceCurrency(pricing.originalPrice, service.currency ?? "BDT")
              : null,
            priceNote: pricing.hasDiscount
              ? `Save ৳${pricing.savingsAmount} • ${pricing.savingsPercent}% off`
              : "",
            imageUrl: service.featured_image_url ?? undefined,
          };
        }));
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <section id="marketing-services" className="relative overflow-hidden bg-[#080B14] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[350px] w-[350px] rounded-full bg-[#F97316] opacity-[0.04] blur-[120px]" />

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
            Marketing & Communication
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Grow Your{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Audience & Revenue
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Powerful marketing tools to reach your customers — WhatsApp, bulk SMS, lead management, and delivery tracking.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ServiceCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                className="h-full"
              >
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  imageUrl={service.imageUrl}
                  categoryLabel="Marketing"
                  categoryClassName="bg-amber-500/10 text-amber-400"
                  detailHref={`/marketing/${service.slug}`}
                  ctaHref={isAdmin ? undefined : service.id === "influencer-marketing" ? "/#proposal" : `/marketing/${service.slug}`}
                  ctaLabel={service.id === "influencer-marketing" ? "Get Quote" : "Get Started"}
                  ctaDisabled={isAdmin}
                  ctaTitle={isAdmin ? "Admins cannot purchase" : undefined}
                  priceLabel={service.price}
                  originalPriceLabel={service.originalPrice}
                  priceNote={service.priceNote}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">📣</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Coming Soon</h3>
            <p className="text-[#8B9CB6]">Powerful marketing services are on their way.</p>
          </div>
        )}

        {/* Bottom bundle banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#1E2A3A] bg-[#0F1422] p-8 sm:flex-row"
        >
          <div>
            <h3 className="mb-1 text-xl font-bold text-white">Need Multiple Services?</h3>
            <p className="text-sm text-[#8B9CB6]">Save up to 30% when you bundle marketing services. Custom packages available.</p>
          </div>
          <div className="flex shrink-0 gap-3">
            {services.length > 3 && (
              <Link
                href="/marketing"
                className="inline-flex items-center gap-2 rounded-full bg-[#FBBF24] px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F59E0B]"
              >
                All Services <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              href="/#proposal"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E2A3A] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#FBBF24]/40"
            >
              Custom Package
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
