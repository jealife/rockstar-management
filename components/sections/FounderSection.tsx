"use client";

import Image from "next/image";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { useSpotlight } from "@/components/motion/useSpotlight";
import type { TeamMember } from "@/lib/content/types";

export default function FounderSection({ founder }: { founder: TeamMember }) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLDivElement>();

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden border-b border-cream/10 bg-ink-soft"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />
      <Container className="relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.5fr] lg:items-start">
        <Reveal>
          {founder.photoUrl ? (
            <Image
              src={founder.photoUrl}
              alt={founder.name}
              width={640}
              height={640}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ) : (
            <MediaPlaceholder label="Photo à venir" />
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">{founder.roleTitle}</p>
          <p className="mt-6 text-base leading-relaxed text-cream/80">{founder.bio}</p>
          {founder.quote ? (
            <blockquote className="mt-8 border-l-2 border-brand-yellow pl-6 font-display text-xl italic leading-relaxed text-cream">
              « {founder.quote} »
            </blockquote>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
