import type { CARD } from "~/app.types";

/**
 * Helper to extract all unique keyword names from cards for import
 * Note: Keywords are normalized to lowercase
 */
export function extractUniqueKeywords(cards: CARD[]): string[] {
  const keywordSet = new Set<string>();

  cards.forEach((card) => {
    if (card.keywords && card.keywords.length > 0) {
      card.keywords.forEach((keyword) => keywordSet.add(keyword.toLowerCase()));
    }
  });

  return Array.from(keywordSet);
}

/**
 * Helper to extract all unique classification names from cards for import
 * Note: Classifications are normalized to lowercase
 */
export function extractUniqueClassifications(cards: CARD[]): string[] {
  const classificationSet = new Set<string>();

  cards.forEach((card) => {
    if (card.classifications && card.classifications.length > 0) {
      card.classifications.forEach((classification) =>
        classificationSet.add(classification.toLowerCase())
      );
    }
  });

  return Array.from(classificationSet);
}
