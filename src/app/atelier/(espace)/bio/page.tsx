import { BioForm } from "@/components/studio/BioForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getLocale } from "@/i18n/get-dictionary";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getSiteContent } from "@/lib/site-content";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioBioPage() {
  await requireStudio();
  const [copy, locale, site] = await Promise.all([
    getAtelierCopy(),
    getLocale(),
    getSiteContent(),
  ]);

  return (
    <StudioSection
      title={copy.sections.bio.label}
      help={copy.sections.bio.help}
      previewHref="/#bio"
      previewLabel={copy.seeOnSite}
    >
      <BioForm site={site} copy={copy} locale={locale} />
    </StudioSection>
  );
}
