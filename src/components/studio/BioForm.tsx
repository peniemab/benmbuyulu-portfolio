"use client";

import { useActionState, useState } from "react";
import { saveBioAction, type FormState } from "@/app/atelier/(espace)/actions";
import { PhotoField } from "@/components/studio/PhotoField";
import { SaveBar } from "@/components/studio/SaveBar";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { Locale } from "@/i18n/config";
import type { AtelierCopy } from "@/lib/atelier-copy";
import type { SiteContentRow } from "@/lib/site-content";

export function BioForm({
  site,
  copy,
  locale,
}: {
  site: SiteContentRow;
  copy: AtelierCopy;
  locale: Locale;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveBioAction,
    {},
  );
  const [showOther, setShowOther] = useState(false);
  const primaryIsFr = locale === "fr";

  const frFields = (
    <>
      <AtelierField
        name="bioLeadFr"
        label={primaryIsFr ? copy.bio.lead : copy.bio.leadFr}
        defaultValue={site.bioLeadFr}
        multiline
      />
      <AtelierField
        name="bioBornFr"
        label={primaryIsFr ? copy.bio.born : copy.bio.bornFr}
        defaultValue={site.bioBornFr}
      />
      <AtelierField
        name="bioP1Fr"
        label={primaryIsFr ? copy.bio.p1 : copy.bio.p1Fr}
        defaultValue={site.bioP1Fr}
        multiline
      />
      <AtelierField
        name="bioP2Fr"
        label={primaryIsFr ? copy.bio.p2 : copy.bio.p2Fr}
        defaultValue={site.bioP2Fr}
        multiline
      />
      <AtelierField
        name="bioP3Fr"
        label={primaryIsFr ? copy.bio.p3 : copy.bio.p3Fr}
        defaultValue={site.bioP3Fr}
        multiline
      />
    </>
  );

  const enFields = (
    <>
      <AtelierField
        name="bioLeadEn"
        label={primaryIsFr ? copy.bio.leadEn : copy.bio.lead}
        defaultValue={site.bioLeadEn}
        multiline
      />
      <AtelierField
        name="bioBornEn"
        label={primaryIsFr ? copy.bio.bornEn : copy.bio.born}
        defaultValue={site.bioBornEn}
      />
      <AtelierField
        name="bioP1En"
        label={primaryIsFr ? copy.bio.p1En : copy.bio.p1}
        defaultValue={site.bioP1En}
        multiline
      />
      <AtelierField
        name="bioP2En"
        label={primaryIsFr ? copy.bio.p2En : copy.bio.p2}
        defaultValue={site.bioP2En}
        multiline
      />
      <AtelierField
        name="bioP3En"
        label={primaryIsFr ? copy.bio.p3En : copy.bio.p3}
        defaultValue={site.bioP3En}
        multiline
      />
    </>
  );

  return (
    <form action={action} className="space-y-8">
      <PhotoField
        currentUrl={site.portraitUrl}
        label={copy.bio.portrait}
        copy={copy.photo}
      />

      {primaryIsFr ? frFields : enFields}

      <AtelierButton
        type="button"
        variant="outline"
        size="md"
        onClick={() => setShowOther((value) => !value)}
      >
        {primaryIsFr
          ? showOther
            ? copy.bio.hideEnglish
            : copy.bio.showEnglish
          : showOther
            ? copy.bio.hideFrench
            : copy.bio.showFrench}
      </AtelierButton>

      {showOther ? (
        <div className="space-y-8">{primaryIsFr ? enFields : frFields}</div>
      ) : primaryIsFr ? (
        <>
          <input type="hidden" name="bioLeadEn" defaultValue={site.bioLeadEn} />
          <input type="hidden" name="bioBornEn" defaultValue={site.bioBornEn} />
          <input type="hidden" name="bioP1En" defaultValue={site.bioP1En} />
          <input type="hidden" name="bioP2En" defaultValue={site.bioP2En} />
          <input type="hidden" name="bioP3En" defaultValue={site.bioP3En} />
        </>
      ) : (
        <>
          <input type="hidden" name="bioLeadFr" defaultValue={site.bioLeadFr} />
          <input type="hidden" name="bioBornFr" defaultValue={site.bioBornFr} />
          <input type="hidden" name="bioP1Fr" defaultValue={site.bioP1Fr} />
          <input type="hidden" name="bioP2Fr" defaultValue={site.bioP2Fr} />
          <input type="hidden" name="bioP3Fr" defaultValue={site.bioP3Fr} />
        </>
      )}

      <SaveBar pending={pending} error={state.error} ok={state.ok} copy={copy} />
    </form>
  );
}
