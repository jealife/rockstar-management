"use client";

import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { ArrowUpRight } from "lucide-react";
import { useSpotlight } from "@/components/motion/useSpotlight";

export default function ProjectCard({ project }: { project: Project }) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      href={`/projets-evenements/${project.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-cream/10 bg-ink-soft p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-yellow"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={glowStyle}
      />
      <div className="relative">
        <h3 className="font-display text-xl font-semibold text-cream">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream/70">{project.description}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cream">
        Découvrir le projet
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
