"use client";

import { useTransition } from "react";
import { setLocaleAction } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  labelFr: string;
  labelEn: string;
  ariaLabel: string;
};

export function LocaleSwitcher({
  locale,
  labelFr,
  labelEn,
  ariaLabel,
}: Props) {
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleAction(next);
    });
  }

  return (
    <div
      className="flex items-center gap-1 font-label-caps text-label-caps"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => switchTo("fr")}
        className={`px-2 py-1 transition-colors ${
          locale === "fr"
            ? "text-primary border-b-2 border-primary"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        {labelFr}
      </button>
      <span className="text-outline-variant">/</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => switchTo("en")}
        className={`px-2 py-1 transition-colors ${
          locale === "en"
            ? "text-primary border-b-2 border-primary"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        {labelEn}
      </button>
    </div>
  );
}
