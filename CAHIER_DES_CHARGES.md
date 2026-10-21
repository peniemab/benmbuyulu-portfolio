# Cahier des charges — Portfolio Ben Mbuyulu

Document vivant. À mettre à jour après chaque décision produit / technique.

Dernière mise à jour : 2026-10-16

---

## 1. Produit

- Site web public (`/`) : le portfolio, pour tout le monde.
- **Atelier** (`/atelier`) : l’espace privé de Ben (PWA installable), bilingue FR / EN, pensé pour un non-dev.
- Une seule page publique scrollable : Hero → Œuvres → Bio → In situ → Publications → Contact.
- **Site privé de Ben**, mono-artiste, avec son propre domaine. Le SaaS de portfolios pour artistes (**Mon Atelier**, monatelier.com) est un **projet séparé** (`F:\dev_pro\mon_atelier`), parti de ce code, avec sa propre base et son propre déploiement.

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
| Inscription atelier | **Pas d’inscription publique** : 1er compte avec le code `ATELIER_SETUP_CODE`, puis uniquement sur **invitation** (modèle Odoo) | 2026-10-12 |
| Langue atelier | **FR / EN**, même cookie que le site (EN par défaut) | 2026-08-24 |
| Photos uploadées | Local `public/uploads` ; Vercel Blob si `BLOB_READ_WRITE_TOKEN` | 2026-08-24 |
| Expositions | Abandonné ; remplacé par **In situ** | 2026-08-21 |
| Newsletter | Champ du menu branché : adresses en base (`NewsletterSubscriber`), piège anti-spam, liste / copie / export CSV dans `/atelier/newsletter`. Envoi des lettres : plus tard | 2026-10-16 |
| Aperçu de lien | Carte générée : portrait de la bio (accueil), photo de l’œuvre (« Découvrir »), en JPEG | 2026-10-16 |
| Fiche œuvre | Page `/oeuvres/[slug]` (lien « Découvrir » sous chaque œuvre) | 2026-10-12 |
| Ordre des œuvres | Mode « Changer l’ordre » : glisser-déposer (`@dnd-kit`, appui long sur téléphone) + flèches, puis « Enregistrer l’ordre » | 2026-10-12 |
| Photos supplémentaires | Envoyées une par une, réduites dans le navigateur (limite Vercel 4,5 Mo) | 2026-10-12 |

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
| Œuvres | OK (9 œuvres) | Ben via `/atelier/oeuvres` |
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
- Compte : `/atelier/inscription` (premier compte avec le code d’installation, ou lien d’invitation), `/atelier/connexion`, reset via `/atelier/mot-de-passe-oublie`.
- Newsletter : `/atelier/newsletter` liste les inscrits (date), copie toutes les adresses (à coller en « Cci »), export CSV, retrait d’une adresse.
- Accès : `/atelier/acces` liste les comptes, envoie des invitations (7 jours, e-mail ou lien à copier) et permet de les annuler.

## 6. Roadmap

1. Atelier `/atelier` (hero, œuvres, bio, in situ, publications, contact) — fait  
2. Production : Vercel Blob pour les photos uploadées  
3. Fiche œuvre « Découvrir » : `/oeuvres/[slug]`, plusieurs photos, dimensions, description FR / EN — fait  
4. Réordonner les œuvres par glisser-déposer (+ flèches) dans `/atelier/oeuvres` — fait  

## 7. Contacts officiels (valeurs initiales, éditables dans l’atelier)

- Email : `mbuyuluben@gmail.com`
- Instagram : https://www.instagram.com/benmbuyulu/
- Facebook : https://www.facebook.com/profile.php?id=61589274320031

## 8. Notes

- Les **titres d’œuvres**, fiches in situ et publications ont une version **FR** et **EN** ; le site affiche celle qui correspond à la langue active (repli sur l’autre langue si une traduction manque).
- Les labels UI (filtres, boutons, etc.) suivent la langue active du visiteur.
- Les **dimensions** ne sont **pas affichées sous la grille** : uniquement dans la fiche « Découvrir », avec les autres photos (`ArtworkPhoto`) et la description (FR + EN, repli sur l’autre langue).
- Ce fichier se met à jour quand une décision change.
