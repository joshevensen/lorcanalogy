/*
  Warnings:

  - The values [Aggro,Control,Midrange] on the enum `Archetype` will be removed. If these variants are still used in the database, this will fail.
  - The values [Amber,Amethyst,Emerald,Ruby,Sapphire,Steel] on the enum `Ink` will be removed. If these variants are still used in the database, this will fail.
  - The values [Normal,Landscape] on the enum `Layout` will be removed. If these variants are still used in the database, this will fail.
  - The values [Common,Uncommon,Rare,SuperRare,Legendary,Enchanted] on the enum `Rarity` will be removed. If these variants are still used in the database, this will fail.
  - The values [Action,Song,Item,Location,Character] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Archetype_new" AS ENUM ('aggro', 'control', 'midrange');
ALTER TABLE "Deck" ALTER COLUMN "archetype" TYPE "Archetype_new" USING ("archetype"::text::"Archetype_new");
ALTER TYPE "Archetype" RENAME TO "Archetype_old";
ALTER TYPE "Archetype_new" RENAME TO "Archetype";
DROP TYPE "Archetype_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Ink_new" AS ENUM ('amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel');
ALTER TABLE "Deck" ALTER COLUMN "ink1" TYPE "Ink_new" USING ("ink1"::text::"Ink_new");
ALTER TABLE "Deck" ALTER COLUMN "ink2" TYPE "Ink_new" USING ("ink2"::text::"Ink_new");
ALTER TABLE "Card" ALTER COLUMN "ink1" TYPE "Ink_new" USING ("ink1"::text::"Ink_new");
ALTER TABLE "Card" ALTER COLUMN "ink2" TYPE "Ink_new" USING ("ink2"::text::"Ink_new");
ALTER TYPE "Ink" RENAME TO "Ink_old";
ALTER TYPE "Ink_new" RENAME TO "Ink";
DROP TYPE "Ink_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Layout_new" AS ENUM ('normal', 'landscape');
ALTER TABLE "Card" ALTER COLUMN "layout" TYPE "Layout_new" USING ("layout"::text::"Layout_new");
ALTER TYPE "Layout" RENAME TO "Layout_old";
ALTER TYPE "Layout_new" RENAME TO "Layout";
DROP TYPE "Layout_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Rarity_new" AS ENUM ('common', 'uncommon', 'rare', 'superRare', 'legendary', 'enchanted');
ALTER TABLE "Card" ALTER COLUMN "rarity" TYPE "Rarity_new" USING ("rarity"::text::"Rarity_new");
ALTER TYPE "Rarity" RENAME TO "Rarity_old";
ALTER TYPE "Rarity_new" RENAME TO "Rarity";
DROP TYPE "Rarity_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('action', 'actionSong', 'item', 'location', 'character');
ALTER TABLE "Card" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;
