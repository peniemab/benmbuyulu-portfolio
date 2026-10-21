"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export async function removeSubscriberAction(formData: FormData) {
  await requireStudio();
  const id = String(formData.get("id") ?? "");
  if (id) await prisma.newsletterSubscriber.delete({ where: { id } }).catch(() => undefined);
  revalidatePath("/atelier/newsletter");
}
