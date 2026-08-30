import { InSituForm } from "@/components/studio/InSituForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewInSituPage() {
  await requireStudio();
  const copy = await getAtelierCopy();

  return (
    <StudioSection title={copy.inSitu.newTitle} help={copy.inSitu.newHelp}>
      <InSituForm copy={copy} />
    </StudioSection>
  );
}
