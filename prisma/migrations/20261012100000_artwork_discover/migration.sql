-- AlterTable
ALTER TABLE "Artwork" ADD COLUMN "descriptionEn" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "ArtworkPhoto" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtworkPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArtworkPhoto_artworkId_sortOrder_idx" ON "ArtworkPhoto"("artworkId", "sortOrder");

-- AddForeignKey
ALTER TABLE "ArtworkPhoto" ADD CONSTRAINT "ArtworkPhoto_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
