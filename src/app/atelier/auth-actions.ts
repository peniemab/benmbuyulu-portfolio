"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { sendPasswordResetEmail } from "@/lib/email";
import { setSession } from "@/lib/studio-guard";
import {
  checkSetupCode,
  createUser,
  findValidInvitation,
  getUserByEmail,
  isFirstAccountSetup,
  isSetupCodeConfigured,
  isValidEmail,
  markInvitationAccepted,
  normalizeEmail,
  resetPasswordWithToken,
  setPasswordResetToken,
} from "@/lib/user";

export type AuthFormState = { error?: string; ok?: string } | null;

export async function signupAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const copy = await getAtelierCopy();
  const invitationToken = String(formData.get("invitation") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  // Two ways in, never a public sign-up: an invitation link, or the setup code
  // for the very first account.
  let email: string;
  let invitationId: string | null = null;
  if (invitationToken) {
    const invitation = await findValidInvitation(invitationToken);
    if (!invitation) return { error: copy.auth.invitationInvalid };
    email = invitation.email;
    invitationId = invitation.id;
  } else {
    if (!(await isFirstAccountSetup())) return { error: copy.auth.signupClosed };
    if (!isSetupCodeConfigured()) return { error: copy.auth.setupNotConfigured };
    if (!checkSetupCode(String(formData.get("setupCode") ?? ""))) {
      return { error: copy.auth.setupCodeWrong };
    }
    email = normalizeEmail(String(formData.get("email") ?? ""));
  }

  if (!name || !email || !password) {
    return { error: copy.errors.saveFailed };
  }
  if (!isValidEmail(email)) {
    return { error: copy.errors.email };
  }
  if (password !== confirm) {
    return { error: copy.auth.passwordMismatch };
  }

  const result = await createUser({ name, email, password });
  if ("error" in result) {
    if (result.error === "emailTaken") return { error: copy.auth.emailTaken };
    if (result.error === "passwordTooShort") {
      return { error: copy.auth.passwordTooShort };
    }
    return { error: copy.errors.saveFailed };
  }

  if (invitationId) await markInvitationAccepted(invitationId);
  await setSession(result.id);
  redirect("/atelier");
}

export async function forgotPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const copy = await getAtelierCopy();
  const email = normalizeEmail(String(formData.get("email") ?? ""));

  if (!email || !isValidEmail(email)) {
    return { error: copy.errors.email };
  }

  const user = await getUserByEmail(email);
  if (user) {
    const token = randomBytes(32).toString("hex");
    await setPasswordResetToken(user.id, token);
    try {
      await sendPasswordResetEmail(user.email, token);
    } catch {
      return { error: copy.auth.resetEmailFailed };
    }
  }

  return { ok: copy.auth.resetEmailSent };
}

export async function resetPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const copy = await getAtelierCopy();
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (!token) return { error: copy.auth.resetInvalid };
  if (password !== confirm) return { error: copy.auth.passwordMismatch };

  const result = await resetPasswordWithToken(token, password);
  if (result === "invalidToken") return { error: copy.auth.resetInvalid };
  if (result === "passwordTooShort") return { error: copy.auth.passwordTooShort };

  redirect("/atelier/connexion?reset=1");
}
