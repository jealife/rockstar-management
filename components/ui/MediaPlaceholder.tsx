import StarMark from "@/components/brand/StarMark";
import { cn } from "@/lib/utils";

// Used wherever a photo/cover isn't supplied yet (all artist, team, and
// event media in v1) so the layout still reads as intentional, not broken.
export default function MediaPlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border border-cream/10 bg-ink-soft text-cream",
        className,
      )}
    >
      <StarMark className="h-8 w-8" variant="gold" />
      {label ? <span className="px-4 text-center text-xs font-medium text-cream/60">{label}</span> : null}
    </div>
  );
}
