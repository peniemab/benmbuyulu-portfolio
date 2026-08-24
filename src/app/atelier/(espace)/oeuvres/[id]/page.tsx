import { notFound } from "next/navigation";
import { ArtworkForm } from "@/components/studio/ArtworkForm";
import { StudioSection } from "@/components/studio/StudioSection";
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
  const artwork = await prisma.artwork.findUnique({ where: { id } });
  if (!artwork) notFound();

  return (
    <StudioSection
      title={artwork.title}
      help="Changez la photo, le titre, l’année, ou cachez l’œuvre du site."
    >
      <ArtworkForm
        artwork={{
          id: artwork.id,
          title: artwork.title,
          year: artwork.year,
          category: artwork.category,
          imageUrl: artwork.imageUrl,
          published: artwork.published,
        }}
      />
    </StudioSection>
  );
}
