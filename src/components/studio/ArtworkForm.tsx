"use client";

import { useActionState } from "react";
import {
  deleteArtworkAction,
  saveArtworkAction,
  type FormState,
} from "@/app/atelier/(espace)/actions";
import { CategoryPicker } from "@/components/studio/CategoryPicker";
import { DeleteButton } from "@/components/studio/DeleteButton";
import { PhotoField } from "@/components/studio/PhotoField";
import { SaveBar } from "@/components/studio/SaveBar";
import { VisibleToggle } from "@/components/studio/VisibleToggle";
import { AtelierField } from "@/components/studio/ui";

type ArtworkValues = {
  id?: string;
  title: string;
  year: number;
  category: "PAINTING" | "SCULPTURE";
  imageUrl?: string;
  published: boolean;
};

export function ArtworkForm({ artwork }: { artwork?: ArtworkValues }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveArtworkAction,
    {},
  );
  const isNew = !artwork?.id;

  return (
    <form action={action} className="space-y-8">
      {artwork?.id ? <input type="hidden" name="id" value={artwork.id} /> : null}
      <PhotoField
        currentUrl={artwork?.imageUrl}
        label="Photo de l’œuvre"
        required={isNew}
      />
      <AtelierField
        name="title"
        label="Titre"
        required
        defaultValue={artwork?.title ?? ""}
      />
      <div className="max-w-[10rem]">
        <AtelierField
          name="year"
          label="Année"
          type="number"
          required
          defaultValue={String(artwork?.year ?? new Date().getFullYear())}
        />
      </div>
      <CategoryPicker defaultValue={artwork?.category} />
      <VisibleToggle defaultChecked={artwork?.published ?? true} />
      <SaveBar
        pending={pending}
        error={state.error}
        ok={state.ok}
        saveLabel={isNew ? "Ajouter l’œuvre" : "Enregistrer"}
      />
      {artwork?.id ? (
        <DeleteButton
          action={deleteArtworkAction}
          id={artwork.id}
          label="Supprimer cette œuvre"
          confirmMessage="Supprimer cette œuvre du site ? Cette action est définitive."
        />
      ) : null}
    </form>
  );
}
