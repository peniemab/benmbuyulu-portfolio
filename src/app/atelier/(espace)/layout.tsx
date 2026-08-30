import type { Metadata } from "next";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
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
  const [labels, locale] = await Promise.all([getDictionary(), getLocale()]);
  return (
    <StudioChrome
      key={locale}
      copy={labels.atelier}
      locale={locale}
      localeLabels={labels.locale}
      showLogout
    >
      {children}
    </StudioChrome>
  );
}
