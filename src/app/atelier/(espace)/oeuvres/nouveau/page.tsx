import { ArtworkForm } from "@/components/studio/ArtworkForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewArtworkPage() {
  await requireStudio();
  const copy = await getAtelierCopy();

  return (
    <StudioSection title={copy.artworks.newTitle} help={copy.artworks.newHelp}>
      <ArtworkForm copy={copy} />
    </StudioSection>
  );
}
