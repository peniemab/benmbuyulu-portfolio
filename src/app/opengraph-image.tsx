import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/get-dictionary";
import { asJpeg, loadPhoto, OG_COLORS, OG_SIZE } from "@/lib/og-image";
import { getSiteContent } from "@/lib/site-content";

// Uses Ben's bio portrait (changed in the atelier), so never frozen at build time.
export const dynamic = "force-dynamic";
export const alt = "Ben Mbuyulu : Portfolio";
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default async function Image() {
  const [dict, site] = await Promise.all([getDictionary(), getSiteContent()]);
  const photo = await loadPhoto(site.portraitUrl);

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
        <div
          style={{
            width: photo ? "44%" : "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <div style={{ width: 64, height: 6, background: OG_COLORS.mustard }} />
          <div
            style={{
              marginTop: 32,
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2,
              textTransform: "uppercase",
              color: OG_COLORS.ink,
            }}
          >
            {dict.brand}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: OG_COLORS.muted }}>
            {dict.meta.description}
          </div>
        </div>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={672}
            height={630}
            style={{ width: "56%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }}
          />
        ) : null}
      </div>
    ),
    size,
  ));
}
