import type { InSituCard } from "@/lib/site-content";

export function InSituGrid({
  items,
  emptyLabel,
}: {
  items: InSituCard[];
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
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.id}>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="size-full object-cover"
            />
          </div>
          <h3 className="mt-4 font-headline-sm text-headline-sm text-primary">
            {item.title}
            {item.year ? (
              <span className="text-on-surface-variant font-body-md text-body-md">
                {" "}
                ({item.year})
              </span>
            ) : null}
          </h3>
          {item.place ? (
            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
              {item.place}
            </p>
          ) : null}
          {item.description ? (
            <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
              {item.description}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
