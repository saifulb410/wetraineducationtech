// components/CertificatesSection.tsx
"use client";

import { createClient } from "@/app/utils/supabase/client";
import { motion } from "framer-motion";
import { Award, ExternalLink, Shield } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  verifyUrl?: string;
  imageUrl?: string | null;
  icon?: React.ReactNode;
}

const achievements = [
  {
    number: "50+",
    label: "Professional Certifications",
    description: "Across multiple technology platforms",
  },
  {
    number: "100%",
    label: "Client Satisfaction",
    description: "In quality and delivery standards",
  },
  {
    number: "10+",
    label: "Years Experience",
    description: "In software development industry",
  },
  {
    number: "200+",
    label: "Projects Delivered",
    description: "Successfully completed worldwide",
  },
];

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const loadCerts = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("certifications")
        .select(
          "id, title, issuer, issued_at, description, credential_id, verify_url, image_url",
        )
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const mapped: Certificate[] = data.map((cert) => ({
          id: cert.id as string,
          title: cert.title ?? "",
          issuer: cert.issuer ?? "",
          date: cert.issued_at ?? "",
          description: cert.description ?? "",
          credentialId: cert.credential_id ?? undefined,
          verifyUrl: cert.verify_url ?? undefined,
          imageUrl: cert.image_url ?? null,
        }));
        setCertificates(mapped);
      }
    };

    loadCerts();
  }, []);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-[#080B14] py-24"
      aria-labelledby="certificates-heading"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#FBBF24] opacity-[0.04] blur-3xl" />
        <div className="absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-[#F97316] opacity-[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 px-4 py-2 text-sm font-medium text-[#FBBF24]">
            Trust & Credentials
          </span>
          <h2
            id="certificates-heading"
            className="mb-4 text-4xl font-bold text-white md:text-5xl"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Industry-recognized certifications and credentials that validate our
            expertise and commitment to excellence in technology and service
            delivery.
          </p>
        </motion.div>

        {/* Achievements Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#1E2A3A] bg-[#0F1422] p-6 text-center transition-all hover:border-[#FBBF24]/30"
            >
              <div className="mb-2 text-4xl font-bold text-[#FBBF24]">
                {achievement.number}
              </div>
              <div className="mb-1 font-semibold text-white">
                {achievement.label}
              </div>
              <div className="text-sm text-[#8B9CB6]">
                {achievement.description}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1E2A3A] bg-[#0F1422] transition-all hover:-translate-y-1 hover:border-[#FBBF24]/30 hover:shadow-xl hover:shadow-[#FBBF24]/5"
              >
                {/* A4 Landscape Image */}
                <div className="relative w-full overflow-hidden bg-[#141928]">
                  <div className="relative aspect-[297/210] w-full">
                    {certificate.imageUrl ? (
                      <>
                        <Image
                          src={certificate.imageUrl}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="scale-110 object-cover blur-2xl"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <Image
                          src={certificate.imageUrl}
                          alt={certificate.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain"
                        />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FBBF24] to-[#F97316] text-[#0A0A0A]">
                        {certificate.icon ?? <Award className="h-10 w-10" />}
                      </div>
                    )}
                  </div>

                  {certificate.issuer && (
                    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {certificate.issuer}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold leading-snug text-white">
                      {certificate.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#8B9CB6]">
                      {certificate.date}
                    </p>
                  </div>

                  {certificate.description && (
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-[#8B9CB6]">
                      {certificate.description}
                    </p>
                  )}

                  <div className="mt-auto rounded-xl border border-[#1E2A3A] bg-[#080B14] p-4">
                    {certificate.credentialId && (
                      <div className="mb-3">
                        <p className="mb-1 text-[11px] font-semibold tracking-wide text-[#8B9CB6]">
                          CREDENTIAL ID
                        </p>
                        <p className="break-all font-mono text-sm text-white">
                          {certificate.credentialId}
                        </p>
                      </div>
                    )}

                    {certificate.verifyUrl && (
                      <a
                        href={certificate.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#FBBF24]/30 bg-[#FBBF24]/5 py-2.5 text-sm font-semibold text-[#FBBF24] transition-all hover:bg-[#FBBF24]/10"
                      >
                        Verify Credential
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-96 flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 text-6xl">🏆</div>
            <h3 className="mb-3 text-3xl font-bold text-white">Coming Soon</h3>
            <p className="max-w-2xl text-xl text-[#8B9CB6]">
              We&apos;re gathering our professional certifications and
              achievements. Stay tuned!
            </p>
          </div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-[#FBBF24]/20 bg-gradient-to-r from-[#FBBF24]/5 to-[#F97316]/5 p-8"
        >
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Shield className="h-8 w-8 text-[#FBBF24]" />
              <h3 className="text-2xl font-bold text-white">
                Trusted by Industry Leaders
              </h3>
            </div>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-[#8B9CB6]">
              Our certifications and partnerships with leading technology
              providers ensure that we deliver solutions using industry best
              practices and cutting-edge technologies.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="rounded-full border border-[#1E2A3A] bg-[#0F1422] px-4 py-2 text-sm font-medium text-[#8B9CB6]">
                🏆 ISO Certified
              </span>
              <span className="rounded-full border border-[#1E2A3A] bg-[#0F1422] px-4 py-2 text-sm font-medium text-[#8B9CB6]">
                ☁️ Cloud Partners
              </span>
              <span className="rounded-full border border-[#1E2A3A] bg-[#0F1422] px-4 py-2 text-sm font-medium text-[#8B9CB6]">
                🔒 Security Compliant
              </span>
              <span className="rounded-full border border-[#1E2A3A] bg-[#0F1422] px-4 py-2 text-sm font-medium text-[#8B9CB6]">
                ✅ Quality Assured
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
