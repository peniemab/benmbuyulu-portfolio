import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex cursor-pointer items-center justify-center text-center select-none transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  black: "bg-black text-white hover:opacity-85",
  mustard: "bg-mustard text-primary hover:opacity-90",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white hover:opacity-100",
  ghost:
    "text-on-surface-variant hover:text-primary hover:opacity-100",
  danger:
    "border border-paprika text-paprika hover:bg-paprika hover:text-white hover:opacity-100",
} as const;

const sizes = {
  sm: "px-4 py-2 font-label-caps text-label-caps",
  md: "px-7 py-3.5 font-label-caps text-label-caps",
  lg: "px-8 py-3 font-display-lg font-medium text-[0.95rem] tracking-wide",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type Shared = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Shared & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function usesPlainAnchor(href: string, target?: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("/#") ||
    href === "/" ||
    target === "_blank"
  );
}

export function AtelierButton({
  variant = "black",
  size,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const resolvedSize = size ?? (variant === "mustard" ? "lg" : "md");
  const classes = `${base} ${variants[variant]} ${sizes[resolvedSize]} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    if (usesPlainAnchor(href, target)) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} {...buttonProps} className={classes}>
      {children}
    </button>
  );
}

export function AtelierBack({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Retour vers ${label}`}
      className="inline-flex min-h-10 items-center gap-2 text-primary transition-opacity duration-300 hover:opacity-70"
    >
      <span className="flex size-8 items-center justify-center bg-mustard text-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 5 8 12l7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-headline-sm text-[1.05rem] tracking-tighter uppercase">
        {label}
      </span>
    </Link>
  );
}

const fieldClass =
  "mt-2 w-full border border-outline-variant bg-surface-container-lowest px-4 py-3.5 text-[16px] leading-relaxed outline-none transition-colors duration-300 hover:border-outline focus:border-primary";

export function AtelierField({
  name,
  label,
  defaultValue,
  type = "text",
  multiline,
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-label-caps text-label-caps text-on-surface-variant">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={5}
          className={fieldClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
          autoComplete={autoComplete}
          className={fieldClass}
        />
      )}
    </label>
  );
}

export function AtelierChoice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 cursor-pointer px-4 font-body-md text-[0.95rem] transition-colors duration-300 ${
        selected
          ? "bg-black text-white"
          : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
