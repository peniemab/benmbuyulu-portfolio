# The Gallery — Portfolio

Site portfolio d’artiste. Next.js + Tailwind + Prisma + Neon. FR / EN.

## Setup

```bash
# 1. DATABASE_URL dans .env (Neon)
npm run db:push:neon
npm run db:seed
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — galerie avec filtres Tout / Peintures / Sculptures.

Atelier (édition) : [http://localhost:3000/atelier](http://localhost:3000/atelier)

Pas d'inscription publique (comme Odoo en mode « sur invitation ») :

1. Premier compte : `/atelier/inscription`, avec le **code d'installation** (`ATELIER_SETUP_CODE`), à donner seulement à Ben
2. Comptes suivants : uniquement par **invitation**, depuis `/atelier/acces` (lien valable 7 jours, envoyé par e-mail ou à copier)
3. Se connecter : `/atelier/connexion`
4. Mot de passe oublié : `/atelier/mot-de-passe-oublie` (lien affiché dans le terminal si pas de `RESEND_API_KEY`)

```bash
# .env
AUTH_SECRET="longue-chaine-aleatoire"
ATELIER_SETUP_CODE="autre-longue-chaine-aleatoire"
```
