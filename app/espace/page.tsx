import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/sections/SectionHeading";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";
import { siteInfo } from "@/lib/content/site-info";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Notre espace culturel — Rock'Star Management | Scène & résidence à Libreville",
  description:
    "Un espace culturel à Libreville : scène, sonorisation, studio de résidence et lieu de 200 places pour la création, la répétition et la diffusion artistiques.",
  path: "/espace",
});

export default function EspacePage() {
  return (
    <>
      <section>
        <Container className="grid gap-10 pb-20 pt-36 sm:pb-28 sm:pt-44 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeading eyebrow="Le lieu" title="Notre espace" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-cream/70">
              <p>
                Au cœur de Libreville, Rock'Star Management met à la disposition des artistes un véritable espace
                d'expression : une scène en plein air, une sonorisation, un terrain d'une capacité d'environ 200
                places et un studio de résidence (chambre, salon, cuisine, sanitaires). Dans un milieu où les lieux
                dédiés à la création manquent, cet espace est un outil collectif pensé pour faire grandir les
                talents.
              </p>
              <p>
                On y répète, on y crée, on y accueille des résidences et on y organise des événements au bénéfice
                des artistes — un tremplin pour se préparer aux grandes scènes et aux festivals internationaux.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <MediaPlaceholder label="Galerie photos à venir" className="aspect-auto h-full min-h-[320px]" />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-cream/10 bg-ink-soft">
        <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-brand-yellow p-8">
              <h2 className="font-display text-xl font-semibold text-ink">Résidence artistique</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                Notre studio de résidence permet aux artistes de se consacrer pleinement à la création et à la
                préparation de leurs projets, dans un cadre professionnel. Les résidences sont ouvertes aux membres
                selon les disponibilités.
              </p>
              <Button href="/contact?objet=residence" variant="secondary" className="mt-6">
                Candidater à une résidence
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-brand-yellow p-8">
              <h2 className="font-display text-xl font-semibold text-ink">Réserver l'espace</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                Vous organisez un concert, un spectacle ou une rencontre culturelle ? L'espace, la scène et la
                sonorisation peuvent être mis à disposition (capacité : 200 personnes).
              </p>
              <Button href="/contact?objet=reservation" variant="secondary" className="mt-6">
                Réserver l'espace
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-cream/10">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-cream">Infos pratiques</h2>
            <dl className="mt-8 grid gap-8 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-cream/50">Adresse</dt>
                <dd className="mt-2 text-sm text-cream/70">{siteInfo.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-cream/50">Capacité</dt>
                <dd className="mt-2 text-sm text-cream/70">{siteInfo.venueCapacity}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-cream/50">Équipements</dt>
                <dd className="mt-2 space-y-1 text-sm text-cream/70">
                  {siteInfo.venueEquipment.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </dd>
              </div>
            </dl>
            <p className="mt-10 text-sm text-cream/50">
              Plan d'accès, galerie photos du lieu et horaires seront ajoutés prochainement.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
