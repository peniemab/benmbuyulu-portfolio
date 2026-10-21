"use server";

import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { prisma } from "@/lib/prisma";
import { isValidEmail, normalizeEmail } from "@/lib/user";

/** `email` is sent back on error so the field is not emptied by the form reset. */
export type NewsletterState = { ok?: string; error?: string; email?: string } | null;

export async function subscribeAction(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  // Hidden field: people never fill it, spam bots do. Pretend it worked.
  if (String(formData.get("website") ?? "")) return { ok: dict.newsletter.thanks };

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  if (!isValidEmail(email) || email.length > 254) {
    return { error: dict.newsletter.invalid, email };
  }

  try {
    // Already subscribed: same thanks, without revealing who is on the list.
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email, locale },
      update: {},
    });
  } catch (error) {
    console.error("[newsletter] subscribe failed:", error);
    return { error: dict.newsletter.failed, email };
  }

  return { ok: dict.newsletter.thanks };
}
