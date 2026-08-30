import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { redirectIfAuthed } from "@/app/atelier/actions";
import { AuthShell } from "@/components/studio/AuthShell";
import { SignupForm } from "@/components/studio/SignupForm";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { isSignupAllowed } from "@/lib/user";

export const metadata: Metadata = {
  title: "Atelier — Inscription",
  robots: { index: false, follow: false },
};

export default async function AtelierSignupPage() {
  await redirectIfAuthed();

  if (!(await isSignupAllowed())) {
    redirect("/atelier/connexion");
  }

  const [copy, labels, locale] = await Promise.all([
    getAtelierCopy(),
    getDictionary(),
    getLocale(),
  ]);

  return (
    <AuthShell
      labels={labels}
      locale={locale}
      title={copy.auth.signupTitle}
      help={copy.auth.signupHelp}
    >
      <SignupForm copy={copy} />
    </AuthShell>
  );
}
