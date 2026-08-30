"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/atelier/actions";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function LoginForm({
  configured,
  copy,
}: {
  configured: boolean;
  copy: AtelierCopy;
}) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    null,
  );

  if (!configured) {
    return (
      <p className="font-body-md text-body-md text-on-surface-variant">
        {copy.login.notConfigured}
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
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
  );
}
