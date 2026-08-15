import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/motion/CustomCursor";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-display",
  weight: "200 700",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "./fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-sans",
  weight: "200 700",
  display: "swap",
});

// Every page below sets its own full `metadata.title`, transcribed verbatim
// from the content kit's SEO titles (which already include the brand name) —
// so there's no title template here, just a default for any untitled route.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rock'Star Management — La Maison des Artistes",
  description:
    "Association culturelle à Libreville : management, structuration et promotion des artistes gabonais et africains.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rock'Star Management",
  alternateName: "La Maison des Artistes",
  description:
    "Association culturelle engagée dans l'accompagnement, la professionnalisation et la valorisation des artistes et des porteurs de projets culturels au Gabon.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bas de Gué-Gué, derrière l'école publique",
    addressLocality: "Libreville",
    addressCountry: "GA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${generalSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
