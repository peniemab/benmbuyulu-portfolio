import { getPublishedArtworks } from "@/lib/get-artworks";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pickLocalized } from "@/lib/localized";
import {
  applySiteContent,
  getPublishedInSitu,
  getPublishedPublications,
  getSiteContent,
} from "@/lib/site-content";

export async function getPortfolioPageData() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const [rawArtworks, site, rawInSitu, rawPublications] = await Promise.all([
    getPublishedArtworks(),
    getSiteContent(),
    getPublishedInSitu(),
    getPublishedPublications(),
  ]);

  const artworks = rawArtworks.map(({ titleEn, ...artwork }) => ({
    ...artwork,
    title: pickLocalized(artwork.title, titleEn, locale),
  }));

  const inSitu = rawInSitu.map(({ titleEn, placeEn, ...item }) => ({
    ...item,
    title: pickLocalized(item.title, titleEn, locale),
    place: pickLocalized(item.place, placeEn, locale),
  }));

  const publications = rawPublications.map(({ titleEn, sourceEn, ...item }) => ({
    ...item,
    title: pickLocalized(item.title, titleEn, locale),
    source: pickLocalized(item.source, sourceEn, locale),
  }));

  return {
    artworks,
    labels: applySiteContent(dict, site, locale),
    locale,
    heroImageUrl: site.heroImageUrl,
    portraitSrc: site.portraitUrl,
    email: site.email,
    instagramUrl: site.instagramUrl,
    facebookUrl: site.facebookUrl,
    inSitu,
    publications,
  };
}
