<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useStartCase} from "../.nuxt/imports";

definePageMeta({title: "Cards", layout: 'table'})

const cards = await useCards();
const table = ref();
const showFilters = ref(false);
const showColumns = ref(false);

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
    <DataTable
      ref="table"
      :rows="42"
      :value="filteredCards"
      currentPageReportTemplate="{first} to {last}"
      exportFilename="lorcana-cards"
      paginator
      paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink JumpToPageDropdown"
      removableSort
      scrollable
      size="small"
      sortMode="multiple"
      defaultSortBy="setNumber"
      stripedRows
    >
      <template #header>
        <div class="flex items-center justify-between">
          <p class="italic text-gray-400">{{ filteredCards.length }} of {{ cards.all.length }} cards</p>

          <div class="flex gap-3 items-center">
            <UiButton class="hidden! sm:flex!" icon="download" label="Download" @click="exportCSV()"/>
            <UiButton class="hidden! sm:flex!" icon="server" label="Columns" @click="openColumns"/>
            <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>

            <UiButtonIcon class="sm:hidden!" icon="download" @click="exportCSV()"/>
            <UiButtonIcon class="sm:hidden!" icon="server" @click="openColumns"/>
            <UiButtonIcon class="sm:hidden!" icon="filter" @click="openFilters"/>
          </div>
        </div>
      </template>

      <Column v-if="columns.image" class="w-12 text-center" field="fullName" header="Name">
        <template #body="{data}">
          <Image :alt="data.fullName" :src="data.image" preview width="40"/>
        </template>
      </Column>
      <Column v-if="columns.fullName" :sortable="true" class="font-bold min-w-64" field="fullName" header="Name"/>
      <Column v-if="columns.name" :sortable="true" class="font-bold min-w-48" field="name" header="Name"/>
      <Column v-if="columns.version" :sortable="true" class="" field="version" header="Version"/>
      <Column v-if="columns.setNumber" :sortable="true" field="setNumber" header="Set/Card Number"/>
      <Column v-if="columns.setId" :sortable="true" field="setId" header="Set"/>
      <Column v-if="columns.number" :sortable="true" field="number" header="Card Number"/>
      <Column v-if="columns.inks" :sortable="true" field="inks" header="Ink"/>
      <Column v-if="columns.inkable" :sortable="true" field="inkable" header="Inkable"/>
      <Column v-if="columns.isDualInk" :sortable="true" field="isDualInk" header="Dual Ink?"/>
      <Column v-if="columns.type" :sortable="true" field="type" header="Type"/>
      <Column v-if="columns.rarity" :sortable="true" field="rarity" header="Rarity"/>
      <Column v-if="columns.cost" :sortable="true" field="cost" header="Cost"/>
      <Column v-if="columns.lore" :sortable="true" field="lore" header="Lore"/>
      <Column v-if="columns.strength" :sortable="true" field="strength" header="Strength"/>
      <Column v-if="columns.willpower" :sortable="true" field="willpower" header="Willpower"/>
      <Column v-if="columns.moveCost" :sortable="true" field="moveCost" header="Move Cost"/>
      <Column v-if="columns.keywords" field="keywords" header="Keywords"/>
      <Column v-if="columns.classifications" field="classifications" header="Classifications"/>

      <template #empty>
        <p class="py-12 text-center italic text-xl">Based on your filters there are no cards.</p>
      </template>
    </DataTable>

    <Filters v-model:visible="showFilters" :filters="cards.filters.value"/>

    <UiDrawer v-model:visible="showColumns" header="Toggle Columns">
      <div class="space-y-3">
        <UiField v-for="key in columnKeys" :key="key" :label="useStartCase(key)" position="right">
          <UiCheckbox v-model="columns[key as keyof typeof columns]"/>
        </UiField>
      </div>
    </UiDrawer>
  </div>
</template>
