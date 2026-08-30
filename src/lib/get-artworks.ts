import { prisma } from "@/lib/prisma";
import type { ArtworkCardRaw } from "@/lib/artworks";

export async function getPublishedArtworks(): Promise<ArtworkCardRaw[]> {
  try {
    return await prisma.artwork.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        category: true,
        medium: true,
        year: true,
        imageUrl: true,
        description: true,
        colSpan: true,
        aspectRatio: true,
        stretch: true,
      },
    });
  } catch (error) {
    console.error("[getPublishedArtworks] failed:", error);
    return [];
  }
}
