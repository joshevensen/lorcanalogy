-- CreateEnum
CREATE TYPE "Archetype" AS ENUM ('Aggro', 'Control', 'Midrange');

-- CreateEnum
CREATE TYPE "Ink" AS ENUM ('Amber', 'Amethyst', 'Emerald', 'Ruby', 'Sapphire', 'Steel');

-- CreateEnum
CREATE TYPE "Layout" AS ENUM ('Normal', 'Landscape');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('Common', 'Uncommon', 'Rare', 'SuperRare', 'Legendary', 'Enchanted');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Action', 'Song', 'Item', 'Location', 'Character');

-- CreateTable
CREATE TABLE "User"
(
    "id"          SERIAL       NOT NULL,
    "email"       TEXT         NOT NULL,
    "password"    TEXT         NOT NULL,
    "name"        TEXT,
    "allowTrades" BOOLEAN      NOT NULL DEFAULT false,
    "country"     TEXT,
    "postalCode"  TEXT,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection"
(
    "master"        BOOLEAN NOT NULL DEFAULT false,
    "playset1"      BOOLEAN NOT NULL DEFAULT false,
    "playset2"      BOOLEAN NOT NULL DEFAULT false,
    "playset3"      BOOLEAN NOT NULL DEFAULT false,
    "playset4"      BOOLEAN NOT NULL DEFAULT false,
    "masterFoil"    BOOLEAN NOT NULL DEFAULT false,
    "playset1Foil"  BOOLEAN NOT NULL DEFAULT false,
    "playset2Foil"  BOOLEAN NOT NULL DEFAULT false,
    "playset3Foil"  BOOLEAN NOT NULL DEFAULT false,
    "playset4Foil"  BOOLEAN NOT NULL DEFAULT false,
    "extraQtyPlain" INTEGER NOT NULL DEFAULT 0,
    "extraQtyFoil"  INTEGER NOT NULL DEFAULT 0,
    "cardId"        INTEGER NOT NULL,
    "userId"        INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("userId", "cardId")
);

-- CreateTable
CREATE TABLE "Deck"
(
    "id"          SERIAL       NOT NULL,
    "name"        TEXT         NOT NULL,
    "description" TEXT,
    "ink1"        "Ink"        NOT NULL,
    "ink2"        "Ink",
    "archetype"   "Archetype"  NOT NULL,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,
    "userId"      INTEGER,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardsOnDecks"
(
    "qty"    INTEGER NOT NULL DEFAULT 0,
    "cardId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,

    CONSTRAINT "CardsOnDecks_pkey" PRIMARY KEY ("cardId", "deckId")
);

-- CreateTable
CREATE TABLE "Card"
(
    "id"              SERIAL   NOT NULL,
    "tcgPlayerId"     INTEGER,
    "cardNumber"      INTEGER  NOT NULL,
    "name"            TEXT     NOT NULL,
    "version"         TEXT,
    "ink1"            "Ink"    NOT NULL,
    "ink2"            "Ink",
    "inkable"         BOOLEAN  NOT NULL,
    "rarity"          "Rarity" NOT NULL,
    "type"            "Type"   NOT NULL,
    "cost"            INTEGER  NOT NULL,
    "lore"            INTEGER,
    "strength"        INTEGER,
    "willpower"       INTEGER,
    "movement"        INTEGER,
    "classifications" TEXT[],
    "keywords"        TEXT[],
    "text"            TEXT,
    "image"           TEXT,
    "illustrators"    TEXT[],
    "layout"          "Layout" NOT NULL,
    "isBanned"        BOOLEAN DEFAULT false,
    "franchiseId"     INTEGER,
    "setId"           INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set"
(
    "id"         SERIAL  NOT NULL,
    "name"       TEXT    NOT NULL,
    "number"     INTEGER NOT NULL,
    "releasedAt" TEXT    NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchise"
(
    "id"   SERIAL NOT NULL,
    "name" TEXT   NOT NULL,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- AddForeignKey
ALTER TABLE "Collection"
    ADD CONSTRAINT "Collection_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection"
    ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck"
    ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsOnDecks"
    ADD CONSTRAINT "CardsOnDecks_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsOnDecks"
    ADD CONSTRAINT "CardsOnDecks_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card"
    ADD CONSTRAINT "Card_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card"
    ADD CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
