import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ArtistHero from "@/components/sections/ArtistHero";
import ArtistCard from "@/components/sections/ArtistCard";
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

  const [relatedProjects, allArtists] = await Promise.all([
    getProjectsByArtistSlug(artist.slug),
    getArtists(),
  ]);
  const otherArtists = allArtists.filter((a) => a.slug !== artist.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": artist.schemaType,
    name: artist.name,
    description: artist.bio,
    ...(artist.schemaType === "Person" ? { jobTitle: artist.discipline } : { genre: artist.discipline }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArtistHero artist={artist} />

      {artist.gallery.length > 0 ? (
        <section className="border-b border-cream/10 bg-ink-soft">
          <Container className="py-20 sm:py-24">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-cream">Galerie</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {artist.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.06}>
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`${artist.name} — photo ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <section className="border-b border-cream/10">
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

      {otherArtists.length > 0 ? (
        <section>
          <Container className="py-20 sm:py-24">
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-2xl font-semibold text-cream">Découvrir d&apos;autres artistes</h2>
                <Link
                  href="/artistes"
                  className="hidden text-sm font-semibold text-cream/70 transition-colors hover:text-brand-yellow sm:block"
                >
                  Voir tous les artistes
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {otherArtists.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.06}>
                  <ArtistCard artist={a} />
                </Reveal>
              ))}
            </div>
            <div className="mt-8 sm:hidden">
              <Link href="/artistes" className="text-sm font-semibold text-cream/70 hover:text-brand-yellow">
                ← Voir tous les artistes
              </Link>
            </div>
          </Container>
        </section>
      ) : (
        <section className="border-t border-cream/10">
          <Container className="py-12 text-sm text-cream/50">
            <Link href="/artistes" className="hover:underline">
              ← Tous les artistes
            </Link>
          </Container>
        </section>
      )}
    </>
  );
}
