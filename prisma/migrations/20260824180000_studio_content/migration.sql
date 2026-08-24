-- Artist studio content (hero, bio, contact) + In situ + Publications

CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "heroImageUrl" TEXT NOT NULL,
    "heroImageAltFr" TEXT NOT NULL DEFAULT '',
    "heroImageAltEn" TEXT NOT NULL DEFAULT '',
    "portraitUrl" TEXT NOT NULL,
    "bioLeadFr" TEXT NOT NULL,
    "bioLeadEn" TEXT NOT NULL,
    "bioBornFr" TEXT NOT NULL,
    "bioBornEn" TEXT NOT NULL,
    "bioP1Fr" TEXT NOT NULL,
    "bioP1En" TEXT NOT NULL,
    "bioP2Fr" TEXT NOT NULL,
    "bioP2En" TEXT NOT NULL,
    "bioP3Fr" TEXT NOT NULL,
    "bioP3En" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InSituWork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "place" TEXT NOT NULL DEFAULT '',
    "year" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InSituWork_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "InSituWork_published_sortOrder_idx" ON "InSituWork"("published", "sortOrder");

CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT '',
    "year" INTEGER,
    "url" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Publication_published_sortOrder_idx" ON "Publication"("published", "sortOrder");
