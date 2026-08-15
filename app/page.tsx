import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/sections/SectionHeading";
import KeyFigures from "@/components/sections/KeyFigures";
import ArtistCard from "@/components/sections/ArtistCard";
import PartnerStrip from "@/components/sections/PartnerStrip";
import Reveal from "@/components/motion/Reveal";
import { getArtists } from "@/lib/data/artists";
import { getPartners } from "@/lib/data/partners";
import { keyFigures } from "@/lib/content/key-figures";

export const metadata: Metadata = {
  title: "Rock'Star Management — La Maison des Artistes | Accompagnement artistique au Gabon",
  description:
    "Association culturelle à Libreville : management, structuration et promotion des artistes. Une scène, un studio de résidence et un lieu de 200 places.",
};

const apercus = [
  {
    title: "Nos artistes",
    description: "Des voix singulières, des univers forts. Découvrez les artistes que nous accompagnons au quotidien.",
    cta: "Voir tous les artistes",
    href: "/artistes",
  },
  {
    title: "Nos services",
    description:
      "Du management à la production, un accompagnement sur mesure pensé pour chaque artiste et chaque projet.",
    cta: "Découvrir nos services",
    href: "/services",
  },
  {
    title: "Notre espace",
    description:
      "Une scène, une sonorisation, un studio de résidence et un lieu de 200 places au cœur de Libreville, dédié à la création, à la répétition et à la diffusion.",
    cta: "Visiter le lieu",
    href: "/espace",
  },
];

export default async function HomePage() {
  const [artists, partners] = await Promise.all([getArtists(), getPartners()]);
  const featuredArtists = artists.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Présentation courte */}
      <section className="border-t border-cream/10 bg-ink-soft">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <p className="max-w-3xl font-display text-2xl font-medium leading-snug text-cream sm:text-3xl">
              Née de la conviction que le talent mérite un cadre propice à son épanouissement, Rock'Star Management
              est bien plus qu'une agence : une maison où les artistes trouvent des repères, des opportunités et une
              équipe qui croit profondément en leur potentiel. De la structuration administrative au développement
              de carrière, nous accompagnons chaque créateur à chaque étape de son parcours.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Chiffres clés */}
      <section className="border-t border-cream/10 bg-ink">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <KeyFigures figures={keyFigures} />
          </Reveal>
        </Container>
      </section>

      {/* Aperçus */}
      <section className="border-t border-cream/10">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="L'essentiel" title="Une maison, plusieurs chemins vers la scène" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {apercus.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.08}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-cream/15 p-7 transition-colors hover:border-brand-yellow hover:bg-brand-yellow/10"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold text-cream">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/70">{item.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cream">
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Nos artistes */}
      <section className="border-t border-cream/10 bg-ink-soft">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Le roster" title="Nos artistes" />
              <Link
                href="/artistes"
                className="text-sm font-semibold text-cream underline decoration-brand-yellow decoration-2 underline-offset-4"
              >
                Voir tous les artistes
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {featuredArtists.map((artist, i) => (
              <Reveal key={artist.slug} delay={i * 0.06}>
                <ArtistCard artist={artist} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Partenaires */}
      <section className="border-t border-cream/10">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cream/50">
              Ils nous font confiance
            </p>
          </Reveal>
          <div className="mt-8">
            <PartnerStrip partners={partners} />
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-brand-yellow">
        <Container className="flex flex-col items-start gap-8 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Vous êtes artiste ? Rejoignez la Maison des Artistes.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Bénéficiez d'un accompagnement professionnel et d'un espace pour créer, répéter et vous produire.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-4">
            <Button href="/adherer" variant="secondary">
              Adhérer
            </Button>
            <Button
              href="#newsletter"
              variant="outline"
              className="border-ink text-ink hover:bg-ink hover:text-brand-yellow"
            >
              S'inscrire à la newsletter
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
