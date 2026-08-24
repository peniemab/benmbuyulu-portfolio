import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function safeName(name: string): string {
  const ext = path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = slugPart(path.basename(name, path.extname(name)));
  return `${Date.now()}-${base || "photo"}${ext || ".jpg"}`;
}

function slugPart(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function saveImageFile(
  file: File,
  folder: string,
): Promise<string> {
  if (!ALLOWED.has(file.type)) {
    throw new Error("Cette photo n’est pas dans un format accepté (JPG, PNG ou WEBP).");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Cette photo est trop lourde. Choisissez une image de moins de 10 Mo.");
  }

  const filename = safeName(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`studio/${folder}/${filename}`, bytes, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return `/uploads/${folder}/${filename}`;
}

export async function saveOptionalImage(
  formData: FormData,
  field: string,
  folder: string,
  currentUrl: string,
): Promise<string> {
  const value = formData.get(field);
  if (!(value instanceof File) || value.size === 0) return currentUrl;
  return saveImageFile(value, folder);
}
