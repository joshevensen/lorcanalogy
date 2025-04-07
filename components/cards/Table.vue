<script lang="ts" setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";

defineProps<{
  cards: any[],
  columns: any
}>()
</script>

<template>
  <DataTable
    ref="table"
    :rows="42"
    :value="cards"
    currentPageReportTemplate="{first} to {last}"
    defaultSortBy="setNumber"
    exportFilename="lorcana-cards"
    paginator
    paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink JumpToPageDropdown"
    removableSort
    scrollable
    size="small"
    sortMode="multiple"
    stripedRows
  >
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
</template>
