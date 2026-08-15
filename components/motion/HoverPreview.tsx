"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const HoverPreviewContext = createContext<(src: string | null) => void>(() => {});

// Floating thumbnail that trails the cursor and fades in whenever a row
// with a `coverImageUrl` is hovered — used on the projects/events list.
// Rows without an image simply never call setSrc, so nothing changes for
// them until a real image is added.
export default function HoverPreviewProvider({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <HoverPreviewContext.Provider value={setSrc}>
      {children}
      <AnimatePresence>
        {src ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed z-[60] h-44 w-64 overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={{ left: springX, top: springY, translateX: "28px", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Image src={src} alt="" fill sizes="256px" className="object-cover" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </HoverPreviewContext.Provider>
  );
}

export function useHoverPreview() {
  return useContext(HoverPreviewContext);
}
