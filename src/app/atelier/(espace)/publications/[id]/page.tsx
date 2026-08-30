import { notFound } from "next/navigation";
import { PublicationForm } from "@/components/studio/PublicationForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
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
  const [copy, item] = await Promise.all([
    getAtelierCopy(),
    prisma.publication.findUnique({ where: { id } }),
  ]);
  if (!item) notFound();

  return (
    <StudioSection title={item.title} help={copy.publications.editHelp}>
      <PublicationForm
        copy={copy}
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
