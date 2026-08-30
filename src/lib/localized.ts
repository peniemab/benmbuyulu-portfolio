import type { Locale } from "@/i18n/config";

export function pickLocalized(
  fr: string,
  en: string,
  locale: Locale,
): string {
  if (locale === "fr") return fr.trim() || en.trim();
  return en.trim() || fr.trim();
}
