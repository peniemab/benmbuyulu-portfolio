import type { Metadata } from "next";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LoginForm } from "@/components/studio/LoginForm";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { isStudioPasswordConfigured } from "@/lib/studio-auth";

export const metadata: Metadata = {
  title: "Atelier",
  robots: { index: false, follow: false },
};

export default async function AtelierLoginPage() {
  const [copy, labels, locale] = await Promise.all([
    getAtelierCopy(),
    getDictionary(),
    getLocale(),
  ]);

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
          {copy.name}
        </h1>
        <p className="mt-3 mb-8 font-body-md text-body-md text-on-surface-variant">
          {copy.login.help}
        </p>
        <LoginForm configured={isStudioPasswordConfigured()} copy={copy} />
      </div>
    </div>
  );
}
