import type { OPTION } from "~/app.types";

interface CardsResponse {
  cards: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseCardsOptions {
  ink: OPTION[];
  type: OPTION[];
  rarity: OPTION[];
  set: OPTION[];
  keyword: OPTION[];
  classification: OPTION[];
  inkable: OPTION[];
  dualSingle: OPTION[];
}

export default function useCards(options: UseCardsOptions) {
  /**
   * Filters
   */
  const filters = ref({
    sort: "set",
    inks: options.ink.map((option) => option.value),
    types: options.type.map((option) => option.value),
    keywords: [],
    classifications: [],
    rarities: options.rarity
      .map((option) => {
        if (option.value !== "enchanted") return option.value;
      })
      .filter((value) => value !== undefined),
    sets: options.set.map((option) => option.value),
    inkable: options.inkable.map((option) => option.value),
    dualSingle: options.dualSingle.map((option) => option.value),
  });

  /**
   * Current page for pagination
   */
  const currentPage = ref(1);
  const pageSize = 34;

  /**
   * Build query params from filters
   */
  const buildQueryParams = () => {
    const params: Record<string, any> = {
      page: currentPage.value,
      limit: pageSize,
      sort: filters.value.sort,
    };

    // Add array parameters
    if (filters.value.inks.length > 0) {
      params["inks[]"] = filters.value.inks;
    }
    if (filters.value.types.length > 0) {
      params["types[]"] = filters.value.types;
    }
    if (filters.value.keywords.length > 0) {
      params["keywords[]"] = filters.value.keywords;
    }
    if (filters.value.classifications.length > 0) {
      params["classifications[]"] = filters.value.classifications;
    }
    if (filters.value.rarities.length > 0) {
      params["rarities[]"] = filters.value.rarities;
    }
    if (filters.value.sets.length > 0) {
      params["sets[]"] = filters.value.sets;
    }
    if (filters.value.inkable.length > 0) {
      params["inkable[]"] = filters.value.inkable;
    }
    if (filters.value.dualSingle.length > 0) {
      params["dualSingle[]"] = filters.value.dualSingle;
    }

    return params;
  };

  /**
   * Reactive query params
   */
  const queryParams = computed(() => buildQueryParams());

  /**
   * Reset to first page when filters change (but not page)
   */
  watch(
    () => [
      filters.value.inks,
      filters.value.types,
      filters.value.keywords,
      filters.value.classifications,
      filters.value.rarities,
      filters.value.sets,
      filters.value.inkable,
      filters.value.dualSingle,
      filters.value.sort,
    ],
    () => {
      currentPage.value = 1; // Reset to first page on filter change
    },
    { deep: true }
  );

  /**
   * Get keywords list from database
   */
  const keywordsList = computed<OPTION[]>(() => {
    // Extract from current cards data (will be passed from page)
    return options.keyword;
  });

  /**
   * Get classifications list from database
   */
  const classificationsList = computed<OPTION[]>(() => {
    return options.classification;
  });

  return {
    filters,
    currentPage,
    pageSize,
    queryParams,
    keywordsList,
    classificationsList,
  };
}
