import { projects } from "@/lib/content/projects";
import type { Project } from "@/lib/content/types";

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getProjectsByArtistSlug(artistSlug: string): Promise<Project[]> {
  return projects
    .filter((project) => project.relatedArtistSlugs.includes(artistSlug))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
