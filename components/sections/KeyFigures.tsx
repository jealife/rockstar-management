import type { KeyFigure } from "@/lib/content/types";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

export default function KeyFigures({ figures }: { figures: KeyFigure[] }) {
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {figures.map((figure) => (
        <div key={figure.label}>
          <dt className="sr-only">{figure.label}</dt>
          <dd className="font-display text-4xl font-semibold text-brand-yellow sm:text-5xl">
            <AnimatedCounter value={figure.value} />
          </dd>
          <dd className="mt-1 text-sm text-cream/80">{figure.label}</dd>
        </div>
      ))}
    </dl>
  );
}
