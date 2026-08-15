import { services } from "@/lib/content/services";
import type { Service } from "@/lib/content/types";

export async function getServices(): Promise<Service[]> {
  return [...services].sort((a, b) => a.displayOrder - b.displayOrder);
}
