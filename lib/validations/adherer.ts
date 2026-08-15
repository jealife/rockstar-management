import { z } from "zod";

export const categorieMembreOptions = [
  { value: "artiste", label: "Artiste" },
  { value: "sympathisant", label: "Sympathisant / Partenaire" },
] as const;

export const formuleOptions = [
  { value: "autonome", label: "Autonome — représentation simple (10 %)" },
  { value: "integrale", label: "Intégrale — management complet (15 %)" },
] as const;

// Seule la cotisation trimestrielle (5 000 FCFA) est confirmée à ce jour —
// voir lib/content/site-info.ts.
export const periodiciteOptions = [{ value: "trimestre", label: "Trimestre — 5 000 FCFA" }] as const;

export const modePaiementOptions = [
  { value: "airtel_money", label: "Airtel Money" },
  { value: "moov_money", label: "Moov Money" },
  { value: "virement", label: "Virement" },
] as const;

export const adherentSchema = z
  .object({
    nom: z.string().trim().min(1, "Champ requis."),
    prenoms: z.string().trim().min(1, "Champ requis."),
    nomDeScene: z.string().trim().optional().or(z.literal("")),
    dateNaissance: z.string().trim().min(1, "Champ requis."),
    lieuNaissance: z.string().trim().min(1, "Champ requis."),
    discipline: z.string().trim().min(1, "Champ requis."),
    telephone: z.string().trim().min(1, "Champ requis."),
    email: z.string().trim().email("Adresse e-mail invalide."),
    categorieMembre: z.enum(
      categorieMembreOptions.map((o) => o.value) as [string, ...string[]],
      { message: "Merci de choisir une catégorie." },
    ),
    formule: z
      .enum(formuleOptions.map((o) => o.value) as [string, ...string[]])
      .optional()
      .or(z.literal("")),
    periodiciteCotisation: z.enum(periodiciteOptions.map((o) => o.value) as [string, ...string[]], {
      message: "Merci de choisir une périodicité.",
    }),
    modePaiement: z.enum(modePaiementOptions.map((o) => o.value) as [string, ...string[]], {
      message: "Merci de choisir un mode de paiement.",
    }),
    engagementStatuts: z.literal(true, {
      message: "Vous devez accepter les statuts et le règlement intérieur.",
    }),
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((data) => data.categorieMembre !== "artiste" || !!data.formule, {
    message: "Merci de choisir une formule.",
    path: ["formule"],
  });

export type AdherentInput = z.infer<typeof adherentSchema>;
