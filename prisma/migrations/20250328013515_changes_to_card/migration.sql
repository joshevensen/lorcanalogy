/*
  Warnings:

  - The values [actionSong] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `fullName` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sortNumber` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('action', 'song', 'item', 'location', 'character');
ALTER TABLE "Card" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- AlterTable
ALTER TABLE "Card"
    ADD COLUMN "fullName" TEXT NOT NULL,
ADD COLUMN     "sortNumber" INTEGER NOT NULL;
