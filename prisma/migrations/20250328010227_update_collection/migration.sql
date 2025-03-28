/*
  Warnings:

  - You are about to drop the column `extraQtyFoil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `extraQtyPlain` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `master` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `masterFoil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet1` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet1Foil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet2` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet2Foil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet3` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet3Foil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet4` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playSet4Foil` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `notes` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "extraQtyFoil",
DROP
COLUMN "extraQtyPlain",
DROP
COLUMN "master",
DROP
COLUMN "masterFoil",
DROP
COLUMN "playSet1",
DROP
COLUMN "playSet1Foil",
DROP
COLUMN "playSet2",
DROP
COLUMN "playSet2Foil",
DROP
COLUMN "playSet3",
DROP
COLUMN "playSet3Foil",
DROP
COLUMN "playSet4",
DROP
COLUMN "playSet4Foil",
ADD COLUMN     "foil" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "plain" INTEGER NOT NULL DEFAULT 0;
