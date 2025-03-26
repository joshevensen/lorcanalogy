<script lang="ts" setup>
import {useStartCase} from "#imports";

definePageMeta({title: 'Collection'})

const cards = await useCards();
const showFilters = ref(false);

const filteredCards = computed(() => {
  return cards.filtered.value.map((card) => {
    return {
      ...card,
      fullName: card.name + `${card.version ? ' | ' + card.version : ''}`,
      inks: useStartCase(card.ink1) + `${card.ink2 ? ', ' + useStartCase(card.ink2) : ''}`,
      inkable: card.inkable ? 'Yes' : 'No',
      isDualInk: card.ink2 ? 'Yes' : 'No',
      type: card.type === 'actionSong' ? 'Song' : useStartCase(card.type),
      rarity: useStartCase(card.rarity),
    }
  })
})

function openFilters() {
  showFilters.value = true;
}
</script>

<template>
  <UiList :items="filteredCards" class="mt-8">
    <template #header>
      <div class="flex items-center justify-between">
        <p class="italic text-gray-400">{{ filteredCards.length }} of {{ cards.all.length }} cards</p>

        <div class="flex gap-3 items-center">
          <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>
          <UiButtonIcon class="sm:hidden!" icon="filter" @click="openFilters"/>
        </div>
      </div>
    </template>

    <template #listItem="{ item: collection }">
      <p>{{ collection.card.name }}</p>
    </template>
  </UiList>

  <Filters v-model:visible="showFilters" :filters="cards.filters"/>
</template>
