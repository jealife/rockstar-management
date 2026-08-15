"use client";

import { useEffect, useRef, useState } from "react";

// Counts up to `value` when scrolled into view. Only pure integers ("6",
// "10"...) animate — anything else (e.g. "1,5 M FCFA") renders as-is.
// Checks visibility directly via getBoundingClientRect on mount + on
// scroll/resize, rather than IntersectionObserver, to avoid relying on its
// callback timing for the very first instance mounted on the page.
export default function AnimatedCounter({ value }: { value: string }) {
  const trimmed = value.trim();
  const target = /^\d+$/.test(trimmed) ? Number(trimmed) : null;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === null) return;
    let started = false;
    let frame: number | undefined;

    const checkAndStart = () => {
      if (started) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 80 && rect.bottom > 0;
      if (!inView) return;

      started = true;
      window.removeEventListener("scroll", checkAndStart);
      window.removeEventListener("resize", checkAndStart);

      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    checkAndStart();
    window.addEventListener("scroll", checkAndStart, { passive: true });
    window.addEventListener("resize", checkAndStart);
    return () => {
      window.removeEventListener("scroll", checkAndStart);
      window.removeEventListener("resize", checkAndStart);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target]);

  if (target === null) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>{display}</span>;
}
