/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Anime";

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kept" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sprite" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
