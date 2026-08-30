import type { Metadata } from "next";
import { redirectIfAuthed } from "@/app/atelier/actions";
import { AuthShell } from "@/components/studio/AuthShell";
import { ForgotPasswordForm } from "@/components/studio/ForgotPasswordForm";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export const metadata: Metadata = {
  title: "Atelier — Mot de passe oublié",
  robots: { index: false, follow: false },
};

export default async function AtelierForgotPasswordPage() {
  await redirectIfAuthed();

  const [copy, labels, locale] = await Promise.all([
    getAtelierCopy(),
    getDictionary(),
    getLocale(),
  ]);

  return (
    <AuthShell
      labels={labels}
      locale={locale}
      title={copy.auth.forgotTitle}
      help={copy.auth.forgotHelp}
    >
      <ForgotPasswordForm copy={copy} />
    </AuthShell>
  );
}
