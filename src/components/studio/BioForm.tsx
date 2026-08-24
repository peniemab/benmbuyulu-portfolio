"use client";

import { useActionState, useState } from "react";
import { saveBioAction, type FormState } from "@/app/atelier/(espace)/actions";
import { PhotoField } from "@/components/studio/PhotoField";
import { SaveBar } from "@/components/studio/SaveBar";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { SiteContentRow } from "@/lib/site-content";

export function BioForm({ site }: { site: SiteContentRow }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveBioAction,
    {},
  );
  const [showEn, setShowEn] = useState(false);

  return (
    <form action={action} className="space-y-8">
      <PhotoField currentUrl={site.portraitUrl} label="Votre portrait" />

      <AtelierField name="bioLeadFr" label="Phrase d’accroche" defaultValue={site.bioLeadFr} multiline />
      <AtelierField name="bioBornFr" label="Ligne de naissance" defaultValue={site.bioBornFr} />
      <AtelierField name="bioP1Fr" label="Premier paragraphe" defaultValue={site.bioP1Fr} multiline />
      <AtelierField name="bioP2Fr" label="Deuxième paragraphe" defaultValue={site.bioP2Fr} multiline />
      <AtelierField name="bioP3Fr" label="Troisième paragraphe" defaultValue={site.bioP3Fr} multiline />

      <AtelierButton type="button" variant="outline" size="md" onClick={() => setShowEn((value) => !value)}>
        {showEn
          ? "Masquer le texte en anglais"
          : "Texte en anglais"}
      </AtelierButton>

      <div className={showEn ? "space-y-8" : "hidden"}>
        <AtelierField name="bioLeadEn" label="Accroche (anglais)" defaultValue={site.bioLeadEn} multiline />
        <AtelierField name="bioBornEn" label="Naissance (anglais)" defaultValue={site.bioBornEn} />
        <AtelierField name="bioP1En" label="Paragraphe 1 (anglais)" defaultValue={site.bioP1En} multiline />
        <AtelierField name="bioP2En" label="Paragraphe 2 (anglais)" defaultValue={site.bioP2En} multiline />
        <AtelierField name="bioP3En" label="Paragraphe 3 (anglais)" defaultValue={site.bioP3En} multiline />
      </div>

      {!showEn ? (
        <>
          <input type="hidden" name="bioLeadEn" defaultValue={site.bioLeadEn} />
          <input type="hidden" name="bioBornEn" defaultValue={site.bioBornEn} />
          <input type="hidden" name="bioP1En" defaultValue={site.bioP1En} />
          <input type="hidden" name="bioP2En" defaultValue={site.bioP2En} />
          <input type="hidden" name="bioP3En" defaultValue={site.bioP3En} />
        </>
      ) : null}

      <SaveBar pending={pending} error={state.error} ok={state.ok} />
    </form>
  );
}
