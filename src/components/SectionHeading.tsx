type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Uniform section title (semantic h2).
 * Spacing is proportional: title ↔ line === line ↔ content (same unit).
 * Mobile: rule under title · Desktop: rule to the right with inset from title.
 */
export function SectionHeading({ children, className = "" }: Props) {
  return (
    <div
      className={`mb-4 flex flex-col gap-4 md:mb-4 md:flex-row md:items-center md:gap-0 ${className}`}
    >
      <h2 className="block font-display-lg font-medium tracking-wide text-[0.82rem] sm:text-[0.88rem] md:text-[0.92rem] leading-snug text-on-surface md:shrink-0">
        {children}
      </h2>
      <div
        className="block h-px w-full bg-paprika md:ml-10 md:min-w-0 md:flex-1"
        aria-hidden
      />
    </div>
  );
}
