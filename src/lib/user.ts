import { prisma } from "@/lib/prisma";
import { hashPassword, isStrongEnoughPassword, verifyPassword } from "@/lib/password";
import { hashResetToken } from "@/lib/session";

export type UserRow = {
  id: string;
  email: string;
  name: string;
};

export async function countUsers(): Promise<number> {
  try {
    if (typeof prisma.user?.count !== "function") return 0;
    return await prisma.user.count();
  } catch {
    return 0;
  }
}

/** First account always allowed; then only if ALLOW_SIGNUP=true. */
export async function isSignupAllowed(): Promise<boolean> {
  if (process.env.ALLOW_SIGNUP === "false") return false;
  if (process.env.ALLOW_SIGNUP === "true") return true;
  return (await countUsers()) === 0;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true },
  });
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<UserRow | { error: "emailTaken" | "passwordTooShort" }> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!isStrongEnoughPassword(input.password)) {
    return { error: "passwordTooShort" };
  }

  const existing = await getUserByEmail(email);
  if (existing) return { error: "emailTaken" };

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
    select: { id: true, email: true, name: true },
  });
  return user;
}

export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<UserRow | null> {
  const user = await getUserByEmail(email.trim().toLowerCase());
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;
  return { id: user.id, email: user.email, name: user.name };
}

export async function setPasswordResetToken(userId: string, token: string) {
  const resetTokenHash = hashResetToken(token);
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.user.update({
    where: { id: userId },
    data: { resetTokenHash, resetTokenExpires },
  });
}

export async function resetPasswordWithToken(
  token: string,
  password: string,
): Promise<"ok" | "invalidToken" | "passwordTooShort"> {
  if (!isStrongEnoughPassword(password)) return "passwordTooShort";

  const resetTokenHash = hashResetToken(token);
  const user = await prisma.user.findFirst({
    where: {
      resetTokenHash,
      resetTokenExpires: { gt: new Date() },
    },
  });
  if (!user) return "invalidToken";

  const passwordHash = await hashPassword(password);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetTokenHash: null,
      resetTokenExpires: null,
    },
  });
  return "ok";
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
