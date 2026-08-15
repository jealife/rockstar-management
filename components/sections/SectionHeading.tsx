import StarMark from "@/components/brand/StarMark";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  onYellow = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Set when the section sits on a solid brand-yellow background — swaps
   * the star mark and text colors so they stay readable against the yellow. */
  onYellow?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div
          className={cn(
            "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]",
            onYellow ? "text-ink/60" : "text-cream/60",
            align === "center" && "justify-center",
          )}
        >
          <StarMark className="h-4 w-4" variant={onYellow ? "ink" : "gold"} />
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight sm:text-4xl",
          onYellow ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed", onYellow ? "text-ink/70" : "text-cream/70")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
