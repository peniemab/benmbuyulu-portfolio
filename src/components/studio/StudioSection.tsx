import { AtelierButton } from "@/components/studio/ui";

type Props = {
  children: React.ReactNode;
  title: string;
  help: string;
  previewHref?: string;
  previewLabel?: string;
  wide?: boolean;
};

export function StudioSection({
  children,
  title,
  help,
  previewHref,
  previewLabel,
  wide = false,
}: Props) {
  return (
    <div className={wide ? "max-w-4xl" : "max-w-2xl"}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-headline-md text-headline-md text-primary">{title}</h1>
        {previewHref ? (
          <AtelierButton href={previewHref} target="_blank" rel="noreferrer" variant="outline">
            {previewLabel}
          </AtelierButton>
        ) : null}
      </div>
      <p className="mt-3 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
        {help}
      </p>
      <div className="mt-10">{children}</div>
    </div>
  );
}
