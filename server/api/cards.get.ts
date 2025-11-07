import { prisma } from "~/server/utils/prisma";

// Helper function to convert kebab-case to Start Case
function toStartCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

    // Get all available options to check if "all" are selected
    const allInks = await prisma.ink.findMany({ select: { name: true } });
    const allInkNames = allInks.map(i => i.name);
    const allTypes = await prisma.type.findMany({ select: { name: true } });
    const allTypeNames = allTypes.map(t => t.name);
    const allRarities = await prisma.rarity.findMany({ select: { name: true } });
    const allRarityNames = allRarities.map(r => r.name);
    const allSets = await prisma.set.findMany({ select: { id: true } });
    const allSetIds = allSets.map(s => s.id);

    // Ink filter - check if card has any of the selected inks
    // Only apply if not all inks are selected
    if (inks.length > 0) {
      const inkNames = inks.map((ink) => toStartCase(ink as string));
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
      const typeNames = types.map((type) => toStartCase(type as string));
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
            in: keywords.map((kw) => toStartCase(kw as string)),
          },
        },
      };
    }

    // Classifications filter
    if (classifications.length > 0) {
      where.Classifications = {
        some: {
          name: {
            in: classifications.map((cls) => toStartCase(cls as string)),
          },
        },
      };
    }

    // Rarity filter - only apply if not all rarities are selected
    if (rarities.length > 0) {
      const rarityNames = rarities.map((rarity) => toStartCase(rarity as string));
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

    // Fetch cards with relations first (we'll handle dual/single ink post-query)
    // For accurate pagination with dual/single filter, we need to fetch more and filter
    const shouldFilterDualSingle = dualSingle.length > 0 && dualSingle.length === 1;
    
    // Fetch a larger batch if we need to filter for dual/single ink
    const fetchLimit = shouldFilterDualSingle ? limit * 3 : limit;
    const skip = (page - 1) * limit;

    let cards = await prisma.card.findMany({
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
      take: shouldFilterDualSingle ? fetchLimit : limit,
      skip: shouldFilterDualSingle ? 0 : skip,
    });

    // Apply dual/single ink filter post-query
    if (shouldFilterDualSingle) {
      if (dualSingle.includes("dual")) {
        cards = cards.filter((card) => card.Inks.length > 1);
      } else if (dualSingle.includes("single")) {
        cards = cards.filter((card) => card.Inks.length === 1);
      }
      // Apply pagination after filtering
      cards = cards.slice(skip, skip + limit);
    }

    // Get total count for pagination
    // For dual/single filter, we need to count all matching cards
    let total: number;
    if (shouldFilterDualSingle) {
      // Fetch all matching cards to count (limited to reasonable batch)
      const allMatching = await prisma.card.findMany({
        where,
        include: {
          Inks: true,
        },
      });
      if (dualSingle.includes("dual")) {
        total = allMatching.filter((card) => card.Inks.length > 1).length;
      } else {
        total = allMatching.filter((card) => card.Inks.length === 1).length;
      }
    } else {
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
