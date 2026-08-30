import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/dictionaries/fr";

export type AtelierCopy = Dictionary["atelier"];

export async function getAtelierCopy(): Promise<AtelierCopy> {
  const dictionary = await getDictionary();
  return dictionary.atelier;
}
