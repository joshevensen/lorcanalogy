import {dualSingleOptions, inkableOptions, inkOptions, rarityOptions, setOptions, typeOptions} from "~/app.options";
import type {Card} from "@prisma/client";
import {Rarity} from "@prisma/client";

const state = reactive<{
  initialized: boolean;
  cards: Card[];
}>({
  initialized: false,
  cards: []
})

export default async function useCards() {
  /**
   * Get Cards
   */
  if (!state.initialized) {
    await $fetch('/api/cards').then(response => {
      state.cards = response;
      state.initialized = true;
    });
  }

  /**
   * Filters
   */
  const filters = ref({
    sort: 'set',
    inks: inkOptions.map(option => option.value),
    types: typeOptions.map(option => option.value),
    rarities: rarityOptions.map(option => {
      if (option.value !== Rarity.enchanted) return option.value;
    }).filter(value => value !== undefined),
    sets: setOptions.map(option => option.value),
    inkable: inkableOptions.map(option => option.value),
    dualSingle: dualSingleOptions.map(option => option.value),
  })

  /**
   * Filtered Cards
   */
  const filtered = computed((): Card[] => {
    return state.cards.filter(card => {
      // Ink
      if (!filters.value.inks.includes(card.ink1) && !filters.value.inks.includes(card.ink2)) return false;

      // Type
      if (!filters.value.types.includes(card.type)) return false;

      // Rarity
      if (!filters.value.rarities.includes(card.rarity)) return false;

      // Set
      if (!filters.value.sets.includes(card.setId)) return false;

      // Inkable
      if (filters.value.inkable.length === 0) return false;

      if (filters.value.inkable.length === 1) {
        if (filters.value.inkable.includes('inkable') && !card.inkable) return false;
        if (filters.value.inkable.includes('not_inkable') && card.inkable) return false;
      }

      // Dual vs Single Ink
      if (filters.value.dualSingle.length === 0) return false;

      if (filters.value.dualSingle.length === 1) {
        if (filters.value.dualSingle.includes('single')) {
          if (card.ink2 !== null) return false;
        }

        if (filters.value.dualSingle.includes('dual')) {
          if (card.ink2 === null) return false;
        }
      }

      return true;
    })
  })

  /**
   * Sorted Cards
   */
  const sorted = computed((): Card[] => {
    switch (filters.value.sort) {
      case 'name':
        return useSortBy(filtered.value, ['fullName']);
      case 'rarity':
        return useSortBy(filtered.value, ['rarity', 'fullName']);
      case 'type':
        return useSortBy(filtered.value, ['type', 'fullName']);
    }

    return filtered.value;
  })

  /**
   * Cards by Pages
   */
  const byPage = computed(() => {
    const pages = [];
    const chunkSize = 9; // cards per page

    for (let i = 0; i < sorted.value.length; i += chunkSize) {
      const chunk: Card[] = sorted.value.slice(i, i + chunkSize);
      pages.push(chunk);
    }

    return pages
  })

  return {
    all: state.cards,
    filtered,
    sorted,
    byPage,
    filters
  }
}
