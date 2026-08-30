"use client";

import { useActionState } from "react";
import { saveHeroAction, type FormState } from "@/app/atelier/(espace)/actions";
import { PhotoField } from "@/components/studio/PhotoField";
import { SaveBar } from "@/components/studio/SaveBar";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function HeroForm({
  imageUrl,
  copy,
}: {
  imageUrl: string;
  copy: AtelierCopy;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveHeroAction,
    {},
  );

  return (
    <form action={action} className="space-y-8">
      <PhotoField
        currentUrl={imageUrl}
        label={copy.hero.photo}
        aspect="wide"
        copy={copy.photo}
      />
      <SaveBar pending={pending} error={state.error} ok={state.ok} copy={copy} />
    </form>
  );
}
