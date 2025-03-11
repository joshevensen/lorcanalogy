<script lang="ts" setup>
import type {MAPPED_CARD} from "~/data/data.types";

definePageMeta({title: "Print", layout: 'print'})

const {mappedCards} = useCards();

const pages = ref<MAPPED_CARD[][]>([])
const pageIndex = ref(0)
const chunkSize = 9;

const filteredCards = mappedCards.value;

for (let i = 0; i < filteredCards.length; i += chunkSize) {
  const chunk: MAPPED_CARD[] = filteredCards.slice(i, i + chunkSize);
  pages.value.push(chunk);
}
</script>

<template>
  <PrintWrapper>
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
