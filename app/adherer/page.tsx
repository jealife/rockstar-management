import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import AdherentForm from "@/components/forms/AdherentForm";
import Reveal from "@/components/motion/Reveal";
import { membershipPricing } from "@/lib/content/site-info";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Adhérer — Rock'Star Management | Rejoindre la Maison des Artistes",
  description:
    "Rejoignez Rock'Star Management : accompagnement artistique, accès à l'espace et à la résidence. Adhésion 5 000 FCFA, cotisation 5 000 FCFA par trimestre.",
  path: "/adherer",
});

export default function AdhererPage() {
  return (
    <>
      <section className="border-b border-cream/10">
        <Container className="pb-20 pt-36 sm:pb-28 sm:pt-44">
          <Reveal>
            <SectionHeading
              eyebrow="Rejoindre"
              title="Nous rejoindre"
              description="Rejoindre Rock'Star Management, c'est intégrer une maison qui croit en vous : accompagnement professionnel, accès à un espace de création et de diffusion, réseau de partenaires et opportunités de scène. Ensemble, nous faisons grandir votre carrière et rayonner la culture."
              className="max-w-2xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-brand-yellow/30 bg-ink-soft p-7">
                <h3 className="font-display text-lg font-semibold text-cream">Droit d'adhésion</h3>
                <p className="mt-2 text-2xl font-semibold text-brand-yellow">{membershipPricing.droitAdhesion}</p>
                <p className="mt-4 text-sm text-cream/60">
                  Une carte d'adhérent nominative est remise à chaque membre.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-brand-yellow/30 bg-ink-soft p-7">
                <h3 className="font-display text-lg font-semibold text-cream">Cotisation</h3>
                <ul className="mt-2 space-y-1 text-sm text-cream/70">
                  {membershipPricing.cotisations.map((c) => (
                    <li key={c.periode}>
                      {c.periode} — <span className="font-semibold text-brand-yellow">{c.montant}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-cream/50">{membershipPricing.cotisationNote}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-8 rounded-2xl border border-cream/10 p-7">
              <h3 className="font-display text-lg font-semibold text-cream">Pour les artistes</h3>
              <p className="mt-2 text-sm text-cream/70">
                Les artistes qui rejoignent la Maison signent un contrat d'accompagnement et choisissent leur formule
                :
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {membershipPricing.formules.map((f) => (
                  <div key={f.nom} className="rounded-xl bg-ink-soft p-4">
                    <p className="font-semibold text-cream">
                      {f.nom} <span className="text-cream/50">— {f.commission}</span>
                    </p>
                    <p className="mt-1 text-sm text-cream/60">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-cream">Formulaire d'adhésion</h2>
            <div className="mt-10 max-w-2xl">
              <AdherentForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
