import type { Card } from "@prisma/client";
import useOptions from "~/composables/useOptions";
import type { OPTION } from "~/app.types";

const state = reactive<{
  initialized: boolean;
  cards: Card[];
}>({
  initialized: false,
  cards: [],
});

export default async function useCards() {
  /**
   * Get Cards
   */
  if (!state.initialized) {
    await $fetch("/api/cards").then((response) => {
      state.cards = response;
      state.initialized = true;
    });
  }

  const options = await useOptions();

  /**
   * Filters
   */
  const filters = ref({
    sort: "set",
    inks: options.ink.map((option) => option.value),
    types: options.type.map((option) => option.value),
    keywords: [],
    classifications: [],
    rarities: options.rarity
      .map((option) => {
        if (option.value !== "enchanted") return option.value;
      })
      .filter((value) => value !== undefined),
    sets: options.set.map((option) => option.value),
    inkable: options.inkable.map((option) => option.value),
    dualSingle: options.dualSingle.map((option) => option.value),
  });

  /**
   * Sorted Cards
   */
  const sortedCards = computed((): Card[] => {
    switch (filters.value.sort) {
      case "set":
        return useSortBy(state.cards, ["setNumber"]);
      case "name":
        return useSortBy(state.cards, ["fullName"]);
      case "rarity":
        return useSortBy(state.cards, ["rarity", "fullName"]);
      case "type":
        return useSortBy(state.cards, ["type", "rarity", "fullName"]);
      default:
        return state.cards;
    }
  });

  function haveCommonElements(array1: any[], array2: any[]) {
    array1 = array1.map((element) => useKebabCase(element));
    array2 = array2.map((element) => useKebabCase(element));

    return array1.some((element) => array2.includes(element));
  }

  /**
   * Filtered Cards
   */
  const filtered = computed((): Card[] => {
    return sortedCards.value.filter((card) => {
      // Ink
      if (
        !filters.value.inks.includes(card.ink1) &&
        !filters.value.inks.includes(card.ink2)
      )
        return false;

      // Keyword
      if (filters.value.keywords.length > 0) {
        if (!haveCommonElements(filters.value.keywords, card.keywords))
          return false;
      }

      // Classification
      if (filters.value.classifications.length > 0) {
        if (
          !haveCommonElements(
            filters.value.classifications,
            card.classifications
          )
        )
          return false;
      }

      // Type
      if (!filters.value.types.includes(card.type)) return false;

      // Rarity
      if (!filters.value.rarities.includes(card.rarity)) return false;

      // Set
      if (!filters.value.sets.includes(card.setId)) return false;

      // Inkable
      if (filters.value.inkable.length === 0) return false;

      if (filters.value.inkable.length === 1) {
        if (filters.value.inkable.includes("inkable") && !card.inkable)
          return false;
        if (filters.value.inkable.includes("not_inkable") && card.inkable)
          return false;
      }

      // Dual vs Single Ink
      if (filters.value.dualSingle.length === 0) return false;

      if (filters.value.dualSingle.length === 1) {
        if (filters.value.dualSingle.includes("single")) {
          if (card.ink2 !== null) return false;
        }

        if (filters.value.dualSingle.includes("dual")) {
          if (card.ink2 === null) return false;
        }
      }

      return true;
    });
  });

  /**
   * Cards by Pages
   */
  const byPage = computed(() => {
    const pages = [];
    const chunkSize = 9; // cards per page

    for (let i = 0; i < filtered.value.length; i += chunkSize) {
      const chunk: Card[] = filtered.value.slice(i, i + chunkSize);
      pages.push(chunk);
    }

    return pages;
  });

  const keywordsList = computed<OPTION[]>(() => {
    let items: string[] = [];

    state.cards.forEach((card) => {
      card.keywords.forEach((keyword) => {
        items.push(keyword);
      });
    });

    return useUniq(items)
      .sort()
      .map((item) => {
        return { label: useStartCase(item), value: useKebabCase(item) };
      });
  });

  const classificationsList = computed<OPTION[]>(() => {
    let items: string[] = [];

    state.cards.forEach((card) => {
      card.classifications.forEach((classification) => {
        items.push(classification);
      });
    });

    return useUniq(items)
      .sort()
      .map((item) => {
        return { label: useStartCase(item), value: useKebabCase(item) };
      });
  });

  return {
    filters,
    all: state.cards,
    filtered,
    byPage,
    keywordsList,
    classificationsList,
  };
}
