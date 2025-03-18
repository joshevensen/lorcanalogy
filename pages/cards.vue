<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

definePageMeta({title: "Cards", layout: 'table'})

const cards = useCards();
const table = ref();
const showFilters = ref(false);

function exportCSV() {
  table.value.exportCSV();
}

function openFilters() {
  showFilters.value = true;
}

</script>

<template>
  <div class="mt-12">
    <DataTable
      ref="table"
      :rows="42"
      :value="cards.filtered.value"
      currentPageReportTemplate="{first} to {last}"
      exportFilename="lorcana-cards"
      paginator
      paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink JumpToPageDropdown"
      removableSort
      scrollable
      size="small"
      sortMode="multiple"
      stripedRows
    >
      <template #header>
        <div class="flex items-center justify-between">
          <p class="italic text-gray-400">{{ cards.filtered.value.length }} of {{ cards.all.length }} cards</p>

          <div class="flex gap-3 items-center">
            <UiButton class="hidden! sm:flex!" icon="download" label="Download" @click="exportCSV()"/>
            <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>

            <UiButtonIcon class="sm:hidden!" icon="download" @click="exportCSV()"/>
            <UiButtonIcon class="sm:hidden!" icon="filter" @click="openFilters"/>
          </div>
        </div>
      </template>

      <Column :sortable="true" class="font-bold min-w-64" field="fullName" header="Name"/>
      <Column :sortable="true" field="setNumber" header="Set"/>
      <Column :sortable="true" field="cardNumber" header="Number"/>
      <Column :sortable="true" field="inks" header="Ink"/>
      <Column :sortable="true" field="inkable" header="Inkable">
        <template #body="{data}">{{ data.inkable ? 'Yes' : 'No'}}</template>
      </Column>
      <Column :sortable="true" field="isDualInk" header="Dual Ink?">
        <template #body="{data}">{{ data.isDualInk ? 'Yes' : 'No'}}</template>
      </Column>
      <Column :sortable="true" field="type" header="Type"/>
      <Column :sortable="true" field="rarity" header="Rarity"/>
      <Column :sortable="true" field="cost" header="Cost"/>
      <Column :sortable="true" field="lore" header="Lore"/>
      <Column :sortable="true" field="strength" header="Strength"/>
      <Column :sortable="true" field="willpower" header="Willpower"/>
      <Column :sortable="true" field="moveCost" header="Move Cost"/>

      <template #empty>
        <p class="py-12 text-center italic text-xl">Based on your filters there are no cards.</p>
      </template>
    </DataTable>

    <Filters v-model:visible="showFilters" :filters="cards.filters.value"/>
  </div>
</template>
