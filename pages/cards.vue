<script lang="ts" setup>
import {useStartCase} from "../.nuxt/imports";

definePageMeta({title: "Cards", layout: 'table'})

const cards = await useCards();
const table = ref();
const showFilters = ref(false);
const showColumns = ref(false);

const display = ref('list');
const options = ref([
  {name: 'List', value: 'list'},
  {name: 'Grid', value: 'grid'},
  {name: 'Table', value: 'table'}
]);

// console.log('classifications', cards.classificationsList.value);
// console.log('keywords', cards.keywordsList.value);

const columns = ref({
  image: true,
  name: false,
  version: false,
  fullName: true,
  setNumber: false,
  setId: true,
  number: true,
  inks: true,
  inkable: true,
  isDualInk: false,
  type: true,
  rarity: true,
  cost: true,
  lore: true,
  strength: true,
  willpower: true,
  moveCost: true,
  keywords: false,
  classifications: false,
})

const columnKeys = Object.keys(columns.value);

const filteredCards = computed(() => {
  return cards.filtered.value.map((card) => {
    return {
      ...card,
      inks: useStartCase(card.ink1) + `${card.ink2 ? ', ' + useStartCase(card.ink2) : ''}`,
      inkable: card.inkable ? 'Yes' : 'No',
      isDualInk: card.ink2 ? 'Yes' : 'No',
      type: useStartCase(card.type),
      keywords: card.keywords.join(', '),
      classifications: card.classifications.join(', '),
      rarity: useStartCase(card.rarity),
    }
  })
})

function exportCSV() {
  table.value.exportCSV();
}

function openFilters() {
  showFilters.value = true;
}

function openColumns() {
  showColumns.value = true;
}
</script>

<template>
  <div class="mt-12">
    <div class="bg-white mb-4 p-2 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <!--        <SelectButton :value="display" :options="options" optionLabel="name" size="small" />-->
        <p class="italic text-gray-400">{{ filteredCards.length }} of {{ cards.all.length }} cards</p>
      </div>

      <div class="flex items-center gap-2">
        <UiButton class="hidden! sm:flex!" icon="download" label="Download CSV" @click="exportCSV()"/>
        <UiButton class="hidden! sm:flex!" icon="server" label="Columns" @click="openColumns"/>
        <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>

        <UiButtonIcon class="sm:hidden!" icon="download" @click="exportCSV()"/>
        <UiButtonIcon class="sm:hidden!" icon="server" @click="openColumns"/>
        <UiButtonIcon class="sm:hidden!" icon="filter" @click="openFilters"/>
      </div>
    </div>

    <CardsTable :cards="filteredCards" :columns="columns"/>

    <CardsFilters v-model:visible="showFilters" :filters="cards.filters.value"/>

    <UiDrawer v-model:visible="showColumns" header="Toggle Columns">
      <div class="space-y-3">
        <UiField v-for="key in columnKeys" :key="key" :label="useStartCase(key)" position="right">
          <UiCheckbox v-model="columns[key as keyof typeof columns]"/>
        </UiField>
      </div>
    </UiDrawer>
  </div>
</template>
