/*
  Warnings:

  - You are about to drop the column `typeId` on the `Card` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CardToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CardToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "setNumber" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "tcgPlayerId" INTEGER,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT,
    "text" TEXT,
    "flavorText" TEXT,
    "cost" INTEGER NOT NULL,
    "inkable" BOOLEAN NOT NULL,
    "lore" INTEGER,
    "strength" INTEGER,
    "willpower" INTEGER,
    "movement" INTEGER,
    "isBanned" BOOLEAN DEFAULT false,
    "setId" INTEGER NOT NULL,
    "rarityId" INTEGER NOT NULL,
    "franchiseId" INTEGER,
    "roleId" INTEGER,
    CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("cost", "flavorText", "franchiseId", "id", "image", "inkable", "isBanned", "lore", "movement", "name", "number", "rarityId", "roleId", "setId", "setNumber", "strength", "tcgPlayerId", "text", "version", "willpower") SELECT "cost", "flavorText", "franchiseId", "id", "image", "inkable", "isBanned", "lore", "movement", "name", "number", "rarityId", "roleId", "setId", "setNumber", "strength", "tcgPlayerId", "text", "version", "willpower" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_tcgPlayerId_key" ON "Card"("tcgPlayerId");
CREATE INDEX "Card_setId_idx" ON "Card"("setId");
CREATE INDEX "Card_rarityId_idx" ON "Card"("rarityId");
CREATE INDEX "Card_franchiseId_idx" ON "Card"("franchiseId");
CREATE INDEX "Card_roleId_idx" ON "Card"("roleId");
CREATE INDEX "Card_setNumber_idx" ON "Card"("setNumber");
CREATE INDEX "Card_name_idx" ON "Card"("name");
CREATE INDEX "Card_inkable_idx" ON "Card"("inkable");
CREATE INDEX "Card_cost_idx" ON "Card"("cost");
CREATE INDEX "Card_isBanned_idx" ON "Card"("isBanned");
CREATE UNIQUE INDEX "Card_setId_number_key" ON "Card"("setId", "number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CardToType_AB_unique" ON "_CardToType"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToType_B_index" ON "_CardToType"("B");
