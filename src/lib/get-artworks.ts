import { prisma } from "@/lib/prisma";
import type { ArtworkCardData } from "@/lib/artworks";

export async function getPublishedArtworks(): Promise<ArtworkCardData[]> {
  try {
    return await prisma.artwork.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
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
