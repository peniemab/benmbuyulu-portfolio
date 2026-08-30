"use client";

import { useActionState } from "react";
import {
  deleteInSituAction,
  saveInSituAction,
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
  place: string;
  year: number | null;
  description: string;
  imageUrl?: string;
  published: boolean;
};

export function InSituForm({ item, copy }: { item?: Values; copy: AtelierCopy }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveInSituAction,
    {},
  );
  const isNew = !item?.id;

  return (
    <form action={action} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <PhotoField
        currentUrl={item?.imageUrl}
        label={copy.common.photo}
        required={isNew}
        copy={copy.photo}
      />
      <AtelierField name="title" label={copy.common.title} defaultValue={item?.title} />
      <AtelierField name="place" label={copy.inSitu.place} defaultValue={item?.place} />
      <div className="max-w-[10rem]">
        <AtelierField
          name="year"
          label={copy.common.year}
          type="number"
          defaultValue={item?.year ? String(item.year) : ""}
        />
      </div>
      <AtelierField
        name="description"
        label={copy.inSitu.notes}
        defaultValue={item?.description}
        multiline
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
          action={deleteInSituAction}
          id={item.id}
          label={copy.inSitu.delete}
          confirmMessage={copy.inSitu.deleteConfirm}
        />
      ) : null}
    </form>
  );
}
