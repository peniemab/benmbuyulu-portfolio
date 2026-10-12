"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/fr";

export type ArtworkDetailData = {
  title: string;
  year: number;
  category: "PAINTING" | "SCULPTURE";
  dimensions: string;
  description: string;
  photos: string[];
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

type Props = {
  artwork: ArtworkDetailData;
  labels: Dictionary["artwork"];
  galleryLabels: Dictionary["gallery"];
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArtworkDetail({ artwork, labels, galleryLabels }: Props) {
  const { photos } = artwork;
  const [index, setIndex] = useState(0);
  const many = photos.length > 1;

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + photos.length) % photos.length);
    },
    [photos.length],
  );

  useEffect(() => {
    if (!many) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [many, step]);

  const mediumLabel =
    artwork.category === "SCULPTURE" ? galleryLabels.sculpture : galleryLabels.painting;

  return (
    <article className="w-full px-margin-mobile md:px-10 lg:px-14 pt-10 md:pt-14 pb-24">
      <Link
        href="/#oeuvres"
        className="inline-flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant transition-colors duration-300 hover:text-primary"
      >
        <Arrow direction="left" />
        {labels.back}
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-8">
          <div className="relative aspect-[4/5] w-full bg-surface-container-low md:aspect-auto md:h-[78svh]">
            <Image
              key={photos[index]}
              src={photos[index]}
              alt={`${artwork.title} (${index + 1}/${photos.length})`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain"
            />
            {many ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={labels.previous}
                  className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-surface/85 text-primary transition-opacity duration-300 hover:opacity-80"
                >
                  <Arrow direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-surface/85 text-primary transition-opacity duration-300 hover:opacity-80"
                >
                  <Arrow direction="right" />
                </button>
              </>
            ) : null}
          </div>

          {many ? (
            <ul className="mt-4 flex flex-wrap gap-3">
              {photos.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${labels.showPhoto} ${i + 1}`}
                    aria-current={i === index}
                    className={`relative block size-16 cursor-pointer overflow-hidden bg-surface-container md:size-20 transition-opacity duration-300 ${
                      i === index ? "outline-2 outline-offset-2 outline-primary" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="lg:col-span-4 lg:pt-2">
          <h1 className="font-headline-sm text-[1.75rem] leading-tight text-primary md:text-[2.1rem]">
            {artwork.title}
          </h1>

          <dl className="mt-8 space-y-4 border-t border-outline-variant pt-6">
            <div>
              <dt className="font-label-caps text-label-caps text-on-surface-variant">
                {labels.year}
              </dt>
              <dd className="mt-1 font-body-md text-body-md text-primary">{artwork.year}</dd>
            </div>
            <div>
              <dt className="font-label-caps text-label-caps text-on-surface-variant">
                {labels.medium}
              </dt>
              <dd className="mt-1 font-body-md text-body-md text-primary">{mediumLabel}</dd>
            </div>
            {artwork.dimensions ? (
              <div>
                <dt className="font-label-caps text-label-caps text-on-surface-variant">
                  {labels.dimensions}
                </dt>
                <dd className="mt-1 font-body-md text-body-md text-primary">
                  {artwork.dimensions}
                </dd>
              </div>
            ) : null}
          </dl>

          {artwork.description ? (
            <p className="mt-8 whitespace-pre-line font-body-lg text-body-lg text-on-surface-variant">
              {artwork.description}
            </p>
          ) : null}
        </div>
      </div>

      {artwork.previous || artwork.next ? (
        <nav className="mt-20 flex items-start justify-between gap-6 border-t border-outline-variant pt-8">
          {artwork.previous ? (
            <Link
              href={`/oeuvres/${artwork.previous.slug}`}
              className="group flex items-center gap-3 text-on-surface-variant transition-colors duration-300 hover:text-primary"
            >
              <Arrow direction="left" />
              <span className="font-headline-sm text-[1.05rem]">{artwork.previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {artwork.next ? (
            <Link
              href={`/oeuvres/${artwork.next.slug}`}
              className="group flex items-center gap-3 text-right text-on-surface-variant transition-colors duration-300 hover:text-primary"
            >
              <span className="font-headline-sm text-[1.05rem]">{artwork.next.title}</span>
              <Arrow direction="right" />
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
