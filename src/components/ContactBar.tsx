"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/fr";

const CONTACT_EMAIL = "mbuyuluben@gmail.com";

type Props = {
  labels: Dictionary;
};

export function ContactBar({ labels }: Props) {
  const [copied, setCopied] = useState(false);

  async function sharePortfolio() {
    const url = window.location.origin;
    const title = labels.meta.title;
    const text = labels.meta.description;

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
        );
      }
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="inline-flex items-center justify-center bg-mustard px-8 py-3 font-display-lg font-medium text-[0.95rem] tracking-wide text-primary transition-opacity duration-300 hover:opacity-90"
      >
        {labels.nav.contact}
      </a>

      <button
        type="button"
        onClick={sharePortfolio}
        aria-label={copied ? labels.share.copied : labels.share.action}
        title={copied ? labels.share.copied : labels.share.action}
        className="inline-flex size-12 items-center justify-center border border-mustard text-mustard transition-colors duration-300 hover:bg-mustard hover:text-primary"
      >
        {copied ? (
          <CheckIcon />
        ) : (
          <ShareIcon />
        )}
      </button>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.7 10.7 15.3 6.3M8.7 13.3l6.6 4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
