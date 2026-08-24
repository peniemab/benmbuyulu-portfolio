import { getPublishedArtworks } from "@/lib/get-artworks";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import {
  applySiteContent,
  getPublishedInSitu,
  getPublishedPublications,
  getSiteContent,
} from "@/lib/site-content";

export async function getPortfolioPageData() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const [artworks, site, inSitu, publications] = await Promise.all([
    getPublishedArtworks(),
    getSiteContent(),
    getPublishedInSitu(),
    getPublishedPublications(),
  ]);

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
