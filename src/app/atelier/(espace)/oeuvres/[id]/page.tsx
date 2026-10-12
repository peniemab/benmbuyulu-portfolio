import { notFound } from "next/navigation";
import { ArtworkForm } from "@/components/studio/ArtworkForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStudio();
  const { id } = await params;
  const [copy, artwork] = await Promise.all([
    getAtelierCopy(),
    prisma.artwork.findUnique({
      where: { id },
      include: {
        photos: { orderBy: { sortOrder: "asc" }, select: { id: true, imageUrl: true } },
      },
    }),
  ]);
  if (!artwork) notFound();

  return (
    <StudioSection
      title={artwork.title}
      help={copy.artworks.editHelp}
      previewHref={artwork.published ? `/oeuvres/${artwork.slug}` : undefined}
      previewLabel={copy.seeOnSite}
    >
      <ArtworkForm
        copy={copy}
        artwork={{
          id: artwork.id,
          title: artwork.title,
          titleEn: artwork.titleEn,
          year: artwork.year,
          category: artwork.category,
          imageUrl: artwork.imageUrl,
          dimensions: artwork.dimensions ?? "",
          description: artwork.description ?? "",
          descriptionEn: artwork.descriptionEn,
          photos: artwork.photos,
          published: artwork.published,
        }}
      />
    </StudioSection>
  );
}
