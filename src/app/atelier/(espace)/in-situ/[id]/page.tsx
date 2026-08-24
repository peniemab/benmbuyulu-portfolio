import { notFound } from "next/navigation";
import { InSituForm } from "@/components/studio/InSituForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function EditInSituPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStudio();
  const { id } = await params;
  const item = await prisma.inSituWork.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <StudioSection
      title={item.title}
      help="Changez la photo, le texte, ou cachez cette fiche du site."
    >
      <InSituForm
        item={{
          id: item.id,
          title: item.title,
          place: item.place,
          year: item.year,
          description: item.description,
          imageUrl: item.imageUrl,
          published: item.published,
        }}
      />
    </StudioSection>
  );
}
