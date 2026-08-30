import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";

type Props = {
  labels: Dictionary;
  locale: Locale;
  title: string;
  help: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthShell({ labels, locale, title, help, children, footer }: Props) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-surface px-margin-mobile">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-end">
          <LocaleSwitcher
            locale={locale}
            labelFr={labels.locale.fr}
            labelEn={labels.locale.en}
            ariaLabel={labels.locale.label}
          />
        </div>
        <p className="font-label-caps text-label-caps text-mustard">
          {labels.brand}
        </p>
        <h1 className="mt-3 font-headline-md text-headline-md text-primary">
          {title}
        </h1>
        <p className="mt-3 mb-8 font-body-md text-body-md text-on-surface-variant">
          {help}
        </p>
        {children}
        {footer ? (
          <div className="mt-8 space-y-3 font-body-md text-body-md text-on-surface-variant">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AuthLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-primary underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}
