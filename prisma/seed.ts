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

const artworks = [
  {
    title: "Esclaves du sexe",
    slug: "esclaves-du-sexe",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2025,
    imageUrl: "/artworks/esclaves-du-sexe.png",
    description:
      "Deux figures voilées — projet Mystère du voile.",
    colSpan: 6,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 1,
    published: true,
  },
  {
    title: "Mi-femme, mi-ange",
    slug: "mi-femme-mi-ange",
    category: "SCULPTURE" as const,
    medium: "Sculpture",
    year: 2025,
    imageUrl: "/artworks/mi-femme-mi-ange.png",
    description:
      "Buste ailé au voile sur les yeux — projet Mystère du voile.",
    colSpan: 6,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 2,
    published: true,
  },
];

async function main() {
  // Keep only real works for now — remove placeholder seed pieces
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

  console.log(`Seeded ${artworks.length} artwork(s). Drop more files in public/artworks/ then re-seed.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
