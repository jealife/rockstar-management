"use client";

import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from "react";

// Cursor-follow glow used on card hovers (artists, projects, services…).
// Spread onto the card's own root element — no extra wrapper needed beyond
// one absolutely-positioned glow layer.
export function useSpotlight<T extends HTMLElement>(options?: { color?: string; radius?: number }) {
  const color = options?.color ?? "rgba(255,198,0,0.28)";
  const radius = options?.radius ?? 280;
  const ref = useRef<T>(null);
  const [glowStyle, setGlowStyle] = useState<CSSProperties>({ opacity: 0 });

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setGlowStyle({
        opacity: 1,
        background: `radial-gradient(${radius}px circle at ${x}% ${y}%, ${color}, transparent 70%)`,
      });
    },
    [color, radius],
  );

  const onMouseLeave = useCallback(() => setGlowStyle((s) => ({ ...s, opacity: 0 })), []);

  return { ref, onMouseMove, onMouseLeave, glowStyle };
}
