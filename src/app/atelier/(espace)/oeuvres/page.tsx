import Link from "next/link";
import { StudioSection } from "@/components/studio/StudioSection";
import { AtelierButton } from "@/components/studio/ui";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioArtworksPage() {
  await requireStudio();
  const artworks = await prisma.artwork.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <StudioSection
      title="Œuvres"
      help="Touchez une œuvre pour changer sa photo, son titre ou son année."
      previewHref="/#oeuvres"
      wide
    >
      {artworks.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border border-dashed border-outline-variant px-6 py-16">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Aucune œuvre pour l’instant.
          </p>
          <AtelierButton href="/atelier/oeuvres/nouveau">
            Ajouter une œuvre
          </AtelierButton>
        </div>
      ) : (
        <>
          <AtelierButton href="/atelier/oeuvres/nouveau">
            Ajouter une œuvre
          </AtelierButton>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {artworks.map((artwork) => (
              <li key={artwork.id}>
                <Link href={`/atelier/oeuvres/${artwork.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artwork.imageUrl}
                      alt=""
                      className="size-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                    {!artwork.published ? (
                      <span className="absolute left-2 top-2 bg-black/80 px-2 py-1 font-label-caps text-[0.65rem] tracking-wide text-white">
                        Cachée
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 font-headline-sm text-[1.05rem] text-primary">
                    {artwork.title}
                  </p>
                  <p className="mt-0.5 font-body-md text-[0.9rem] text-on-surface-variant">
                    {artwork.year}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </StudioSection>
  );
}
