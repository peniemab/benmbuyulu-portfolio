# Cahier des charges — Portfolio Ben Mbuyulu

Document vivant. À mettre à jour après chaque décision produit / technique.

Dernière mise à jour : 2026-08-24

---

## 1. Produit

- Site web public (`/`) : le portfolio, pour tout le monde.
- **Atelier** (`/atelier`) : l’espace privé de Ben (PWA installable), bilingue FR / EN, pensé pour un non-dev.
- Une seule page publique scrollable : Hero → Œuvres → Bio → In situ → Publications → Contact.
- Pas de multi-tenant / SaaS pour le moment (reporté).

## 2. Décisions actives

| Décision | Choix | Date |
|---|---|---|
| Langue par défaut | **Anglais (EN)** | 2026-08-22 |
| Langues supportées | EN / FR (cookie `locale`) | 2026-08-22 |
| Sélecteur de langue mobile | À côté du burger (hors menu) | 2026-08-22 |
| Images œuvres | Fichiers dans `public/` + métadonnées Neon | 2026-08-21 |
| Contact public | Bouton mailto + partage (pas de titre section) | 2026-08-22 |
| In situ / Publications | Ben via `/atelier` | 2026-08-24 |
| `/atelier` | **Atelier de Ben** (privé), pas une copie publique du site | 2026-08-24 |
| Install sur le site `/` | **Non** : pas de manifest sur le site web | 2026-08-24 |
| Auth atelier | Compte e-mail + mot de passe, reset par e-mail | 2026-08-30 |
| Langue atelier | **FR / EN**, même cookie que le site (EN par défaut) | 2026-08-24 |
| Photos uploadées | Local `public/uploads` ; Vercel Blob si `BLOB_READ_WRITE_TOKEN` | 2026-08-24 |
| Expositions | Abandonné ; remplacé par **In situ** | 2026-08-21 |

## 3. Stack

- Next.js 16 (App Router) + React 19 + Tailwind v4
- Prisma 7 + Neon (PostgreSQL)
- Déploiement Vercel
- i18n UI : dictionnaires `src/i18n/dictionaries/{en,fr}.ts`
- Contenu éditable (bio, hero, contact) : Neon `SiteContent`

## 4. Sections (état)

| Section | État public | Qui gère le contenu |
|---|---|---|
| Hero | OK | Ben via `/atelier/accueil` |
| Œuvres | OK (5 œuvres) | Ben via `/atelier/oeuvres` |
| Bio | OK | Ben via `/atelier/bio` (FR + EN optionnel) |
| In situ | Liste si fiches, sinon placeholder | Ben via `/atelier/in-situ` |
| Publications | Liste si fiches, sinon placeholder | Ben via `/atelier/publications` |
| Contact | Bouton + share | Ben via `/atelier/contact` |

## 5. Atelier (`/atelier`)

- Page privée, **non indexée**, non liée dans le menu public.
- Langue de l’interface : **FR / EN**, même cookie `locale` que le site public (EN par défaut).
- Accueil : cartes visuelles des sections du site.
- Chaque section : changer la photo, changer le texte, montrer / cacher.
- Pas de jargon.
- Compte : `/atelier/inscription` (premier compte, puis `ALLOW_SIGNUP=false`), `/atelier/connexion`, reset via `/atelier/mot-de-passe-oublie`.

## 6. Roadmap

1. Atelier `/atelier` (hero, œuvres, bio, in situ, publications, contact) — en cours  
2. Production : Vercel Blob pour les photos uploadées  
3. Plus tard : réordonner les œuvres par glisser-déposer  

## 7. Contacts officiels (valeurs initiales, éditables dans l’atelier)

- Email : `mbuyuluben@gmail.com`
- Instagram : https://www.instagram.com/benmbuyulu/
- Facebook : https://www.facebook.com/profile.php?id=61589274320031

## 8. Notes

- Les **titres d’œuvres**, fiches in situ et publications ont une version **FR** et **EN** ; le site affiche celle qui correspond à la langue active (repli sur l’autre langue si une traduction manque).
- Les labels UI (filtres, boutons, etc.) suivent la langue active du visiteur.
- Ce fichier se met à jour quand une décision change.
