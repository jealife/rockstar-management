import type { Metadata } from "next";
import { siteUrl } from "./site-config";

// Site-wide fallback OG image — the founder's portrait, until dedicated
// visuals exist per page (artist/project pages pass their own via `image`).
export const DEFAULT_OG_IMAGE = "/team/rocksia-mbemba.avif";

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rock'Star Management",
      locale: "fr_FR",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
