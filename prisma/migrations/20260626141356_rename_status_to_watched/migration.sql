/*
  Warnings:

  - You are about to drop the column `status` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "status",
ADD COLUMN     "watched" TEXT;
