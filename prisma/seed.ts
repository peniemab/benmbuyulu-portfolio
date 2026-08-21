import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes("USER:PASSWORD")) {
  console.error("Configure DATABASE_URL in .env first.");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

/**
 * Desktop mosaic on 12 cols — each row must sum to 12:
 * 5+7 · 7+5 · 8 (last)
 */
const artworks = [
  {
    title: "Mi-femme, mi-ange",
    slug: "mi-femme-mi-ange",
    category: "SCULPTURE" as const,
    medium: "Sculpture",
    year: 2026,
    dimensions: "1 m",
    imageUrl: "/artworks/mi-femme-mi-ange.png",
    description:
      "Buste ailé au voile sur les yeux — projet Mystère du voile.",
    colSpan: 5,
    aspectRatio: "3/4",
    stretch: false,
    sortOrder: 1,
    published: true,
  },
  {
    title: "Le voyage de l’âme voilée",
    slug: "voyage-ame-voile",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2026,
    dimensions: "40 × 60 cm",
    imageUrl: "/artworks/voyage-ame-voile.png",
    description:
      "Cheval bandé des yeux, cavalier enveloppé de rouge — projet Mystère du voile.",
    colSpan: 7,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 2,
    published: true,
  },
  {
    title: "Sous le voile du silence",
    slug: "sous-le-voile-du-silence",
    category: "SCULPTURE" as const,
    medium: "Sculpture",
    year: 2026,
    dimensions: "1 m",
    imageUrl: "/artworks/sous-le-voile-du-silence.png",
    description:
      "Sculpture allongée au drapé fluide — projet Mystère du voile.",
    colSpan: 7,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 3,
    published: true,
  },
  {
    title: "L’énigme du voile",
    slug: "enigme-du-voile",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2026,
    dimensions: "40 × 60 cm",
    imageUrl: "/artworks/enigme-du-voile.png",
    description:
      "Figure masquée au manteau rouge et serpent — projet Mystère du voile.",
    colSpan: 5,
    aspectRatio: "3/4",
    stretch: false,
    sortOrder: 4,
    published: true,
  },
  {
    title: "Esclaves du sexe",
    slug: "esclaves-du-sexe",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2024,
    dimensions: "50 × 70 cm",
    imageUrl: "/artworks/esclaves-du-sexe.png",
    description:
      "Deux figures voilées — projet Mystère du voile.",
    colSpan: 8,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 5,
    published: true,
  },
];

async function main() {
  await prisma.artwork.deleteMany({
    where: {
      slug: {
        in: [
          "convergence-point",
          "vertical-tension",
          "silent-horizon",
          "intersecting-planes",
        ],
      },
    },
  });

  for (const artwork of artworks) {
    await prisma.artwork.upsert({
      where: { slug: artwork.slug },
      update: artwork,
      create: artwork,
    });
  }

  console.log(`Seeded ${artworks.length} artwork(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
