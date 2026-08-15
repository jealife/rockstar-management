"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import StarMark from "@/components/brand/StarMark";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-gold-start), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-yellow), transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Container className="relative grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div
            variants={staggerItem}
            className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cream/60"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="inline-flex"
            >
              <StarMark className="h-4 w-4" />
            </motion.span>
            Association culturelle · Libreville, Gabon
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl font-semibold leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
          >
            La Maison des Artistes
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
            Rock'Star Management accompagne, structure et fait rayonner les artistes et les projets culturels du
            Gabon et d'Afrique.
          </motion.p>
          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-4">
            <Button href="/artistes" variant="primary">
              Découvrir nos artistes
            </Button>
            <Button href="/adherer" variant="outline">
              Rejoindre la Maison
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
