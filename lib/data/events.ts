import { events } from "@/lib/content/events";
import type { CulturalEvent } from "@/lib/content/types";

export async function getEvents(): Promise<CulturalEvent[]> {
  return [...events].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getEventBySlug(slug: string): Promise<CulturalEvent | null> {
  return events.find((event) => event.slug === slug) ?? null;
}
