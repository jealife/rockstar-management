import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/lib/content/types";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artistes/${artist.slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-cream/10 transition-all group-hover:ring-2 group-hover:ring-brand-yellow">
        {artist.photoUrl ? (
          <Image
            src={artist.photoUrl}
            alt={artist.name}
            width={480}
            height={480}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <MediaPlaceholder label="Photo à venir" className="h-full" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 pt-12">
          <h3 className="font-display text-base font-semibold text-cream">{artist.name}</h3>
          <p className="text-xs text-cream/70">{artist.discipline}</p>
        </div>
      </div>
    </Link>
  );
}
