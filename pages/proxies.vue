<script lang="ts" setup>
definePageMeta({title: "Proxies", layout: 'print'})

// Fetch options from API
const { data: optionsData } = await useAsyncData("options", () =>
  $fetch("/api/options")
);

if (!optionsData.value) {
  throw new Error("Failed to load options");
}

// Fetch all cards for printing (no pagination)
const cardsState = useCards(optionsData.value);
const queryParams = computed(() => ({
  ...cardsState.queryParams.value,
  limit: 10000, // Large limit to get all cards
  page: 1,
}));

const { data: cardsData } = await useAsyncData<{
  cards: any[];
  total: number;
}>(
  "proxies-cards",
  () => $fetch<{ cards: any[]; total: number }>("/api/cards", { query: queryParams.value }),
  {
    watch: [queryParams],
    default: () => ({
      cards: [],
      total: 0,
    }),
  }
);

// Create byPage computed for client-side pagination (9 cards per page for printing)
const byPage = computed(() => {
  const pages = [];
  const chunkSize = 9;
  const cards = cardsData.value?.cards || [];
  
  for (let i = 0; i < cards.length; i += chunkSize) {
    pages.push(cards.slice(i, i + chunkSize));
  }
  
  return pages;
});

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
      <div class="max-w-2xl mx-auto">
        <p class="text-lg text-center">Print
          <DisneyLorcana/>
          test cards for informal play testing. Or print a set to represent your master set that you keep in a binder.
          Or find an interesting use for these proxy cards.
        </p>

        <p class="mt-6 mb-4 text-xl text-center font-bold">Support the official product and local game stores buy the
          real
          cards.</p>
      </div>
    </template>

    <div class="w-[8.5in] mx-auto">
      <Paginator
        v-model:first="pageIndex"
        :rows="1"
        :totalRecords="byPage.length"
        template="JumpToPageDropdown"
      >
        <template #end>
          <div class="flex items-center gap-2">
            <p class="mr-2 italic text-gray-500">{{ cardsData?.total || 0 }} cards & {{
                byPage.length
              }}
              pages</p>
            <UiButton class="hidden! sm:flex!" icon="filter" label="Filters" @click="openFilters"/>
            <UiButton :outlined="false" label="Print Cards" @click="printCards"/>
          </div>
        </template>
      </Paginator>

      <div class="my-4 bg-white overflow-x-auto">
        <PrintPage>
          <PrintCardGrid>
            <PrintCard v-for="card in byPage[pageIndex]" :key="card.id" :card="card"/>
          </PrintCardGrid>
        </PrintPage>
      </div>

      <Paginator v-model:first="pageIndex" :rows="1" :totalRecords="byPage.length"/>
    </div>

    <CardsFilters v-model:visible="showFilters" :filters="cardsState.filters.value" :options="optionsData" includeSort/>

    <template #printable>
      <LazyPrintPage v-for="(page, index) in byPage" :key="index">
        <LazyPrintCardGrid>
          <LazyPrintCard v-for="card in page" :key="card.id" :card="card"/>
        </LazyPrintCardGrid>
      </LazyPrintPage>
    </template>
  </PrintWrapper>
</template>
