# Rock'Star Management — site web

Next.js (App Router) + TypeScript + Tailwind v4. Contenu transcrit du kit fourni par le client.

```bash
npm run dev
```

## État actuel : phase 1 (contenu statique)

Le contenu (artistes, projets, événements, services, équipe, partenaires) vit dans
[`lib/content/`](lib/content) et est servi via [`lib/data/`](lib/data). Les deux formulaires
(contact, adhésion) valident et acquittent (`app/api/contact`, `app/api/adherer`) mais
n'écrivent nulle part encore — il n'y a pas de projet Supabase.

## Phase 2 : brancher Supabase

1. Créer un projet Supabase dédié (pas de réutilisation d'un projet existant de l'agence).
2. Appliquer [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql), puis
   [`supabase/seed.sql`](supabase/seed.sql) (reproduit le contenu déjà en dur, avec les mêmes
   slugs — bascule mécanique).
3. Renseigner les env vars : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_NOTIFICATION_EMAIL`,
   `NEXT_PUBLIC_SITE_URL`.
4. Remplacer le corps des fonctions dans `lib/data/*.ts` par des requêtes Supabase (même
   signature, les pages ne changent pas) et générer `lib/database.types.ts` via
   `supabase gen types typescript`.
5. Dans `app/api/contact/route.ts` et `app/api/adherer/route.ts`, insérer via le client
   Supabase anon (la policy insert-only suffit) puis envoyer une notification par e-mail
   via Resend.

## Contenu manquant à obtenir avant lancement

Voir les notes dans `lib/content/site-info.ts` et `lib/content/team.ts` — téléphone/e-mail de
contact, membres du bureau, montants de cotisation à confirmer, photos des artistes, plan
d'accès et galerie de l'espace, rapport d'activités (PDF).
