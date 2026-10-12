"use client";

import { useActionState, useState } from "react";
import { inviteAction, type InviteState } from "@/app/atelier/(espace)/acces/actions";
import { AtelierButton, AtelierField } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export function InviteForm({ copy }: { copy: AtelierCopy }) {
  const [state, action, pending] = useActionState<InviteState, FormData>(inviteAction, null);
  const [copiedLink, setCopiedLink] = useState<string>();

  return (
    <div className="space-y-5">
      <form action={action} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <AtelierField
            name="email"
            label={copy.access.inviteEmail}
            type="email"
            required
            autoComplete="off"
          />
        </div>
        <AtelierButton type="submit" disabled={pending}>
          {pending ? copy.access.sending : copy.access.send}
        </AtelierButton>
      </form>

      {state?.error ? (
        <p role="alert" className="font-body-md text-body-md text-paprika">
          {state.error}
        </p>
      ) : null}

      {state?.link ? (
        <div className="space-y-3 border border-outline-variant bg-surface-container-low p-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            {state.emailed ? copy.access.sent : copy.access.notSent}
          </p>
          <p className="break-all font-body-md text-[0.9rem] text-primary">{state.link}</p>
          <AtelierButton
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(state.link!);
                setCopiedLink(state.link);
              } catch {
                setCopiedLink(undefined);
              }
            }}
          >
            {copiedLink === state.link ? copy.access.copied : copy.access.copyLink}
          </AtelierButton>
        </div>
      ) : null}
    </div>
  );
}
