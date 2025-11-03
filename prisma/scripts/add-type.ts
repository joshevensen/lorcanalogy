import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addType(name: string) {
  const normalizedName = name.trim();

  const type = await prisma.type.upsert({
    where: { name: normalizedName },
    update: {},
    create: {
      name: normalizedName,
    },
  });

  console.log(`✓ Added type: ${type.name}`);
  return type;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: npm run add:type <name>");
    console.error('Example: npm run add:type "Character"');
    process.exit(1);
  }

  try {
    for (const name of args) {
      await addType(name);
    }
  } catch (error) {
    console.error("Error adding type:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

