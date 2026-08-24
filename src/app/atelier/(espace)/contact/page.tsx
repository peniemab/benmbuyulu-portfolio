import { ContactForm } from "@/components/studio/ContactForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { getSiteContent } from "@/lib/site-content";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioContactPage() {
  await requireStudio();
  const site = await getSiteContent();

  return (
    <StudioSection
      title="Contact"
      help="L’e-mail du bouton Contact, et les liens Instagram et Facebook du menu."
      previewHref="/#contact"
    >
      <ContactForm
        email={site.email}
        instagramUrl={site.instagramUrl}
        facebookUrl={site.facebookUrl}
      />
    </StudioSection>
  );
}
