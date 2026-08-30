import Image from "next/image";
import type { ArtworkCardData } from "@/lib/artworks";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type ArtworkCardProps = {
  artwork: ArtworkCardData;
  labels: Dictionary["gallery"];
  className?: string;
};

const COL_SPAN: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  12: "md:col-span-12",
};

export function ArtworkCard({ artwork, labels, className = "" }: ArtworkCardProps) {
  const spanClass = COL_SPAN[artwork.colSpan] ?? "md:col-span-6";
  const ratio = artwork.aspectRatio.includes("/")
    ? artwork.aspectRatio.replace("/", " / ")
    : artwork.aspectRatio;
  const mediumLabel =
    artwork.category === "SCULPTURE" ? labels.sculpture : labels.painting;

  return (
    <article className={`group col-span-1 flex flex-col items-center ${spanClass} ${className}`}>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className={`transition-transform duration-700 group-hover:scale-[1.02] ${
            artwork.stretch ? "object-cover" : "object-contain"
          }`}
        />
      </div>
      <div className="mt-4 w-full text-center">
        <h3 className="font-headline-sm text-headline-sm text-primary">
          {artwork.title}
          <span className="text-on-surface-variant font-body-md text-body-md">
            {" "}
            ({artwork.year})
          </span>
        </h3>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          {mediumLabel}
        </p>
      </div>
    </article>
  );
}
