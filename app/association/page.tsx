import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import ValueCard from "@/components/sections/ValueCard";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";
import { values } from "@/lib/content/values";
import { realisations } from "@/lib/content/site-info";
import { getFounder, getBureauMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "À propos — Rock'Star Management | Association culturelle à Libreville",
  description:
    "Découvrez Rock'Star Management : notre histoire, notre vision, nos valeurs et la fondatrice Rocksia Mbemba, au service des artistes gabonais et africains.",
};

export default async function AssociationPage() {
  const [founder, bureau] = await Promise.all([getFounder(), getBureauMembers()]);

  return (
    <>
      <section className="border-b border-cream/10">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="L'association" title="Qui sommes-nous" className="max-w-3xl" />
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-cream/70">
              <p>
                Rock'Star Management est une association culturelle engagée dans l'accompagnement, la
                professionnalisation et la valorisation des artistes et des porteurs de projets culturels. Fondée en
                2024 à Libreville, la structure agit comme un incubateur artistique : management, communication,
                conseil stratégique, structuration administrative et développement de carrière.
              </p>
              <p>
                Parce que chaque artiste est unique, nous privilégions un accompagnement personnalisé, fondé sur
                l'écoute, la stratégie et la mise en valeur de son identité. Au-delà des artistes, nous concevons,
                promouvons et accompagnons des événements culturels qui participent au rayonnement du patrimoine
                gabonais et africain.
              </p>
              <p className="font-display text-xl font-medium text-cream">
                Plus qu'une structure de management, Rock'Star Management est une maison où les artistes trouvent des
                repères, des opportunités et une équipe qui croit en leur potentiel.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-cream/10 bg-brand-yellow">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Vision" title="Notre vision" className="max-w-3xl" onYellow />
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink/80">
              Nous rêvons d'un monde où les artistes africains ne sont plus seulement reconnus pour leur talent, mais
              aussi pour la qualité de leur organisation, la solidité de leurs projets et leur capacité à porter leur
              culture sur toutes les scènes. Notre ambition : faire de Rock'Star Management une référence de
              l'accompagnement artistique et du développement culturel en Afrique centrale, tout en contribuant au
              rayonnement international des artistes et des patrimoines gabonais.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-cream/10">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Ce qui nous guide" title="Nos valeurs" />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <ValueCard value={value} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {founder ? (
        <section className="border-b border-cream/10 bg-ink-soft">
          <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.5fr] lg:items-start">
            <Reveal>
              <MediaPlaceholder label="Photo à venir" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
                {founder.roleTitle}
              </p>
              <p className="mt-6 text-base leading-relaxed text-cream/80">{founder.bio}</p>
              {founder.quote ? (
                <blockquote className="mt-8 border-l-2 border-brand-yellow pl-6 font-display text-xl italic leading-relaxed text-cream">
                  « {founder.quote} »
                </blockquote>
              ) : null}
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-cream/10">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Gouvernance" title="Le bureau" />
            {bureau.length > 0 ? (
              <>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/60">
                  La présidence est assurée par la fondatrice, Rocksia Mbemba (voir ci-dessus).
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {bureau.map((member) => (
                    <div key={member.name} className="rounded-2xl border border-cream/10 bg-ink-soft p-6">
                      <MediaPlaceholder className="aspect-[4/3]" />
                      <h3 className="mt-4 font-display text-lg font-semibold text-cream">{member.name}</h3>
                      <p className="text-sm text-cream/60">{member.roleTitle}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-cream/60">
                La composition du bureau (Présidence, Secrétariat général, Trésorerie) sera publiée prochainement.
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Le bilan" title="Nos réalisations" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {realisations.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream/75">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/Rapport_Activites_RockStar_Management.pdf"
              download
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
            >
              Télécharger notre rapport d'activités
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
