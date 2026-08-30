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
 * Desktop mosaic on 12 cols: each row must sum to 12:
 * 5+7 · 7+5 · 8 (last)
 */
const artworks = [
  {
    title: "Mi-femme, mi-ange",
    titleEn: "Half-Woman, Half-Angel",
    slug: "mi-femme-mi-ange",
    category: "SCULPTURE" as const,
    medium: "Sculpture",
    year: 2026,
    dimensions: "1 m",
    imageUrl: "/artworks/mi-femme-mi-ange.png",
    description:
      "Buste ailé au voile sur les yeux : projet Mystère du voile.",
    colSpan: 5,
    aspectRatio: "3/4",
    stretch: false,
    sortOrder: 1,
    published: true,
  },
  {
    title: "Le voyage de l’âme voilée",
    titleEn: "The Journey of the Veiled Soul",
    slug: "voyage-ame-voile",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2026,
    dimensions: "40 × 60 cm",
    imageUrl: "/artworks/voyage-ame-voile.png",
    description:
      "Cheval bandé des yeux, cavalier enveloppé de rouge : projet Mystère du voile.",
    colSpan: 7,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 2,
    published: true,
  },
  {
    title: "Sous le voile du silence",
    titleEn: "Under the Veil of Silence",
    slug: "sous-le-voile-du-silence",
    category: "SCULPTURE" as const,
    medium: "Sculpture",
    year: 2026,
    dimensions: "1 m",
    imageUrl: "/artworks/sous-le-voile-du-silence.png",
    description:
      "Sculpture allongée au drapé fluide : projet Mystère du voile.",
    colSpan: 7,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 3,
    published: true,
  },
  {
    title: "L’énigme du voile",
    titleEn: "The Enigma of the Veil",
    slug: "enigme-du-voile",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2026,
    dimensions: "40 × 60 cm",
    imageUrl: "/artworks/enigme-du-voile.png",
    description:
      "Figure masquée au manteau rouge et serpent : projet Mystère du voile.",
    colSpan: 5,
    aspectRatio: "3/4",
    stretch: false,
    sortOrder: 4,
    published: true,
  },
  {
    title: "Esclaves du sexe",
    titleEn: "Sex Slaves",
    slug: "esclaves-du-sexe",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2024,
    dimensions: "50 × 70 cm",
    imageUrl: "/artworks/esclaves-du-sexe.png",
    description:
      "Deux figures voilées : projet Mystère du voile.",
    colSpan: 8,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 5,
    published: true,
  },
  {
    title: "Aveuglément volontaire",
    titleEn: "Willful Blindness",
    slug: "aveuglement-volontaire",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2026,
    dimensions: null,
    imageUrl: "/artworks/aveuglement-volontaire.jpg",
    description:
      "Acrylique sur toile : figure au bandeau rouge, mains sur les yeux.",
    colSpan: 5,
    aspectRatio: "1024/948",
    stretch: false,
    sortOrder: 6,
    published: true,
  },
  {
    title: "Le regard complice",
    titleEn: "The Complicit Gaze",
    slug: "le-regard-complice",
    category: "PAINTING" as const,
    medium: "Peinture",
    year: 2026,
    dimensions: "80 × 100 cm",
    imageUrl: "/artworks/le-regard-complice.jpg",
    description:
      "Acrylique sur toile : scène figurative au manteau rouge.",
    colSpan: 7,
    aspectRatio: "4/5",
    stretch: false,
    sortOrder: 7,
    published: true,
  },
];

const inSituWorks = [
  {
    title: "Ben Mbuyulu devant le tableau Le regard complice",
    titleEn: "Ben Mbuyulu in front of the painting The Complicit Gaze",
    place: "Kinshasa (RDC)",
    placeEn: "Kinshasa (DRC)",
    year: 2026,
    imageUrl: "/artworks/le-regard-complice-insitu.jpg",
    description: "",
    published: true,
    sortOrder: 1,
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

  for (const item of inSituWorks) {
    const existing = await prisma.inSituWork.findFirst({
      where: { imageUrl: item.imageUrl },
    });
    if (existing) {
      await prisma.inSituWork.update({
        where: { id: existing.id },
        data: item,
      });
    } else {
      await prisma.inSituWork.create({ data: item });
    }
  }

  console.log(`Seeded ${inSituWorks.length} in situ entry(ies).`);

  await prisma.siteContent.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      heroImageUrl: "/artworks/esclaves-du-sexe.png",
      heroImageAltFr:
        "Esclaves du sexe : Ben Mbuyulu, peinture, Mystère du voile",
      heroImageAltEn:
        "Sex Slaves: Ben Mbuyulu, painting, Mystery of the Veil",
      portraitUrl: "/artist/ben-mbuyulu.jpg",
      bioLeadFr:
        "Peintre et sculpteur, Ben Mbuyulu mène une recherche autour du voile comme symbole : ce qui cache, protège, révèle ou transforme.",
      bioLeadEn:
        "Painter and sculptor Ben Mbuyulu explores the veil as a symbol: what hides, protects, reveals, or transforms.",
      bioBornFr: "Né en 2006 à Kinshasa (RDC).",
      bioBornEn: "Born in 2006 in Kinshasa (DRC).",
      bioP1Fr:
        "L’artiste peintre sculpteur Ben Mbuyulu est né en 2006 à Kinshasa. Élève de l’artiste Amani Bodo, Ben Mbuyulu s’initie à l’âge de 18 ans à la création artistique, plus précisément en peinture, et à l’âge de 20 ans comme artiste de formation à l’Académie des Beaux-Arts de Kinshasa, au département de sculpture.",
      bioP1En:
        "Painter and sculptor Ben Mbuyulu was born in 2006 in Kinshasa. A student of artist Amani Bodo, he began artistic creation at 18, first in painting, and at 20 trained at the Academy of Fine Arts of Kinshasa in the sculpture department.",
      bioP2Fr:
        "L’artiste rassemble les deux disciplines pour lancer un projet intitulé Mystère du voile, un espace de recherche autour du voile comme symbole : il peut cacher, protéger, révéler, séparer, soutenir et transformer. Le projet interroge aussi ce que l’être humain choisit de montrer ou de dissimuler.",
      bioP2En:
        "He brings both disciplines together in a project titled Mystery of the Veil: a space of research around the veil as symbol: it can hide, protect, reveal, separate, support, and transform. The project also questions what human beings choose to show or conceal.",
      bioP3Fr:
        "À travers sa démarche, Ben Mbuyulu cherche à produire des œuvres accessibles, sensibles et porteuses de réflexion, en mettant l’être humain au centre de son questionnement artistique. En peinture, il a créé son style de fond pour rendre ses œuvres si uniques.",
      bioP3En:
        "Through his practice, Ben Mbuyulu aims to make works that are accessible, sensitive, and reflective, placing the human being at the center of his artistic inquiry. In painting, he developed his own background style to make his works uniquely his.",
      email: "mbuyuluben@gmail.com",
      instagramUrl: "https://www.instagram.com/benmbuyulu/",
      facebookUrl: "https://www.facebook.com/profile.php?id=61589274320031",
    },
    update: {},
  });

  console.log("Site content ready (not overwritten if already present).");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
