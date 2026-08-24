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

type Values = {
  id?: string;
  title: string;
  place: string;
  year: number | null;
  description: string;
  imageUrl?: string;
  published: boolean;
};

export function InSituForm({ item }: { item?: Values }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveInSituAction,
    {},
  );
  const isNew = !item?.id;

  return (
    <form action={action} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <PhotoField currentUrl={item?.imageUrl} label="Photo" required={isNew} />
      <AtelierField name="title" label="Titre" defaultValue={item?.title} />
      <AtelierField name="place" label="Lieu" defaultValue={item?.place} />
      <div className="max-w-[10rem]">
        <AtelierField
          name="year"
          label="Année"
          type="number"
          defaultValue={item?.year ? String(item.year) : ""}
        />
      </div>
      <AtelierField
        name="description"
        label="Quelques mots (facultatif)"
        defaultValue={item?.description}
        multiline
      />
      <VisibleToggle defaultChecked={item?.published ?? true} />
      <SaveBar
        pending={pending}
        error={state.error}
        ok={state.ok}
        saveLabel={isNew ? "Ajouter" : "Enregistrer"}
      />
      {item?.id ? (
        <DeleteButton
          action={deleteInSituAction}
          id={item.id}
          label="Supprimer cette fiche"
          confirmMessage="Supprimer cette fiche du site ?"
        />
      ) : null}
    </form>
  );
}
