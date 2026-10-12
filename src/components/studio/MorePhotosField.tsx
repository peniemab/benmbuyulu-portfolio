"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addArtworkPhotoAction,
  removeArtworkPhotoAction,
} from "@/app/atelier/(espace)/actions";
import { AtelierButton } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

type Photo = { id: string; imageUrl: string };

const MAX_SIDE = 2400;

/** Phone photos are often 5–10 MB: shrink to a web-friendly JPEG before sending. */
async function shrinkImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 2 * 1024 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.88),
    );
    if (!blob) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function MorePhotosField({
  artworkId,
  photos,
  copy,
}: {
  artworkId: string;
  photos: Photo[];
  copy: AtelierCopy;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [uploading, setUploading] = useState<string[]>([]);

  function addFiles(files: File[]) {
    if (files.length === 0) return;
    setError(undefined);
    setUploading(files.map((file) => URL.createObjectURL(file)));
    startTransition(async () => {
      for (const file of files) {
        const formData = new FormData();
        formData.set("photo", await shrinkImage(file));
        const result = await addArtworkPhotoAction(artworkId, formData);
        if (result.error) {
          setError(result.error);
          break;
        }
      }
      setUploading([]);
      router.refresh();
    });
  }

  function remove(photoId: string) {
    setError(undefined);
    startTransition(async () => {
      const result = await removeArtworkPhotoAction(photoId);
      if (result.error) setError(result.error);
      router.refresh();
    });
  }

  return (
    <div className="space-y-3 border-t border-outline-variant pt-8">
      <p className="font-label-caps text-label-caps text-on-surface-variant">
        {copy.artworks.morePhotos}
      </p>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {copy.artworks.morePhotosHelp}
      </p>

      {photos.length + uploading.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((photo) => (
            <li key={photo.id} className="space-y-1.5">
              <div className="aspect-square overflow-hidden bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.imageUrl} alt="" className="size-full object-cover" />
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => remove(photo.id)}
                className="w-full cursor-pointer border border-paprika py-1.5 font-label-caps text-[0.7rem] text-paprika transition-colors duration-300 hover:bg-paprika hover:text-white disabled:opacity-50"
              >
                {copy.artworks.removePhoto}
              </button>
            </li>
          ))}
          {uploading.map((src) => (
            <li key={src}>
              <div className="aspect-square animate-pulse overflow-hidden bg-surface-container opacity-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="size-full object-cover" />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="sr-only"
        onChange={(event) => {
          addFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />
      <AtelierButton
        variant="outline"
        disabled={pending}
        onClick={() => inputRef.current?.click()}
      >
        {pending ? copy.common.saving : copy.artworks.addPhotos}
      </AtelierButton>
      {error ? (
        <p role="alert" className="font-body-md text-body-md text-paprika">
          {error}
        </p>
      ) : null}
    </div>
  );
}
