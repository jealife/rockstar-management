"use client";

import type { ValueItem } from "@/lib/content/types";
import StarMark from "@/components/brand/StarMark";
import { useSpotlight } from "@/components/motion/useSpotlight";

export default function ValueCard({ value }: { value: ValueItem }) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-full overflow-hidden rounded-2xl border border-cream/10 bg-ink-soft p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-yellow"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow">
        <StarMark className="h-4 w-4" variant="ink" />
      </div>
      <h3 className="relative mt-4 font-display text-xl font-semibold text-cream">{value.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-cream/70">{value.description}</p>
    </div>
  );
}
