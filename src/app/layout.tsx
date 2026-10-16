import type { Metadata } from "next";
import {
  Edu_AU_VIC_WA_NT_Guides,
  Pacifico,
  Quicksand,
} from "next/font/google";
import "./globals.css";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { siteOrigin } from "@/lib/site-url";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const eduGuides = Edu_AU_VIC_WA_NT_Guides({
  variable: "--font-edu-guides",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  // The preview image itself comes from app/opengraph-image.tsx (added by Next).
  return {
    metadataBase: new URL(siteOrigin()),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      type: "website",
      url: "/",
      siteName: dict.brand,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`light ${quicksand.variable} ${pacifico.variable} ${eduGuides.variable}`}
    >
      <body className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
