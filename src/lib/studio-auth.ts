import { createHmac, timingSafeEqual } from "node:crypto";

export const STUDIO_COOKIE = "studio";
export const STUDIO_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function secret(): string {
  return (
    process.env.STUDIO_SECRET ||
    process.env.STUDIO_PASSWORD ||
    "dev-change-studio-secret"
  );
}

export function isStudioPasswordConfigured(): boolean {
  return Boolean(process.env.STUDIO_PASSWORD);
}

export function passwordMatches(password: string): boolean {
  const expected = process.env.STUDIO_PASSWORD ?? "";
  const a = createHmac("sha256", secret()).update(password).digest();
  const b = createHmac("sha256", secret()).update(expected).digest();
  return expected.length > 0 && timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const exp = String(Date.now() + STUDIO_COOKIE_MAX_AGE * 1000);
  const sig = createHmac("sha256", secret()).update(exp).digest("hex");
  return `${exp}.${sig}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  if (sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function studioCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDIO_COOKIE_MAX_AGE,
  };
}
