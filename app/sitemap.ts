import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";
import { getArtists } from "@/lib/data/artists";
import { getProjects } from "@/lib/data/projects";
import { getEvents } from "@/lib/data/events";

const staticRoutes = [
  "",
  "/association",
  "/artistes",
  "/projets-evenements",
  "/services",
  "/espace",
  "/adherer",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artists, projects, events] = await Promise.all([getArtists(), getProjects(), getEvents()]);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const artistEntries = artists.map((artist) => ({
    url: `${siteUrl}/artistes/${artist.slug}`,
    lastModified: new Date(),
  }));

  const detailEntries = [...projects, ...events].map((item) => ({
    url: `${siteUrl}/projets-evenements/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...artistEntries, ...detailEntries];
}
