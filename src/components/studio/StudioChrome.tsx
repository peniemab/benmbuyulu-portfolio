"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/atelier/actions";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { AtelierBack, AtelierButton } from "@/components/studio/ui";
import type { Locale } from "@/i18n/config";
import type { AtelierCopy } from "@/lib/atelier-copy";
import { SECTIONS } from "@/lib/studio-nav";

type Props = {
  children: React.ReactNode;
  copy: AtelierCopy;
  locale: Locale;
  localeLabels: { fr: string; en: string; label: string };
  showLogout: boolean;
};

export function StudioChrome({
  children,
  copy,
  locale,
  localeLabels,
  showLogout,
}: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/atelier";
  const current = SECTIONS.find(
    (section) =>
      pathname === section.href || pathname.startsWith(`${section.href}/`),
  );
  const nested = Boolean(current && pathname !== current.href);
  const back = nested
    ? { href: current!.href, label: copy.sections[current!.id].label }
    : isHome
      ? null
      : { href: "/atelier", label: copy.name };

  return (
    <div className="min-h-svh bg-surface text-on-surface">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-outline-variant bg-surface/95 px-margin-mobile backdrop-blur-sm md:px-8">
        {back ? (
          <AtelierBack href={back.href} label={back.label} ariaPrefix={copy.backTo} />
        ) : (
          <Link
            href="/atelier"
            className="font-headline-sm text-[1.05rem] tracking-tighter text-primary uppercase"
          >
            {copy.name}
          </Link>
        )}
        <div className="flex items-center gap-3">
          <LocaleSwitcher
            locale={locale}
            labelFr={localeLabels.fr}
            labelEn={localeLabels.en}
            ariaLabel={localeLabels.label}
          />
          <AtelierButton
            href={current?.preview ?? "/"}
            target="_blank"
            rel="noreferrer"
            variant="mustard"
            size="sm"
          >
            {copy.seeSite}
          </AtelierButton>
          {showLogout ? (
            <form action={logoutAction}>
              <AtelierButton type="submit" variant="outline" size="sm">
                {copy.logout}
              </AtelierButton>
            </form>
          ) : null}
        </div>
      </header>

      <div className="md:flex">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 flex-col border-r border-outline-variant md:flex">
          <nav className="flex flex-1 flex-col justify-center gap-1 px-5" aria-label={copy.navAria}>
            {SECTIONS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-baseline gap-2 py-2.5 font-body-md text-[1.05rem] transition-colors ${
                    active
                      ? "text-mustard"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <span aria-hidden className="w-3 font-medium">
                    {active ? ">" : ""}
                  </span>
                  {copy.sections[item.id].label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 px-margin-mobile pb-28 pt-6 md:px-12 md:pt-10">
          {children}
        </div>
      </div>
    </div>
  );
}
