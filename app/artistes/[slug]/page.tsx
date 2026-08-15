import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import ProjectCard from "@/components/sections/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import HoverPreviewProvider from "@/components/motion/HoverPreview";
import { getArtistBySlug, getArtists } from "@/lib/data/artists";
import { getProjectsByArtistSlug } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const artists = await getArtists();
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return {};

  return buildMetadata({
    title: `${artist.name} — Rock'Star Management`,
    description: artist.bio,
    path: `/artistes/${artist.slug}`,
    image: artist.photoUrl ?? undefined,
  });
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const relatedProjects = await getProjectsByArtistSlug(artist.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": artist.schemaType,
    name: artist.name,
    description: artist.bio,
    ...(artist.schemaType === "Person" ? { jobTitle: artist.discipline } : { genre: artist.discipline }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section>
        <Container className="grid gap-10 pb-20 pt-36 sm:pb-28 sm:pt-44 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <Reveal>
            {artist.photoUrl ? (
              <Image
                src={artist.photoUrl}
                alt={artist.name}
                width={640}
                height={640}
                priority
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ) : (
              <MediaPlaceholder label="Photo à venir" />
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/50">{artist.discipline}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-cream sm:text-5xl">{artist.name}</h1>
            <p className="mt-6 text-base leading-relaxed text-cream/70">{artist.bio}</p>
            {artist.artisticUniverse ? (
              <p className="mt-4 text-base leading-relaxed text-cream/70">{artist.artisticUniverse}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact?objet=booking" variant="primary">
                Contact / booking
              </Button>
              <Button href="/artistes" variant="outline">
                Retour aux artistes
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-cream/10 bg-ink-soft">
          <Container className="py-20 sm:py-24">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-cream">Projets</h2>
              <HoverPreviewProvider>
                <div className="mt-4">
                  {relatedProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </HoverPreviewProvider>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-cream/10">
        <Container className="py-12 text-sm text-cream/50">
          <Link href="/artistes" className="hover:underline">
            ← Tous les artistes
          </Link>
        </Container>
      </section>
    </>
  );
}
