"use client";

import { useActionState } from "react";
import {
  deletePublicationAction,
  savePublicationAction,
  type FormState,
} from "@/app/atelier/(espace)/actions";
import { DeleteButton } from "@/components/studio/DeleteButton";
import { PhotoField } from "@/components/studio/PhotoField";
import { SaveBar } from "@/components/studio/SaveBar";
import { VisibleToggle } from "@/components/studio/VisibleToggle";
import { AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

type Values = {
  id?: string;
  title: string;
  titleEn: string;
  source: string;
  sourceEn: string;
  year: number | null;
  url: string;
  imageUrl?: string;
  published: boolean;
};

export function PublicationForm({
  item,
  copy,
}: {
  item?: Values;
  copy: AtelierCopy;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    savePublicationAction,
    {},
  );
  const isNew = !item?.id;

  return (
    <form action={action} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <PhotoField
        currentUrl={item?.imageUrl || undefined}
        label={copy.publications.image}
        copy={copy.photo}
      />
      <AtelierField name="title" label={copy.common.titleFr} defaultValue={item?.title} />
      <AtelierField name="titleEn" label={copy.common.titleEn} defaultValue={item?.titleEn} />
      <AtelierField name="source" label={copy.common.sourceFr} defaultValue={item?.source} />
      <AtelierField name="sourceEn" label={copy.common.sourceEn} defaultValue={item?.sourceEn} />
      <div className="max-w-[10rem]">
        <AtelierField
          name="year"
          label={copy.common.year}
          type="number"
          defaultValue={item?.year ? String(item.year) : ""}
        />
      </div>
      <AtelierField
        name="url"
        label={copy.publications.url}
        defaultValue={item?.url}
      />
      <VisibleToggle defaultChecked={item?.published ?? true} copy={copy.visibility} />
      <SaveBar
        pending={pending}
        error={state.error}
        ok={state.ok}
        saveLabel={isNew ? copy.common.add : copy.common.save}
        copy={copy}
      />
      {item?.id ? (
        <DeleteButton
          action={deletePublicationAction}
          id={item.id}
          label={copy.publications.delete}
          confirmMessage={copy.publications.deleteConfirm}
        />
      ) : null}
    </form>
  );
}
