import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Reveal from "@/components/motion/Reveal";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";
import { getEventBySlug, getEvents } from "@/lib/data/events";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const [projects, events] = await Promise.all([getProjects(), getEvents()]);
  return [...projects.map((p) => ({ slug: p.slug })), ...events.map((e) => ({ slug: e.slug }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const event = project ? null : await getEventBySlug(slug);
  const item = project ?? event;
  if (!item) return {};

  return buildMetadata({
    title: `${item.title} — Rock'Star Management`,
    description: item.description,
    path: `/projets-evenements/${item.slug}`,
    image: item.coverImageUrl ?? undefined,
  });
}

export default async function ProjetEvenementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const event = project ? null : await getEventBySlug(slug);

  if (!project && !event) notFound();

  // Event JSON-LD needs a confirmed startDate/location to be valid — omitted
  // until real dates are supplied (see lib/content/events.ts).
  const jsonLd =
    event && event.dateStart
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.description,
          startDate: event.dateStart,
          location: event.venue ? { "@type": "Place", name: event.venue } : undefined,
        }
      : null;

  const item = project ?? event!;
  const kicker = project ? "Projet artistique" : event!.dateLabel ?? "Événement soutenu";

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <section>
        <Container className="grid gap-10 pb-20 pt-36 sm:pb-28 sm:pt-44 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal>
            {item.coverImageUrl ? (
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                width={640}
                height={640}
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ) : (
              <MediaPlaceholder label="Visuel à venir" />
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/50">{kicker}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-cream sm:text-5xl">{item.title}</h1>
            <p className="mt-6 text-base leading-relaxed text-cream/70">{item.description}</p>
            {event?.venue ? <p className="mt-6 text-sm font-medium text-cream/60">Lieu : {event.venue}</p> : null}
          </Reveal>
        </Container>
      </section>
      <section className="border-t border-cream/10">
        <Container className="py-12 text-sm text-cream/50">
          <Link href="/projets-evenements" className="hover:underline">
            ← Projets & événements
          </Link>
        </Container>
      </section>
    </>
  );
}
