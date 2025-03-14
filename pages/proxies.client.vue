<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

definePageMeta({title: "Print", layout: 'print'})

const cards = useCards();
const {selectOptions: setOptions} = useSets();

const chunkSize = 9;
const pageIndex = ref(0);

const pages = computed(() => {
  const pages = [];

  for (let i = 0; i < cards.mappedCards.value.length; i += chunkSize) {
    const chunk: MAPPED_CARD[] = cards.mappedCards.value.slice(i, i + chunkSize);
    pages.push(chunk);
  }

  return pages
})
</script>

<template>
  <PrintWrapper>
    <template #top>
      <h2 class="text-5xl text-center">Under Construction</h2>
      <p class="text-3xl text-center">Don't use</p>
    </template>

    <template #side>

      <div class="flex flex-col gap-8">
        <UiSelect
            v-model="cards.selectedSort"
            :options="cards.sortOptions"
            prefix="Sort by"
        />

      <div class="flex flex-col gap-4">
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
