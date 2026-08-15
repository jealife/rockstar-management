"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type StarMarkProps = {
  className?: string;
  variant?: "gold" | "ink" | "cream" | "current";
};

// Inline version of Logo/start.svg — a colorable brand mark used as a
// recurring accent next to headings, in loading states, and in the footer.
export default function StarMark({ className, variant = "gold" }: StarMarkProps) {
  const gradientId = useId();

  const fill =
    variant === "gold"
      ? `url(#${gradientId})`
      : variant === "ink"
        ? "var(--ink)"
        : variant === "cream"
          ? "var(--cream)"
          : "currentColor";

  return (
    <svg
      viewBox="0 0 671 668"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="79" y1="79" x2="590" y2="587" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--brand-gold-start)" />
          <stop offset="1" stopColor="var(--brand-gold-end)" />
        </linearGradient>
      </defs>
      <path
        d="M334.407 586.713C327.019 346.309 320.978 340.341 79.1992 332.957C320.978 325.61 326.981 319.604 334.407 79.2C341.796 319.604 347.837 325.572 589.616 332.957C347.837 340.341 341.834 346.236 334.407 586.713Z"
        fill={fill}
      />
    </svg>
  );
}
