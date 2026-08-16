"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";
import StarMark from "@/components/brand/StarMark";
import { useSpotlight } from "@/components/motion/useSpotlight";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { Artist } from "@/lib/content/types";

export default function ArtistHero({ artist }: { artist: Artist }) {
  const { ref, onMouseMove, onMouseLeave, glowStyle } = useSpotlight<HTMLDivElement>();
  const links = { ...artist.streamingLinks, ...artist.socialLinks };
  const linkEntries = Object.entries(links);

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden border-b border-cream/10"
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={glowStyle} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 -top-24 hidden opacity-50 lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 120px rgba(255,198,0,0.2))" }}
      >
        <StarMark className="h-[38rem] w-[38rem]" />
      </motion.div>

      <Container className="relative grid gap-12 pb-20 pt-36 sm:pb-28 sm:pt-44 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            {artist.photoUrl ? (
              <Image
                src={artist.photoUrl}
                alt={artist.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            ) : (
              <MediaPlaceholder label="Photo à venir" className="aspect-[4/5] h-full" />
            )}
          </div>
        </Reveal>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={staggerItem}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow"
          >
            {artist.discipline}
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="mt-3 font-display text-6xl font-semibold leading-[0.95] text-cream sm:text-7xl lg:text-8xl"
          >
            {artist.name}
          </motion.h1>
          {artist.stageName && artist.stageName !== artist.name ? (
            <motion.p variants={staggerItem} className="mt-3 text-sm text-cream/50">
              Nom de scène : {artist.stageName}
            </motion.p>
          ) : null}
          <motion.p variants={staggerItem} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
            {artist.bio}
          </motion.p>
          {artist.artisticUniverse ? (
            <motion.blockquote
              variants={staggerItem}
              className="mt-6 max-w-xl border-l-2 border-brand-yellow pl-6 font-display text-xl italic leading-relaxed text-cream"
            >
              {artist.artisticUniverse}
            </motion.blockquote>
          ) : null}

          {linkEntries.length > 0 ? (
            <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
              {linkEntries.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream/70 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                >
                  {platform}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </motion.div>
          ) : null}

          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact?objet=booking" variant="primary">
              Contact / booking
            </Button>
            <Button href="/artistes" variant="outline">
              Retour aux artistes
            </Button>
          </motion.div>
          {artist.bookingContact ? (
            <motion.p variants={staggerItem} className="mt-4 text-sm text-cream/50">
              {artist.bookingContact}
            </motion.p>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
