# Cahier des charges — Portfolio Ben Mbuyulu

Document vivant. À mettre à jour après chaque décision produit / technique.

Dernière mise à jour : 2026-08-22

---

## 1. Produit

- Site portfolio public pour l’artiste **Ben Mbuyulu** (peintre / sculpteur, projet *Mystère du voile*).
- Une seule page scrollable : Hero → Œuvres → Bio → In situ → Publications → Contact.
- Pas de multi-tenant / SaaS pour le moment (reporté).

## 2. Décisions actives

| Décision | Choix | Date |
|---|---|---|
| Langue par défaut | **Anglais (EN)** | 2026-08-22 |
| Langues supportées | EN / FR (cookie `locale`) | 2026-08-22 |
| Sélecteur de langue mobile | À côté du burger (hors menu) | 2026-08-22 |
| Images œuvres | Fichiers dans `public/` + métadonnées Neon | 2026-08-21 |
| Contact public | Bouton mailto + partage (pas de titre section) | 2026-08-22 |
| In situ / Publications | Gérés plus tard par Ben via **PWA admin** | 2026-08-22 |
| Admin complète (tous contenus) | Après la PWA In situ + Publications | 2026-08-22 |
| Expositions | Abandonné ; remplacé par **In situ** | 2026-08-21 |

## 3. Stack

- Next.js 16 (App Router) + React 19 + Tailwind v4
- Prisma 7 + Neon (PostgreSQL)
- Déploiement Vercel
- i18n : dictionnaires `src/i18n/dictionaries/{en,fr}.ts`

## 4. Sections (état)

| Section | État public | Qui gère le contenu |
|---|---|---|
| Hero | OK | Dev / seed |
| Œuvres | OK (5 œuvres) | Dev / seed pour l’instant |
| Bio | OK | Dictionnaires i18n |
| In situ | Placeholder | **PWA Ben** (à construire) |
| Publications | Placeholder | **PWA Ben** (à construire) |
| Contact | Bouton + share | Email / réseaux fixes |

## 5. Roadmap PWA (prochaine grande étape)

1. Schéma Prisma In situ + Publications  
2. Affichage public depuis Neon  
3. Auth (Ben seul)  
4. PWA CRUD In situ + Publications  
5. Upload images (Blob / Cloudinary recommandé)  
6. Plus tard : admin pour Œuvres / Bio / Hero  

## 6. Contacts officiels

- Email : `mbuyuluben@gmail.com`
- Instagram : https://www.instagram.com/benmbuyulu/
- Facebook : https://www.facebook.com/profile.php?id=61589274320031

## 7. Notes

- Les **titres d’œuvres** restent dans leur forme officielle (souvent FR), même en UI EN.
- Les labels UI (filtres, bio, boutons, etc.) suivent la langue active.
- Ce fichier se met à jour quand une décision change.
