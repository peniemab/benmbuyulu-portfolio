import { siteOrigin } from "@/lib/site-url";

export async function sendPasswordResetEmail(
  to: string,
  token: string,
): Promise<void> {
  const resetUrl = `${siteOrigin()}/atelier/reinitialiser-mot-de-passe?token=${encodeURIComponent(token)}`;
  const from = process.env.EMAIL_FROM ?? "Atelier <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = "Réinitialiser votre mot de passe — Atelier";
  const text = [
    "Bonjour,",
    "",
    "Vous avez demandé à réinitialiser le mot de passe de votre atelier.",
    "Ouvrez ce lien (valable 1 heure) :",
    resetUrl,
    "",
    "Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.",
  ].join("\n");

  if (!apiKey) {
    console.info("[atelier] Password reset link (no RESEND_API_KEY):\n", resetUrl);
    return;
  }

  await sendWithResend(apiKey, { from, to, subject, text });
}

export function invitationUrl(token: string): string {
  return `${siteOrigin()}/atelier/inscription?invitation=${encodeURIComponent(token)}`;
}

/** Returns false when no e-mail service is configured (the link is then shared by hand). */
export async function sendInvitationEmail(
  to: string,
  token: string,
  inviterName: string,
  days: number,
): Promise<boolean> {
  const url = invitationUrl(token);
  const from = process.env.EMAIL_FROM ?? "Atelier <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `${inviterName} vous invite dans son atelier / invites you to their atelier`;
  const text = [
    "Bonjour,",
    "",
    `${inviterName} vous invite à créer votre compte pour son atelier.`,
    `Ouvrez ce lien (valable ${days} jours) :`,
    url,
    "",
    "---",
    "",
    "Hello,",
    "",
    `${inviterName} invites you to create your account for their atelier.`,
    `Open this link (valid for ${days} days):`,
    url,
  ].join("\n");

  if (!apiKey) {
    console.info("[atelier] Invitation link (no RESEND_API_KEY):\n", url);
    return false;
  }

  await sendWithResend(apiKey, { from, to, subject, text });
  return true;
}

async function sendWithResend(
  apiKey: string,
  { from, to, subject, text }: { from: string; to: string; subject: string; text: string },
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[atelier] Resend error:", response.status, body);
    throw new Error("Could not send email.");
  }
}
