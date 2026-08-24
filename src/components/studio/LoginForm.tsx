"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/atelier/actions";
import { AtelierButton, AtelierField } from "@/components/studio/ui";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    null,
  );

  if (!configured) {
    return (
      <p className="font-body-md text-body-md text-on-surface-variant">
        L’atelier n’est pas encore ouvert. Le mot de passe n’a pas été réglé.
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <AtelierField
        name="password"
        label="Mot de passe"
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
        {pending ? "Ouverture…" : "Entrer"}
      </AtelierButton>
    </form>
  );
}
