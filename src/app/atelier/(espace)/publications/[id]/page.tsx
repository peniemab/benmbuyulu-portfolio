import { notFound } from "next/navigation";
import { PublicationForm } from "@/components/studio/PublicationForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStudio();
  const { id } = await params;
  const item = await prisma.publication.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <StudioSection
      title={item.title}
      help="Changez le texte, l’image, ou cachez cette publication du site."
    >
      <PublicationForm
        item={{
          id: item.id,
          title: item.title,
          source: item.source,
          year: item.year,
          url: item.url,
          imageUrl: item.imageUrl,
          published: item.published,
        }}
      />
    </StudioSection>
  );
}
