import { PublicationForm } from "@/components/studio/PublicationForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewPublicationPage() {
  await requireStudio();
  const copy = await getAtelierCopy();

  return (
    <StudioSection title={copy.publications.newTitle} help={copy.publications.newHelp}>
      <PublicationForm copy={copy} />
    </StudioSection>
  );
}
