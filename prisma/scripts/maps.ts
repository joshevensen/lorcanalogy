import type { CARD, SET } from "~/app.types";
import type { Prisma } from "@prisma/client";

/**
 * Maps external JSON SET data to Prisma SetCreateInput format
 */
export function mapSetData(setData: SET): Prisma.SetCreateInput {
  return {
    number: parseInt(setData.code),
    name: setData.name,
    description: null, // Not available in source data
    releasedAt: new Date(setData.released_at),
  };
}

/**
 * Maps external JSON CARD data to Prisma CardCreateInput format
 *
 * This handles the transformation of the card data structure, including:
 * - Converting image URIs to single image field
 * - Mapping rarity name to rarityId
 * - Mapping type array to typeId (first type)
 * - Handling optional fields like version, flavorText
 * - Processing multi-ink cards
 * - Handling keywords, classifications arrays
 */
/**
 * Pads a card number to 3 digits, handling letters
 * Examples:
 * - "1" -> "001"
 * - "10" -> "010"
 * - "100" -> "100"
 * - "4a" -> "004a"
 * - "4b" -> "004b"
 */
function padCardNumber(number: string): string {
  // Match the numeric part at the start and any trailing letters
  const match = number.match(/^(\d+)([a-z]*)$/i);
  
  if (!match) {
    // If it doesn't match the pattern, return as-is
    return number;
  }
  
  const numericPart = match[1];
  const letterPart = match[2] || '';
  
  // Pad the numeric part to 3 digits
  const paddedNumeric = numericPart.padStart(3, '0');
  
  return paddedNumeric + letterPart;
}

export function mapCardData(cardData: CARD): Prisma.CardCreateInput {
  const setId = parseInt(cardData.set.code);

  // Normalize rarity: DB uses lowercase, but Super_rare stays as super_rare
  const normalizedRarity =
    cardData.rarity === "Super_rare"
      ? "super_rare"
      : cardData.rarity.toLowerCase();

  return {
    // Basic fields
    setNumber: setId,
    number: padCardNumber(cardData.collector_number),
    tcgPlayerId: cardData.tcgplayer_id ?? null,

    // Image - using normal size
    image: cardData.image_uris.digital.normal,

    // Name and version
    name: cardData.name,
    version: cardData.version ?? null,

    // Text fields
    text: cardData.text ?? null,
    flavorText: cardData.flavor_text ?? null,

    // Numeric fields
    cost: cardData.cost,
    inkable: cardData.inkwell,
    lore: cardData.lore ?? null,
    strength: cardData.strength ?? null,
    willpower: cardData.willpower ?? null,
    movement: cardData.move_cost ?? null,

    // Boolean flag
    isBanned: cardData.legalities.core === "not_legal" ? true : null,

    // Relationships - these will be connected later via lookups
    Set: { connect: { number: setId } },
    Rarity: { connect: { name: normalizedRarity } },

    // Many-to-many relationships
    Inks: cardData.inks
      ? {
          connect: cardData.inks.map((inkName) => ({
            name: inkName.toLowerCase(),
          })),
        }
      : cardData.ink
        ? { connect: { name: cardData.ink.toLowerCase() } }
        : undefined,

    Types:
      cardData.type.length > 0
        ? {
            connect: cardData.type.map((typeName) => ({
              name: typeName.toLowerCase(),
            })),
          }
        : undefined,

    Keywords:
      cardData.keywords && cardData.keywords.length > 0
        ? {
            connect: cardData.keywords.map((keywordName) => ({
              name: keywordName.toLowerCase(),
            })),
          }
        : undefined,

    Classifications:
      cardData.classifications && cardData.classifications.length > 0
        ? {
            connect: cardData.classifications.map((classificationName) => ({
              name: classificationName.toLowerCase(),
            })),
          }
        : undefined,
  };
}
