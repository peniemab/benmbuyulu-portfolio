"use client";

import { useState } from "react";
import { AtelierChoice } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

type Props = {
  defaultChecked?: boolean;
  copy: AtelierCopy["visibility"];
};

export function VisibleToggle({ defaultChecked = true, copy }: Props) {
  const [visible, setVisible] = useState(defaultChecked);

  return (
    <fieldset className="scroll-mb-28">
      <legend className="font-label-caps text-label-caps text-on-surface-variant">
        {copy.legend}
      </legend>
      <input type="hidden" name="visible" value={visible ? "on" : "off"} />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <AtelierChoice selected={visible} onClick={() => setVisible(true)}>
          {copy.visible}
        </AtelierChoice>
        <AtelierChoice selected={!visible} onClick={() => setVisible(false)}>
          {copy.hidden}
        </AtelierChoice>
      </div>
    </fieldset>
  );
}
