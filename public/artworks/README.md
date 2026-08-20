# Ajouter des œuvres

1. Place l’image dans `public/artworks/` (ex. `ma-piece.jpg`)
2. Ajoute une entrée dans `prisma/seed.ts` (title, slug, category, medium, year, imageUrl: `/artworks/ma-piece.jpg`)
3. Lance `npm run db:seed`
