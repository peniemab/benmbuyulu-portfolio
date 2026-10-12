"use server";

import { revalidatePath } from "next/cache";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { invitationUrl, sendInvitationEmail } from "@/lib/email";
import { getSessionUser, requireStudio } from "@/lib/studio-guard";
import {
  createInvitation,
  INVITATION_DAYS,
  isValidEmail,
  normalizeEmail,
  revokeInvitation,
} from "@/lib/user";

export type InviteState = {
  error?: string;
  link?: string;
  emailed?: boolean;
} | null;

export async function inviteAction(
  _prev: InviteState,
  formData: FormData,
): Promise<InviteState> {
  await requireStudio();
  const copy = await getAtelierCopy();
  const user = await getSessionUser();
  if (!user) return { error: copy.errors.saveFailed };

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  if (!isValidEmail(email)) return { error: copy.errors.email };

  const result = await createInvitation(email, user.id).catch(() => null);
  if (!result) return { error: copy.errors.saveFailed };
  if ("error" in result) return { error: copy.auth.emailTaken };

  let emailed = false;
  try {
    emailed = await sendInvitationEmail(email, result.token, user.name, INVITATION_DAYS);
  } catch {
    emailed = false;
  }

  revalidatePath("/atelier/acces");
  return { link: invitationUrl(result.token), emailed };
}

export async function revokeInvitationAction(formData: FormData) {
  await requireStudio();
  const id = String(formData.get("id") ?? "");
  if (id) await revokeInvitation(id).catch(() => undefined);
  revalidatePath("/atelier/acces");
}
