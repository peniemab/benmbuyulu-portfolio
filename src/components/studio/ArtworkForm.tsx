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
import type { AtelierCopy } from "@/lib/atelier-copy";

type ArtworkValues = {
  id?: string;
  title: string;
  titleEn: string;
  year: number;
  category: "PAINTING" | "SCULPTURE";
  imageUrl?: string;
  published: boolean;
};

export function ArtworkForm({
  artwork,
  copy,
}: {
  artwork?: ArtworkValues;
  copy: AtelierCopy;
}) {
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
        label={copy.artworks.photo}
        required={isNew}
        copy={copy.photo}
      />
      <AtelierField
        name="title"
        label={copy.common.titleFr}
        required
        defaultValue={artwork?.title ?? ""}
      />
      <AtelierField
        name="titleEn"
        label={copy.common.titleEn}
        defaultValue={artwork?.titleEn ?? ""}
      />
      <div className="max-w-[10rem]">
        <AtelierField
          name="year"
          label={copy.common.year}
          type="number"
          required
          defaultValue={String(artwork?.year ?? new Date().getFullYear())}
        />
      </div>
      <CategoryPicker defaultValue={artwork?.category} copy={copy.category} />
      <VisibleToggle defaultChecked={artwork?.published ?? true} copy={copy.visibility} />
      <SaveBar
        pending={pending}
        error={state.error}
        ok={state.ok}
        saveLabel={isNew ? copy.artworks.add : copy.common.save}
        copy={copy}
      />
      {artwork?.id ? (
        <DeleteButton
          action={deleteArtworkAction}
          id={artwork.id}
          label={copy.artworks.delete}
          confirmMessage={copy.artworks.deleteConfirm}
        />
      ) : null}
    </form>
  );
}
