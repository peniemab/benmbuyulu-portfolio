import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type Props = {
  labels: Dictionary["bio"];
};

const PORTRAIT_SRC = "/artist/ben-mbuyulu.jpg";
const PORTRAIT_ALT = "Ben Mbuyulu : portrait";

/**
 * Mobile: lead → portrait → born + body
 * Desktop: lead left (photo fills leftover space under it) | born + body right
 */
export function BioSection({ labels }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 md:items-stretch">
      <div className="flex min-w-0 flex-col gap-8 md:gap-10 md:h-full">
        <p className="shrink-0 font-headline-sm text-headline-sm font-bold text-primary leading-relaxed">
          {labels.lead}
        </p>

        <div className="flex min-h-0 flex-col gap-3 md:flex-1">
          <div className="relative w-full aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[24rem] md:flex-1">
            <Image
              src={PORTRAIT_SRC}
              alt={PORTRAIT_ALT}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <p className="text-center font-body-md text-[0.8rem] text-on-surface-variant">
            ©{" "}
            <a
              href="https://penielmabanza.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline hover:text-primary transition-colors"
            >
              Peniel Mabanza
            </a>
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-label-caps text-label-caps text-on-surface-variant mb-8 md:mb-10">
          {labels.born}
        </p>
        <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant">
          <p>{labels.p1}</p>
          <p>{labels.p2}</p>
          <p>{labels.p3}</p>
        </div>
      </div>
    </div>
  );
}
