import Image from "next/image";

type HeroSectionProps = {
  artistName: string;
  imageSrc: string;
  imageAlt: string;
};

/**
 * Mobile: name at mid-upper (25% height), left-aligned, appear animation, no box.
 * Desktop: left of the image, vertically centered.
 */
export function HeroSection({
  artistName,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-label={artistName}
      className="relative isolate w-full h-[100svh] min-h-[560px] overflow-hidden bg-surface"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 75vw"
        className="object-cover object-[center_30%] md:object-center"
      />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-surface/70 via-surface/20 to-transparent md:block"
        aria-hidden
      />

      {/* Mobile: mid-point of the upper half (25%). Desktop: vertical center. */}
      <div
        className="absolute inset-x-0 z-10 top-[25%] -translate-y-1/2
          md:top-1/2 md:inset-x-0"
      >
        <h1
          className="hero-name-appear px-margin-mobile text-left
            md:pl-8 lg:pl-12
            font-display-lg tracking-tighter leading-[0.92] font-semibold
            text-[clamp(2rem,9vw,2.75rem)]
            md:text-[clamp(3.25rem,6.5vw,6.5rem)]
            text-primary
            max-w-[12ch]
            [text-shadow:0_1px_0_rgba(255,255,255,0.55),0_0_18px_rgba(255,255,255,0.35)]
            md:[text-shadow:none]"
        >
          {artistName}
        </h1>
      </div>
    </section>
  );
}
