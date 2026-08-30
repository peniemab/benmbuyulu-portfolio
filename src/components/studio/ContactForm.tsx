"use client";

import { useActionState } from "react";
import { saveContactAction, type FormState } from "@/app/atelier/(espace)/actions";
import { SaveBar } from "@/components/studio/SaveBar";
import { AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

type Props = {
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  copy: AtelierCopy;
};

export function ContactForm({ email, instagramUrl, facebookUrl, copy }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveContactAction,
    {},
  );

  return (
    <form action={action} className="space-y-6">
      <AtelierField name="email" label={copy.contact.email} defaultValue={email} type="email" />
      <AtelierField name="instagramUrl" label={copy.contact.instagram} defaultValue={instagramUrl} />
      <AtelierField name="facebookUrl" label={copy.contact.facebook} defaultValue={facebookUrl} />
      <SaveBar pending={pending} error={state.error} ok={state.ok} copy={copy} />
    </form>
  );
}
