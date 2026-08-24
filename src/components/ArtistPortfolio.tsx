"use client";

import type { ArtworkCardData } from "@/lib/artworks";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { InSituCard, PublicationCard } from "@/lib/site-content";
import { WorksGrid } from "@/components/WorksGrid";
import { BioSection } from "@/components/BioSection";
import { SectionIndexNav } from "@/components/SectionIndexNav";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactBar } from "@/components/ContactBar";
import { InSituGrid } from "@/components/InSituGrid";
import { PublicationsList } from "@/components/PublicationsList";

type Props = {
  artworks: ArtworkCardData[];
  labels: Dictionary;
  portraitSrc: string;
  email: string;
  inSitu: InSituCard[];
  publications: PublicationCard[];
};

export function ArtistPortfolio({
  artworks,
  labels,
  portraitSrc,
  email,
  inSitu = [],
  publications = [],
}: Props) {
  return (
    <div className="w-full px-margin-mobile md:px-10 lg:px-14 pt-14 md:pt-16">
      <SectionIndexNav labels={labels.nav} />

      <section id="oeuvres" className="scroll-mt-24 pb-section-gap">
        <SectionHeading>{labels.nav.works}</SectionHeading>
        <WorksGrid artworks={artworks} labels={labels.gallery} />
      </section>

      <section id="bio" className="scroll-mt-24 pt-16 pb-section-gap">
        <SectionHeading>{labels.nav.bio}</SectionHeading>
        <BioSection labels={labels.bio} portraitSrc={portraitSrc} />
      </section>

      <section id="in-situ" className="scroll-mt-24 pt-16 pb-section-gap">
        <SectionHeading>{labels.nav.inSitu}</SectionHeading>
        <InSituGrid items={inSitu} emptyLabel={labels.sections.inSituSoon} />
      </section>

      <section id="publications" className="scroll-mt-24 pt-16 pb-section-gap">
        <SectionHeading>{labels.nav.publications}</SectionHeading>
        <PublicationsList
          items={publications}
          emptyLabel={labels.sections.publicationsSoon}
        />
      </section>

      <section
        id="contact"
        aria-label={labels.nav.contact}
        className="scroll-mt-24 pt-16 pb-24"
      >
        <ContactBar labels={labels} email={email} />
      </section>
    </div>
  );
}
