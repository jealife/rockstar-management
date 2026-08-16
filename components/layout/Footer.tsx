import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Reveal from "@/components/motion/Reveal";
import { mainNav } from "@/lib/nav";
import { siteInfo } from "@/lib/content/site-info";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-brand-yellow text-ink">
      <Container className="py-16">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <Image
                src="/brand/logo-rockstar.svg"
                alt="Rock'Star Management"
                width={163}
                height={70}
                className="h-10 w-auto"
              />
              <p className="mt-4 max-w-xs text-sm font-medium text-ink/70">La Maison des Artistes</p>
              <p className="mt-6 text-sm text-ink/70">{siteInfo.address}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Navigation</h3>
              <ul className="mt-4 space-y-2.5">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm font-medium text-ink hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/adherer" className="text-sm font-medium text-ink hover:underline">
                    Adhérer
                  </Link>
                </li>
              </ul>
            </div>

            <div id="newsletter" className="scroll-mt-24">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Newsletter</h3>
              <p className="mt-4 text-sm text-ink/70">
                Recevez les actualités de la Maison : sorties, événements, appels à candidatures et opportunités.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink/15 pt-8 text-xs text-ink/60 sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} Rock'Star Management. Tous droits réservés.</span>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.1}>
        <p
          aria-hidden="true"
          className="text-wordmark-shimmer select-none overflow-hidden whitespace-nowrap px-4 pb-4 text-center font-display text-[18vw] font-semibold leading-none sm:text-[15vw]"
        >
          Rock'Star
        </p>
      </Reveal>
    </footer>
  );
}
