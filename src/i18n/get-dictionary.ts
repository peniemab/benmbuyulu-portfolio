import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fr } from "@/i18n/dictionaries/fr";
import { en } from "@/i18n/dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  if (accept.includes("fr")) return "fr";
  if (accept.includes("en")) return "en";
  return defaultLocale;
}

export async function getDictionary(): Promise<Dictionary> {
  const locale = await getLocale();
  return dictionaries[locale];
}

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale];
}
