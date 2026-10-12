import { ArtworkOrderGrid } from "@/components/studio/ArtworkOrderGrid";
import { StudioSection } from "@/components/studio/StudioSection";
import { AtelierButton } from "@/components/studio/ui";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioArtworksPage() {
  await requireStudio();
  const [copy, artworks] = await Promise.all([
    getAtelierCopy(),
    prisma.artwork.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  return (
    <StudioSection
      title={copy.sections.oeuvres.label}
      help={copy.sections.oeuvres.help}
      previewHref="/#oeuvres"
      previewLabel={copy.seeOnSite}
      wide
    >
      {artworks.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border border-dashed border-outline-variant px-6 py-16">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {copy.artworks.empty}
          </p>
          <AtelierButton href="/atelier/oeuvres/nouveau">
            {copy.artworks.add}
          </AtelierButton>
        </div>
      ) : (
        <ArtworkOrderGrid
          copy={copy}
          artworks={artworks.map(({ id, title, year, imageUrl, published }) => ({
            id,
            title,
            year,
            imageUrl,
            published,
          }))}
        />
      )}
    </StudioSection>
  );
}
