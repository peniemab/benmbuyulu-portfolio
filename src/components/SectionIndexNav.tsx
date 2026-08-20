"use client";

import type { Dictionary } from "@/i18n/dictionaries/fr";
import { softScrollToHash } from "@/lib/soft-scroll";

/** Content sections shown in the mustard index line (Contact stays in side menus only). */
export const SECTION_INDEX_ITEMS = [
  { href: "#oeuvres", key: "works" as const },
  { href: "#bio", key: "bio" as const },
  { href: "#in-situ", key: "inSitu" as const },
  { href: "#publications", key: "publications" as const },
];

type Props = {
  labels: Dictionary["nav"];
};

export function SectionIndexNav({ labels }: Props) {
  return (
    <nav
      aria-label="Sections"
      className="mb-10 font-display-lg font-medium uppercase tracking-wide text-[0.82rem] sm:text-[0.88rem] md:text-[0.92rem] leading-snug text-mustard"
    >
      <ol className="section-index-list">
        {SECTION_INDEX_ITEMS.map(({ href, key }) => (
          <li key={key}>
            <a
              href={href}
              onClick={(event) => {
                event.preventDefault();
                softScrollToHash(href);
                window.history.pushState(null, "", href);
              }}
              className="transition-opacity duration-300 hover:opacity-70"
            >
              {labels[key]}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
