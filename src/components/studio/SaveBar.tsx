"use client";

import { AtelierButton } from "@/components/studio/ui";

type Props = {
  pending: boolean;
  error?: string;
  ok?: boolean;
  saveLabel?: string;
};

export function SaveBar({
  pending,
  error,
  ok,
  saveLabel = "Enregistrer",
}: Props) {
  return (
    <div className="-mx-margin-mobile mt-16 border-t border-outline-variant bg-surface/95 px-margin-mobile py-5 md:-mx-12 md:px-12">
      {error ? (
        <p className="mb-3 font-body-md text-body-md text-paprika" role="alert">
          {error}
        </p>
      ) : null}
      {ok ? (
        <p className="mb-3 font-body-md text-body-md text-primary" role="status">
          C’est enregistré. Votre site est à jour.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <AtelierButton type="submit" disabled={pending}>
          {pending ? "Enregistrement…" : saveLabel}
        </AtelierButton>
        {ok ? (
          <AtelierButton href="/" target="_blank" rel="noreferrer" variant="mustard">
            Voir le site
          </AtelierButton>
        ) : null}
      </div>
    </div>
  );
}
