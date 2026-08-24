import type { PublicationCard } from "@/lib/site-content";

export function PublicationsList({
  items,
  emptyLabel,
}: {
  items: PublicationCard[];
  emptyLabel: string;
}) {
  if ((items ?? []).length === 0) {
    return (
      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className="space-y-8">
      {items.map((item) => {
        const inner = (
          <>
            {item.imageUrl ? (
              <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            ) : null}
            <h3 className="mt-4 font-headline-sm text-headline-sm text-primary">
              {item.title}
              {item.year ? (
                <span className="text-on-surface-variant font-body-md text-body-md">
                  {" "}
                  ({item.year})
                </span>
              ) : null}
            </h3>
            {item.source ? (
              <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                {item.source}
              </p>
            ) : null}
          </>
        );

        return (
          <li key={item.id}>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
