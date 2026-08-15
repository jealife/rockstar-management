"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/newsletter";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
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
    return <p className="mt-4 text-sm font-medium text-ink">Merci ! Vous êtes inscrit·e à la newsletter.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4" noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Votre e-mail"
          className="w-full rounded-full border border-ink/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
          {...register("email")}
        />
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          S'inscrire
        </button>
      </div>
      {errors.email ? <p className="mt-1.5 text-xs text-red-800">{errors.email.message}</p> : null}
      {status === "error" ? <p className="mt-1.5 text-xs text-red-800">Une erreur est survenue, réessayez.</p> : null}
    </form>
  );
}
