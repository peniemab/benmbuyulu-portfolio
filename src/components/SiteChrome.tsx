"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";
import { SiteMenu } from "@/components/SiteMenu";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

type Props = {
  labels: Dictionary;
  locale: Locale;
};

function IconMenu({ open }: { open: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-primary"
    >
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function SiteChrome({ labels, locale }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden h-svh w-1/4 flex-col border-r border-outline-variant bg-surface px-5 py-10 lg:px-7 md:flex">
        <SiteMenu labels={labels} locale={locale} />
      </aside>

      <header
        className={`fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-margin-mobile md:hidden transition-colors duration-500 ${
          open
            ? "bg-transparent border-transparent"
            : "bg-surface/95 border-b border-outline-variant backdrop-blur-sm"
        }`}
      >
        <a
          href="#top"
          className={`font-headline-sm text-[1.05rem] text-primary tracking-tighter uppercase transition-all duration-500 ease-out ${
            open
              ? "pointer-events-none translate-y-12 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {labels.brand}
        </a>

        <div className="relative z-50 flex items-center gap-1">
          <LocaleSwitcher
            locale={locale}
            labelFr={labels.locale.fr}
            labelEn={labels.locale.en}
            ariaLabel={labels.locale.label}
          />
          <button
            type="button"
            aria-label={open ? labels.common.closeMenu : labels.common.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center text-primary"
          >
            <IconMenu open={open} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 h-dvh overflow-hidden bg-surface md:hidden transition-all duration-500 ease-out ${
          open
            ? "pointer-events-auto opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`h-dvh overflow-hidden px-margin-mobile py-14 transition-all duration-500 ease-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <SiteMenu
            labels={labels}
            locale={locale}
            onNavigate={() => setOpen(false)}
            showLocaleSwitcher={false}
          />
        </div>
      </div>
    </>
  );
}
