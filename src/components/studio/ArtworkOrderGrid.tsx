"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderArtworksAction } from "@/app/atelier/(espace)/actions";
import { AtelierButton } from "@/components/studio/ui";
import type { AtelierCopy } from "@/lib/atelier-copy";

export type OrderArtwork = {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  published: boolean;
};

const GRID = "mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3";

function Thumb({ artwork, copy }: { artwork: OrderArtwork; copy: AtelierCopy }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artwork.imageUrl}
        alt=""
        draggable={false}
        className="size-full object-cover transition-opacity duration-300 group-hover:opacity-90"
      />
      {!artwork.published ? (
        <span className="absolute left-2 top-2 bg-black/80 px-2 py-1 font-label-caps text-[0.65rem] tracking-wide text-white">
          {copy.common.hidden}
        </span>
      ) : null}
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortableTile({
  artwork,
  position,
  total,
  onMove,
  copy,
}: {
  artwork: OrderArtwork;
  position: number;
  total: number;
  onMove: (from: number, to: number) => void;
  copy: AtelierCopy;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: artwork.id });

  const arrowClass =
    "flex size-9 cursor-pointer items-center justify-center border border-outline-variant text-primary transition-colors duration-300 hover:border-primary disabled:pointer-events-none disabled:opacity-30";

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative ${isDragging ? "z-10 opacity-80" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        aria-label={artwork.title}
        className={`cursor-grab touch-manipulation select-none outline-offset-4 active:cursor-grabbing ${
          isDragging ? "shadow-xl" : ""
        }`}
      >
        <div className="relative">
          <Thumb artwork={artwork} copy={copy} />
          <span className="absolute right-2 top-2 flex size-7 items-center justify-center bg-mustard font-label-caps text-[0.75rem] text-primary">
            {position + 1}
          </span>
        </div>
        <p className="mt-3 font-headline-sm text-[1.05rem] text-primary">{artwork.title}</p>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          aria-label={`${copy.artworks.moveEarlier} : ${artwork.title}`}
          disabled={position === 0}
          onClick={() => onMove(position, position - 1)}
          className={arrowClass}
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          aria-label={`${copy.artworks.moveLater} : ${artwork.title}`}
          disabled={position === total - 1}
          onClick={() => onMove(position, position + 1)}
          className={arrowClass}
        >
          <Arrow direction="right" />
        </button>
      </div>
    </li>
  );
}

export function ArtworkOrderGrid({
  artworks,
  copy,
}: {
  artworks: OrderArtwork[];
  copy: AtelierCopy;
}) {
  const router = useRouter();
  const [sorting, setSorting] = useState(false);
  const [order, setOrder] = useState(artworks);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function move(from: number, to: number) {
    setOrder((items) => arrayMove(items, from, to));
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const from = order.findIndex((item) => item.id === active.id);
    const to = order.findIndex((item) => item.id === over.id);
    move(from, to);
  }

  function start() {
    setOrder(artworks);
    setError(undefined);
    setSorting(true);
  }

  function save() {
    setError(undefined);
    startTransition(async () => {
      const result = await reorderArtworksAction(order.map((item) => item.id));
      if (result.error) {
        setError(result.error);
        return;
      }
      setSorting(false);
      router.refresh();
    });
  }

  if (!sorting) {
    return (
      <>
        <div className="flex flex-wrap gap-3">
          <AtelierButton href="/atelier/oeuvres/nouveau">{copy.artworks.add}</AtelierButton>
          {artworks.length > 1 ? (
            <AtelierButton variant="outline" onClick={start}>
              {copy.artworks.reorder}
            </AtelierButton>
          ) : null}
        </div>
        <ul className={GRID}>
          {artworks.map((artwork) => (
            <li key={artwork.id}>
              <Link href={`/atelier/oeuvres/${artwork.id}`} className="group block">
                <Thumb artwork={artwork} copy={copy} />
                <p className="mt-3 font-headline-sm text-[1.05rem] text-primary">
                  {artwork.title}
                </p>
                <p className="mt-0.5 font-body-md text-[0.9rem] text-on-surface-variant">
                  {artwork.year}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <p className="max-w-xl font-body-md text-body-md text-on-surface-variant">
        {copy.artworks.reorderHelp}
      </p>
      <div className="sticky top-0 z-20 -mx-2 mt-6 flex flex-wrap items-center gap-3 bg-surface/95 px-2 py-3 backdrop-blur-sm">
        <AtelierButton onClick={save} disabled={pending}>
          {pending ? copy.common.saving : copy.artworks.saveOrder}
        </AtelierButton>
        <AtelierButton variant="ghost" onClick={() => setSorting(false)} disabled={pending}>
          {copy.artworks.cancel}
        </AtelierButton>
        {error ? (
          <p role="alert" className="font-body-md text-body-md text-paprika">
            {error}
          </p>
        ) : null}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={order.map((item) => item.id)} strategy={rectSortingStrategy}>
          <ul className={GRID}>
            {order.map((artwork, index) => (
              <SortableTile
                key={artwork.id}
                artwork={artwork}
                position={index}
                total={order.length}
                onMove={move}
                copy={copy}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}
