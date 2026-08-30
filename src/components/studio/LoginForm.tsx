"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/atelier/actions";
import { AuthLink } from "@/components/studio/AuthShell";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function LoginForm({
  copy,
  showSignupLink,
  resetSuccess,
}: {
  copy: AtelierCopy;
  showSignupLink: boolean;
  resetSuccess?: boolean;
}) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    null,
  );

  return (
    <>
      {resetSuccess ? (
        <p className="mb-5 font-body-md text-body-md text-mustard" role="status">
          {copy.auth.resetSuccess}
        </p>
      ) : null}
      <form action={action} className="flex flex-col gap-5">
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
          autoComplete="current-password"
        />
        {state?.error ? (
          <p className="font-body-md text-body-md text-paprika" role="alert">
            {state.error}
          </p>
        ) : null}
        <AtelierButton type="submit" disabled={pending} className="w-full">
          {pending ? copy.login.opening : copy.login.enter}
        </AtelierButton>
      </form>
      <div className="mt-6 flex flex-col gap-2 font-body-md text-body-md">
        <AuthLink href="/atelier/mot-de-passe-oublie">
          {copy.auth.forgotLink}
        </AuthLink>
        {showSignupLink ? (
          <p className="text-on-surface-variant">
            {copy.auth.noAccount}{" "}
            <AuthLink href="/atelier/inscription">{copy.auth.goSignup}</AuthLink>
          </p>
        ) : null}
      </div>
    </>
  );
}
