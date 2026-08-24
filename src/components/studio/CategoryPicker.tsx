"use client";

import { useState } from "react";
import { AtelierChoice } from "@/components/studio/ui";

type Props = {
  defaultValue?: "PAINTING" | "SCULPTURE";
};

export function CategoryPicker({ defaultValue = "PAINTING" }: Props) {
  const [value, setValue] = useState(defaultValue);

  return (
    <fieldset className="scroll-mb-28">
      <legend className="font-label-caps text-label-caps text-on-surface-variant">
        C’est
      </legend>
      <input type="hidden" name="category" value={value} />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <AtelierChoice selected={value === "PAINTING"} onClick={() => setValue("PAINTING")}>
          Une peinture
        </AtelierChoice>
        <AtelierChoice selected={value === "SCULPTURE"} onClick={() => setValue("SCULPTURE")}>
          Une sculpture
        </AtelierChoice>
      </div>
    </fieldset>
  );
}
