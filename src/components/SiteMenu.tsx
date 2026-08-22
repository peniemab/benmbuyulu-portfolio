"use client";

import { useId } from "react";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { softScrollToHash } from "@/lib/soft-scroll";

export const NAV_ITEMS = [
  { href: "#oeuvres", key: "works" as const },
  { href: "#bio", key: "bio" as const },
  { href: "#in-situ", key: "inSitu" as const },
  { href: "#publications", key: "publications" as const },
  { href: "#contact", key: "contact" as const },
];

const SOCIALS = [
  {
    key: "instagram" as const,
    href: "https://www.instagram.com/benmbuyulu/",
    label: "Instagram",
  },
  {
    key: "facebook" as const,
    href: "https://www.facebook.com/profile.php?id=61589274320031",
    label: "Facebook",
  },
];

function SocialIcon({
  name,
  gradientId,
}: {
  name: "instagram" | "facebook";
  gradientId: string;
}) {
  if (name === "instagram") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="block">
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill={`url(#${gradientId})`} />
        <rect
          x="5.5"
          y="5.5"
          width="13"
          height="13"
          rx="4"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.5" />
        <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="block">
        <circle cx="12" cy="12" r="10" fill="#1877F2" />
        <path
          d="M13.5 8.5h2V6h-2c-2 0-3.5 1.5-3.5 3.5V11H8v2.5h2V20h2.5v-6.5h2.2l.5-2.5H12.5V9.5c0-.6.4-1 1-1z"
          fill="#fff"
        />
      </svg>
    );
  }

  return null;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <ul className={`flex items-center gap-3.5 ${className}`}>
      {SOCIALS.map(({ key, href, label }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex transition-transform duration-300 hover:scale-110"
          >
            <SocialIcon name={key} gradientId={`${gradientId}-${key}`} />
          </a>
        </li>
      ))}
    </ul>
  );
}

type SiteMenuProps = {
  labels: Dictionary;
  locale: Locale;
  onNavigate?: () => void;
  showBrand?: boolean;
};

/**
 * Equal inset top/bottom, then blocks distributed evenly between them.
 */
export function SiteMenu({
  labels,
  locale,
  onNavigate,
  showBrand = true,
}: SiteMenuProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-between py-1">
      {showBrand && (
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            softScrollToHash("#top");
            window.history.pushState(null, "", "#top");
            onNavigate?.();
          }}
          className="shrink-0 font-headline-sm text-[1.35rem] md:text-[1.5rem] text-primary tracking-tighter leading-tight uppercase"
        >
          {labels.brand}
        </a>
      )}

      <nav className="flex shrink-0 flex-col gap-2.5" aria-label="Main">
        {NAV_ITEMS.map(({ href, key }) => (
          <a
            key={key}
            href={href}
            onClick={(event) => {
              event.preventDefault();
              softScrollToHash(href);
              window.history.pushState(null, "", href);
              onNavigate?.();
            }}
            className="font-body-md text-[15px] leading-snug text-on-surface-variant hover:text-primary transition-colors duration-300"
          >
            {labels.nav[key]}
          </a>
        ))}
      </nav>

      <div className="shrink-0">
        <LocaleSwitcher
          locale={locale}
          labelFr={labels.locale.fr}
          labelEn={labels.locale.en}
          ariaLabel={labels.locale.label}
        />
      </div>

      <form
        className="flex shrink-0 flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <p className="font-label-caps text-label-caps text-on-surface-variant">
          {labels.newsletter.title}
        </p>
        <input
          type="email"
          name="email"
          required
          placeholder={labels.newsletter.placeholder}
          className="w-full border border-outline-variant bg-surface-container-lowest px-3 py-2 text-[14px] font-body-md text-on-surface outline-none focus:border-primary transition-colors duration-300"
        />
        <button
          type="submit"
          className="self-end w-fit font-label-caps text-label-caps bg-primary text-on-primary border border-primary px-3.5 py-2 hover:opacity-85 transition-opacity duration-300"
        >
          {labels.newsletter.submit}
        </button>
      </form>

      <SocialLinks className="shrink-0" />
    </div>
  );
}
