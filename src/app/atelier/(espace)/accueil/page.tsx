import { HeroForm } from "@/components/studio/HeroForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getSiteContent } from "@/lib/site-content";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioHeroPage() {
  await requireStudio();
  const [copy, site] = await Promise.all([getAtelierCopy(), getSiteContent()]);

  return (
    <StudioSection
      title={copy.sections.accueil.label}
      help={copy.sections.accueil.help}
      previewHref="/"
      previewLabel={copy.seeOnSite}
    >
      <HeroForm imageUrl={site.heroImageUrl} copy={copy} />
    </StudioSection>
  );
}
