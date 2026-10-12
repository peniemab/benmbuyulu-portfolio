import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword, isStrongEnoughPassword, verifyPassword } from "@/lib/password";
import { hashResetToken, hashToken } from "@/lib/session";

export const INVITATION_DAYS = 7;

export type UserRow = {
  id: string;
  email: string;
  name: string;
};

/** null when the database cannot be reached: callers must then fail closed. */
export async function countUsers(): Promise<number | null> {
  try {
    return await prisma.user.count();
  } catch {
    return null;
  }
}

/**
 * No public sign-up. The very first account needs the setup code
 * (ATELIER_SETUP_CODE); every other account needs an invitation.
 */
export async function isFirstAccountSetup(): Promise<boolean> {
  return (await countUsers()) === 0;
}

export function isSetupCodeConfigured(): boolean {
  return Boolean(process.env.ATELIER_SETUP_CODE?.trim());
}

export function checkSetupCode(code: string): boolean {
  const expected = process.env.ATELIER_SETUP_CODE?.trim();
  if (!expected) return false;
  const a = createHash("sha256").update(code.trim()).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
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

export type PendingInvitation = {
  id: string;
  email: string;
  expiresAt: Date;
  createdAt: Date;
};

export async function createInvitation(
  email: string,
  invitedById: string,
): Promise<{ token: string } | { error: "emailTaken" }> {
  const normalized = normalizeEmail(email);
  if (await getUserByEmail(normalized)) return { error: "emailTaken" };

  const token = randomBytes(32).toString("hex");
  await prisma.$transaction([
    prisma.invitation.deleteMany({ where: { email: normalized, acceptedAt: null } }),
    prisma.invitation.create({
      data: {
        email: normalized,
        tokenHash: hashToken(token),
        invitedById,
        expiresAt: new Date(Date.now() + INVITATION_DAYS * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  return { token };
}

export async function findValidInvitation(token: string) {
  if (!token) return null;
  return prisma.invitation.findFirst({
    where: {
      tokenHash: hashToken(token),
      acceptedAt: null,
      expiresAt: { gt: new Date() },
    },
    select: { id: true, email: true },
  });
}

export async function listPendingInvitations(): Promise<PendingInvitation[]> {
  return prisma.invitation.findMany({
    where: { acceptedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, expiresAt: true, createdAt: true },
  });
}

export async function revokeInvitation(id: string) {
  await prisma.invitation.deleteMany({ where: { id, acceptedAt: null } });
}

export async function markInvitationAccepted(id: string) {
  await prisma.invitation.update({
    where: { id },
    data: { acceptedAt: new Date() },
  });
}

export async function listUsers(): Promise<(UserRow & { createdAt: Date })[]> {
  return prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, createdAt: true },
  });
}
