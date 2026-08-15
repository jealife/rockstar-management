import Link from "next/link";
import type { CulturalEvent } from "@/lib/content/types";

export default function EventCard({ event }: { event: CulturalEvent }) {
  return (
    <Link
      href={`/projets-evenements/${event.slug}`}
      className="flex items-start justify-between gap-4 border-b border-cream/10 px-3 py-5 transition-colors hover:bg-brand-yellow/10"
    >
      <div>
        <h3 className="font-display text-base font-semibold text-cream">{event.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-cream/60">{event.description}</p>
      </div>
      <span className="shrink-0 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-cream/50">
        {event.dateLabel ?? "Édition passée"}
      </span>
    </Link>
  );
}
