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
    // Define custom rarity order
    const rarityOrder = [
      'common',
      'uncommon',
      'rare',
      'super_rare',
      'legendary',
      'enchanted',
      'epic',
      'iconic',
    ];

    // Fetch all options from database
    const [inks, types, rarities, sets, keywords, classifications] = await Promise.all([
      prisma.ink.findMany({ orderBy: { name: "asc" } }),
      prisma.type.findMany({ orderBy: { name: "asc" } }),
      prisma.rarity.findMany(),
      prisma.set.findMany({ orderBy: { id: "asc" } }),
      prisma.keyword.findMany({ orderBy: { name: "asc" } }),
      prisma.classification.findMany({ orderBy: { name: "asc" } }),
    ]);

    // Sort rarities by custom order
    const sortedRarities = rarities.sort((a, b) => {
      const indexA = rarityOrder.indexOf(a.name);
      const indexB = rarityOrder.indexOf(b.name);
      
      // If rarity not in order list, put it at the end
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });

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
      rarity: sortedRarities.map((rarity) => ({
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

