"use client";

import type { Service } from "@/lib/content/types";
import { useSpotlight } from "@/components/motion/useSpotlight";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-full overflow-hidden bg-ink p-7 transition-colors duration-300 hover:bg-brand-yellow/10"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />
      <span className="relative font-display text-sm font-semibold text-brand-yellow">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="relative mt-3 font-display text-lg font-semibold text-cream">{service.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-cream/70">{service.description}</p>
    </div>
  );
}
