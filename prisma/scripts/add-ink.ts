import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addInk(name: string) {
  const normalizedName = name.toLowerCase().trim();

  const ink = await prisma.ink.upsert({
    where: { name: normalizedName },
    update: {},
    create: {
      name: normalizedName,
    },
  });

  console.log(`✓ Added ink: ${ink.name}`);
  return ink;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: npm run add:ink <name>");
    console.error('Example: npm run add:ink "Amber"');
    process.exit(1);
  }

  try {
    for (const name of args) {
      await addInk(name);
    }
  } catch (error) {
    console.error("Error adding ink:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
