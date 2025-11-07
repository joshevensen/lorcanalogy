import { prisma } from "~/server/utils/prisma";

// Helper function to convert Start Case to kebab-case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

// Helper function to convert to Start Case for labels
function toStartCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default defineEventHandler(async (event) => {
  try {
    // Fetch all options from database
    const [inks, types, rarities, sets, keywords, classifications] = await Promise.all([
      prisma.ink.findMany({ orderBy: { name: "asc" } }),
      prisma.type.findMany({ orderBy: { name: "asc" } }),
      prisma.rarity.findMany({ orderBy: { name: "asc" } }),
      prisma.set.findMany({ orderBy: { id: "asc" } }),
      prisma.keyword.findMany({ orderBy: { name: "asc" } }),
      prisma.classification.findMany({ orderBy: { name: "asc" } }),
    ]);

    // Transform to OPTION format
    return {
      ink: inks.map((ink) => ({
        label: ink.name,
        value: toKebabCase(ink.name),
      })),
      type: types.map((type) => ({
        label: type.name,
        value: toKebabCase(type.name),
      })),
      rarity: rarities.map((rarity) => ({
        label: rarity.name,
        value: toKebabCase(rarity.name),
      })),
      set: sets.map((set) => ({
        label: set.name,
        value: set.id.toString(),
      })),
      keyword: keywords.map((keyword) => ({
        label: keyword.name,
        value: toKebabCase(keyword.name),
      })),
      classification: classifications.map((classification) => ({
        label: classification.name,
        value: toKebabCase(classification.name),
      })),
      inkable: [
        { label: "Inkable", value: "inkable" },
        { label: "Not Inkable", value: "not_inkable" },
      ],
      dualSingle: [
        { label: "Single Ink", value: "single" },
        { label: "Dual Ink", value: "dual" },
      ],
    };
  } catch (error) {
    console.error("Error fetching options:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch options",
    });
  }
});

