"use client";

import { useActionState } from "react";
import {
  signupAction,
  type AuthFormState,
} from "@/app/atelier/auth-actions";
import { AuthLink } from "@/components/studio/AuthShell";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function SignupForm({ copy }: { copy: AtelierCopy }) {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    signupAction,
    null,
  );

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        <AtelierField
          name="name"
          label={copy.auth.name}
          required
          autoComplete="name"
        />
        <AtelierField
          name="email"
          label={copy.auth.email}
          type="email"
          required
          autoComplete="email"
        />
        <AtelierField
          name="password"
          label={copy.login.password}
          type="password"
          required
          autoComplete="new-password"
        />
        <AtelierField
          name="confirmPassword"
          label={copy.auth.confirmPassword}
          type="password"
          required
          autoComplete="new-password"
        />
        {state?.error ? (
          <p className="font-body-md text-body-md text-paprika" role="alert">
            {state.error}
          </p>
        ) : null}
        <AtelierButton type="submit" disabled={pending} className="w-full">
          {pending ? copy.auth.creating : copy.auth.createAccount}
        </AtelierButton>
      </form>
      <p className="mt-6 font-body-md text-body-md text-on-surface-variant">
        {copy.auth.alreadyHaveAccount}{" "}
        <AuthLink href="/atelier/connexion">{copy.auth.goLogin}</AuthLink>
      </p>
    </>
  );
}
