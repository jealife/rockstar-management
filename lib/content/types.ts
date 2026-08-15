// Shapes mirror the planned Supabase tables (see supabase/migrations/0001_init.sql)
// so that swapping lib/data/* from static content to Supabase queries later is a
// mechanical change, not a redesign.

export type Artist = {
  slug: string;
  name: string;
  stageName: string | null;
  discipline: string;
  bio: string;
  artisticUniverse: string | null;
  photoUrl: string | null;
  gallery: string[];
  streamingLinks: Record<string, string>;
  socialLinks: Record<string, string>;
  bookingContact: string | null;
  schemaType: "Person" | "MusicGroup";
  displayOrder: number;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  relatedArtistSlugs: string[];
  displayOrder: number;
};

export type CulturalEvent = {
  slug: string;
  title: string;
  description: string;
  eventType: "soutenu" | "agenda";
  dateStart: string | null; // ISO date, null when not yet confirmed
  dateLabel: string | null; // human label used when dateStart is unknown, e.g. "2024–2026"
  venue: string | null;
  ticketUrl: string | null;
  coverImageUrl: string | null;
  displayOrder: number;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  displayOrder: number;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  roleCategory: "fondatrice" | "bureau";
  roleTitle: string;
  bio: string | null;
  quote: string | null;
  photoUrl: string | null;
  displayOrder: number;
};

export type Partner = {
  name: string;
  websiteUrl: string | null;
  displayOrder: number;
};

export type KeyFigure = {
  value: string;
  label: string;
};
