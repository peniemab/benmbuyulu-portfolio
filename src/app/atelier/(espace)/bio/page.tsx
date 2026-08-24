import { BioForm } from "@/components/studio/BioForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getSiteContent } from "@/lib/site-content";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioBioPage() {
  await requireStudio();
  const site = await getSiteContent();

  return (
    <StudioSection
      title="Bio"
      help="Votre portrait et le texte qui parle de vous."
      previewHref="/#bio"
    >
      <BioForm site={site} />
    </StudioSection>
  );
}
