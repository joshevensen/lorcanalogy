<script lang="ts" setup>
definePageMeta({ title: "Cards", layout: "table" });

// Fetch options from API
const { data: optionsData } = await useAsyncData("options", () =>
  $fetch("/api/options")
);

if (!optionsData.value) {
  throw new Error("Failed to load options");
}

// Fetch cards data
const cardsState = useCards(optionsData.value);
const queryParams = computed(() => cardsState.queryParams.value);

interface CardsResponse {
  cards: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const {
  data: cardsData,
  refresh,
  pending,
} = await useAsyncData<CardsResponse>(
  "cards",
  () => {
    return $fetch<CardsResponse>("/api/cards", { query: queryParams.value });
  },
  {
    watch: [queryParams],
    default: () => ({
      cards: [],
      total: 0,
      page: 1,
      limit: 34,
      totalPages: 0,
    }),
  }
);

// Watch for page changes to refresh
watch(cardsState.currentPage, () => {
  refresh();
});

const table = ref();
const showFilters = ref(false);
const showColumns = ref(false);

const display = ref("list");
const options = ref([
  { name: "List", value: "list" },
  { name: "Grid", value: "grid" },
  { name: "Table", value: "table" },
]);

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
  isDualInk: true,
  type: true,
  rarity: true,
  cost: true,
  lore: true,
  strength: true,
  willpower: true,
  moveCost: true,
  keywords: false,
  classifications: false,
});

const columnKeys = Object.keys(columns.value);

const filteredCards = computed(() => {
  return (cardsData.value?.cards || []).map((card: any) => {
    // Get ink names - first two inks
    const inkNames =
      card.Inks?.slice(0, 2).map((ink: any) => useStartCase(ink.name)) || [];
    const inks = inkNames.join(", ");

    // Get primary type
    const type = card.Types?.[0]?.name ? useStartCase(card.Types[0].name) : "";

    // Get rarity
    const rarity = card.Rarity?.name ? useStartCase(card.Rarity.name) : "";

    // Get keywords
    const keywords = card.Keywords?.map((kw: any) => kw.name).join(", ") || "";

    // Get classifications
    const classifications =
      card.Classifications?.map((cls: any) => cls.name).join(", ") || "";

    // Build fullName
    const fullName = card.name + (card.version ? ` ${card.version}` : "");

    // Check if dual ink
    const isDualInk = card.Inks?.length > 1;

    // Build set/card number in format "set-card" (e.g., "1-103")
    const setCardNumber = `${card.setNumber}-${card.number}`;

    return {
      ...card,
      fullName,
      inks,
      inkable: card.inkable ? "Yes" : "No",
      isDualInk: isDualInk ? "Yes" : "No",
      type,
      keywords,
      classifications,
      rarity,
      setId: card.Set?.id || card.setId,
      setCardNumber,
    };
  });
});

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
        <p class="italic text-gray-400">
          {{ filteredCards.length }} of {{ cardsData?.total || 0 }} cards
        </p>
      </div>

      <div class="flex items-center gap-2">
        <UiButton
          class="hidden! sm:flex!"
          icon="download"
          label="Download CSV"
          @click="exportCSV()"
        />
        <UiButton
          class="hidden! sm:flex!"
          icon="server"
          label="Columns"
          @click="openColumns"
        />
        <UiButton
          class="hidden! sm:flex!"
          icon="filter"
          label="Filters"
          @click="openFilters"
        />

        <UiButtonIcon class="sm:hidden!" icon="download" @click="exportCSV()" />
        <UiButtonIcon class="sm:hidden!" icon="server" @click="openColumns" />
        <UiButtonIcon class="sm:hidden!" icon="filter" @click="openFilters" />
      </div>
    </div>

    <CardsTable
      :cards="filteredCards"
      :columns="columns"
      :total="cardsData?.total || 0"
      :currentPage="cardsState.currentPage.value"
      :onPageChange="(page: number) => (cardsState.currentPage.value = page)"
      ref="table"
    />

    <CardsFilters
      v-model:visible="showFilters"
      :filters="cardsState.filters.value"
      :options="optionsData"
    />

    <UiDrawer v-model:visible="showColumns" header="Toggle Columns">
      <div class="space-y-3">
        <UiField
          v-for="key in columnKeys"
          :key="key"
          :label="useStartCase(key)"
          position="right"
        >
          <UiCheckbox v-model="columns[key as keyof typeof columns]" />
        </UiField>
      </div>
    </UiDrawer>
  </div>
</template>
