import { prisma } from "@/lib/prisma";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fr } from "@/i18n/dictionaries/fr";
import { en } from "@/i18n/dictionaries/en";

export type SiteContentRow = {
  heroImageUrl: string;
  heroImageAltFr: string;
  heroImageAltEn: string;
  portraitUrl: string;
  bioLeadFr: string;
  bioLeadEn: string;
  bioBornFr: string;
  bioBornEn: string;
  bioP1Fr: string;
  bioP1En: string;
  bioP2Fr: string;
  bioP2En: string;
  bioP3Fr: string;
  bioP3En: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
};

const FALLBACK: SiteContentRow = {
  heroImageUrl: "/artworks/esclaves-du-sexe.png",
  heroImageAltFr: fr.hero.imageAlt,
  heroImageAltEn: en.hero.imageAlt,
  portraitUrl: "/artist/ben-mbuyulu.jpg",
  bioLeadFr: fr.bio.lead,
  bioLeadEn: en.bio.lead,
  bioBornFr: fr.bio.born,
  bioBornEn: en.bio.born,
  bioP1Fr: fr.bio.p1,
  bioP1En: en.bio.p1,
  bioP2Fr: fr.bio.p2,
  bioP2En: en.bio.p2,
  bioP3Fr: fr.bio.p3,
  bioP3En: en.bio.p3,
  email: "mbuyuluben@gmail.com",
  instagramUrl: "https://www.instagram.com/benmbuyulu/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61589274320031",
};

function pick(frValue: string, enValue: string, locale: Locale): string {
  if (locale === "fr") return frValue.trim() || enValue.trim();
  return enValue.trim() || frValue.trim();
}

export async function getSiteContent(): Promise<SiteContentRow> {
  try {
    if (typeof prisma.siteContent?.findUnique !== "function") return FALLBACK;
    const row = await prisma.siteContent.findUnique({ where: { id: "main" } });
    if (!row) return FALLBACK;
    return row;
  } catch {
    return FALLBACK;
  }
}

export function applySiteContent(
  dict: Dictionary,
  site: SiteContentRow,
  locale: Locale,
): Dictionary {
  return {
    ...dict,
    hero: {
      imageAlt: pick(site.heroImageAltFr, site.heroImageAltEn, locale) || dict.hero.imageAlt,
    },
    bio: {
      lead: pick(site.bioLeadFr, site.bioLeadEn, locale) || dict.bio.lead,
      born: pick(site.bioBornFr, site.bioBornEn, locale) || dict.bio.born,
      p1: pick(site.bioP1Fr, site.bioP1En, locale) || dict.bio.p1,
      p2: pick(site.bioP2Fr, site.bioP2En, locale) || dict.bio.p2,
      p3: pick(site.bioP3Fr, site.bioP3En, locale) || dict.bio.p3,
    },
  };
}

export type InSituCard = {
  id: string;
  title: string;
  place: string;
  year: number | null;
  imageUrl: string;
  description: string;
};

export type InSituCardRaw = InSituCard & {
  titleEn: string;
  placeEn: string;
};

export type PublicationCard = {
  id: string;
  title: string;
  source: string;
  year: number | null;
  url: string;
  imageUrl: string;
};

export type PublicationCardRaw = PublicationCard & {
  titleEn: string;
  sourceEn: string;
};

export async function getPublishedInSitu(): Promise<InSituCardRaw[]> {
  try {
    if (typeof prisma.inSituWork?.findMany !== "function") return [];
    return await prisma.inSituWork.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        titleEn: true,
        place: true,
        placeEn: true,
        year: true,
        imageUrl: true,
        description: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getPublishedPublications(): Promise<PublicationCardRaw[]> {
  try {
    if (typeof prisma.publication?.findMany !== "function") return [];
    return await prisma.publication.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        titleEn: true,
        source: true,
        sourceEn: true,
        year: true,
        url: true,
        imageUrl: true,
      },
    });
  } catch {
    return [];
  }
}
