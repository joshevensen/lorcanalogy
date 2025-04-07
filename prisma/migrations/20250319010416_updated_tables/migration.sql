/*
  Warnings:

  - You are about to drop the column `cardNumber` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Set` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tcgPlayerId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[setId,number]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Set` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Made the column `setId` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_setId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardNumber",
ADD COLUMN     "number" INTEGER NOT NULL,
ALTER
COLUMN "setId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "number",
ALTER
COLUMN "id" DROP
DEFAULT;
DROP SEQUENCE "Set_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Card_tcgPlayerId_key" ON "Card" ("tcgPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_setId_number_key" ON "Card" ("setId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Set_name_key" ON "Set" ("name");

-- AddForeignKey
ALTER TABLE "Card"
    ADD CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
