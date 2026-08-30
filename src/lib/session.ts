import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "atelier_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function authSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production.");
  }
  return "dev-change-auth-secret";
}

export function createSessionToken(userId: string): string {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  const payload = `${userId}.${exp}`;
  const sig = createHmac("sha256", authSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function parseSessionToken(
  token: string | undefined | null,
): { userId: string } | null {
  if (!token) return null;
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return null;
  const sig = token.slice(lastDot + 1);
  const payload = token.slice(0, lastDot);
  const expSep = payload.lastIndexOf(".");
  if (expSep <= 0) return null;

  const userId = payload.slice(0, expSep);
  const exp = Number(payload.slice(expSep + 1));
  if (!userId || !Number.isFinite(exp) || exp < Date.now()) return null;

  const expected = createHmac("sha256", authSecret())
    .update(payload)
    .digest("hex");
  if (sig.length !== expected.length) return null;

  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }

  return { userId };
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function hashResetToken(token: string): string {
  return createHmac("sha256", authSecret()).update(token).digest("hex");
}
