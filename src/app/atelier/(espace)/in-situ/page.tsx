import Link from "next/link";
import { StudioSection } from "@/components/studio/StudioSection";
import { AtelierButton } from "@/components/studio/ui";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function StudioInSituPage() {
  await requireStudio();
  const items = await prisma.inSituWork
    .findMany({
      orderBy: { sortOrder: "asc" },
    })
    .catch(() => []);

  return (
    <StudioSection
      title="In situ"
      help="Les photos de vos œuvres dans des lieux."
      previewHref="/#in-situ"
      wide
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border border-dashed border-outline-variant px-6 py-16">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Pas encore de photo de lieu. Ajoutez-en une quand vous êtes prêt.
          </p>
          <AtelierButton href="/atelier/in-situ/nouveau">
            Ajouter une photo
          </AtelierButton>
        </div>
      ) : (
        <>
          <AtelierButton href="/atelier/in-situ/nouveau">
            Ajouter une photo
          </AtelierButton>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={`/atelier/in-situ/${item.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="size-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                    {!item.published ? (
                      <span className="absolute left-2 top-2 bg-black/80 px-2 py-1 font-label-caps text-[0.65rem] tracking-wide text-white">
                        Cachée
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 font-headline-sm text-[1.05rem] text-primary">
                    {item.title}
                  </p>
                  <p className="mt-0.5 font-body-md text-[0.9rem] text-on-surface-variant">
                    {[item.place, item.year].filter(Boolean).join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </StudioSection>
  );
}
