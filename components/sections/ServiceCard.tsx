"use client";

import type { Service } from "@/lib/content/types";
import StarMark from "@/components/brand/StarMark";
import { useSpotlight } from "@/components/motion/useSpotlight";

export default function ServiceCard({ service }: { service: Service }) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-full overflow-hidden bg-ink p-7 transition-colors duration-300 hover:bg-brand-yellow/10"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow">
        <StarMark className="h-4 w-4" variant="ink" />
      </div>
      <h3 className="relative mt-4 font-display text-lg font-semibold text-cream">{service.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-cream/70">{service.description}</p>
    </div>
  );
}
