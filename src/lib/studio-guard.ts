import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  parseSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";
import { countUsers, getUserById } from "@/lib/user";

export async function getSessionUserId(): Promise<string | null> {
  const jar = await cookies();
  const parsed = parseSessionToken(jar.get(SESSION_COOKIE)?.value);
  return parsed?.userId ?? null;
}

export async function getSessionUser() {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return getUserById(userId);
}

export async function hasStudioSession(): Promise<boolean> {
  const userId = await getSessionUserId();
  if (!userId) return false;
  const user = await getUserById(userId);
  return Boolean(user);
}

export async function requireStudio(): Promise<void> {
  const users = await countUsers();
  if (users === 0) {
    redirect("/atelier/inscription");
  }
  if (!(await hasStudioSession())) {
    redirect("/atelier/connexion");
  }
}

export async function setSession(userId: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(userId), sessionCookieOptions());
}

export async function clearSession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
}
