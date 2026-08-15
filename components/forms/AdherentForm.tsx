"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adherentSchema,
  categorieMembreOptions,
  formuleOptions,
  modePaiementOptions,
  periodiciteOptions,
  type AdherentInput,
} from "@/lib/validations/adherer";
import { Input, Select, Label, FieldError } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

export default function AdherentForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdherentInput>({ resolver: zodResolver(adherentSchema) });

  const categorie = watch("categorieMembre");

  const onSubmit = async (data: AdherentInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/adherer", {
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
        <p className="font-display text-xl font-semibold text-cream">Demande envoyée</p>
        <p className="mt-2 text-sm text-cream/70">
          Merci ! Votre demande d'adhésion a bien été reçue, nous revenons vers vous prochainement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" {...register("nom")} />
          <FieldError message={errors.nom?.message} />
        </div>
        <div>
          <Label htmlFor="prenoms">Prénoms</Label>
          <Input id="prenoms" {...register("prenoms")} />
          <FieldError message={errors.prenoms?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="nomDeScene">Nom de scène (optionnel)</Label>
        <Input id="nomDeScene" {...register("nomDeScene")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="dateNaissance">Date de naissance</Label>
          <Input id="dateNaissance" type="date" {...register("dateNaissance")} />
          <FieldError message={errors.dateNaissance?.message} />
        </div>
        <div>
          <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
          <Input id="lieuNaissance" {...register("lieuNaissance")} />
          <FieldError message={errors.lieuNaissance?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="discipline">Discipline</Label>
        <Input id="discipline" placeholder="Chant, slam, danse…" {...register("discipline")} />
        <FieldError message={errors.discipline?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" type="tel" {...register("telephone")} />
          <FieldError message={errors.telephone?.message} />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="categorieMembre">Catégorie de membre</Label>
          <Select id="categorieMembre" defaultValue="" {...register("categorieMembre")}>
            <option value="" disabled>
              Choisir…
            </option>
            {categorieMembreOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <FieldError message={errors.categorieMembre?.message} />
        </div>

        {categorie === "artiste" ? (
          <div>
            <Label htmlFor="formule">Formule</Label>
            <Select id="formule" defaultValue="" {...register("formule")}>
              <option value="" disabled>
                Choisir…
              </option>
              {formuleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
            <FieldError message={errors.formule?.message} />
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="periodiciteCotisation">Périodicité de cotisation</Label>
          <Select id="periodiciteCotisation" defaultValue="" {...register("periodiciteCotisation")}>
            <option value="" disabled>
              Choisir…
            </option>
            {periodiciteOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <FieldError message={errors.periodiciteCotisation?.message} />
        </div>
        <div>
          <Label htmlFor="modePaiement">Mode de paiement</Label>
          <Select id="modePaiement" defaultValue="" {...register("modePaiement")}>
            <option value="" disabled>
              Choisir…
            </option>
            {modePaiementOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <FieldError message={errors.modePaiement?.message} />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-cream/70">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-brand-yellow" {...register("engagementStatuts")} />
        Je m'engage à respecter les statuts et le règlement intérieur de Rock'Star Management.
      </label>
      <FieldError message={errors.engagementStatuts?.message} />

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />

      {status === "error" ? (
        <p className="text-sm text-red-400">Une erreur est survenue, merci de réessayer.</p>
      ) : null}

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Envoyer ma demande d'adhésion"}
      </Button>
    </form>
  );
}
