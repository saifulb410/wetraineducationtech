"use client";

import { createClient } from "@/app/utils/supabase/client";
import { getPlaceholderImage, useImageError } from "@/hooks/useImageError";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { handleImageError, hasError } = useImageError();

  useEffect(() => {
    const loadProjects = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("featured_projects")
        .select("id, title, description, featured_image_url, category, tech_stack, live_url, github_url")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setProjects(data.map((p) => ({
          id: p.id as string,
          title: p.title ?? "",
          description: p.description ?? "",
          imageUrl: p.featured_image_url ?? undefined,
          category: p.category ?? "",
          tech: Array.isArray(p.tech_stack) ? p.tech_stack : [],
          liveUrl: p.live_url ?? undefined,
          githubUrl: p.github_url ?? undefined,
        })));
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#080B14] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[350px] rounded-full bg-[#FBBF24] opacity-[0.04] blur-[120px]" />

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
            Our Portfolio
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8B9CB6]">
            Explore our best work across industries — quality, innovation, and measurable results.
          </p>
        </motion.div>

        {/* Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1E2A3A] bg-[#0F1422] transition-all hover:border-[#FBBF24]/30 hover:shadow-lg hover:shadow-[#FBBF24]/5"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#141928]">
                  {project.imageUrl && !hasError(project.id) ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(project.id)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      {project.imageUrl && hasError(project.id) ? (
                        <Image src={getPlaceholderImage("project")} alt="Placeholder" fill className="object-cover" />
                      ) : (
                        <div className="text-center">
                          <div className="mb-2 text-4xl">🚀</div>
                          <p className="text-sm text-[#8B9CB6]">{project.category}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24] text-[#0A0A0A] transition-all hover:bg-[#F59E0B]" aria-label="View live">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20" aria-label="View on GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FBBF24]">
                    {project.category}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-white">{project.title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-[#8B9CB6]">{project.description}</p>
                  <div className="border-t border-[#1E2A3A] pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, ti) => (
                        <span key={ti} className="rounded-full border border-[#1E2A3A] bg-[#141928] px-3 py-1 text-xs font-medium text-[#8B9CB6]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">🚀</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Coming Soon</h3>
            <p className="text-[#8B9CB6]">Exciting projects are on their way. Check back soon!</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/#proposal"
            className="inline-flex items-center gap-2 rounded-full bg-[#FBBF24] px-7 py-3.5 text-base font-semibold text-[#0A0A0A] shadow-lg shadow-[#FBBF24]/20 transition-all hover:bg-[#F59E0B] hover:-translate-y-0.5"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
