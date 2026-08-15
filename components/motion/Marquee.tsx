import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Seamless infinite scroll: content is duplicated once and the wrapper
// animates -50% via CSS (see .animate-marquee in globals.css), so the loop
// point is invisible. Pauses on hover.
export default function Marquee({
  children,
  className,
  durationSeconds = 28,
}: {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
}) {
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div
        className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex items-center gap-16">{children}</div>
        <div className="flex items-center gap-16" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
