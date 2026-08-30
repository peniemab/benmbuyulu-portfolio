import type { Metadata } from "next";
import { LoginForm } from "@/components/studio/LoginForm";
import { AuthShell } from "@/components/studio/AuthShell";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { redirectIfAuthed } from "@/app/atelier/actions";
import { isSignupAllowed } from "@/lib/user";

export const metadata: Metadata = {
  title: "Atelier",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ reset?: string }>;
};

export default async function AtelierLoginPage({ searchParams }: Props) {
  await redirectIfAuthed();

  const params = await searchParams;
  const [copy, labels, locale, signupOpen] = await Promise.all([
    getAtelierCopy(),
    getDictionary(),
    getLocale(),
    isSignupAllowed(),
  ]);

  return (
    <AuthShell
      labels={labels}
      locale={locale}
      title={copy.name}
      help={copy.login.help}
    >
      <LoginForm
        copy={copy}
        showSignupLink={signupOpen}
        resetSuccess={params.reset === "1"}
      />
    </AuthShell>
  );
}
