<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

definePageMeta({title: "Print", layout: 'print'})

const cards = useCards();
const {selectOptions: setOptions} = useSets();

const pages = ref<MAPPED_CARD[][]>([])
const chunkSize = 9;
const pageIndex = ref(0)

for (let i = 0; i < cards.mappedCards.value.slice(408, 612).length; i += chunkSize) {
  const chunk: MAPPED_CARD[] = cards.mappedCards.value.slice(408, 612).slice(i, i + chunkSize);
  pages.value.push(chunk);
}
</script>

<template>
  <PrintWrapper>
    <template #top>
      <h2 class="text-5xl text-center">Under Construction</h2>
      <p class="text-3xl text-center">Don't use</p>
    </template>

    <template #side>
      <h3>Filter Cards</h3>
      <div class="flex flex-col gap-4">
        <UiSelect
            v-model="cards.selectedInks"
            :options="cards.inkOptions"
            allLabel="All inks"
            multiple
            placeholder="choose ink..."
        />
        <UiSelect
            v-model="cards.selectedTypes"
            :options="cards.typeOptions"
            allLabel="All types"
            multiple
            placeholder="choose type..."
        />
        <UiSelect
            v-model="cards.selectedRarities"
            :options="cards.rarityOptions"
            allLabel="All rarities"
            multiple
            placeholder="choose rarity..."
        />
        <UiSelect
            v-model="cards.selectedSets"
            :options="setOptions"
            allLabel="All sets"
            multiple
            placeholder="choose set..."
        />
        <UiSelect v-model="cards.selectedInkable" :options="cards.inkableOptions"/>
        <UiSelect v-model="cards.selectedDualSingleInk" :options="cards.dualSingleOptions"/>
      </div>
    </template>

    <div class="w-[8.5in] mx-auto">
      <Paginator v-model:first="pageIndex" :rows="1" :totalRecords="pages.length"/>

      <div class="w-[8.5in] h-[11in] my-4 bg-white overflow-x-auto">
        <PrintPage>
          <PrintCardGrid>
            <PrintCard v-for="card in pages[pageIndex]" :key="card.id" :card="card"/>
          </PrintCardGrid>
        </PrintPage>
      </div>

      <Paginator v-model:first="pageIndex" :rows="1" :totalRecords="pages.length"/>
    </div>

    <template #printable>
      <PrintPage v-for="(page, index) in pages" :key="index">
        <PrintCardGrid>
          <PrintCard v-for="card in page" :key="card.id" :card="card"/>
        </PrintCardGrid>
      </PrintPage>
    </template>
  </PrintWrapper>
</template>
