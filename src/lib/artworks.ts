import type { Artwork } from "@/generated/prisma/client";
import type { Category } from "@/generated/prisma/enums";

export type GalleryFilter = "ALL" | Category;

export type ArtworkCardData = Pick<
  Artwork,
  | "id"
  | "title"
  | "slug"
  | "category"
  | "medium"
  | "year"
  | "imageUrl"
  | "description"
  | "colSpan"
  | "aspectRatio"
  | "stretch"
>;

export function filterArtworks(
  artworks: ArtworkCardData[],
  filter: GalleryFilter,
): ArtworkCardData[] {
  if (filter === "ALL") return artworks;
  return artworks.filter((artwork) => artwork.category === filter);
}
