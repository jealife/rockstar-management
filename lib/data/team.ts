import { bureauMembers, teamMembers } from "@/lib/content/team";
import type { TeamMember } from "@/lib/content/types";

export async function getFounder(): Promise<TeamMember | null> {
  return teamMembers.find((member) => member.roleCategory === "fondatrice") ?? null;
}

export async function getBureauMembers(): Promise<TeamMember[]> {
  return [...bureauMembers].sort((a, b) => a.displayOrder - b.displayOrder);
}
