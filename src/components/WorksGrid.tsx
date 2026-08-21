"use client";

import { useMemo, useState } from "react";
import type { ArtworkCardData, GalleryFilter } from "@/lib/artworks";
import { filterArtworks } from "@/lib/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type Props = {
  artworks: ArtworkCardData[];
  labels: Dictionary["gallery"];
};

export function WorksGrid({ artworks, labels }: Props) {
  const [filter, setFilter] = useState<GalleryFilter>("ALL");

  const filters: { label: string; value: GalleryFilter }[] = [
    { label: labels.all, value: "ALL" },
    { label: labels.paintings, value: "PAINTING" },
    { label: labels.sculptures, value: "SCULPTURE" },
  ];

  const filtered = useMemo(
    () => filterArtworks(artworks, filter),
    [artworks, filter],
  );

  if (artworks.length === 0) {
    return (
      <p className="font-body-md text-body-md text-on-surface-variant py-16">
        {labels.emptyGallery}
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-10">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`font-label-caps text-label-caps pb-1 transition-colors ${
              filter === value ? "filter-active" : "filter-inactive"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="font-body-md text-body-md text-on-surface-variant py-16">
          {labels.emptyCategory}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-gutter gap-y-12 md:gap-y-14">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}
