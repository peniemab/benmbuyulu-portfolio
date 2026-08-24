"use client";

import { useActionState } from "react";
import { saveContactAction, type FormState } from "@/app/atelier/(espace)/actions";
import { SaveBar } from "@/components/studio/SaveBar";
import { AtelierField } from "@/components/studio/ui";

type Props = {
  email: string;
  instagramUrl: string;
  facebookUrl: string;
};

export function ContactForm({ email, instagramUrl, facebookUrl }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveContactAction,
    {},
  );

  return (
    <form action={action} className="space-y-6">
      <AtelierField name="email" label="Votre e-mail" defaultValue={email} type="email" />
      <AtelierField name="instagramUrl" label="Lien Instagram" defaultValue={instagramUrl} />
      <AtelierField name="facebookUrl" label="Lien Facebook" defaultValue={facebookUrl} />
      <SaveBar pending={pending} error={state.error} ok={state.ok} />
    </form>
  );
}
