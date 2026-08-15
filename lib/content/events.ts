import type { CulturalEvent } from "./types";

// v1 only has "événements soutenus" (past). The kit calls for a future
// agenda (event_type: "agenda") and an archive with galleries — those get
// real entries once dates/venues are confirmed and photos are supplied.
export const events: CulturalEvent[] = [
  {
    slug: "africlap",
    title: "AFRICLAP",
    description:
      "Festival consacré au cinéma africain. Nous participons à sa promotion et à la visibilité des initiatives dédiées au septième art africain — jusqu'à l'édition de Toulouse.",
    eventType: "soutenu",
    dateStart: null,
    dateLabel: "2024–2026 · Toulouse",
    venue: "Toulouse, France",
    ticketUrl: null,
    coverImageUrl: null,
    displayOrder: 1,
  },
  {
    slug: "fescipa",
    title: "FESCIPA — Festival du Cinéma en Plein Air",
    description:
      "Le cinéma investit les espaces publics. Nous soutenons sa communication pour rendre la culture accessible au plus grand nombre.",
    eventType: "soutenu",
    dateStart: null,
    dateLabel: null,
    venue: null,
    ticketUrl: null,
    coverImageUrl: null,
    displayOrder: 2,
  },
  {
    slug: "fimi",
    title: "FIMI — Festival International du Mont Iboundji",
    description:
      "Célébration de la diversité artistique et patrimoniale du Gabon. Nous soutenons les initiatives qui valorisent les territoires, les traditions et les talents.",
    eventType: "soutenu",
    dateStart: null,
    dateLabel: null,
    venue: null,
    ticketUrl: null,
    coverImageUrl: null,
    displayOrder: 3,
  },
  {
    slug: "ann-iconcert",
    title: "Ann'Iconcert",
    description:
      "Rendez-vous musical réunissant artistes et publics. Nous avons contribué à sa promotion et à la mobilisation du public.",
    eventType: "soutenu",
    dateStart: null,
    dateLabel: null,
    venue: null,
    ticketUrl: null,
    coverImageUrl: null,
    displayOrder: 4,
  },
  {
    slug: "pindi-concert",
    title: "Pindi Concert",
    description:
      "Moment fort de la vie du groupe PINDI. Nous avons accompagné sa préparation, sa communication et sa valorisation auprès des partenaires et des médias.",
    eventType: "soutenu",
    dateStart: null,
    dateLabel: null,
    venue: null,
    ticketUrl: null,
    coverImageUrl: null,
    displayOrder: 5,
  },
  {
    slug: "journees-portes-ouvertes-musee",
    title: "Journées Portes Ouvertes du Musée",
    description:
      "La culture se transmet aussi par le patrimoine. Notre participation témoigne de notre engagement pour la médiation culturelle.",
    eventType: "soutenu",
    dateStart: null,
    dateLabel: null,
    venue: null,
    ticketUrl: null,
    coverImageUrl: null,
    displayOrder: 6,
  },
];
