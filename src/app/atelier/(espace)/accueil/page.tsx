import { HeroForm } from "@/components/studio/HeroForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getSiteContent } from "@/lib/site-content";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioHeroPage() {
  await requireStudio();
  const site = await getSiteContent();

  return (
    <StudioSection
      title="Accueil"
      help="C’est la grande photo que les visiteurs voient en premier, tout en haut de votre site."
      previewHref="/"
    >
      <HeroForm imageUrl={site.heroImageUrl} />
    </StudioSection>
  );
}
