<script lang="ts" setup>
import type {FILTERS} from "~/app.types";
import {dualSingleOptions, inkableOptions, inkOptions, rarityOptions, setOptions, typeOptions} from "~/app.options";

definePageMeta({title: 'Collection'})

const {data} = await useFetch('/api/collection')
const showFilters = ref(false);

const allCards = ref(data.value || []);

const filters = ref<FILTERS>({
  sort: 'set',
  inks: inkOptions.map(option => option.value),
  types: typeOptions.map(option => option.value),
  rarities: rarityOptions.map(option => {
    if (option.value !== 'Enchanted') return option.value;
  }).filter(value => value !== undefined),
  sets: setOptions.map(option => option.value),
  inkable: inkableOptions.map(option => option.value),
  dualSingle: dualSingleOptions.map(option => option.value),
})

const filteredCards = computed(() => {
  return data.value || [];
})

function openFilters() {
  showFilters.value = true;
}
</script>

<template>
  <UiList :items="data" class="mt-8">
    <template #header>
      <div class="flex items-center justify-between">
        <p class="italic text-gray-400">{{ filteredCards.length }} of {{ allCards.length }} cards</p>

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

  <Filters v-model:visible="showFilters" :filters="filters"/>
</template>
