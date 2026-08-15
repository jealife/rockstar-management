-- Rock'Star Management — schéma initial (phase 2)
-- Contenu quasi entièrement en lecture publique (artistes, projets,
-- événements, services, équipe, partenaires, actualités) + deux
-- formulaires en écriture (contact, adhésion) + newsletter.
--
-- Pas appliqué automatiquement : à exécuter une fois le projet Supabase
-- créé (voir README / plan). Deux formes de policy RLS seulement :
--   - tables de contenu : lecture publique si is_published = true
--   - tables de formulaire : insertion publique, aucune lecture publique

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- Contenu
-- ─────────────────────────────────────────────────────────────────────────

create table artists (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  stage_name text,
  discipline text not null,
  bio text not null,
  artistic_universe text,
  photo_url text,
  gallery jsonb not null default '[]',
  streaming_links jsonb not null default '{}',
  social_links jsonb not null default '{}',
  booking_contact text,
  schema_type text not null default 'Person' check (schema_type in ('Person', 'MusicGroup')),
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  cover_image_url text,
  status text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_artists (
  project_id uuid not null references projects (id) on delete cascade,
  artist_id uuid not null references artists (id) on delete cascade,
  primary key (project_id, artist_id)
);

create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  event_type text not null default 'soutenu' check (event_type in ('soutenu', 'agenda')),
  date_start timestamptz,
  date_end timestamptz,
  date_label text,
  venue text,
  cover_image_url text,
  gallery jsonb not null default '[]',
  ticket_url text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table event_artists (
  event_id uuid not null references events (id) on delete cascade,
  artist_id uuid not null references artists (id) on delete cascade,
  primary key (event_id, artist_id)
);

create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  icon text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_category text not null check (role_category in ('fondatrice', 'bureau')),
  role_title text not null,
  bio text not null,
  quote text,
  photo_url text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Schéma créé dès la v1, UI /actualites différée en v2 (voir le plan).
create table news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  cover_image_url text,
  excerpt text,
  body text not null,
  gallery jsonb not null default '[]',
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Singleton — coordonnées éditables via Supabase Studio sans redeploy.
create table site_settings (
  id smallint primary key default 1 check (id = 1),
  address text,
  phone text,
  email text,
  social_links jsonb not null default '{}',
  opening_hours text,
  map_embed_url text,
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Formulaires (insert-only côté public)
-- ─────────────────────────────────────────────────────────────────────────

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table membership_applications (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenoms text not null,
  nom_de_scene text,
  date_naissance date not null,
  lieu_naissance text not null,
  discipline text not null,
  telephone text not null,
  email text not null,
  categorie_membre text not null,
  formule text,
  periodicite_cotisation text not null,
  mode_paiement text not null,
  engagement_statuts boolean not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true,
  source text
);

-- ─────────────────────────────────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────────────────────────────────

alter table artists enable row level security;
alter table projects enable row level security;
alter table project_artists enable row level security;
alter table events enable row level security;
alter table event_artists enable row level security;
alter table services enable row level security;
alter table team_members enable row level security;
alter table partners enable row level security;
alter table news enable row level security;
alter table site_settings enable row level security;
alter table contact_messages enable row level security;
alter table membership_applications enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "Public read published artists" on artists for select using (is_published = true);
create policy "Public read published projects" on projects for select using (is_published = true);
create policy "Public read project_artists" on project_artists for select using (true);
create policy "Public read published events" on events for select using (is_published = true);
create policy "Public read event_artists" on event_artists for select using (true);
create policy "Public read published services" on services for select using (is_published = true);
create policy "Public read published team_members" on team_members for select using (is_published = true);
create policy "Public read published partners" on partners for select using (is_published = true);
create policy "Public read published news" on news for select using (is_published = true);
create policy "Public read site_settings" on site_settings for select using (true);

create policy "Public insert contact_messages" on contact_messages for insert with check (true);
create policy "Public insert membership_applications" on membership_applications for insert with check (true);
create policy "Public insert newsletter_subscribers" on newsletter_subscribers for insert with check (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Storage (buckets publics en lecture, écriture réservée au service role)
-- ─────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values
  ('artist-media', 'artist-media', true),
  ('venue-media', 'venue-media', true),
  ('team-photos', 'team-photos', true),
  ('partner-logos', 'partner-logos', true)
on conflict (id) do nothing;

create policy "Public read artist-media" on storage.objects for select using (bucket_id = 'artist-media');
create policy "Public read venue-media" on storage.objects for select using (bucket_id = 'venue-media');
create policy "Public read team-photos" on storage.objects for select using (bucket_id = 'team-photos');
create policy "Public read partner-logos" on storage.objects for select using (bucket_id = 'partner-logos');
