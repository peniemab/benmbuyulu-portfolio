import Link from "next/link";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { prisma } from "@/lib/prisma";
import { getSiteContent } from "@/lib/site-content";
import { SECTIONS } from "@/lib/studio-nav";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

function Cover({ images, emptyLabel }: { images: string[]; emptyLabel: string }) {
  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-surface-container font-body-md text-[0.9rem] text-on-surface-variant">
        {emptyLabel}
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[0]} alt="" className="size-full object-cover" />
      </div>
    );
  }

  return (
    <div className="grid aspect-[16/10] grid-cols-2 grid-rows-2 bg-surface-container">
      {images.slice(0, 4).map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" className="size-full object-cover" />
      ))}
    </div>
  );
}

export default async function StudioHomePage() {
  await requireStudio();
  const [copy, site, artworks, inSitu, publications] = await Promise.all([
    getAtelierCopy(),
    getSiteContent(),
    prisma.artwork
      .findMany({
        orderBy: { sortOrder: "asc" },
        select: { imageUrl: true },
        take: 4,
      })
      .catch(() => []),
    prisma.inSituWork
      .findFirst({
        orderBy: { sortOrder: "asc" },
        select: { imageUrl: true },
      })
      .catch(() => null),
    prisma.publication
      .findFirst({
        where: { imageUrl: { not: "" } },
        orderBy: { sortOrder: "asc" },
        select: { imageUrl: true },
      })
      .catch(() => null),
  ]);

  const covers: Record<string, string[]> = {
    "/atelier/accueil": [site.heroImageUrl],
    "/atelier/oeuvres": artworks.map((item) => item.imageUrl),
    "/atelier/bio": [site.portraitUrl],
    "/atelier/in-situ": inSitu?.imageUrl ? [inSitu.imageUrl] : [],
    "/atelier/publications": publications?.imageUrl ? [publications.imageUrl] : [],
    "/atelier/contact": [],
  };

  return (
    <div className="max-w-4xl">
      <p className="font-label-caps text-label-caps text-mustard">Ben Mbuyulu</p>
      <h1 className="mt-2 font-headline-md text-[clamp(1.8rem,4vw,2.5rem)] text-primary">
        {copy.home.title}
      </h1>
      <p className="mt-3 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
        {copy.home.help}
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {SECTIONS.map((section) => {
          const texts = copy.sections[section.id];
          return (
            <li key={section.href}>
              <Link
                href={section.href}
                className="group block overflow-hidden bg-surface-container-lowest"
              >
                {section.id === "contact" ? (
                  <div className="flex aspect-[16/10] items-center justify-center bg-mustard">
                    <span className="font-display-lg text-[1.15rem] tracking-wide text-primary">
                      {texts.label}
                    </span>
                  </div>
                ) : (
                  <Cover
                    images={covers[section.href] ?? []}
                    emptyLabel={copy.home.noPhoto}
                  />
                )}
                <div className="px-1 pt-4">
                  <p className="font-headline-sm text-[1.25rem] text-primary">
                    {texts.label}
                  </p>
                  <p className="mt-1 font-body-md text-[0.95rem] text-on-surface-variant">
                    {texts.hint}
                  </p>
                  <span className="mt-4 inline-flex bg-mustard px-5 py-2.5 font-display-lg font-medium text-[0.85rem] tracking-wide text-primary transition-opacity duration-300 group-hover:opacity-90">
                    {texts.action}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
