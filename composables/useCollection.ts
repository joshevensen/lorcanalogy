import {inkOptions, setOptions, typeOptions} from "~/app.options";
import type {Card, Collection} from "@prisma/client";

interface CollectionWithCard extends Collection {
  card: Card;
}

const state = reactive<{
  initialized: boolean;
  collection: CollectionWithCard[];
}>({
  initialized: false,
  collection: []
})

export default async function useCards() {
  /**
   * Get Cards
   */
  if (!state.initialized) {
    await $fetch('/api/collection').then(response => {
      state.collection = response;
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
    sets: setOptions.map(option => option.value),
  })

  /**
   * Filtered Cards
   */
  const filtered = computed((): CollectionWithCard[] => {
    return state.collection.filter(item => {
      // Ink
      if (!filters.value.inks.includes(item.card.ink1) && !filters.value.inks.includes(item.card.ink2)) return false;

      // Type
      if (!filters.value.types.includes(item.card.type)) return false;

      // Set
      if (!filters.value.sets.includes(item.card.setId)) return false;

      return true;
    })
  })

  /**
   * Sorted Cards
   */
  const sorted = computed((): CollectionWithCard[] => {
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

  return {

    filters,
    all: state.collection,
    filtered,
    sorted,
  }
}
