import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/sections/SectionHeading";
import ServiceCard from "@/components/sections/ServiceCard";
import Reveal from "@/components/motion/Reveal";
import { getServices } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Nos services — Rock'Star Management",
  description:
    "Management artistique, développement de carrière, structuration administrative, communication, promotion digitale, production et organisation d'événements.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Accompagnement"
              title="Nos services"
              description="Nous ne proposons pas un accompagnement standardisé. Nous prenons le temps de comprendre chaque artiste et chaque projet pour construire un accompagnement sur mesure, autour de trois convictions : révéler le potentiel, structurer les ambitions, faire rayonner les talents."
              className="max-w-2xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.06}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-cream/10 bg-brand-yellow">
        <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Prêt à construire votre accompagnement sur mesure ?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/contact" variant="secondary">
              Demander un accompagnement
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
