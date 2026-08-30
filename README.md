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

1. Créer un compte : `/atelier/inscription` (Ben, une seule fois)
2. Se connecter : `/atelier/connexion`
3. Mot de passe oublié : `/atelier/mot-de-passe-oublie` (lien affiché dans le terminal si pas de `RESEND_API_KEY`)

```bash
# .env
AUTH_SECRET="longue-chaine-aleatoire"
# Après l'inscription de Ben :
ALLOW_SIGNUP="false"
```
