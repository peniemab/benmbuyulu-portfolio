import type { Metadata } from "next";
import { redirectIfAuthed } from "@/app/atelier/actions";
import { AuthShell } from "@/components/studio/AuthShell";
import { ResetPasswordForm } from "@/components/studio/ResetPasswordForm";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export const metadata: Metadata = {
  title: "Atelier — Nouveau mot de passe",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function AtelierResetPasswordPage({ searchParams }: Props) {
  await redirectIfAuthed();

  const params = await searchParams;
  const token = params.token ?? "";

  const [copy, labels, locale] = await Promise.all([
    getAtelierCopy(),
    getDictionary(),
    getLocale(),
  ]);

  return (
    <AuthShell
      labels={labels}
      locale={locale}
      title={copy.auth.resetTitle}
      help={copy.auth.resetHelp}
    >
      <ResetPasswordForm copy={copy} token={token} />
    </AuthShell>
  );
}
