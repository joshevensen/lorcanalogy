/*
  Warnings:

  - You are about to drop the column `playset1` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset1Foil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset2` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset2Foil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset3` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset3Foil` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset4` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `playset4Foil` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "playset1",
DROP
COLUMN "playset1Foil",
DROP
COLUMN "playset2",
DROP
COLUMN "playset2Foil",
DROP
COLUMN "playset3",
DROP
COLUMN "playset3Foil",
DROP
COLUMN "playset4",
DROP
COLUMN "playset4Foil",
ADD COLUMN     "playSet1" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet1Foil" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet2" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet2Foil" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet3" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet3Foil" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet4" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playSet4Foil" BOOLEAN NOT NULL DEFAULT false;
