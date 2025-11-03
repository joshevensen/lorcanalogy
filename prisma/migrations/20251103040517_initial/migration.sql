-- CreateTable
CREATE TABLE "Ink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Classification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Franchise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "releasedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Card" (
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
    "typeId" INTEGER NOT NULL,
    "franchiseId" INTEGER,
    "roleId" INTEGER,
    CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CardToInk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CardToInk_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToInk_B_fkey" FOREIGN KEY ("B") REFERENCES "Ink" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CardToKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CardToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CardToClassification" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CardToClassification_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToClassification_B_fkey" FOREIGN KEY ("B") REFERENCES "Classification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ink_name_key" ON "Ink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_code_key" ON "Rarity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Classification_name_key" ON "Classification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_name_key" ON "Franchise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Set_number_key" ON "Set"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Set_name_key" ON "Set"("name");

-- CreateIndex
CREATE INDEX "Set_releasedAt_idx" ON "Set"("releasedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Card_tcgPlayerId_key" ON "Card"("tcgPlayerId");

-- CreateIndex
CREATE INDEX "Card_setId_idx" ON "Card"("setId");

-- CreateIndex
CREATE INDEX "Card_rarityId_idx" ON "Card"("rarityId");

-- CreateIndex
CREATE INDEX "Card_typeId_idx" ON "Card"("typeId");

-- CreateIndex
CREATE INDEX "Card_franchiseId_idx" ON "Card"("franchiseId");

-- CreateIndex
CREATE INDEX "Card_roleId_idx" ON "Card"("roleId");

-- CreateIndex
CREATE INDEX "Card_setNumber_idx" ON "Card"("setNumber");

-- CreateIndex
CREATE INDEX "Card_name_idx" ON "Card"("name");

-- CreateIndex
CREATE INDEX "Card_inkable_idx" ON "Card"("inkable");

-- CreateIndex
CREATE INDEX "Card_cost_idx" ON "Card"("cost");

-- CreateIndex
CREATE INDEX "Card_isBanned_idx" ON "Card"("isBanned");

-- CreateIndex
CREATE UNIQUE INDEX "Card_setId_number_key" ON "Card"("setId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToInk_AB_unique" ON "_CardToInk"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToInk_B_index" ON "_CardToInk"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToKeyword_AB_unique" ON "_CardToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToKeyword_B_index" ON "_CardToKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToClassification_AB_unique" ON "_CardToClassification"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToClassification_B_index" ON "_CardToClassification"("B");
