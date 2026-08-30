import Link from "next/link";
import { StudioSection } from "@/components/studio/StudioSection";
import { AtelierButton } from "@/components/studio/ui";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioPublicationsPage() {
  await requireStudio();
  const [copy, items] = await Promise.all([
    getAtelierCopy(),
    prisma.publication
      .findMany({
        orderBy: { sortOrder: "asc" },
      })
      .catch(() => []),
  ]);

  return (
    <StudioSection
      title={copy.sections.publications.label}
      help={copy.sections.publications.help}
      previewHref="/#publications"
      previewLabel={copy.seeOnSite}
      wide
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border border-dashed border-outline-variant px-6 py-16">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {copy.publications.empty}
          </p>
          <AtelierButton href="/atelier/publications/nouveau">
            {copy.publications.add}
          </AtelierButton>
        </div>
      ) : (
        <>
          <AtelierButton href="/atelier/publications/nouveau">
            {copy.publications.add}
          </AtelierButton>
          <ul className="mt-10 flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/atelier/publications/${item.id}`}
                  className="flex items-center gap-5 bg-surface-container-lowest transition-opacity duration-300 hover:opacity-90"
                >
                  {item.imageUrl ? (
                    <div className="relative size-24 shrink-0 overflow-hidden bg-surface-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt="" className="size-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex size-24 shrink-0 items-center justify-center bg-surface-container font-label-caps text-[0.65rem] text-on-surface-variant">
                      {copy.common.text}
                    </div>
                  )}
                  <div className="min-w-0 py-3 pr-3">
                    <p className="font-headline-sm text-[1.05rem] text-primary">
                      {item.title}
                    </p>
                    <p className="mt-1 font-body-md text-[0.9rem] text-on-surface-variant">
                      {[item.source, item.year].filter(Boolean).join(" · ")}
                      {!item.published ? ` · ${copy.common.hidden}` : ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </StudioSection>
  );
}
