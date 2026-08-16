"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import StarMark from "@/components/brand/StarMark";
import { useSpotlight } from "@/components/motion/useSpotlight";

export default function CtaBanner({
  title,
  buttonHref,
  buttonLabel,
}: {
  title: string;
  buttonHref: string;
  buttonLabel: string;
}) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLDivElement>({
    color: "rgba(14,11,1,0.12)",
    radius: 360,
  });

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden border-t border-cream/10 bg-brand-yellow"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 opacity-[0.12]"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <StarMark className="h-[28rem] w-[28rem]" variant="ink" />
      </motion.div>

      <Container className="relative flex flex-col items-start gap-8 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <Reveal>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href={buttonHref} variant="secondary" className="group shrink-0">
            {buttonLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
