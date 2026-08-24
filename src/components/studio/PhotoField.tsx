"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name?: string;
  currentUrl?: string;
  label: string;
  required?: boolean;
  aspect?: "wide" | "portrait" | "square";
};

const ASPECT = {
  wide: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export function PhotoField({
  name = "photo",
  currentUrl,
  label,
  required = false,
  aspect = "portrait",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(currentUrl ?? "");

  useEffect(() => {
    setPreview(currentUrl ?? "");
  }, [currentUrl]);

  const empty = !preview;
  const action = empty ? "Ajouter une photo" : "Changer la photo";

  return (
    <div className="space-y-2">
      <p className="font-label-caps text-label-caps text-on-surface-variant">
        {label}
      </p>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp"
        required={required && !currentUrl}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setPreview(URL.createObjectURL(file));
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`group relative block w-full cursor-pointer overflow-hidden bg-surface-container text-left ${ASPECT[aspect]} ${
          aspect === "wide" ? "" : "max-w-md"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="size-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center px-6 text-center font-body-md text-body-md text-on-surface-variant">
            Touchez pour ajouter une photo
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-mustard px-4 py-3 font-label-caps text-label-caps text-primary transition-opacity duration-300 group-hover:opacity-90">
          {action}
        </span>
      </button>
    </div>
  );
}
