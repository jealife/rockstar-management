import type { ValueItem } from "@/lib/content/types";

export default function ValueCard({ value, index }: { value: ValueItem; index: number }) {
  return (
    <div className="h-full border-t border-cream/15 pt-6 transition-colors duration-300 hover:border-brand-yellow">
      <span className="font-display text-sm font-semibold text-brand-yellow">{String(index).padStart(2, "0")}</span>
      <h3 className="mt-3 font-display text-xl font-semibold text-cream">{value.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/70">{value.description}</p>
    </div>
  );
}
