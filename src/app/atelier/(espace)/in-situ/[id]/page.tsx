import { notFound } from "next/navigation";
import { InSituForm } from "@/components/studio/InSituForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
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
  const [copy, item] = await Promise.all([
    getAtelierCopy(),
    prisma.inSituWork.findUnique({ where: { id } }),
  ]);
  if (!item) notFound();

  return (
    <StudioSection title={item.title} help={copy.inSitu.editHelp}>
      <InSituForm
        copy={copy}
        item={{
          id: item.id,
          title: item.title,
          titleEn: item.titleEn,
          place: item.place,
          placeEn: item.placeEn,
          year: item.year,
          description: item.description,
          imageUrl: item.imageUrl,
          published: item.published,
        }}
      />
    </StudioSection>
  );
}
