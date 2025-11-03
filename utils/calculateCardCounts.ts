import type { COUNTS, CARD } from "~/app.types";

export default function (cards: CARD[] | undefined): COUNTS | null {
  if (!cards) return null;

  const counts: COUNTS = {
    total: cards.length,
    costs: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
      ten: 0,
      "ten+": 0,
    },
    rarities: {
      common: 0,
      uncommon: 0,
      rare: 0,
      superRare: 0,
      legendary: 0,
      enchanted: 0,
    },
    types: {
      actions: 0,
      characters: 0,
      items: 0,
      locations: 0,
      songs: 0,
    },
  };

  cards.forEach((card) => {
    // Cost
    switch (card.cost) {
      case 0:
        break;
      case 1:
        counts.costs.one++;
        break;
      case 2:
        counts.costs.two++;
        break;
      case 3:
        counts.costs.three++;
        break;
      case 4:
        counts.costs.four++;
        break;
      case 5:
        counts.costs.five++;
        break;
      case 6:
        counts.costs.six++;
        break;
      case 7:
        counts.costs.seven++;
        break;
      case 8:
        counts.costs.eight++;
        break;
      case 9:
        counts.costs.nine++;
        break;
      case 10:
        counts.costs.ten++;
        break;
      default:
        counts.costs["ten+"]++;
    }

    // Rarity
    switch (card.rarity) {
      case "Common":
        counts.rarities.common++;
        break;
      case "Uncommon":
        counts.rarities.uncommon++;
        break;
      case "Rare":
        counts.rarities.rare++;
        break;
      case "Super_rare":
        counts.rarities.superRare++;
        break;
      case "Legendary":
        counts.rarities.legendary++;
        break;
      case "Enchanted":
        counts.rarities.enchanted++;
        break;
    }

    // Type
    if (card.type.includes("Song")) counts.types.songs++;
    else if (card.type.includes("Action")) counts.types.actions++;
    else if (card.type.includes("Character")) counts.types.characters++;
    else if (card.type.includes("Item")) counts.types.items++;
    else if (card.type.includes("Location")) counts.types.locations++;
  });

  return counts;
}
