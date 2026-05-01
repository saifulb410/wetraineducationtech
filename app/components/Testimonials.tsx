"use client";

import { createClient } from "@/app/utils/supabase/client";
import { getPlaceholderImage, useImageError } from "@/hooks/useImageError";
import { motion } from "framer-motion";
import { Clock, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const stats = [
  { value: "4.9/5", label: "Client Rating", icon: Star },
  { value: "98%", label: "Retention Rate", icon: TrendingUp },
  { value: "24–48 hrs", label: "Avg. Response Time", icon: Clock },
  { value: "1,000+", label: "Projects Delivered", icon: Users },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<{
    name: string; role: string; text: string; avatar: string; achievement: string; rating: number;
  }[]>([]);
  const { handleImageError, hasError } = useImageError();

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("client_stories")
        .select("id, name, role, quote, achievement, rating, image_url")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setTestimonials(data.map((s) => ({
          name: s.name ?? "",
          role: s.role ?? "",
          text: s.quote ?? "",
          avatar: s.image_url ?? "",
          achievement: s.achievement ?? "",
          rating: Number(s.rating ?? 5),
        })));
      }
    };
    load();
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#0F1422] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-[#7C3AED] opacity-[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1E2A3A] bg-[#080B14] px-4 py-1.5 text-sm font-medium text-[#4F8EF7]">
            Client Stories
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] bg-clip-text text-transparent">
              Global Brands
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Real outcomes from real partnerships — strategy, creative, and performance working together.
          </p>
        </motion.div>

        {/* Testimonials */}
        {testimonials.length > 0 ? (
          <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-[#1E2A3A] bg-[#080B14] p-7 transition-all hover:border-[#4F8EF7]/30"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className={`h-4 w-4 ${si < t.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#1E2A3A]"}`} />
                  ))}
                </div>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#8B9CB6]">
                  &quot;{t.text}&quot;
                </p>

                <div className="flex items-center gap-3">
                  {t.avatar && !hasError(`avatar-${t.name}`) ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      height={44}
                      width={44}
                      className="h-11 w-11 rounded-full border border-[#1E2A3A] object-cover"
                      onError={() => handleImageError(`avatar-${t.name}`)}
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1E2A3A] bg-[#141928] text-sm font-bold text-[#4F8EF7]">
                      {t.avatar && hasError(`avatar-${t.name}`) ? (
                        <Image src={getPlaceholderImage("person")} alt="Placeholder" height={44} width={44} className="rounded-full object-cover" />
                      ) : (
                        t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")
                      )}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-[#8B9CB6]">{t.role}</p>
                  </div>
                </div>

                {t.achievement && (
                  <div className="mt-4 rounded-xl border border-[#4F8EF7]/20 bg-[#4F8EF7]/5 p-3 text-center">
                    <p className="text-xs text-[#8B9CB6]">Result</p>
                    <p className="text-sm font-bold text-[#4F8EF7]">{t.achievement}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mb-16 flex min-h-60 flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-5xl">💬</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Coming Soon</h3>
            <p className="text-[#8B9CB6]">Client testimonials and success stories are on their way.</p>
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 rounded-2xl border border-[#1E2A3A] bg-[#080B14] p-8 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F8EF7]/10 text-[#4F8EF7]">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mb-1 text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-[#8B9CB6]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
