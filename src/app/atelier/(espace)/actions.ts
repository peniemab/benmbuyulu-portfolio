"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";
import { saveImageFile, saveOptionalImage } from "@/lib/uploads";
import { slugify } from "@/lib/slug";

export type FormState = { error?: string; ok?: boolean };

async function fail(
  key: keyof Awaited<ReturnType<typeof getAtelierCopy>>["errors"],
  caught?: unknown,
): Promise<FormState> {
  const copy = await getAtelierCopy();
  if (caught instanceof Error) return { error: caught.message };
  return { error: copy.errors[key] };
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/atelier", "layout");
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function yearValue(formData: FormData, key: string): number | null {
  const raw = text(formData, key);
  if (!raw) return null;
  const year = Number(raw);
  if (!Number.isFinite(year) || year < 1900 || year > 2100) return null;
  return Math.round(year);
}

function isVisible(formData: FormData): boolean {
  return formData.get("visible") === "on";
}

async function uniqueArtworkSlug(base: string): Promise<string> {
  let slug = base;
  let n = 2;
  while (await prisma.artwork.findUnique({ where: { slug } })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function saveHeroAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStudio();
  try {
    const current = await prisma.siteContent.findUnique({ where: { id: "main" } });
    if (!current) return fail("notReady");
    const heroImageUrl = await saveOptionalImage(
      formData,
      "photo",
      "hero",
      current.heroImageUrl,
    );
    await prisma.siteContent.update({
      where: { id: "main" },
      data: { heroImageUrl },
    });
    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return fail("saveFailed", error);
  }
}

export async function saveBioAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStudio();
  try {
    const current = await prisma.siteContent.findUnique({ where: { id: "main" } });
    if (!current) return fail("notReady");
    const portraitUrl = await saveOptionalImage(
      formData,
      "photo",
      "portrait",
      current.portraitUrl,
    );
    await prisma.siteContent.update({
      where: { id: "main" },
      data: {
        portraitUrl,
        bioLeadFr: text(formData, "bioLeadFr"),
        bioLeadEn: text(formData, "bioLeadEn"),
        bioBornFr: text(formData, "bioBornFr"),
        bioBornEn: text(formData, "bioBornEn"),
        bioP1Fr: text(formData, "bioP1Fr"),
        bioP1En: text(formData, "bioP1En"),
        bioP2Fr: text(formData, "bioP2Fr"),
        bioP2En: text(formData, "bioP2En"),
        bioP3Fr: text(formData, "bioP3Fr"),
        bioP3En: text(formData, "bioP3En"),
      },
    });
    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return fail("saveFailed", error);
  }
}

export async function saveContactAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStudio();
  try {
    const email = text(formData, "email");
    if (!email.includes("@")) {
      return fail("email");
    }
    await prisma.siteContent.update({
      where: { id: "main" },
      data: {
        email,
        instagramUrl: text(formData, "instagramUrl"),
        facebookUrl: text(formData, "facebookUrl"),
      },
    });
    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return fail("saveFailed", error);
  }
}

export async function saveArtworkAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStudio();
  const id = text(formData, "id");
  const title = text(formData, "title");
  const year = yearValue(formData, "year");
  const category = text(formData, "category") === "SCULPTURE" ? "SCULPTURE" : "PAINTING";

  if (!title) return fail("artworkTitle");
  if (!year) return fail("artworkYear");

  try {
    if (id) {
      const current = await prisma.artwork.findUnique({ where: { id } });
      if (!current) return fail("artworkMissing");
      const imageUrl = await saveOptionalImage(formData, "photo", "artworks", current.imageUrl);
      await prisma.artwork.update({
        where: { id },
        data: {
          title,
          year,
          category,
          medium: category === "SCULPTURE" ? "Sculpture" : "Peinture",
          imageUrl,
          published: isVisible(formData),
        },
      });
      revalidatePublic();
      return { ok: true };
    }

    const photo = formData.get("photo");
    if (!(photo instanceof File) || photo.size === 0) {
      return fail("artworkPhoto");
    }
    const imageUrl = await saveImageFile(photo, "artworks");
    const last = await prisma.artwork.findFirst({ orderBy: { sortOrder: "desc" } });
    await prisma.artwork.create({
      data: {
        title,
        slug: await uniqueArtworkSlug(slugify(title)),
        category,
        medium: category === "SCULPTURE" ? "Sculpture" : "Peinture",
        year,
        imageUrl,
        published: isVisible(formData),
        sortOrder: (last?.sortOrder ?? 0) + 1,
        colSpan: 6,
        aspectRatio: "3/4",
      },
    });
  } catch (error) {
    return fail("saveFailed", error);
  }

  revalidatePublic();
  redirect("/atelier/oeuvres");
}

