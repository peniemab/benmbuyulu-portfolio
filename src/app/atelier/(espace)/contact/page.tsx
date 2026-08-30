import { ContactForm } from "@/components/studio/ContactForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getSiteContent } from "@/lib/site-content";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioContactPage() {
  await requireStudio();
  const [copy, site] = await Promise.all([getAtelierCopy(), getSiteContent()]);

  return (
    <StudioSection
      title={copy.sections.contact.label}
      help={copy.sections.contact.help}
      previewHref="/#contact"
      previewLabel={copy.seeOnSite}
    >
      <ContactForm
        email={site.email}
        instagramUrl={site.instagramUrl}
        facebookUrl={site.facebookUrl}
        copy={copy}
      />
    </StudioSection>
  );
}
