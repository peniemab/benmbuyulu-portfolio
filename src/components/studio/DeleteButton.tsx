"use client";

import { AtelierButton } from "@/components/studio/ui";

type Props = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  label: string;
  confirmMessage: string;
};

export function DeleteButton({ action, id, label, confirmMessage }: Props) {
  return (
    <div className="pt-2">
      <input type="hidden" name="id" value={id} />
      <AtelierButton
        type="submit"
        formAction={action}
        variant="danger"
        onClick={(event) => {
          if (!window.confirm(confirmMessage)) event.preventDefault();
        }}
      >
        {label}
      </AtelierButton>
    </div>
  );
}
