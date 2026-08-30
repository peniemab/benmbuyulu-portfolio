function appOrigin(): string {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function sendPasswordResetEmail(
  to: string,
  token: string,
): Promise<void> {
  const resetUrl = `${appOrigin()}/atelier/reinitialiser-mot-de-passe?token=${encodeURIComponent(token)}`;
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
    throw new Error("Could not send reset email.");
  }
}
