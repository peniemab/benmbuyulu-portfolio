"use server";

import { redirect } from "next/navigation";
import { getAtelierCopy } from "@/lib/atelier-copy";
import {
  clearSession,
  hasStudioSession,
  setSession,
} from "@/lib/studio-guard";
import { verifyUserCredentials } from "@/lib/user";

export type LoginState = { error?: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const copy = await getAtelierCopy();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const user = await verifyUserCredentials(email, password);
  if (!user) {
    return { error: copy.auth.invalidCredentials };
  }

  await setSession(user.id);
  redirect("/atelier");
}

export async function logoutAction() {
  await clearSession();
  redirect("/atelier/connexion");
}

export async function redirectIfAuthed() {
  if (await hasStudioSession()) redirect("/atelier");
}
