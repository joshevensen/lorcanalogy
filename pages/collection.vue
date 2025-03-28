<script lang="ts" setup>
definePageMeta({title: 'Collection'})

const cards = await useCards();
const showFilters = ref(false);

const filteredCards = computed(() => {
  return cards.filtered.value.map((card) => {
    return {
      ...card,
      inks: useStartCase(card.ink1) + `${card.ink2 ? ', ' + useStartCase(card.ink2) : ''}`,
      type: useStartCase(card.type),
      rarity: useStartCase(card.rarity),
    }
  })
})

function openFilters() {
  showFilters.value = true;
}
</script>

<template>
  <UiList :items="filteredCards" class="max-w-xl mt-8 mx-auto">
    <template #header>
      <div class="flex items-center justify-between">
        <p class="italic text-gray-400">{{ filteredCards.length }} of {{ cards.all.length }} cards</p>

        <div class="flex gap-3 items-center">
          <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>
          <UiButtonIcon class="sm:hidden!" icon="filter" @click="openFilters"/>
        </div>
      </div>
    </template>

    <template #listItem="{ item: card }">
      <CollectionItem :card="card"/>
    </template>
  </UiList>

  <Filters v-model:visible="showFilters" :filters="cards.filters"/>
</template>
