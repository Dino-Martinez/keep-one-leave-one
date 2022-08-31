/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "code" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_code_key" ON "Pokemon"("code");
