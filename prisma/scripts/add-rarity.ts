import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addRarity(name: string) {
  const normalizedName = name.toLowerCase().trim();

  const rarity = await prisma.rarity.upsert({
    where: { name: normalizedName },
    update: {},
    create: {
      name: normalizedName,
    },
  });

  console.log(`✓ Added rarity: ${rarity.name}`);
  return rarity;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: npm run add:rarity <name>");
    console.error('Example: npm run add:rarity "Common"');
    process.exit(1);
  }

  try {
    for (const name of args) {
      await addRarity(name);
    }
  } catch (error) {
    console.error("Error adding rarity:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
