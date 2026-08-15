import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import ArtistCard from "@/components/sections/ArtistCard";
import Reveal from "@/components/motion/Reveal";
import { getArtists } from "@/lib/data/artists";
import { artists } from "@/lib/content/artists";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nos artistes — Rock'Star Management",
  description:
    "Orphée NYNY, Éloquent Grand B, PINDI, Nan's, Ndoki, Tina Minkoué : découvrez les artistes accompagnés par Rock'Star Management au Gabon.",
  path: "/artistes",
  image: artists.find((a) => a.photoUrl)?.photoUrl ?? undefined,
});

export default async function ArtistesPage() {
  const artists = await getArtists();

  return (
    <section>
      <Container className="pb-20 pt-36 sm:pb-28 sm:pt-44">
        <Reveal>
          <SectionHeading
            eyebrow="Le roster"
            title="Nos artistes"
            description="Chez Rock'Star Management, chaque artiste porte une histoire et un univers. Nous les accompagnons dans la structuration de leur carrière, le développement de leur image et le rayonnement de leur art."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={(i % 4) * 0.06}>
              <ArtistCard artist={artist} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
