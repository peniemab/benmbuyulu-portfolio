import { readFile } from "node:fs/promises";
import path from "node:path";

/** Link-preview cards (Open Graph): same size as LinkedIn / WhatsApp / X expect. */
export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  surface: "#fcf9f5",
  surfaceLow: "#f6f3ef",
  ink: "#000000",
  muted: "#444748",
  mustard: "#c4a035",
};

/** Real format from the first bytes: some ".png" files are actually JPEGs. */
function imageType(bytes: Buffer): "image/jpeg" | "image/png" | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  return null;
}

/**
 * Photo as a data URL for ImageResponse, or null when it cannot be drawn
 * (missing file, WEBP/GIF, network error): the card then shows text only.
 */
export async function loadPhoto(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  try {
    let bytes: Buffer;
    if (url.startsWith("/")) {
      const file = path.join(process.cwd(), "public", decodeURIComponent(url));
      bytes = await readFile(file);
    } else {
      const response = await fetch(url);
      if (!response.ok) return null;
      bytes = Buffer.from(await response.arrayBuffer());
    }
    const type = imageType(bytes);
    return type ? `data:${type};base64,${bytes.toString("base64")}` : null;
  } catch {
    return null;
  }
}

/**
 * ImageResponse only makes PNGs (400–800 KB with a photo). WhatsApp drops
 * previews that heavy, so re-encode as JPEG (~100 KB).
 */
export async function asJpeg(image: Response): Promise<Response> {
  const { default: sharp } = await import("sharp");
  const png = Buffer.from(await image.arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
