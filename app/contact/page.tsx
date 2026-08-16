import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { siteInfo } from "@/lib/content/site-info";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact — Rock'Star Management | Libreville, Gabon",
  description:
    "Contactez Rock'Star Management pour un accompagnement artistique, une réservation de l'espace ou un partenariat. Libreville, Gabon.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ objet?: string }>;
}) {
  const { objet } = await searchParams;

  return (
    <section>
      <Container className="grid gap-14 pb-20 pt-36 sm:pb-28 sm:pt-44 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre projet"
            description="Une question, un projet, une envie de collaborer ? Écrivez-nous! Nous serons ravis d'échanger avec vous."
          />

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-cream/50">Adresse</dt>
              <dd className="mt-1 text-sm text-cream/70">{siteInfo.address}</dd>
            </div>
            {siteInfo.phone ? (
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-cream/50">Téléphone</dt>
                <dd className="mt-1 text-sm text-cream/70">{siteInfo.phone}</dd>
              </div>
            ) : null}
            {siteInfo.email ? (
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-cream/50">E-mail</dt>
                <dd className="mt-1 text-sm text-cream/70">{siteInfo.email}</dd>
              </div>
            ) : null}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm defaultSubject={objet} />
        </Reveal>
      </Container>
    </section>
  );
}
