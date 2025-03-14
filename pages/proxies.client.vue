<script lang="ts" setup>
definePageMeta({title: "Proxies", layout: 'print'})

const cards = useCards();
const showFilters = ref(false);
const pageIndex = ref(0);

function printCards() {
  window.print();
}

function openFilters() {
  showFilters.value = true;
}
</script>

<template>
  <PrintWrapper>
    <template #top>
      <h2 class="text-5xl text-center">Under Construction</h2>
      <p class="text-3xl text-center">Don't use</p>
    </template>

    <div class="w-[8.5in] mx-auto">
      <Paginator
        v-model:first="pageIndex"
        :rows="1"
        :totalRecords="cards.byPage.value.length"
        template="JumpToPageDropdown"
      >
        <template #end>
          <div class="flex items-center gap-2">
            <p class="mr-2 italic text-gray-500">{{ cards.sorted.value.length }} cards & {{ cards.byPage.value.length }}
              pages</p>
            <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>
            <UiButton :outlined="false" label="Print Cards" @click="printCards"/>
          </div>
        </template>
      </Paginator>

      <div class="my-4 bg-white overflow-x-auto">
        <PrintPage>
          <PrintCardGrid>
            <PrintCard v-for="card in cards.byPage.value[pageIndex]" :key="card.id" :card="card"/>
          </PrintCardGrid>
        </PrintPage>
      </div>

      <Paginator v-model:first="pageIndex" :rows="1" :totalRecords="cards.byPage.value.length"/>
    </div>

    <Filters v-model:visible="showFilters" :filters="cards.filters.value"/>

    <template #printable>
      <LazyPrintPage v-for="(page, index) in cards.byPage.value" :key="index">
        <LazyPrintCardGrid>
          <LazyPrintCard v-for="card in page" :key="card.id" :card="card"/>
        </LazyPrintCardGrid>
      </LazyPrintPage>
    </template>
  </PrintWrapper>
</template>
