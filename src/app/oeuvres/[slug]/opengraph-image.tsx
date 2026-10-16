import { ImageResponse } from "next/og";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getPublishedArtworkBySlug } from "@/lib/get-artworks";
import { pickLocalized } from "@/lib/localized";
import { asJpeg, loadPhoto, OG_COLORS, OG_SIZE } from "@/lib/og-image";

// Follows the photo and title edited in the atelier.
export const dynamic = "force-dynamic";
export const alt = "Ben Mbuyulu : œuvre";
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [artwork, dict, locale] = await Promise.all([
    getPublishedArtworkBySlug(slug).catch(() => null),
    getDictionary(),
    getLocale(),
  ]);
  const photo = await loadPhoto(artwork?.imageUrl);
  const title = artwork ? pickLocalized(artwork.title, artwork.titleEn, locale) : "";
  const medium = artwork?.category === "SCULPTURE" ? dict.gallery.sculpture : dict.gallery.painting;

  return asJpeg(new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: OG_COLORS.surface,
        }}
      >
        {photo ? (
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: OG_COLORS.surfaceLow,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt=""
              width={600}
              height={630}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        ) : null}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          {artwork ? (
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 48 }}>
              <div style={{ fontSize: 58, lineHeight: 1.1, letterSpacing: -1, color: OG_COLORS.ink }}>
                {title}
              </div>
              <div style={{ marginTop: 20, fontSize: 30, color: OG_COLORS.muted }}>
                {`${medium} · ${artwork.year}${artwork.dimensions ? ` · ${artwork.dimensions}` : ""}`}
              </div>
            </div>
          ) : null}
          <div style={{ width: 56, height: 5, background: OG_COLORS.mustard }} />
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              textTransform: "uppercase",
              letterSpacing: -0.5,
              color: OG_COLORS.ink,
            }}
          >
            {dict.brand}
          </div>
        </div>
      </div>
    ),
    size,
  ));
}
