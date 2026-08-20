import type { Metadata } from "next";
import {
  Edu_AU_VIC_WA_NT_Guides,
  Pacifico,
  Quicksand,
} from "next/font/google";
import "./globals.css";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

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
  const dict = await getDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
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
