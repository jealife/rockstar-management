// Coordonnées connues via le kit de contenu. `email` et `socialLinks` sont
// toujours `[à compléter]` — on ne les invente pas, l'UI n'affiche que ce
// qui est renseigné ici.
export const siteInfo = {
  address: "Bas de Gué-Gué, derrière l'école publique — Libreville, Gabon",
  phone: "+241 04 84 33 82" as string | null,
  // Format international sans le 0 initial, pour les liens wa.me / tel:.
  whatsappNumber: "24104843382",
  email: null as string | null,
  socialLinks: {} as Record<string, string>,
  venueCapacity: "Environ 200 places",
  venueEquipment: ["Scène en plein air", "Sonorisation", "Studio de résidence (chambre, salon, cuisine, sanitaires)"],
};

export const realisations: string[] = [
  "Accompagnement stratégique et administratif d'artistes émergents et confirmés.",
  "Structuration administrative d'artistes et d'entreprises culturelles.",
  "Stratégies de communication et distribution numérique de projets musicaux.",
  "Conception de dossiers artistiques, de sponsoring et de partenariat.",
  "Accompagnement de festivals, concours, concerts et spectacles.",
  "Première participation internationale au Festival AFRICLAP de Toulouse (2024–2026).",
];

export const membershipPricing = {
  droitAdhesion: "5 000 FCFA (une seule fois)",
  cotisations: [{ periode: "Trimestre", montant: "5 000 FCFA" }],
  cotisationsConfirmed: true,
  cotisationNote: "Payable en début de chaque trimestre, au plus tard le 5.",
  formules: [
    {
      nom: "Autonome",
      description: "Représentation simple.",
      commission: "10 %",
    },
    {
      nom: "Intégrale",
      description: "Management complet.",
      commission: "15 %",
    },
  ],
};
