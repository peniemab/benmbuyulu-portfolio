import type { Dictionary } from "@/i18n/dictionaries/fr";

type FooterProps = {
  labels: Dictionary["footer"];
};

export function Footer({ labels }: FooterProps) {
  return (
    <footer className="w-full py-10 border-t border-outline-variant">
      <div className="px-margin-mobile md:px-10 lg:px-14">
        <p className="font-label-caps text-label-caps text-on-surface-variant">
          © {new Date().getFullYear()} {labels.rights}
        </p>
      </div>
    </footer>
  );
}
