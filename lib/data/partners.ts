import { partners } from "@/lib/content/partners";
import type { Partner } from "@/lib/content/types";

export async function getPartners(): Promise<Partner[]> {
  return [...partners].sort((a, b) => a.displayOrder - b.displayOrder);
}
