"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSpotlight } from "@/components/motion/useSpotlight";

export default function ApercuCard({
  title,
  description,
  cta,
  href,
}: {
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      href={href}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-cream/15 p-7 transition-colors hover:border-brand-yellow"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />
      <div className="relative">
        <h3 className="font-display text-xl font-semibold text-cream">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">{description}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cream">
        {cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
