import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ArtistPortfolio } from "@/components/ArtistPortfolio";
import { SiteChrome } from "@/components/SiteChrome";
import type { ArtworkCardData } from "@/lib/artworks";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";
import type { InSituCard, PublicationCard } from "@/lib/site-content";

type Props = {
  artworks: ArtworkCardData[];
  labels: Dictionary;
  locale: Locale;
  heroImageUrl: string;
  portraitSrc: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  inSitu: InSituCard[];
  publications: PublicationCard[];
  trailing?: React.ReactNode;
};

export function PortfolioHome({
  artworks,
  labels,
  locale,
  heroImageUrl,
  portraitSrc,
  email,
  instagramUrl,
  facebookUrl,
  inSitu,
  publications,
  trailing,
}: Props) {
  return (
    <>
      <SiteChrome
        labels={labels}
        locale={locale}
        instagramUrl={instagramUrl}
        facebookUrl={facebookUrl}
      />

      <div className="md:ml-[25%] pt-[57px] md:pt-0">
        <HeroSection
          artistName={labels.brand}
          imageSrc={heroImageUrl || "/artworks/esclaves-du-sexe.png"}
          imageAlt={labels.hero.imageAlt}
        />
        <main className="flex-grow bg-surface">
          <ArtistPortfolio
            artworks={artworks}
            labels={labels}
            portraitSrc={portraitSrc}
            email={email}
            inSitu={inSitu}
            publications={publications}
          />
        </main>
        {trailing}
        <Footer labels={labels.footer} />
      </div>
    </>
  );
}
