-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "film" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "director" TEXT,
    "status" TEXT,
    "era" TEXT,
    "franchise" TEXT,
    "tags" TEXT[],
    "fansOf" TEXT[],
    "actors" TEXT[],
    "trailer" TEXT,
    "comment" TEXT,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
