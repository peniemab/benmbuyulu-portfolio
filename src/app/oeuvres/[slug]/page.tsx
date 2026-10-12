import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/ArtworkDetail";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getPublishedArtworkBySlug } from "@/lib/get-artworks";
import { pickLocalized } from "@/lib/localized";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/oeuvres/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const [artwork, locale, dict] = await Promise.all([
    getPublishedArtworkBySlug(slug).catch(() => null),
    getLocale(),
    getDictionary(),
  ]);
  if (!artwork) return { title: dict.meta.title };
  const title = pickLocalized(artwork.title, artwork.titleEn, locale);
  const description = pickLocalized(artwork.description ?? "", artwork.descriptionEn, locale);
  return {
    title: `${title} (${artwork.year}) : ${dict.brand}`,
    description: description || dict.meta.description,
    openGraph: { images: [artwork.imageUrl] },
  };
}

export default async function ArtworkPage(props: PageProps<"/oeuvres/[slug]">) {
  const { slug } = await props.params;
  const [artwork, locale, dict, site] = await Promise.all([
    getPublishedArtworkBySlug(slug),
    getLocale(),
    getDictionary(),
    getSiteContent(),
  ]);
  if (!artwork) notFound();

  const neighbor = (item: typeof artwork.previous) =>
    item ? { slug: item.slug, title: pickLocalized(item.title, item.titleEn, locale) } : null;

  return (
    <>
      <SiteChrome
        labels={dict}
        locale={locale}
        instagramUrl={site.instagramUrl}
        facebookUrl={site.facebookUrl}
      />
      <div className="md:ml-[25%] pt-[57px] md:pt-0">
        <main className="flex-grow bg-surface">
          <ArtworkDetail
            labels={dict.artwork}
            galleryLabels={dict.gallery}
            artwork={{
              title: pickLocalized(artwork.title, artwork.titleEn, locale),
              year: artwork.year,
              category: artwork.category,
              dimensions: artwork.dimensions ?? "",
              description: pickLocalized(artwork.description ?? "", artwork.descriptionEn, locale),
              photos: artwork.photos,
              previous: neighbor(artwork.previous),
              next: neighbor(artwork.next),
            }}
          />
        </main>
        <Footer labels={dict.footer} />
      </div>
    </>
  );
}
