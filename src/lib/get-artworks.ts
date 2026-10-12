import { prisma } from "@/lib/prisma";
import type { Artwork } from "@/generated/prisma/client";
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

export type ArtworkNeighbor = { slug: string; title: string; titleEn: string };

export type ArtworkDetailRaw = Pick<
  Artwork,
  | "id"
  | "title"
  | "titleEn"
  | "slug"
  | "category"
  | "year"
  | "dimensions"
  | "imageUrl"
  | "description"
  | "descriptionEn"
  | "aspectRatio"
> & {
  photos: string[];
  previous: ArtworkNeighbor | null;
  next: ArtworkNeighbor | null;
};

export async function getPublishedArtworkBySlug(
  slug: string,
): Promise<ArtworkDetailRaw | null> {
  const artwork = await prisma.artwork.findFirst({
    where: { slug, published: true },
    select: {
      id: true,
      title: true,
      titleEn: true,
      slug: true,
      category: true,
      year: true,
      dimensions: true,
      imageUrl: true,
      description: true,
      descriptionEn: true,
      aspectRatio: true,
      sortOrder: true,
      photos: { orderBy: { sortOrder: "asc" }, select: { imageUrl: true } },
    },
  });
  if (!artwork) return null;

  const neighbor = { slug: true, title: true, titleEn: true } as const;
  const [previous, next] = await Promise.all([
    prisma.artwork.findFirst({
      where: { published: true, sortOrder: { lt: artwork.sortOrder } },
      orderBy: { sortOrder: "desc" },
      select: neighbor,
    }),
    prisma.artwork.findFirst({
      where: { published: true, sortOrder: { gt: artwork.sortOrder } },
      orderBy: { sortOrder: "asc" },
      select: neighbor,
    }),
  ]);

  const { photos, ...rest } = artwork;
  return {
    ...rest,
    photos: [artwork.imageUrl, ...photos.map((photo) => photo.imageUrl)],
    previous,
    next,
  };
}
