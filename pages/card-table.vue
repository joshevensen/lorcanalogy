<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

definePageMeta({title: "Cards Table", layout: 'table'})

const {selectOptions: setOptions} = useSets();
const cards = useCards();
const table = ref();
const visible = ref(false);

/**
 * Functions
 */

function exportCSV() {
  table.value.exportCSV();
}

function openFilters() {
  visible.value = true;
}

</script>

<template>
  <div class="mt-12">
    <DataTable
      ref="table"
      :rows="42"
      :value="cards.mappedCards.value"
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
          <p class="italic text-gray-400">{{ cards.mappedCards.value.length }} of {{ cards.all.length }} cards</p>

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

    <!-- Filters -->
    <Drawer v-model:visible="visible" class="w-[90%]! max-w-xl!" header="Filters" position="right">
      <div class="flex flex-col gap-6">
        <!--        <UiInputWithButton-->
        <!--          v-model="cards.searchTerm"-->
        <!--          icon="search"-->
        <!--          label="Search"-->
        <!--          placeholder="search by card name..."-->
        <!--        />-->
        <UiSelect
          v-model="cards.selectedInks"
          :options="cards.inkOptions"
          prefix="Include"
          allLabel="All inks"
          multiple
          placeholder="choose ink..."
        />
        <UiSelect
          v-model="cards.selectedTypes"
          :options="cards.typeOptions"
          prefix="Include"
          allLabel="All types"
          multiple
          placeholder="choose type..."
        />
        <UiSelect
          v-model="cards.selectedRarities"
          :options="cards.rarityOptions"
          prefix="Include"
          allLabel="All rarities"
          multiple
          placeholder="choose rarity..."
        />
        <UiSelect
          v-model="cards.selectedSets"
          :options="setOptions"
          prefix="Include"
          allLabel="All sets"
          multiple
          placeholder="choose set..."
        />
        <UiSelect v-model="cards.selectedInkable" prefix="Include" :options="cards.inkableOptions"/>
        <UiSelect v-model="cards.selectedDualSingleInk" prefix="Include" :options="cards.dualSingleOptions"/>
      </div>
    </Drawer>
  </div>
</template>
