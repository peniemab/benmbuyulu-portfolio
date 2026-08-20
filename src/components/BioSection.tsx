import type { Dictionary } from "@/i18n/dictionaries/fr";

type Props = {
  labels: Dictionary["bio"];
};

export function BioSection({ labels }: Props) {
  return (
    <div className="max-w-3xl">
      <p className="font-headline-sm text-headline-sm text-primary mb-8 leading-relaxed">
        {labels.lead}
      </p>
      <p className="font-label-caps text-label-caps text-on-surface-variant mb-10">
        {labels.born}
      </p>
      <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant">
        <p>{labels.p1}</p>
        <p>{labels.p2}</p>
        <p>{labels.p3}</p>
      </div>
    </div>
  );
}
