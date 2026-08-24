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

type Values = {
  id?: string;
  title: string;
  source: string;
  year: number | null;
  url: string;
  imageUrl?: string;
  published: boolean;
};

export function PublicationForm({ item }: { item?: Values }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    savePublicationAction,
    {},
  );
  const isNew = !item?.id;

  return (
    <form action={action} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <PhotoField currentUrl={item?.imageUrl || undefined} label="Image (facultatif)" />
      <AtelierField name="title" label="Titre" defaultValue={item?.title} />
      <AtelierField name="source" label="Paru dans" defaultValue={item?.source} />
      <div className="max-w-[10rem]">
        <AtelierField
          name="year"
          label="Année"
          type="number"
          defaultValue={item?.year ? String(item.year) : ""}
        />
      </div>
      <AtelierField
        name="url"
        label="Lien internet (si l’article est en ligne)"
        defaultValue={item?.url}
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
          action={deletePublicationAction}
          id={item.id}
          label="Supprimer cette publication"
          confirmMessage="Supprimer cette publication du site ?"
        />
      ) : null}
    </form>
  );
}
