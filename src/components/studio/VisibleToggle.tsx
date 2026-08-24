"use client";

import { useState } from "react";
import { AtelierChoice } from "@/components/studio/ui";

type Props = {
  defaultChecked?: boolean;
};

export function VisibleToggle({ defaultChecked = true }: Props) {
  const [visible, setVisible] = useState(defaultChecked);

  return (
    <fieldset className="scroll-mb-28">
      <legend className="font-label-caps text-label-caps text-on-surface-variant">
        Sur le site
      </legend>
      <input type="hidden" name="visible" value={visible ? "on" : "off"} />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <AtelierChoice selected={visible} onClick={() => setVisible(true)}>
          Visible
        </AtelierChoice>
        <AtelierChoice selected={!visible} onClick={() => setVisible(false)}>
          Cachée
        </AtelierChoice>
      </div>
    </fieldset>
  );
}
