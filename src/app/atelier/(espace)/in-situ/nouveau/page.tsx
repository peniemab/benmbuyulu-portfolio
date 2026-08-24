import { InSituForm } from "@/components/studio/InSituForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewInSituPage() {
  await requireStudio();

  return (
    <StudioSection
      title="Nouvelle fiche in situ"
      help="Une photo, un titre, le lieu, et l’année si vous la connaissez."
    >
      <InSituForm />
    </StudioSection>
  );
}
