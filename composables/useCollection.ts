import type {Card, Collection} from "@prisma/client";
import useOptions from "~/composables/useOptions";

interface CollectionWithCard extends Collection {
  card: Card;
}

const state = reactive<{
  loading: boolean;
  initialized: boolean;
  collection: CollectionWithCard[];
}>({
  loading: false,
  initialized: false,
  collection: []
})

export default async function useCollection() {
  if (!state.initialized) {
    await getItems();
  }

  const options = await useOptions();

  /**
   * Filters
   */
  const filters = ref({
    sort: 'set',
    inks: options.ink.map(option => option.value),
    types: options.type.map(option => option.value),
    rarities: options.rarity.map(option => {
      if (option.value !== "enchanted") return option.value;
    }).filter(value => value !== undefined),
    sets: options.set.map(option => option.value),
  })

  const sorted = computed((): CollectionWithCard[] => {
    switch (filters.value.sort) {
      case 'set':
        return useSortBy(state.collection, ['card.setNumber']);
      case 'name':
        return useSortBy(state.collection, ['card.fullName']);
      case 'inkTypeName':
        return useSortBy(state.collection, ['card.ink1', 'card.type', 'card.fullName']);
      default:
        return state.collection;
    }
  })

  const filtered = computed(() => {
    return sorted.value.filter(item => {
      // Ink
      if (!filters.value.inks.includes(item.card.ink1) && !filters.value.inks.includes(item.card.ink2)) return false;

      // Type
      if (!filters.value.types.includes(item.card.type)) return false;

      // Rarity
      if (!filters.value.rarities.includes(item.card.rarity)) return false;

      // Set
      if (!filters.value.sets.includes(item.card.setId)) return false;

      return true;
    })
  })

  async function getItems() {
    state.loading = true;
    state.initialized = false;
    await $fetch('/api/collection').then(response => {
      state.collection = response;
      state.initialized = true;
      state.loading = false;
    });
  }

  async function updateItem(cardId: number, plain: number, foil: number, notes: string | null) {
    await $fetch('/api/collection', {
      method: 'POST',
      body: {
        userId: 1,
        cardId: cardId,
        plain: plain,
        foil: foil,
        notes: notes,
      }
    })
  }

  return {
    all: state.collection,
    loading: state.loading,
    filters,
    filtered,
    updateItem,
  }
}
