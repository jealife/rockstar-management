import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide."),
  // Honeypot — real visitors never fill this hidden field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
