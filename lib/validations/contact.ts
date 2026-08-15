import { z } from "zod";

export const contactSubjects = [
  { value: "information", label: "Information" },
  { value: "adhesion", label: "Adhésion" },
  { value: "reservation", label: "Réservation de l'espace" },
  { value: "residence", label: "Candidature résidence" },
  { value: "booking", label: "Booking artiste" },
  { value: "partenariat", label: "Partenariat" },
  { value: "presse", label: "Presse" },
] as const;

const subjectValues = contactSubjects.map((s) => s.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Merci d'indiquer votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z.string().trim().optional().or(z.literal("")),
  subject: z.enum(subjectValues, { message: "Merci de choisir un objet." }),
  message: z.string().trim().min(10, "Votre message est un peu court."),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
