"use client";

import { useActionState } from "react";
import { subscribeAction, type NewsletterState } from "@/app/newsletter/actions";
import type { Dictionary } from "@/i18n/dictionaries/fr";

export function NewsletterForm({ labels }: { labels: Dictionary["newsletter"] }) {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(
    subscribeAction,
    null,
  );

  return (
    <form action={action} className="flex shrink-0 flex-col gap-2">
      <p className="font-label-caps text-label-caps text-on-surface-variant">
        {labels.title}
      </p>
      {state?.ok ? (
        <p role="status" className="font-body-md text-[15px] leading-snug text-primary">
          {state.ok}
        </p>
      ) : (
        <>
          {/* Spam trap: hidden from people, filled by bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={state?.email}
            aria-label={labels.placeholder}
            placeholder={labels.placeholder}
            className="w-full border border-outline-variant bg-surface-container-lowest px-3 py-2 text-[16px] leading-normal font-body-md text-on-surface outline-none focus:border-primary transition-colors duration-300"
          />
          {state?.error ? (
            <p role="alert" className="font-body-md text-[14px] leading-snug text-paprika">
              {state.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="self-end w-fit font-label-caps text-label-caps bg-black text-white border border-black px-3.5 py-2 hover:opacity-85 transition-opacity duration-300 disabled:opacity-50"
          >
            {pending ? labels.sending : labels.submit}
          </button>
        </>
      )}
    </form>
  );
}
