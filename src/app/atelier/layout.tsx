import type { Metadata } from "next";
import { AtelierServiceWorker } from "@/components/atelier/AtelierServiceWorker";

export const metadata: Metadata = {
  title: "Atelier : Ben Mbuyulu",
  description: "Atelier de Ben Mbuyulu.",
  robots: { index: false, follow: false },
  manifest: "/atelier/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/atelier/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/atelier/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/atelier/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    title: "Atelier",
    statusBarStyle: "default",
  },
};

export default function AtelierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AtelierServiceWorker />
      {children}
    </>
  );
}
