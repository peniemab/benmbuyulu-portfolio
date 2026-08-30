"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAtelierCopy } from "@/lib/atelier-copy";
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
  const copy = await getAtelierCopy();
  if (!isStudioPasswordConfigured()) {
    return { error: copy.login.notConfigured };
  }

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: copy.login.wrongPassword };
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
