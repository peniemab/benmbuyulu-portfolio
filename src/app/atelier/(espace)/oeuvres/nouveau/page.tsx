import { ArtworkForm } from "@/components/studio/ArtworkForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewArtworkPage() {
  await requireStudio();

  return (
    <StudioSection
      title="Nouvelle œuvre"
      help="Une photo, un titre, une année, et si c’est une peinture ou une sculpture."
    >
      <ArtworkForm />
    </StudioSection>
  );
}
