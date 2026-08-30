"use client";

import { useActionState } from "react";
import {
  resetPasswordAction,
  type AuthFormState,
} from "@/app/atelier/auth-actions";
import { AuthLink } from "@/components/studio/AuthShell";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function ResetPasswordForm({
  copy,
  token,
}: {
  copy: AtelierCopy;
  token: string;
}) {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    resetPasswordAction,
    null,
  );

  if (!token) {
    return (
      <>
        <p className="font-body-md text-body-md text-paprika" role="alert">
          {copy.auth.resetInvalid}
        </p>
        <p className="mt-6 font-body-md text-body-md">
          <AuthLink href="/atelier/mot-de-passe-oublie">
            {copy.auth.forgotLink}
          </AuthLink>
        </p>
      </>
    );
  }

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        <input type="hidden" name="token" value={token} />
        <AtelierField
          name="password"
          label={copy.auth.newPassword}
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
          {pending ? copy.auth.savingPassword : copy.auth.savePassword}
        </AtelierButton>
      </form>
    </>
  );
}
