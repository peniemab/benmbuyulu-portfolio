import Image from "next/image";
import type { ArtworkCardData } from "@/lib/artworks";

type ArtworkCardProps = {
  artwork: ArtworkCardData;
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <article className="group">
      <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
        <Image
          src={artwork.imageUrl}
          alt={artwork.description ?? artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          priority
        />
      </div>
      <div className="mt-4">
        <h2 className="font-headline-sm text-headline-sm text-primary">
          {artwork.title}
          <span className="text-on-surface-variant font-body-md text-body-md">
            {" "}
            ({artwork.year})
          </span>
        </h2>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          {artwork.medium}
        </p>
      </div>
    </article>
  );
}
