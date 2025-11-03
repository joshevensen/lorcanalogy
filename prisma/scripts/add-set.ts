import { PrismaClient } from "@prisma/client";
import { mapSetData, mapCardData } from "./maps";
import {
  extractUniqueKeywords,
  extractUniqueClassifications,
} from "./extractors";
import type { CARD, SET } from "~/app.types";

const prisma = new PrismaClient();

/**
 * Import a full set with all its cards
 * Process: Set → Keywords/Classifications → Cards
 */
async function importSet(setData: SET, cardsData: CARD[]) {
  console.log(`\n📦 Starting import for: ${setData.name}`);
  console.log(`   Cards to import: ${cardsData.length}`);

  // Step 1: Import or update the Set
  console.log("\n📝 Step 1: Importing Set...");
  const set = await prisma.set.upsert({
    where: { number: parseInt(setData.code) },
    update: {
      name: setData.name,
      releasedAt: new Date(setData.released_at),
    },
    create: mapSetData(setData),
  });
  console.log(`   ✓ Set imported: ${set.name} (#${set.number})`);

  // Step 2: Extract and import unique Keywords
  console.log("\n🔑 Step 2: Extracting Keywords...");
  const uniqueKeywords = extractUniqueKeywords(cardsData);
  if (uniqueKeywords.length > 0) {
    console.log(`   Found ${uniqueKeywords.length} unique keywords`);
    for (const keywordName of uniqueKeywords) {
      await prisma.keyword.upsert({
        where: { name: keywordName },
        update: {},
        create: { name: keywordName },
      });
    }
    console.log(`   ✓ Imported ${uniqueKeywords.length} keywords`);
  } else {
    console.log(`   ✓ No keywords to import`);
  }

  // Step 3: Extract and import unique Classifications
  console.log("\n🏷️  Step 3: Extracting Classifications...");
  const uniqueClassifications = extractUniqueClassifications(cardsData);
  if (uniqueClassifications.length > 0) {
    console.log(
      `   Found ${uniqueClassifications.length} unique classifications`
    );
    for (const classificationName of uniqueClassifications) {
      await prisma.classification.upsert({
        where: { name: classificationName },
        update: {},
        create: { name: classificationName },
      });
    }
    console.log(
      `   ✓ Imported ${uniqueClassifications.length} classifications`
    );
  } else {
    console.log(`   ✓ No classifications to import`);
  }

  // Step 4: Import all Cards
  console.log("\n🃏 Step 4: Importing Cards...");
  let importedCount = 0;

  for (const cardData of cardsData) {
    try {
      const mappedCard = mapCardData(cardData);

      // Create or update the card
      const card = await prisma.card.upsert({
        where: {
          setId_number: {
            setId: set.id,
            number: cardData.collector_number,
          },
        },
        update: {
          name: mappedCard.name,
          version: mappedCard.version,
          image: mappedCard.image,
          text: mappedCard.text,
          flavorText: mappedCard.flavorText,
          cost: mappedCard.cost,
          inkable: mappedCard.inkable,
          lore: mappedCard.lore,
          strength: mappedCard.strength,
          willpower: mappedCard.willpower,
          movement: mappedCard.movement,
          isBanned: mappedCard.isBanned,
          tcgPlayerId: mappedCard.tcgPlayerId,
        },
        create: mappedCard,
      });

      // Update many-to-many relationships after upsert
      if (
        mappedCard.Inks ||
        mappedCard.Types ||
        mappedCard.Keywords ||
        mappedCard.Classifications
      ) {
        await prisma.card.update({
          where: { id: card.id },
          data: {
            Inks: mappedCard.Inks,
            Types: mappedCard.Types,
            Keywords: mappedCard.Keywords,
            Classifications: mappedCard.Classifications,
          },
        });
      }

      importedCount++;
    } catch (error) {
      console.error(`   ❌ Error importing card ${cardData.name}:`, error);
    }
  }

  console.log(`   ✓ Imported ${importedCount} cards`);

  // Summary
  console.log(`\n✅ Import complete for ${setData.name}!`);
  console.log(`   - Set: 1`);
  console.log(`   - Keywords: ${uniqueKeywords.length}`);
  console.log(`   - Classifications: ${uniqueClassifications.length}`);
  console.log(`   - Cards: ${importedCount}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: npm run add:set <path-to-set-file>");
    console.error("Example: npm run add:set ../data/set1");
    process.exit(1);
  }

  // Normalize the path - from prisma/scripts/ to data/ is ../../data
  // Allow: "data/set1", "../data/set1", "../../data/set1", or full paths
  let setFile = args[0];
  if (!setFile.includes("/")) {
    setFile = `../../data/${setFile}`;
  }

  try {
    // Dynamically import the set file
    const module = await import(setFile);

    const setData = module.set;
    const cardsData = module.cards;

    if (!setData || !cardsData) {
      console.error(
        "❌ Could not find set or cards export in the provided file"
      );
      process.exit(1);
    }

    await importSet(setData, cardsData);
  } catch (error) {
    console.error("Error importing set:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
