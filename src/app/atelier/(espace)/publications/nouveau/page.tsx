import { PublicationForm } from "@/components/studio/PublicationForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewPublicationPage() {
  await requireStudio();

  return (
    <StudioSection
      title="Nouvelle publication"
      help="Le titre, où c’est paru, l’année, et le lien si l’article est en ligne."
    >
      <PublicationForm />
    </StudioSection>
  );
}
