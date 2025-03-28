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

export default async function useCollection() {
  if (!state.initialized) {
    await getItems();
  }

  async function getItems() {
    state.initialized = false;
    await $fetch('/api/collection').then(response => {
      state.collection = response;
      state.initialized = true;
    });
  }

  function findItemByCardId(cardId: number) {
    return state.collection.find((collection) => collection.card.id === cardId);
  }

  async function updateItem(cardId: number, plain: number, foil: number, notes: string | null) {
    await $fetch('/api/collection', {
      method: 'POST',
      body: {
        cardId: cardId,
        plain: plain,
        foil: foil,
        notes: notes,
      }
    })

    await getItems();
  }

  return {
    findItemByCardId,
    updateItem,
  }
}
