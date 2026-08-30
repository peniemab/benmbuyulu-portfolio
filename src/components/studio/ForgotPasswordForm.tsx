"use client";

import { useActionState } from "react";
import {
  forgotPasswordAction,
  type AuthFormState,
} from "@/app/atelier/auth-actions";
import { AuthLink } from "@/components/studio/AuthShell";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function ForgotPasswordForm({ copy }: { copy: AtelierCopy }) {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    forgotPasswordAction,
    null,
  );

  if (state?.ok) {
    return (
      <>
        <p className="font-body-md text-body-md text-mustard" role="status">
          {state.ok}
        </p>
        <p className="mt-6 font-body-md text-body-md">
          <AuthLink href="/atelier/connexion">{copy.auth.backToLogin}</AuthLink>
        </p>
      </>
    );
  }

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        <AtelierField
          name="email"
          label={copy.auth.email}
          type="email"
          required
          autoComplete="email"
        />
        {state?.error ? (
          <p className="font-body-md text-body-md text-paprika" role="alert">
            {state.error}
          </p>
        ) : null}
        <AtelierButton type="submit" disabled={pending} className="w-full">
          {pending ? copy.auth.sendingReset : copy.auth.sendReset}
        </AtelierButton>
      </form>
      <p className="mt-6 font-body-md text-body-md">
        <AuthLink href="/atelier/connexion">{copy.auth.backToLogin}</AuthLink>
      </p>
    </>
  );
}
