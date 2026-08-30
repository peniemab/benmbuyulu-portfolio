"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { sendPasswordResetEmail } from "@/lib/email";
import { setSession } from "@/lib/studio-guard";
import {
  createUser,
  getUserByEmail,
  isSignupAllowed,
  isValidEmail,
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
  if (!(await isSignupAllowed())) {
    return { error: copy.auth.signupClosed };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

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
