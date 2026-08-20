"use client";

import type { ArtworkCardData } from "@/lib/artworks";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { WorksGrid } from "@/components/WorksGrid";
import { BioSection } from "@/components/BioSection";

type Props = {
  artworks: ArtworkCardData[];
  labels: Dictionary;
};

export function ArtistPortfolio({ artworks, labels }: Props) {
  return (
    <div className="w-full px-margin-mobile md:px-10 lg:px-14 pt-14 md:pt-16">
      <section id="oeuvres" className="scroll-mt-24 pb-section-gap">
        <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-8">
          {labels.nav.works}
        </h2>
        <WorksGrid artworks={artworks} labels={labels.gallery} />
      </section>

      <section id="bio" className="scroll-mt-24 border-t border-outline-variant pt-16 pb-section-gap">
        <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-8">
          {labels.nav.bio}
        </h2>
        <BioSection labels={labels.bio} />
      </section>

      <section
        id="expositions"
        className="scroll-mt-24 border-t border-outline-variant pt-16 pb-section-gap"
      >
        <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-8">
          {labels.nav.exhibitions}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          {labels.sections.exhibitionsSoon}
        </p>
      </section>

      <section
        id="publications"
        className="scroll-mt-24 border-t border-outline-variant pt-16 pb-section-gap"
      >
        <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-8">
          {labels.nav.publications}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          {labels.sections.publicationsSoon}
        </p>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 border-t border-outline-variant pt-16 pb-24"
      >
        <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-8">
          {labels.nav.contact}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-3">
          {labels.sections.contactLead}
        </p>
        <a
          href="mailto:hello@benmbuyulu.com"
          className="font-headline-sm text-headline-sm text-primary underline-offset-4 hover:underline"
        >
          hello@benmbuyulu.com
        </a>
      </section>
    </div>
  );
}
