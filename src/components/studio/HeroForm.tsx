"use client";

import { useActionState } from "react";
import { saveHeroAction, type FormState } from "@/app/atelier/(espace)/actions";
import { PhotoField } from "@/components/studio/PhotoField";
import { SaveBar } from "@/components/studio/SaveBar";

export function HeroForm({ imageUrl }: { imageUrl: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveHeroAction,
    {},
  );

  return (
    <form action={action} className="space-y-8">
      <PhotoField currentUrl={imageUrl} label="Grande photo" aspect="wide" />
      <SaveBar pending={pending} error={state.error} ok={state.ok} />
    </form>
  );
}
