-- Seed reproducing lib/content/*.ts (the kit's content) in Supabase, so
-- phase 2 (swapping lib/data/*.ts from static arrays to Supabase queries)
-- starts from the same content already live on the site. Run after
-- 0001_init.sql on a fresh project. Idempotent via ON CONFLICT.

insert into artists (slug, name, stage_name, discipline, bio, artistic_universe, schema_type, is_published, display_order) values
('orphee-nyny', 'Orphée NYNY', 'Orphée NYNY', 'Auteure-compositrice-interprète',
 'Artiste gabonaise, Orphée NYNY fait dialoguer le jazz, le R&B et les sonorités traditionnelles dans un univers profondément sensible. Sa musique explore les émotions, l''identité et la mémoire, avec une élégance qui lui est propre.',
 'Nous l''accompagnons dans la structuration de sa carrière et le développement de son image artistique.',
 'Person', true, 1),
('eloquent-grand-b', 'Éloquent Grand B', 'Éloquent Grand B', 'Poète, slameur, chanteur, guitariste et enseignant',
 'Artiste multidisciplinaire, Éloquent Grand B fait de la parole un outil de transmission et de transformation. Entre poésie, musique et engagement, son travail célèbre les cultures africaines et invite à la réflexion.',
 'Notre accompagnement porte sur son développement professionnel, sa structuration administrative et la valorisation de ses projets.',
 'Person', true, 2),
('pindi', 'PINDI', 'PINDI', 'Collectif artistique',
 'PINDI puise sa force dans les traditions du sud du Gabon pour créer une œuvre résolument contemporaine. Spoken word, hip-hop, jazz, musiques du monde et rythmes ancestraux se rencontrent pour raconter une Afrique vivante, fière de son héritage et tournée vers l''avenir.',
 'Nous accompagnons le groupe dans son développement stratégique, la structuration de ses projets et son rayonnement, jusqu''à la scène internationale.',
 'MusicGroup', true, 3),
('nans', 'Nan''s', 'Nan''s', 'Nouvelle génération',
 'Nan''s construit un univers musical sincère et accessible. À travers des titres comme « Décroche », il touche le public avec des œuvres qui parlent du quotidien et des réalités de sa génération.',
 'Nous l''accompagnons dans sa stratégie de diffusion, sa présence sur les plateformes numériques et le développement de sa communication.',
 'Person', true, 4),
('ndoki', 'Ndoki', 'Ndoki', 'Artiste en structuration',
 'Animé par la volonté de bâtir une carrière solide et durable, Ndoki est convaincu que la réussite artistique repose autant sur le talent que sur l''organisation.',
 'Il bénéficie de notre accompagnement pour développer les fondations administratives et professionnelles de son parcours.',
 'Person', true, 5),
('tina-minkoue', 'Tina Minkoué', 'Tina Minkoué', 'Artiste et porteuse de projets culturels',
 'Tina Minkoué place la découverte des talents et la transmission au cœur de son engagement. À travers des initiatives comme « Lalala Ndoua », elle offre une scène aux artistes émergents et dynamise la vie culturelle gabonaise.',
 'Nous l''accompagnons dans la structuration et la promotion de ses projets.',
 'Person', true, 6)
on conflict (slug) do nothing;

insert into projects (slug, title, description, is_published, display_order) values
('pindi-boungou-tour', 'PINDI Boungou Tour',
 'Une tournée culturelle pensée comme une rencontre entre les traditions gabonaises et les publics d''aujourd''hui. Porté par le groupe PINDI, ce projet valorise les rythmes, les langues et les récits du Sud-Gabon à travers une création contemporaine. Nous accompagnons la structuration, les partenariats, la communication et la recherche de financements.',
 true, 1),
('ngwali', 'Ngwali',
 'Plus qu''un spectacle, une expérience artistique où musique, poésie, danse et traditions dialoguent pour raconter une mémoire vivante. Ngwali célèbre la richesse des patrimoines culturels gabonais tout en proposant une création capable de toucher toutes les générations.',
 true, 2),
('je-t-invoque', 'Je T''Invoque',
 'Projet global porté par Éloquent Grand B, explorant la spiritualité, la mémoire, la résilience et la quête de soi. Il réunit un EP, un spectacle vivant et une expérience immersive. Nous accompagnons son développement stratégique, sa structuration et la recherche de partenaires.',
 true, 3),
('le-tour-d-eveil', 'Le Tour d''Éveil',
 'Un projet de sensibilisation artistique et culturelle qui fait de la création un outil de dialogue et de transmission. À travers rencontres, spectacles et échanges, il invite chacun à porter un regard neuf sur son identité et son histoire.',
 true, 4),
('lalala-ndoua', 'Lalala Ndoua',
 'Une plateforme de découverte dédiée aux talents émergents (chant, danse, slam). Au-delà de la compétition, le concours révèle une nouvelle génération d''artistes et leur offre une première expérience de scène dans un cadre professionnel. Nous accompagnons structuration, communication et partenariats.',
 true, 5)
on conflict (slug) do nothing;

insert into project_artists (project_id, artist_id)
select p.id, a.id from projects p, artists a where p.slug = 'pindi-boungou-tour' and a.slug = 'pindi'
union all
select p.id, a.id from projects p, artists a where p.slug = 'je-t-invoque' and a.slug = 'eloquent-grand-b'
union all
select p.id, a.id from projects p, artists a where p.slug = 'lalala-ndoua' and a.slug = 'tina-minkoue'
on conflict do nothing;

insert into events (slug, title, description, event_type, date_label, venue, is_published, display_order) values
('africlap', 'AFRICLAP', 'Festival consacré au cinéma africain. Nous participons à sa promotion et à la visibilité des initiatives dédiées au septième art africain — jusqu''à l''édition de Toulouse.', 'soutenu', '2024–2026 · Toulouse', 'Toulouse, France', true, 1),
('fescipa', 'FESCIPA — Festival du Cinéma en Plein Air', 'Le cinéma investit les espaces publics. Nous soutenons sa communication pour rendre la culture accessible au plus grand nombre.', 'soutenu', null, null, true, 2),
('fimi', 'FIMI — Festival International du Mont Iboundji', 'Célébration de la diversité artistique et patrimoniale du Gabon. Nous soutenons les initiatives qui valorisent les territoires, les traditions et les talents.', 'soutenu', null, null, true, 3),
('ann-iconcert', 'Ann''Iconcert', 'Rendez-vous musical réunissant artistes et publics. Nous avons contribué à sa promotion et à la mobilisation du public.', 'soutenu', null, null, true, 4),
('pindi-concert', 'Pindi Concert', 'Moment fort de la vie du groupe PINDI. Nous avons accompagné sa préparation, sa communication et sa valorisation auprès des partenaires et des médias.', 'soutenu', null, null, true, 5),
('journees-portes-ouvertes-musee', 'Journées Portes Ouvertes du Musée', 'La culture se transmet aussi par le patrimoine. Notre participation témoigne de notre engagement pour la médiation culturelle.', 'soutenu', null, null, true, 6)
on conflict (slug) do nothing;

insert into services (slug, title, description, is_published, display_order) values
('management-artistique', 'Management artistique', 'Nous construisons avec l''artiste une vision, une stratégie et des objectifs adaptés à son parcours, pour qu''il se consacre pleinement à sa création dans un environnement professionnel.', true, 1),
('developpement-de-carriere', 'Développement de carrière', 'Identifier les opportunités, planifier les projets, construire l''image et développer la présence sur les scènes locales, nationales et internationales.', true, 2),
('structuration-administrative', 'Structuration administrative', 'Accompagnement dans les démarches administratives, juridiques et professionnelles, pour une base durable (ANPI-Gabon, BUGADA, contrats, etc.).', true, 3),
('communication-image', 'Communication & image', 'Des stratégies de communication qui révèlent l''identité des artistes et des projets à travers des contenus cohérents et attractifs.', true, 4),
('promotion-digitale', 'Promotion digitale', 'Sortie des œuvres, distribution sur les plateformes de streaming et campagnes digitales performantes.', true, 5),
('production-de-projets-culturels', 'Production de projets culturels', 'De l''idée à la réalisation : conception, structuration et développement, en assurant la cohérence artistique, technique et stratégique.', true, 6),
('organisation-d-evenements', 'Organisation d''événements', 'Concerts, festivals, concours, spectacles : notre expertise au service d''expériences fortes pour les artistes et les publics.', true, 7),
('recherche-de-partenaires', 'Recherche de partenaires', 'Dossiers professionnels et stratégie de mobilisation pour trouver financements, sponsors et partenaires institutionnels.', true, 8),
('conseil-et-accompagnement', 'Conseil et accompagnement', 'Notre expérience au service des artistes, associations et structures qui veulent développer leurs initiatives avec méthode et ambition.', true, 9)
on conflict (slug) do nothing;

insert into team_members (name, role_category, role_title, bio, quote, is_published, display_order) values
('Ndinga Ngala Schmislaine Rocksia', 'fondatrice', 'Fondatrice — Rocksia Mbemba',
 'Manageuse artistique, entrepreneure culturelle et modèle photo, engagée pour la valorisation des artistes africains. Son parcours est intimement lié à une quête d''identité : longtemps confrontée aux doutes et au sentiment d''être éloignée de ses racines, elle a transformé cette épreuve en force en redécouvrant son héritage, notamment ses origines congolaises. Le nom « Mbemba », qui évoque la dignité, la noblesse et la responsabilité de guider, résume la vision qu''elle porte : accompagner les artistes afin qu''ils prennent pleinement conscience de leur valeur et osent révéler leur potentiel.',
 'Derrière chaque artiste se cache une histoire qui mérite d''être entendue. Mon rôle n''est pas de transformer les artistes, mais de leur donner les moyens d''être pleinement eux-mêmes et de bâtir une carrière durable. Lorsque les artistes grandissent, c''est toute notre culture qui rayonne.',
 true, 1);
-- Le bureau (Présidence, Secrétariat général, Trésorerie) n'a pas encore
-- de noms/photos communiqués — pas de ligne insérée tant que le kit ne
-- fournit pas ces informations (voir app/association/page.tsx).

insert into partners (name, is_published, display_order) values
('Raphia Production', true, 1),
('Mayaga Production', true, 2),
('Mwanamay Films', true, 3),
('JEaLiFe Agency', true, 4),
('Com''unique', true, 5),
('FIMI', true, 6)
on conflict do nothing;

-- site_settings: adresse connue, téléphone/e-mail/réseaux `[à compléter]`
-- dans le kit — non insérés pour ne pas afficher de fausses coordonnées.
insert into site_settings (id, address) values
(1, 'Bas de Gué-Gué, derrière l''école publique — Libreville, Gabon')
on conflict (id) do update set address = excluded.address;
