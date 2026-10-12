import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { redirectIfAuthed } from "@/app/atelier/actions";
import { AuthLink, AuthShell } from "@/components/studio/AuthShell";
import { SignupForm } from "@/components/studio/SignupForm";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import {
  findValidInvitation,
  isFirstAccountSetup,
  isSetupCodeConfigured,
} from "@/lib/user";

export const metadata: Metadata = {
  title: "Atelier — Inscription",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ invitation?: string }>;
};

export default async function AtelierSignupPage({ searchParams }: Props) {
  await redirectIfAuthed();

  const { invitation: token = "" } = await searchParams;
  const [copy, labels, locale] = await Promise.all([
    getAtelierCopy(),
    getDictionary(),
    getLocale(),
  ]);

  if (token) {
    const invitation = await findValidInvitation(token).catch(() => null);
    if (!invitation) {
      return (
        <AuthShell
          labels={labels}
          locale={locale}
          title={copy.auth.invitationTitle}
          help={copy.auth.invitationInvalid}
        >
          <AuthLink href="/atelier/connexion">{copy.auth.goLogin}</AuthLink>
        </AuthShell>
      );
    }
    return (
      <AuthShell
        labels={labels}
        locale={locale}
        title={copy.auth.invitationTitle}
        help={copy.auth.invitationHelp}
      >
        <SignupForm copy={copy} invitation={{ token, email: invitation.email }} />
      </AuthShell>
    );
  }

  // No invitation: only the very first account, with the setup code.
  if (!(await isFirstAccountSetup())) {
    redirect("/atelier/connexion");
  }

  if (!isSetupCodeConfigured()) {
    return (
      <AuthShell
        labels={labels}
        locale={locale}
        title={copy.auth.signupTitle}
        help={copy.auth.setupNotConfigured}
      >
        {null}
      </AuthShell>
    );
  }

  return (
    <AuthShell
      labels={labels}
      locale={locale}
      title={copy.auth.signupTitle}
      help={copy.auth.setupHelp}
    >
      <SignupForm copy={copy} />
    </AuthShell>
  );
}
