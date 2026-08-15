"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contactSubjects, type ContactInput } from "@/lib/validations/contact";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

export default function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject as ContactInput["subject"] | undefined },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-cream/10 bg-ink-soft p-8 text-center">
        <p className="font-display text-xl font-semibold text-cream">Message envoyé</p>
        <p className="mt-2 text-sm text-cream/70">Merci, nous vous répondrons dans les meilleurs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nom</Label>
          <Input id="name" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Téléphone (optionnel)</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="subject">Objet</Label>
          <Select id="subject" defaultValue="" {...register("subject")}>
            <option value="" disabled>
              Choisir…
            </option>
            {contactSubjects.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <FieldError message={errors.subject?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register("message")} />
        <FieldError message={errors.message?.message} />
      </div>

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />

      {status === "error" ? (
        <p className="text-sm text-red-400">Une erreur est survenue, merci de réessayer.</p>
      ) : null}

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