export async function deleteArtworkAction(formData: FormData) {
  await requireStudio();
  const id = text(formData, "id");
  if (!id) return;
  await prisma.artwork.delete({ where: { id } }).catch(() => undefined);
  revalidatePublic();
  redirect("/atelier/oeuvres");
}

export async function saveInSituAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStudio();
  const id = text(formData, "id");
  const title = text(formData, "title");
  if (!title) return fail("titleRequired");

  try {
    if (id) {
      const current = await prisma.inSituWork.findUnique({ where: { id } });
      if (!current) return fail("itemMissing");
      const imageUrl = await saveOptionalImage(formData, "photo", "in-situ", current.imageUrl);
      await prisma.inSituWork.update({
        where: { id },
        data: {
          title,
          place: text(formData, "place"),
          year: yearValue(formData, "year"),
          description: text(formData, "description"),
          imageUrl,
          published: isVisible(formData),
        },
      });
      revalidatePublic();
      return { ok: true };
    }

    const photo = formData.get("photo");
    if (!(photo instanceof File) || photo.size === 0) {
      return fail("photoRequired");
    }
    const imageUrl = await saveImageFile(photo, "in-situ");
    const last = await prisma.inSituWork.findFirst({ orderBy: { sortOrder: "desc" } });
    await prisma.inSituWork.create({
      data: {
        title,
        place: text(formData, "place"),
        year: yearValue(formData, "year"),
        description: text(formData, "description"),
        imageUrl,
        published: isVisible(formData),
        sortOrder: (last?.sortOrder ?? 0) + 1,
      },
    });
  } catch (error) {
    return fail("saveFailed", error);
  }

  revalidatePublic();
  redirect("/atelier/in-situ");
}

export async function deleteInSituAction(formData: FormData) {
  await requireStudio();
  const id = text(formData, "id");
  if (!id) return;
  await prisma.inSituWork.delete({ where: { id } }).catch(() => undefined);
  revalidatePublic();
  redirect("/atelier/in-situ");
}

export async function savePublicationAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireStudio();
  const id = text(formData, "id");
  const title = text(formData, "title");
  if (!title) return fail("titleRequired");

  try {
    if (id) {
      const current = await prisma.publication.findUnique({ where: { id } });
      if (!current) return fail("itemMissing");
      const imageUrl = await saveOptionalImage(
        formData,
        "photo",
        "publications",
        current.imageUrl,
      );
      await prisma.publication.update({
        where: { id },
        data: {
          title,
          source: text(formData, "source"),
          year: yearValue(formData, "year"),
          url: text(formData, "url"),
          imageUrl,
          published: isVisible(formData),
        },
      });
      revalidatePublic();
      return { ok: true };
    }

    const photo = formData.get("photo");
    const imageUrl =
      photo instanceof File && photo.size > 0
        ? await saveImageFile(photo, "publications")
        : "";
    const last = await prisma.publication.findFirst({ orderBy: { sortOrder: "desc" } });
    await prisma.publication.create({
      data: {
        title,
        source: text(formData, "source"),
        year: yearValue(formData, "year"),
        url: text(formData, "url"),
        imageUrl,
        published: isVisible(formData),
        sortOrder: (last?.sortOrder ?? 0) + 1,
      },
    });
  } catch (error) {
    return fail("saveFailed", error);
  }

  revalidatePublic();
  redirect("/atelier/publications");
}

export async function deletePublicationAction(formData: FormData) {
  await requireStudio();
  const id = text(formData, "id");
  if (!id) return;
  await prisma.publication.delete({ where: { id } }).catch(() => undefined);
  revalidatePublic();
  redirect("/atelier/publications");
}
