import type { Partner } from "@/lib/content/types";
import Marquee from "@/components/motion/Marquee";

// No partner logo files exist yet — a typographic wordmark marquee is a
// deliberate, tidy placeholder until real logos are supplied.
export default function PartnerStrip({ partners }: { partners: Partner[] }) {
  return (
    <Marquee>
      {partners.map((partner) => (
        <span key={partner.name} className="font-display text-base font-medium text-cream/50 sm:text-lg">
          {partner.name}
        </span>
      ))}
    </Marquee>
  );
}
