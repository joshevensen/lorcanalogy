import { prisma } from "~/server/utils/prisma";

// Helper function to convert kebab-case to Start Case
function toStartCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Cache reference data to avoid querying on every request
// These rarely change and can be cached for the lifetime of the server
// Note: Server restart will clear cache, or you can add a cache-busting endpoint
let cachedReferenceData: {
  allInkNames: string[];
  allTypeNames: string[];
  allRarityNames: string[];
  allSetIds: number[];
} | null = null;

async function getReferenceData() {
  if (cachedReferenceData) {
    return cachedReferenceData;
  }

  // Use Promise.all for parallel queries (faster than sequential)
  const [allInks, allTypes, allRarities, allSets] = await Promise.all([
    prisma.ink.findMany({ select: { name: true } }),
    prisma.type.findMany({ select: { name: true } }),
    prisma.rarity.findMany({ select: { name: true } }),
    prisma.set.findMany({ select: { id: true } }),
  ]);

  cachedReferenceData = {
    allInkNames: allInks.map(i => i.name),
    allTypeNames: allTypes.map(t => t.name),
    allRarityNames: allRarities.map(r => r.name),
    allSetIds: allSets.map(s => s.id),
  };

  return cachedReferenceData;
}

// Export function to clear cache (useful for testing or after adding new sets)
export function clearReferenceDataCache() {
  cachedReferenceData = null;
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    // Parse query parameters
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 34;
    const sort = (query.sort as string) || "set";

    // Parse array filters - handle both [] and non-[] formats
    const parseArray = (param: any): string[] => {
      if (!param) return [];
      if (Array.isArray(param)) return param as string[];
      return [param as string];
    };

    const inks = parseArray(query["inks[]"] || query.inks);
    const types = parseArray(query["types[]"] || query.types);
    const keywords = parseArray(query["keywords[]"] || query.keywords);
    const classifications = parseArray(
      query["classifications[]"] || query.classifications
    );
    const rarities = parseArray(query["rarities[]"] || query.rarities);
    const sets = parseArray(query["sets[]"] || query.sets);
    const inkable = parseArray(query["inkable[]"] || query.inkable);
    const dualSingle = parseArray(query["dualSingle[]"] || query.dualSingle);

    // Build where clause
    const where: any = {};

    // Get cached reference data to check if "all" options are selected
    const { allInkNames, allTypeNames, allRarityNames, allSetIds } = await getReferenceData();

    // Ink filter - check if card has any of the selected inks
    // Only apply if not all inks are selected
    if (inks.length > 0) {
      // Use values as-is since database stores lowercase
      const inkNames = inks.map((ink) => (ink as string).toLowerCase());
      const isAllInksSelected = inkNames.length === allInkNames.length && 
        inkNames.every(name => allInkNames.includes(name));
      
      if (!isAllInksSelected) {
        if (where.Inks) {
          // Merge with existing Inks filter if dual/single filter exists
          where.Inks = {
            ...where.Inks,
            some: {
              name: {
                in: inkNames,
              },
            },
          };
        } else {
          where.Inks = {
            some: {
              name: {
                in: inkNames,
              },
            },
          };
        }
      }
    }

    // Type filter - only apply if not all types are selected
    if (types.length > 0) {
      // Use values as-is since database stores lowercase
      const typeNames = types.map((type) => (type as string).toLowerCase());
      const isAllTypesSelected = typeNames.length === allTypeNames.length && 
        typeNames.every(name => allTypeNames.includes(name));
      
      if (!isAllTypesSelected) {
        where.Types = {
          some: {
            name: {
              in: typeNames,
            },
          },
        };
      }
    }

    // Keywords filter
    if (keywords.length > 0) {
      where.Keywords = {
        some: {
          name: {
            in: keywords.map((kw) => (kw as string).toLowerCase()),
          },
        },
      };
    }

    // Classifications filter
    if (classifications.length > 0) {
      where.Classifications = {
        some: {
          name: {
            in: classifications.map((cls) => (cls as string).toLowerCase()),
          },
        },
      };
    }

    // Rarity filter - only apply if not all rarities are selected
    if (rarities.length > 0) {
      // Use values as-is since database stores lowercase
      const rarityNames = rarities.map((rarity) => (rarity as string).toLowerCase());
      const isAllRaritiesSelected = rarityNames.length === allRarityNames.length && 
        rarityNames.every(name => allRarityNames.includes(name));
      
      if (!isAllRaritiesSelected) {
        where.Rarity = {
          name: {
            in: rarityNames,
          },
        };
      }
    }

    // Set filter - only apply if not all sets are selected
    if (sets.length > 0) {
      const setIds = sets.map((s) => parseInt(s as string)).filter((id) => !isNaN(id));
      const isAllSetsSelected = setIds.length === allSetIds.length && 
        setIds.every(id => allSetIds.includes(id));
      
      if (setIds.length > 0 && !isAllSetsSelected) {
        where.setId = {
          in: setIds,
        };
      }
    }

    // Inkable filter
    if (inkable.length > 0 && inkable.length === 1) {
      if (inkable.includes("inkable")) {
        where.inkable = true;
      } else if (inkable.includes("not_inkable")) {
        where.inkable = false;
      }
      // If both selected, no filter needed
    }

    // Note: Dual/Single ink filter will be handled post-query
    // as Prisma doesn't easily support counting array relationships in where clauses

    // Build orderBy
    let orderBy: any = {};
    switch (sort) {
      case "set":
        orderBy = [{ setNumber: "asc" }, { number: "asc" }];
        break;
      case "name":
        orderBy = { name: "asc" };
        break;
      case "rarity":
        // Sort by rarityId first (simpler than nested relation)
        orderBy = [{ rarityId: "asc" }, { name: "asc" }];
        break;
      case "type":
        // Sort by name first, then by rarity
        orderBy = [{ rarityId: "asc" }, { name: "asc" }];
        break;
      default:
        orderBy = { setNumber: "asc" };
    }

    // Handle dual/single ink filter efficiently
    const shouldFilterDualSingle = dualSingle.length > 0 && dualSingle.length === 1;
    const skip = (page - 1) * limit;

    let cards: any[];
    let total: number;
    
    if (shouldFilterDualSingle) {
      // OPTIMIZED: Use raw SQL to filter cards by ink count without loading all data
      // This queries only card IDs, not full card data with relations
      const inkCountFilter = dualSingle.includes("dual") ? "> 1" : "= 1";
      
      // Build WHERE clause SQL from existing Prisma where conditions
      // We'll use a subquery approach to get filtered card IDs
      const inkCountQuery = `
        SELECT c.id
        FROM Card c
        INNER JOIN (
          SELECT cardId, COUNT(*) as ink_count
          FROM _CardToInk
          GROUP BY cardId
        ) ink_counts ON c.id = ink_counts.cardId
        WHERE ink_counts.ink_count ${inkCountFilter}
      `;

      // Get filtered card IDs efficiently
      const filteredCardIds = await prisma.$queryRawUnsafe<{ id: number }[]>(inkCountQuery);
      const cardIds = filteredCardIds.map(c => c.id);

      // Add ink count filter to where clause
      if (cardIds.length === 0) {
        // No cards match the dual/single filter
        cards = [];
        total = 0;
      } else {
        // Combine with existing where clause
        const combinedWhere = {
          ...where,
          id: { in: cardIds }
        };

        // Now fetch only the paginated cards with all relations
        cards = await prisma.card.findMany({
          where: combinedWhere,
          include: {
            Inks: true,
            Types: true,
            Keywords: true,
            Classifications: true,
            Rarity: true,
            Set: true,
          },
          orderBy,
          take: limit,
          skip: skip,
        });
        
        total = await prisma.card.count({ where: combinedWhere });
      }
    } else {
      // Normal query with pagination (no dual/single filter)
      cards = await prisma.card.findMany({
        where,
        include: {
          Inks: true,
          Types: true,
          Keywords: true,
          Classifications: true,
          Rarity: true,
          Set: true,
        },
        orderBy,
        take: limit,
        skip: skip,
      });
      
      total = await prisma.card.count({ where });
    }

    const totalPages = Math.ceil(total / limit);

    return {
      cards,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error: any) {
    console.error("Error fetching cards:", error);
    console.error("Error stack:", error?.stack);
    console.error("Error message:", error?.message);
    throw createError({
      statusCode: 500,
      statusMessage: error?.message || "Failed to fetch cards",
      data: error,
    });
  }
});
