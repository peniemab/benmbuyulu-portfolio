"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  isStudioPasswordConfigured,
  passwordMatches,
  STUDIO_COOKIE,
  studioCookieOptions,
} from "@/lib/studio-auth";

export type LoginState = { error: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isStudioPasswordConfigured()) {
    return { error: "L’atelier n’est pas encore ouvert. Le mot de passe n’a pas été réglé." };
  }

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "Ce mot de passe n’est pas le bon." };
  }

  const jar = await cookies();
  jar.set(STUDIO_COOKIE, createSessionToken(), studioCookieOptions());
  redirect("/atelier");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(STUDIO_COOKIE);
  redirect("/atelier/connexion");
}
