import { artists } from "@/lib/content/artists";
import type { Artist } from "@/lib/content/types";

// Phase 1: reads the static content file. Phase 2 swaps the body of these
// two functions for Supabase queries against the `artists` table — callers
// (pages) don't change.
export async function getArtists(): Promise<Artist[]> {
  return [...artists].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  return artists.find((artist) => artist.slug === slug) ?? null;
}
