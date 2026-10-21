"use client";

import { useState } from "react";
import { AtelierButton } from "@/components/studio/ui";

export function CopyEmailsButton({
  emails,
  label,
  copiedLabel,
}: {
  emails: string[];
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <AtelierButton
      variant="outline"
      onClick={async () => {
        try {
          // Comma-separated: ready to paste in the "Bcc" field of an e-mail.
          await navigator.clipboard.writeText(emails.join(", "));
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? copiedLabel : label}
    </AtelierButton>
  );
}
