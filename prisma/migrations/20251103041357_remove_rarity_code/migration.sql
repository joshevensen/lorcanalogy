/*
  Warnings:

  - You are about to drop the column `code` on the `Rarity` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rarity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Rarity" ("id", "name") SELECT "id", "name" FROM "Rarity";
DROP TABLE "Rarity";
ALTER TABLE "new_Rarity" RENAME TO "Rarity";
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
