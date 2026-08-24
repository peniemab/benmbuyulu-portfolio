import type { Metadata } from "next";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { requireStudio } from "@/lib/studio-guard";

export const metadata: Metadata = {
  title: "Atelier : Ben Mbuyulu",
  robots: { index: false, follow: false },
};

export default async function StudioEspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireStudio();
  return <StudioChrome>{children}</StudioChrome>;
}
