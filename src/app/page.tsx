import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ArtistPortfolio } from "@/components/ArtistPortfolio";
import { SiteChrome } from "@/components/SiteChrome";
import { prisma } from "@/lib/prisma";
import type { ArtworkCardData } from "@/lib/artworks";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export const dynamic = "force-dynamic";

const HERO_IMAGE = "/artworks/esclaves-du-sexe.png";

async function getArtworks(): Promise<ArtworkCardData[]> {
  try {
    return await prisma.artwork.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        medium: true,
        year: true,
        imageUrl: true,
        description: true,
        colSpan: true,
        aspectRatio: true,
        stretch: true,
      },
    });
  } catch (error) {
    console.error("[getArtworks] failed:", error);
    return [];
  }
}

export default async function HomePage() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const artworks = await getArtworks();

  return (
    <>
      <SiteChrome labels={dict} locale={locale} />

      {/* Desktop: content sits in the right 3/4 · Mobile: full width under top bar */}
      <div className="md:ml-[25%] pt-[57px] md:pt-0">
        <HeroSection
          artistName={dict.brand}
          imageSrc={HERO_IMAGE}
          imageAlt="Esclaves du sexe — Ben Mbuyulu, peinture, Mystère du voile"
        />
        <main className="flex-grow bg-surface">
          <ArtistPortfolio artworks={artworks} labels={dict} />
        </main>
        <Footer labels={dict.footer} />
      </div>
    </>
  );
}
