"use client";

import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { ArrowUpRight } from "lucide-react";
import { useHoverPreview } from "@/components/motion/HoverPreview";

export default function ProjectCard({ project }: { project: Project }) {
  const setPreview = useHoverPreview();

  return (
    <Link
      href={`/projets-evenements/${project.slug}`}
      onMouseEnter={() => project.coverImageUrl && setPreview(project.coverImageUrl)}
      onMouseLeave={() => setPreview(null)}
      className="group flex flex-col gap-4 border-b border-cream/10 px-3 py-8 transition-colors hover:bg-brand-yellow/10 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
    >
      <div>
        <h3 className="font-display text-2xl font-semibold text-cream transition-colors group-hover:text-brand-yellow sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/60">{project.description}</p>
      </div>
      <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-cream/50 transition-colors group-hover:text-brand-yellow">
        Découvrir
        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}
