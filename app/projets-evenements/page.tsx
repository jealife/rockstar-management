import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import EventCard from "@/components/sections/EventCard";
import Reveal from "@/components/motion/Reveal";
import { getProjects } from "@/lib/data/projects";
import { getEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Projets & événements — Rock'Star Management",
  description:
    "PINDI Boungou Tour, Ngwali, Je T'Invoque, Lalala Ndoua, AFRICLAP, FIMI… Découvrez les projets et événements portés par Rock'Star Management.",
};

export default async function ProjetsEvenementsPage() {
  const [projects, events] = await Promise.all([getProjects(), getEvents()]);

  return (
    <>
      <section>
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="Créations" title="Projets artistiques" className="max-w-2xl" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-cream/10 bg-ink-soft">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Engagement" title="Événements soutenus" className="max-w-2xl" />
            <div className="mt-10">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
            <p className="mt-10 text-sm text-cream/50">
              Un agenda des prochains événements et des archives photo des éditions passées seront publiés
              prochainement.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
