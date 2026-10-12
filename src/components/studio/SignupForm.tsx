"use client";

import { useActionState } from "react";
import {
  signupAction,
  type AuthFormState,
} from "@/app/atelier/auth-actions";
import { AuthLink } from "@/components/studio/AuthShell";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function SignupForm({
  copy,
  invitation,
}: {
  copy: AtelierCopy;
  /** Set when joining via an invitation link: the e-mail is fixed by the invitation. */
  invitation?: { token: string; email: string };
}) {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    signupAction,
    null,
  );

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        {invitation ? (
          <input type="hidden" name="invitation" value={invitation.token} />
        ) : (
          <AtelierField
            name="setupCode"
            label={copy.auth.setupCode}
            type="password"
            required
            autoComplete="off"
          />
        )}
        <AtelierField
          name="name"
          label={copy.auth.name}
          required
          autoComplete="name"
        />
        {invitation ? (
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              {copy.auth.email}
            </span>
            <p className="mt-2 border border-outline-variant bg-surface-container px-4 py-3.5 text-[16px] text-on-surface-variant">
              {invitation.email}
            </p>
          </div>
        ) : (
          <AtelierField
            name="email"
            label={copy.auth.email}
            type="email"
            required
            autoComplete="email"
          />
        )}
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
