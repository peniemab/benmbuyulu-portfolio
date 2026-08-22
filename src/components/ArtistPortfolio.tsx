"use client";

import type { ArtworkCardData } from "@/lib/artworks";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { WorksGrid } from "@/components/WorksGrid";
import { BioSection } from "@/components/BioSection";
import { SectionIndexNav } from "@/components/SectionIndexNav";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactBar } from "@/components/ContactBar";

type Props = {
  artworks: ArtworkCardData[];
  labels: Dictionary;
};

export function ArtistPortfolio({ artworks, labels }: Props) {
  return (
    <div className="w-full px-margin-mobile md:px-10 lg:px-14 pt-14 md:pt-16">
      <SectionIndexNav labels={labels.nav} />

      <section id="oeuvres" className="scroll-mt-24 pb-section-gap">
        <SectionHeading>{labels.nav.works}</SectionHeading>
        <WorksGrid artworks={artworks} labels={labels.gallery} />
      </section>

      <section id="bio" className="scroll-mt-24 pt-16 pb-section-gap">
        <SectionHeading>{labels.nav.bio}</SectionHeading>
        <BioSection labels={labels.bio} />
      </section>

      <section id="in-situ" className="scroll-mt-24 pt-16 pb-section-gap">
        <SectionHeading>{labels.nav.inSitu}</SectionHeading>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          {labels.sections.inSituSoon}
        </p>
      </section>

      <section id="publications" className="scroll-mt-24 pt-16 pb-section-gap">
        <SectionHeading>{labels.nav.publications}</SectionHeading>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          {labels.sections.publicationsSoon}
        </p>
      </section>

      <section
        id="contact"
        aria-label={labels.nav.contact}
        className="scroll-mt-24 pt-16 pb-24"
      >
        <ContactBar labels={labels} />
      </section>
    </div>
  );
}
