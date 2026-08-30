"use client";

import { useState } from "react";
import { AtelierChoice } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

type Props = {
  defaultValue?: "PAINTING" | "SCULPTURE";
  copy: AtelierCopy["category"];
};

export function CategoryPicker({ defaultValue = "PAINTING", copy }: Props) {
  const [value, setValue] = useState(defaultValue);

  return (
    <fieldset className="scroll-mb-28">
      <legend className="font-label-caps text-label-caps text-on-surface-variant">
        {copy.legend}
      </legend>
      <input type="hidden" name="category" value={value} />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <AtelierChoice selected={value === "PAINTING"} onClick={() => setValue("PAINTING")}>
          {copy.painting}
        </AtelierChoice>
        <AtelierChoice selected={value === "SCULPTURE"} onClick={() => setValue("SCULPTURE")}>
          {copy.sculpture}
        </AtelierChoice>
      </div>
    </fieldset>
  );
}
