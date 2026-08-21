-- Reset to single-portfolio schema
DROP TABLE IF EXISTS "Artwork" CASCADE;
DROP TABLE IF EXISTS "Membership" CASCADE;
DROP TABLE IF EXISTS "Tenant" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TYPE IF EXISTS "Role";
DROP TYPE IF EXISTS "Category";

CREATE TYPE "Category" AS ENUM ('PAINTING', 'SCULPTURE');

CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "medium" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "dimensions" TEXT,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "colSpan" INTEGER NOT NULL DEFAULT 4,
    "aspectRatio" TEXT NOT NULL DEFAULT '1/1',
    "stretch" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Artwork_slug_key" ON "Artwork"("slug");
CREATE INDEX "Artwork_published_sortOrder_idx" ON "Artwork"("published", "sortOrder");
